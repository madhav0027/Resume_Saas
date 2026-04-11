
const fs = require("fs");
const { PDFParse } = require("pdf-parse");

exports.extractTextFromPDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();

  await parser.destroy();
  fs.unlinkSync(filePath);


  return result.text;
};