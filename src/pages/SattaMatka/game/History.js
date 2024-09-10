import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { starbluegrad, zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import deposit from "../../../assets/history2.png";
import Layout from "../../../component/Layout/Layout";
import {
  depositHistoryFunction
} from "../../../services/apicalling";
import logo2 from "../../../assets/images/5-Star-XXX-8-29-2024.png";
import { apiConnectorGet } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";


function History() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { isLoading, data } = useQuery(
    ["my_history"],
    () => apiConnectorGet(endpoint?.node?.satta_game_myhistory),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );
  const res = data?.data?.data

  console.log(res, "THis is response");

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
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header} className={"!w-full !flex !justify-center"}>
          <Box
            component="img"
            src={logo2}
            sx={{ width: '150px' }}
          ></Box>
        </Box>

        <Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              // background: zubgmid,
              borderRadius: "10px",
              mb: 5,
              mt: 2,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
              <Box component="img" src={deposit} width={30} sx={{ filter: 'grayscale(1)' }}></Box>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
              >
                My  history
              </Typography>
            </Stack>
            {res?.map((item) => {
              return <>
                <Box
                  sx={{
                    mb: 2,
                    padding: "15px",
                    borderRadius: "10px",
                    background: zubgmid,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      paddingBottom: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      //   borderBottom: "1px solid white",
                    }}
                  >
                    <Box>
                      <Button
                        sx={{ color: "green", textTransform: "capitalize" }}

                      >
                        {item?.satta_type}
                      </Button>

                    </Box>
                    <Box>
                      <Button
                        sx={{
                          // background: zubgmid,
                          background: "white",
                          color: "green",
                          textTransform: "capitalize",
                        }}
                      > 
                      {item?.result_number}

                      </Button>
                    </Box>

                  </Stack>
                
                  <div className=" ">
                    {item?.number?.split(",")?.map((i) => {
                      return <span className="border-2 mr-1 px-1 border-white text-white">{i}</span>
                    }) || " "}
                   </div>
                  <div className=" text-white px-1">
                    {item?.amount_string?.split(",")?.map((i) => {
                      return <span className="border-2 mr-1 px-1 border-white text-white">{i}</span>
                    }) || " "}
                     </div>
                
                </Box>
              </>
            })}


            {/* {res?.map((i) => {
              return (
                <Box
                  sx={{
                    mb: 2,
                    padding: "15px",
                    borderRadius: "10px",
                    background: zubgmid,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      paddingBottom: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid white",
                    }}
                  >
                    <Box>
                      <Button
                        sx={{
                          // background: zubgmid,
                          background: "white",
                          color: i?.type === "Paying" ? "green" : "red",
                          textTransform: "capitalize",
                        }}
                      >  {i?.type === "Paying" ? "Deposit" : "Withdrawal"}

                      </Button>
                    </Box>
                    <Box>
                      <Button
                        sx={{ color: "green", textTransform: "capitalize" }}
                        className={`${i?.tr15_status === "Success"
                          ? "!text-green-500"
                          : "!text-red-500"
                          }`}
                      >
                        {i?.tr15_status}
                      </Button>
                      <IconButton>
                        <ArrowForwardIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                  </Stack>
                  .
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Balance
                    </Typography>
                    <Typography variant="body1" color="initial">
                      {i?.tr15_amt ? (
                        i?.type === "Paying" ? (
                          `${i.tr15_amt}`
                        ) : (
                          `-${i.tr15_amt}`
                        )
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Date/Time
                    </Typography>
                    <Typography variant="body1" color="initial">
                      {moment(i?.tr15_date)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.tr15_date)?.format("HH:mm:ss")}
                    </Typography>
                  </Stack>
                  {i?.success_date !== "NUll" && <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Success Date/Time
                    </Typography>
                    <Typography variant="body1" color="initial" className="!text-green-500">
                      {moment(i?.success_date)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.success_date)?.format("HH:mm:ss")}
                    </Typography>
                  </Stack>}
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Trans number
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{
                        mb: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&>p": { color: "white" },
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        {i?.tr15_trans}
                      </Typography>
                      <IconButton>
                        <ContentCopyIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              );
            })} */}
            {/* <Button sx={style.paytmbtntwo}>All history</Button> */}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default History;

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
};
