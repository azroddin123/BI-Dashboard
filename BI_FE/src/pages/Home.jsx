import React from "react";
import Layout from "../components/Layout";
import PLReportAccordion from "../components/pl-report/PLReportAccordion";
import MonthlyReportAccordion from "../components/monthly-report/MonthlyReportAccordion";
import Configuration from "../components/Configuration";

const Home = () => {
  return (
    <>
    {/* // <Layout> */}
      {/* <MonthlyReportAccordion/> */}
      <PLReportAccordion/>
      {/* <Configuration/> */}
      {/* <ReportAccordion title="Daily Report">
        <DailyReport />
        </ReportAccordion>
      <ReportAccordion title="Monthly Report">
      <MonthlyReport />
      </ReportAccordion> */}
    {/* // </Layout> */}
      </>
  );
};

export default Home;
