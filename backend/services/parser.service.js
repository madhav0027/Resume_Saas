
const { extractTextFromPDF } = require("./pdf.service");
const { extractResumeDetails } = require("../utils/extractors");

exports.parseResume = async (filePath) => {
  const text = await extractTextFromPDF(filePath);
  const parsed = await extractResumeDetails(text);

  return {
    rawText: text,
    parsed
  };
};