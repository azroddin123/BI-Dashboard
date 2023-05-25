
const readExcel = (file) => {
    const {filename,destination} = file
    const XLSX = require("xlsx");
    const workbook = XLSX.readFile(`${destination}/${filename}`);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    return workSheet
}

module.exports = readExcel