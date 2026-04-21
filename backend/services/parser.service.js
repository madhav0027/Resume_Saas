
const { extractTextFromPDF } = require("./pdf.service");
const { extractResumeDetails } = require("../utils/extractors");

exports.parseResume = async (buffer) => {
  const text = await extractTextFromPDF(buffer);
  const parsed = await extractResumeDetails(text);

  return {
    rawText: text,
    parsed
  };
};