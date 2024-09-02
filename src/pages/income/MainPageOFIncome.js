import { Money } from "@mui/icons-material";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { Box, Container, Stack, Typography } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { starbluegrad, zubgback, zubgbackgrad, zubgmid } from "../../Shared/color";
import Layout from "../../component/Layout/Layout";
import logo2 from "../../assets/images/5-Star-XXX-8-29-2024.png";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";


function MainPageOFIncome() {
  const data_array = [
    {
      to: "/account/income-main/referral-bonus",
      name: "Referral Bonus",
      logo: (
        <AccountTreeIcon
          sx={{ width: "20px", height: "20px", marginRight: "10px", color: 'white', }}
          color="#ffffff"
        />
      ),
    },
    // {
    //   to: "/account/income-main/level-income",
    //   name: "Level Income",
    //   logo: (
    //     <StairsIcon
    //       sx={{width: "20px", height: "20px", marginRight: "10px"}}
    //       color="#ffffff"
    //     />
    //   ),
    // },
    // {
    //   to: "/account/income-main/referral-bonus",
    //   name: "Referral Bonus",
    //   logo: (
    //     <RedeemIcon
    //       sx={{width: "20px", height: "20px", marginRight: "10px"}}
    //       color="#ffffff"
    //     />
    //   ),
    // },
    // {
    //   to: "/account/income-main/daily-cash-back-bonus",
    //   name: "Daily Cashback Bonus",
    //   logo: (
    //     <LocalConvenienceStoreIcon
    //       sx={{width: "20px", height: "20px", marginRight: "10px"}}
    //       color="#ffffff"
    //     />
    //   ),
    // },
    // {
    //   to: "/account/income-main/daily-salary-bonus",
    //   name: "Daily Salary Bonus",
    //   logo: (
    //     <AccountBalanceIcon
    //       sx={{width: "20px", height: "20px", marginRight: "10px"}}
    //       color="#ffffff"
    //     />
    //   ),
    // },
    // {
    //   to: "/account/income-main/self-trading-bonus",
    //   name: "Self Trading Bonus",
    //   logo: (
    //     <StoreIcon
    //       sx={{width: "20px", height: "20px", marginRight: "10px"}}
    //       color="#ffffff"
    //     />
    //   ),
    // },
    // {
    //   to: "/account/income-main/team-trading-bonus",
    //   name: "Team Trading  Bonus",
    //   logo: (
    //     <CardGiftcardIcon
    //       sx={{width: "20px", height: "20px", marginRight: "10px"}}
    //       color="#ffffff"
    //     />
    //   ),
    // },
    {
      to: "/account/income-main/team-reward-bonus",
      name: "Vegus Bonus",
      logo: (
        <Diversity2Icon
          sx={{ width: "20px", height: "20px", marginRight: "10px", color: 'white', }}
          color="#ffffff"
        />
      ),
    },

    {
      to: "/account/income-main/referral-bet",
      name: "Bet Referral ",
      logo: (
        <Money
          sx={{ width: "20px", height: "20px", marginRight: "10px", color: 'white', }}
          color="#ffffff"
        />
      ),
    },
  ];
  console.log(data_array[0].logo);
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
        <Box sx={style.header} className={"!w-full !flex !justify-center"}>
          <Box
            component="img"
            src={logo2}
            sx={{ width: '150px' }}
          ></Box>
        </Box>
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
            background: zubgmid,
            padding: "10px",
            mt: "20px",
            "&>:nth-child(1)": {
              color: "white",
              fontSize: "15px",
              fontWeight: "600",
              mb: "25px",
            },
          }}
        >
          <Typography variant="body1" color="initial">
            Income
          </Typography>

          <Box sx={style.actionContainertwo}>
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "column",
                background: zubgmid,
                width: "100%",
                borderRadius: "10px",
              }}
            >
              {data_array?.map((i) => {
                return (
                  // <Box
                  //   component={NavLink}
                  //   to={i.to}
                  //   sx={{
                  //     display: "flex",
                  //     flexDirection: "column",
                  //     alignItems: "center",
                  //     justifyContent: "center",
                  //     mb: "10px",
                  //     "&>p": {
                  //       color: "white",
                  //       fontSize: "14px",
                  //       fontWeight: "500",
                  //       mt: "5px",
                  //     },
                  //   }}
                  // >
                  //   <p></p>
                  //   <p className="lg:!whitespace-nowrap !text-center">{i.name}</p>
                  // </Box>

                  <Stack
                    component={NavLink}
                    to={i.to}
                    direction="row"
                    sx={{
                      borderBottom: "1px solid white",
                      padding: "10px",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row" sx={{ alignItems: "center" }}>
                      {i?.logo}
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ color: "white", fontSize: "13px", fontWeight: "600" }}
                      >
                        {i.name}
                      </Typography>
                    </Stack>
                    <Box>
                      <KeyboardDoubleArrowRightIcon
                        sx={{ color: "white", fontSize: "23px", fontWeight: "600" }}
                      />
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Container >
    </Layout >
  );
}

export default MainPageOFIncome;

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
  actionContainertwo: {
    flexDirection: "column",
    borderRadius: "10px",
    width: "95%",
    margin: "auto",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
