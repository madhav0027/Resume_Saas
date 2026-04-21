
const fs = require("fs");
const { PDFParse } = require("pdf-parse");

exports.extractTextFromPDF = async (buffer) => {

  const parser = await new PDFParse({data:buffer});
  const result = await parser.getText();

  return result.text;
};