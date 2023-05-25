import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import DailyReport from "../daily-report/DailyReport";
import MonthlyReport from "../monthly-report/MonthlyReport";
import ReportAccordion from "../reports/ReportAccordion";

const MonthlyReportAccordion = () => {
  const [date,setDate] = useState(moment(new Date()).format('DD-MM-YY'));
  // const date = moment(new Date).format('DD-MM-YY')
  const [file,setFile] = useState(null);
  const [isNoReport,setIsNoReport] = useState(false)
 
  const getReport = async (pickerDate = date) => {
    // console.log({pickerDate});
   return axios
      .get("api/v1/reports/pl/0?date="+pickerDate)
      .then((res) => {
        setIsNoReport(res.data.status == 500 ? true : false);
        setReportData(res?.data?.data);
        setDate(res.data.date);
        return res;})
      .catch((err) => {console.log(err, err.response);setIsNoReport(true)});}

  const postReport = async (file) => {
    const fd = new FormData();
    fd.append('file',file);
    fd.append('path','pl');
    fd.append('date',moment(new Date).format('DD-MM-YY'))
    return await axios
       .post("api/v1/reports/pl",fd,{
        headers: { "Content-Type": "multipart/form-data" },
       })
       .then((res) => { toast.success('Report Submitted'); refetch(); setDate(res.data.data.date)})
       .catch((err) => console.log(err, err.response));}
  const { isLoading ,isFetching, error, data,refetch  } = useQuery('monnthly-report', () =>getReport())
  const [reportData,setReportData] = useState({});

// console.log({reportData})
  const fileHandler =async (e) => {
    const file = e.target.files[0];
    setFile(file);
    await postReport(file)
    
  }
  return (
    <ReportAccordion
    link = '#montly-report' 
    title={<>Monthly Report <span style = {{fontSize : '0.6em'}} >Date : {date}</span></>} refetch = {refetch} fileHandler = {fileHandler} isNoReport = {isNoReport}
    selectReportByDate = {getReport}
    isButtonDisabled = {date !== moment(new Date).format('DD-MM-YY')}
    >
      <MonthlyReport isLoading = {isLoading} data = {reportData} />
    </ReportAccordion>
  );
};

export default MonthlyReportAccordion;
