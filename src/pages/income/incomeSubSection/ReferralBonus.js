import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container } from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import { referralBonusFn } from "../../../services/apicalling";
import nodatafoundimage from "../../../assets/images/nodatafoundimage.png";

function ReferralBonus() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { isLoading, data } = useQuery(
    ["referral_bonus"],
    () => referralBonusFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );
  const res = data?.data?.data;
  if (!isLoading && !res)
    return (
      <Layout>
        <Container
          sx={{
            background: zubgback,
            width: "100%",
            height: "100vh",
            overflow: "auto",
            mb: 5,
          }}
        >
          <Box sx={style.header}>
            <Box component={NavLink} onClick={goBack}>
              <KeyboardArrowLeftOutlinedIcon />
            </Box>
            <p>Referral Bonus</p>
          </Box>
          <div>
            <img className="" src={nodatafoundimage} />
          </div>
        </Container>
      </Layout>
    );
  return (
    <Layout>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar"
      >
        <Box sx={{ width: '95%', ml: '2.5%' }}>
          <CustomCircularProgress isLoading={isLoading} />
          <Box sx={style.header}>
            <Box component={NavLink} onClick={goBack}>
              <KeyboardArrowLeftOutlinedIcon />
            </Box>
            <p>Referral Bonus</p>
          </Box>
          <div className="no-scrollbar !mb-10">
            {res?.map((i) => {
              return (
                <div className="!w-full !flex !flex-col  !bg-white !bg-opacity-5 !p-2 !rounded-lg !mt-2">
                  <div className="!w-full !flex !justify-between">
                    <span className="!text-white">{i?.l01_transection_type}</span>
                    <span className="!text-green-400 !text-lg">
                      {i?.l01_amount}
                    </span>
                  </div>
                  <div className="!w-full !flex !justify-between">
                    {/* <span className="!text-white">{i?.lo1_id}</span> */}
                    <span className="!text-yellow-400  !text-[12px]">
                      {moment(i?.l01_date)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.l01_date)?.format("HH:mm:ss")}
                    </span>
                  </div>
                  <div className="!w-full !flex !justify-between">
                    <span className="!text-white !text-[12px]">
                      {i?.l01_type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Box>
      </Container>
    </Layout>
  );
}

export default ReferralBonus;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgback,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "15px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  },
  wthui: {
    textAlign: "center",
    width: "32%",
    minHeight: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
  paymentlink: {
    width: "32%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    "&>p": {
      color: "white",
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
      mt: "5px",
    },
  },
  paymentBoxOuter: {
    width: "95%",
    margin: "auto",
    my: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: zubgback,
    color: "white !important",
    width: "31%",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgbackgrad,
    color: "white !important",
    width: "100%",
    mt: 2,
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
