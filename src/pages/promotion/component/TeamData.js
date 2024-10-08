import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container, Typography } from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { starblue, starbluegrad, stargold, zubgback, zubgmid } from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import { MypromotionDataFn } from "../../../services/apicalling";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { rupees } from "../../../services/urls";
import { Star } from "@mui/icons-material";
import logo2 from "../../../assets/images/5-Star-XXX-8-29-2024.png";

function TeamData() {
  const { isLoading, data } = useQuery(
    ["promotion_data"],
    () => MypromotionDataFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const result = data?.data?.data?.teamMembersByLevel;
  const all_data = data?.data?.data;

  return (
    <Layout>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header} className={"!w-full !flex !justify-center"}>
          <Box
            component="img"
            src={logo2}
            sx={{ width: '150px' }}
          ></Box>
        </Box>
        <Box sx={{ mt: 2, width: '95%', ml: '2.5%' }}>
          {
            <Accordion className="!rounded-lg" >
              <AccordionSummary
                expandIcon={<Star className="!text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ background: starblue, color: "white", borderRadius: '5px 5px 0px 0px' }}
              >
                <div className="w-full grid grid-cols-3 pr-2">
                  <span className="!text-center">Levels</span>
                  <p className="!text-center">Members</p>
                  <p className="!text-center">Deposit Amount</p>
                </div>
              </AccordionSummary>
            </Accordion>
          }
          {
            <Accordion className="!rounded-lg" >
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon className="!text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ background: starbluegrad, color: 'white' }}
              >
                <div className="w-full grid grid-cols-3 pr-2">
                  <span className="!text-center">Level: 1</span>
                  <p className="!text-center">{result?.level_1?.length || 0}</p>
                  <p className="!text-center">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {Number(all_data?.deposit_member_amount?.[0] || 0)?.toFixed(2)}
                    </span>{" "}
                  </p>
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ background: starbluegrad, }}>
                <Box sx={{ paddingTop: 2 }}>
                  <Box sx={style.accordian}>
                    <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center  !bg-opacity-5">
                      <span>S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full !bg-[#281970]"></div>
                    {result?.level_1?.map((i, index) => {
                      return (
                        <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                          <span>{index + 1}</span>
                          <span className="!text-center ">
                            {i?.id || "No data found"}
                          </span>
                          <span className="!text-center ">
                            {i?.full_name || "No data found"}
                          </span>
                        </div>
                      );
                    })}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          }
          {
            <Accordion className="!rounded-lg">
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon className="!text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ background: starbluegrad, color: 'white' }}
              >
                <div className="w-full grid grid-cols-3 pr-2">
                  <span className="!text-center">Level: 2</span>
                  <p className="!text-center">{result?.level_2?.length || 0}</p>
                  <p className="!text-center">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {Number(all_data?.deposit_member_amount?.[1] || 0)?.toFixed(2)}
                    </span>{" "}
                  </p>
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ background: zubgback, color: "white" }}>
                <Box sx={{ paddingTop: 2 }}>
                  <Box sx={style.accordian}>
                    <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                      <span>S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full !bg-[#281970]"></div>
                    {result?.level_2?.map((i, index) => {
                      return (
                        <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                          <span>{index + 1}</span>
                          <span>{i?.id}</span>
                          <span className="!text-center ">
                            {i?.full_name || "No data found"}
                          </span>
                        </div>
                      );
                    })}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          }
          {
            <Accordion className="!rounded-lg">
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon className="!text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ background: starbluegrad, color: 'white' }}
              >
                <div className="w-full grid grid-cols-3 pr-2">
                  <span className="!text-center">Level: 3</span>
                  <p className="!text-center">{result?.level_3?.length || 0}</p>
                  <p className="!text-center">
                    {rupees}{" "}
                    <span className="text-green-200">
                      {Number(all_data?.deposit_member_amount?.[2] || 0)?.toFixed(2)}
                    </span>{" "}
                  </p>
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ background: zubgback, color: "white" }}>
                <Box sx={{ paddingTop: 2 }}>
                  <Box sx={style.accordian}>
                    <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center !bg-[#281970] !bg-opacity-5">
                      <span>S.No.</span>
                      <span>User Id</span>
                      <span className="">Name</span>
                    </div>
                    <div className="h-[2px] w-full !bg-[#1b5921]"></div>
                    {result?.level_3?.map((i, index) => {
                      return (
                        <div className="!grid !grid-cols-3 !text-white pl-2 !place-items-center">
                          <span>{index + 1}</span>
                          <span>{i?.id}</span>
                          <span className="!text-center ">
                            {i?.full_name || "No data found"}
                          </span>
                        </div>
                      );
                    })}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          }
        </Box>
      </Container>
    </Layout >
  );
}

export default TeamData;

const style = {
  header: {
    padding: "0px 8px",
    background: starbluegrad,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
  },
  accordian: {
    backgroundColor: zubgmid,
    borderRadius: "10px",
    padding: "30px 20px",
    "&>div": { mb: 2 },
    "&>div>div:nth-child(1)": {
      borderRight: "1px solid black",
      width: "50%",
      textAlign: "center",
    },
    "&>div>div:nth-child(2)": {
      width: "50%",
      textAlign: "center",
    },
    "&>div>div>p": {
      color: "white",
      fontSize: "14px",
      fontWeight: 500,
    },
  },
};
