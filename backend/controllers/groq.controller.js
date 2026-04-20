const { Groq } = require("groq-sdk");
const crypto = require("crypto");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// 🧠 In-memory cache
const cache = new Map();

exports.streamGroqResponse = async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume data is required",
      });
    }


    const resumeString = JSON.stringify(resume);
    const hash = crypto
      .createHash("sha256")
      .update(resumeString)
      .digest("hex");


    if (cache.has(hash)) {
      return res.status(200).json({
        success: true,
        cached: true,
        data: cache.get(hash),
      });
    }

    // ✅ Prompt
    const prompt = `
You are an ATS (Applicant Tracking System) and career advisor.

Analyze the resume data and return STRICT JSON only.

Resume Data:
${resumeString}

Return ONLY valid JSON in this format:
{
  "atsScore": number,
  "strengths": [string],
  "weaknesses": [string],
  "suggestions": [string],
  "keywordsMissing": [string],
  "recommendedJobRoles": [string],
  "jobMatchSummary": string,
  "experienceLevel": string
}
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const rawOutput = completion.choices[0]?.message?.content || "";

    let parsed;

    try {
      parsed = JSON.parse(rawOutput);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
        raw: rawOutput,
      });
    }

    cache.set(hash, parsed);

    return res.status(200).json({
      success: true,
      cached: false,
      data: parsed,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Groq API error",
      error: error.message,
    });
  }
};