import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const useReports = () => {
    const [date, setDate] = useState(moment(new Date()).format("DD-MM-YY"));
    const [isNoReport, setIsNoReport] = useState(false);
    const [reportData, setReportData] = useState({});

    
  const getReport = async (pickerDate = date) => {
    return axios
      .get("api/v1/reports/pl/0?date=" + pickerDate)
      .then((res) => {
        setIsNoReport(res.data.status == 500 ? true : false);
        setReportData(res?.data?.data);
        setDate(res.data.date);
        return res;
      })
      .catch((err) => {
        console.log(err, err.response);
        setIsNoReport(true);
      });
  };

  const { isLoading, isFetching, error, data, refetch } = useQuery(
    "pl-report0",
    () => getReport(),{
        onSuccess : (res) => {
            setIsNoReport(res.data.status == 500 ? true : false);
            setReportData(res?.data?.data);
            setDate(res.data.date);
        }
    }
  );
  
    return {
        isLoading,
        reportData,
        date,
        getReport,
        isNoReport,
        refetch
    }
}