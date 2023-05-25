import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import DailyReport from "../daily-report/DailyReport";
import MonthlyReport from "../monthly-report/MonthlyReport";
import ReportAccordion from "../reports/ReportAccordion";

const PLReport = () => {
  const [date, setDate] = useState(moment(new Date()).format("DD-MM-YY"));
  const [isNoReport, setIsNoReport] = useState(false);

  const getReport = async (pickerDate) => {
    return axios
      .get("api/v1/reports/pl/0?date=" + pickerDate)
  };
  
  const postReport = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("path", "pl");
    fd.append("date", moment(new Date()).format("DD-MM-YY"));
    setDate(moment(new Date()).format("DD-MM-YY"));

    return await axios
      .post("api/v1/reports/pl", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success("Report Submitted");
        refetch();
        // setDate(res.data.data.date);
      })
      .catch((err) => console.log(err, err.response));
  };
  const { isLoading, isFetching, error, data, refetch } = useQuery(
    "pl-report",
    () => getReport(moment(new Date()).format("DD-MM-YY")),{
      onSuccess : (res) => {
        setIsNoReport(res.data.status == 500 ? true : false);
        setReportData(res?.data?.data);
        setDate(res.data.date);
        return res;
      },
      onError : err => {
        console.log(err, err.response);
        setIsNoReport(true);
      }
    }
  );
  
  // useEffect(
  //   () => {
  //     const timer = setTimeout(
  //       () => refetch(),100
  //     )
  //     return () => clearTimeout(timer)
  //     },[]
  // )

  const [reportData, setReportData] = useState({});

  // console.log({reportData})
  const fileHandler = async (e) => {
    const file = e.target.files[0];
    await postReport(file);
  };
  return (
    <ReportAccordion
      link="#pl-report"
      title={
        <>
          PL Report <span style={{ fontSize: "0.6em" }}>Date : {date}</span>
        </>
      }
      refetch={refetch}
      fileHandler={fileHandler}
      isNoReport={isNoReport}
      selectReportByDate={getReport}
      // selectReportByDate={getReport}
      isButtonDisabled={date !== moment(new Date()).format("DD-MM-YY")}
    >
      <DailyReport isLoading={isLoading} data={reportData} />
      <br />
      <MonthlyReport isLoading={isLoading} data={reportData} />
    </ReportAccordion>
  );
};

export default PLReport;
