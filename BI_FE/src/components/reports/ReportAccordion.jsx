import { Box, Typography, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import CustomAccordion from "../../components/formUI/CustomAccordion";
import CustomButton from "../../components/formUI/CustomButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CustomDatePicker from "../../components/formUI/CustomDatePicker";
import CustomDialog from "../../components/CustomDialog";
import UploadIcon from "@mui/icons-material/Upload";
import { useState } from "react";
import moment from "moment";
const ReportAccordion = ({
  link,
  children,
  title = "Add Title",
  isNoReport,
  fileHandler,
  selectReportByDate = () => alert("posted"),
  isButtonDisabled = false,
}) => {
  // console.log(link)
  console.log({ isButtonDisabled });
  const isMobile = useMediaQuery("(max-width : 600px)");
  const [pickerDate, setPickerDate] = useState(null);

  return (
    <CustomAccordion
      link={link}
      header={
        <CustomButton component="label" disabled = {isButtonDisabled}>
          <input
            type="file"
            onChange={fileHandler}
            style={{
              position: "absolute",
              right: "-30%",
              opacity: 0,
            }}
          />
          {isMobile ? <UploadIcon /> : "Upload Report"}
        </CustomButton>
      }
      title={title}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent={"center"}
      >
        <Stack
          direction={{ md: "row", xs: "column" }}
          spacing={2}
          alignItems="center"
        >
          <CustomButton
            onClick={() =>
              selectReportByDate(moment(new Date()).format("DD-MM-YY"))
            }
          >
            Today's Report
          </CustomButton>
          <Typography>OR</Typography>
          <CustomDialog
            onClose={() => {
              selectReportByDate(pickerDate);
            }}
            buttonTitle="See Report by Date"
            buttonProps={{ endIcon: <ArrowDropDownIcon /> }}
          >
            <CustomDatePicker handler={setPickerDate} d={pickerDate} />
          </CustomDialog>
        </Stack>
      </Stack>
      <Box py={2}>{isNoReport ? "No report found" : children}</Box>
    </CustomAccordion>
  );
};

export default ReportAccordion;
