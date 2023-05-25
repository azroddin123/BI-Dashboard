const getMsg = require("../utils/get-msg");
const moment = require('moment');

const getCellObjWS = workSheet => (POSITION, cells) => {
  let postions = cells.split("");
  return {
    actual: {
      amount: workSheet[`${postions[0]}${POSITION}`]?.v,
      percentage: workSheet[`${postions[1]}${POSITION}`]?.v,
    },
    budget: {
      amount: workSheet[`${postions[2]}${POSITION}`]?.v,
      percentage: workSheet[`${postions[3]}${POSITION}`]?.v,
    },
    LY: {
      amount: workSheet[`${postions[4]}${POSITION}`]?.v,
      percentage: workSheet[`${postions[5]}${POSITION}`]?.v,
    },
  };
};

const postPlReport = (req,res) => {
    const {filename,destination} = req.file;
    req.body.file = filename;
    const XLSX = require("xlsx");
    const workbook = XLSX.readFile(`${destination}/${filename}`);
    let workSheet = workbook.Sheets[workbook.SheetNames[0]];

    const getCellObj = getCellObjWS(workSheet)

  const getMTD = (CELL) => getCellObj(CELL, "BCDEFG");
  const getYTD = (CELL) => getCellObj(CELL, "HIJKLMNOP");

  const getFormattedData = (CELL) => ({
    MTD: getMTD(CELL),
    YTD: getYTD(CELL),
  });

  const data = {
    occupancy: getMTD("7"),
    rooms: getMTD("10"),
    f_b: getMTD("11"),
    total_revenue: getMTD("13"),
    NOP: getFormattedData("24"),
    GOP: getFormattedData("20"),
    payroll_and_related : getMTD("15"),
    cost_of_sale : getMTD("16"),
    utility : getMTD("17"),
    other_expenses : getMTD("18")

  };

  res.status(200).json({data,date : moment(new Date()).format('DD-MM-YY'), success : true, msg : getMsg("PL Reports")("post")})
}


const getPlReport = async (req,res) => {
  const {date} = req.query 
  try {
  const path = require('path');
  const fileName = `file-${date}.xls`;
  // Absolute path of the file
  const filePath = path.join(__dirname, '../assets/media/reports/pl/', fileName);
  const XLSX = require("xlsx");
const workbook = XLSX.readFile(filePath);
let workSheet = workbook.Sheets[workbook.SheetNames[0]];

const getCellObj = getCellObjWS(workSheet)

  const getMTD = (CELL) => getCellObj(CELL, "BCDEFG");
  const getYTD = (CELL) => getCellObj(CELL, "HIJKLMNOP");

  const getFormattedData = (CELL) => ({
    MTD: getMTD(CELL),
    YTD: getYTD(CELL),
  });

  const data = {
    occupancy: getMTD("7"),
    rooms: getMTD("10"),
    f_b: getMTD("11"),
    total_revenue: getMTD("13"),
    NOP: getFormattedData("24"),
    GOP: getFormattedData("20"),
    payroll_and_related : getMTD("15"),
    cost_of_sale : getMTD("16"),
    utility : getMTD("17"),
    other_expenses : getMTD("18")

  };
  res.status(200).json({data, success : true,date, msg : getMsg("PL Reports")("get-single")})
}
catch(e) {
  res.status(200).json({status : 500, success : false, date, msg : getMsg("PL Reports")("404")})

}
} 

// todo  put and delete remaining

const putPlReport = (req,res) => {
  const {filename,destination} = req.file
  req.body.file = filename;
    
const XLSX = require("xlsx");
const workbook = XLSX.readFile(`${destination}/${filename}`);
let workSheet = workbook.Sheets[workbook.SheetNames[0]];

const getCellObj = getCellObjWS(workSheet)

const getMTD = (CELL) => getCellObj(CELL, "BCDEFG");
const getYTD = (CELL) => getCellObj(CELL, "HIJKLMNOP");

const getFormattedData = (CELL) => ({
  MTD: getMTD(CELL),
  YTD: getYTD(CELL),
});

const data = {
  occupancy: getMTD("7"),
  rooms: getMTD("10"),
  f_b: getMTD("11"),
  total_revenue: getMTD("13"),
  NOP: getFormattedData("24"),
  GOP: getFormattedData("20"),
  payroll_and_related : getMTD("15"),
  cost_of_sale : getMTD("16"),
  utility : getMTD("17"),
  other_expenses : getMTD("18")

};

res.status(200).json({data, success : true, msg : getMsg("PL Reports")("put")})
}

module.exports = {postPlReport,putPlReport ,getPlReport}