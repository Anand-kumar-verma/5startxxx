import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Container,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery, useQueryClient } from "react-query";
import { useMediaQuery } from "react-responsive";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { starblue, starbluegrad, stargold, zubgback, zubgbackgrad, zubgmid } from "../../Shared/color";
import withdrow from "../../assets/wallet.png";
import rechargeIcon from "../../assets/wallet2.png";
import wdhistory from "../../assets/history2.png";
import deposite from "../../assets/histoty.png";
import wallet from "../../assets/wallet.png";
import Layout from "../../component/Layout/Layout";
import { MyProfileDataFn } from "../../services/apicalling";
import CloseIcon from "@mui/icons-material/Close";
import sunlotteryhomebanner from "../../assets/sunlotteryhomebanner.jpg";
import refresh from "../../assets/images/refresh.png";
import logo2 from "../../assets/images/5-Star-XXX-8-29-2024.png";
import atmbg from "../../assets/atmbg2.jpg";


function Wallet() {
  const isMediumScreen = useMediaQuery({ minWidth: 800 });
  const navigate = useNavigate();
  const [openDialogBoxHomeBanner, setopenDialogBoxHomeBanner] =
    React.useState(false);
  const { isLoading, data } = useQuery(["myprofile"], () => MyProfileDataFn(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
  const result = data?.data?.data;
  console.log(result);
  const main_wallet = {
    colors: ["#63BA0E", "red", "green"],
    series: [Number(result?.wallet || 0)?.toFixed(0) || 0],
    options: {
      chart: {
        height: 250,
        type: "radialBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: zubgmid,
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "white",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "white",
              fontSize: "15px",
              show: true,
            },
          },
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Deposit"],
    },
  };
  const third_party_wallet = {
    series: [(Number(Number(result?.winning_wallet || 0)) || 0)?.toFixed()],
    colors: ["#63BA0E", "red", "green"],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "red",
            strokeWidth: "67%",
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "white",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "white",
              fontSize: "15px",
              show: true,
            },
          },
        },
      },

      stroke: {
        lineCap: "round",
      },
      labels: ["Winning"],
    },
  };
  const client = useQueryClient()

  function refreshFunctionForRotation() {
    client.refetchQueries = ("walletamount")
    const item = document.getElementsByClassName("rotate_refresh_image")?.[0]

    const element = document.getElementById("refresh_button");
    if (!item) {
      element.classList.add("rotate_refresh_image");
    }
    setTimeout(() => {
      element.classList.remove("rotate_refresh_image")
    }, 2000);

  }
  React.useEffect(() => {
    const element = document.getElementById("refresh_button");
    const item = document.getElementsByClassName("rotate_refresh_image")?.[0]
    if (item) {
      element.classList.remove("rotate_refresh_image");
    }
  }, [])

  return (
    <Layout>
      <Container
        className="no-scrollbar"
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box sx={style.header} className={"!w-full !flex !justify-center"}>
          <Box
            component="img"
            src={logo2}
            sx={{ width: '150px' }}
          ></Box>
        </Box>

        {/*  */}
        <Box
          sx={{
            pt: 2,
            width: "100%",
            // background: zubgmid,
            width: "95%",
            marginLeft: "2.5%",
            marginTop: "20px",
            borderRadius: "10px ",
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ borderRadius: '10px', position: 'absolute', zIndex: '-1', top: 0, left: '0', width: '100%', height: '100%', backgroundImage: `url(${atmbg})`, backgroundSize: '100% 100%', opacity: '0.4' }}></Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',
                filter: 'grayscale(1)'
              }}
              className="walletBox"
            >
              <Box component="img" src={wallet} width={50} sx={{ filter: 'brightness(0.1)' }}></Box>
              <Box className="!flex justify-center gap-1 walletBox">
                <Typography variant="h2" color="initial">
                  {" "}
                  {(
                    Number(
                      Number(result?.winning_wallet || 0) +
                      Number(result?.wallet || 0)
                    ) || 0
                  )?.toFixed(0)}
                </Typography>
                <img className="rotate_refresh_image w-5 h-6 mt-5" id="refresh_button"
                  src={refresh} width={25} ml={2} onClick={() => {
                    refreshFunctionForRotation()
                  }} />
              </Box>
              <Typography variant="body1" color="initial">
                Total balance
              </Typography>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ width: '100%', padding: '0px 16px 16px' }}>
                <div class="visa_info">
                  <img style={{ width: '50px' }} src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt="" />
                </div>
                <div class="visa_logo">
                  <Box component={'img'} src={logo2} sx={{ width: '90px' }}></Box>
                </div>
              </Stack>
            </Box>
          </Box>
        </Box>
        {/*  */}

        <Box className="wallet-track-box" sx={{ background: starblue }}>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "50%" }}>
              {/* <ReactApexChart
                options={main_wallet.options}
                series={main_wallet.series}
                type="radialBar"
                height={!isMediumScreen ? 180 : 200}
              /> */}
              <Box
                sx={{
                  background: starbluegrad,
                  textAlign: "center",
                  "&>p": { color: "white", fontSize: "13px", fontWeight: 600, },
                  padding: '10px 0px', borderRadius: '10px', width: '98%',
                }}
              >
                <Typography variant="body1" color="initial">
                  ₹  {Number(result?.wallet || 0)?.toFixed(0)}.00
                </Typography>
                <Typography variant="body1" color="initial">
                  Total Deposit
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "50%" }}>
              {/* <ReactApexChart
                options={third_party_wallet.options}
                series={third_party_wallet.series}
                type="radialBar"
                height={!isMediumScreen ? 180 : 200}
              /> */}
              <Box
                sx={{
                  background: starbluegrad,
                  textAlign: "center",
                  "&>p": { color: "white", fontSize: "13px", fontWeight: 600, },
                  padding: '10px 0px', borderRadius: '10px', width: '98%', marginLeft: '2%',
                }}
              >
                <Typography variant="body1" color="initial">
                  {" "}
                  ₹ {(Number(Number(result?.winning_wallet || 0)) || 0)?.toFixed(
                    0
                  )}.00
                </Typography>
                <Typography variant="body1" color="initial">
                  Winning Amount
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Box
              sx={{
                width: "24%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                "&>a>p": {
                  fontSize: "12px",
                  color: "white",
                  textAlign: "center",
                },
                mt: "30px",
                "&>a>img": { margin: "auto" },
                mt: "30px",
              }}
            >
              <NavLink to="/wallet/Recharge">
                <Box component="img" src={rechargeIcon} width={50} sx={{ filter: 'grayscale(1)' }}></Box>
                <Typography variant="body1" color="initial" mt={1} className="!text-white">
                  Deposit
                </Typography>
              </NavLink>
            </Box>
            <Box
              sx={{
                width: "24%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                "&>a>p": {
                  fontSize: "12px",
                  color: "white",
                  textAlign: "center",
                },
                mt: "30px",
                "&>a>img": { margin: "auto" },
              }}
            >
              <NavLink to="/Withdrawal">
                <Box component="img" src={withdrow} width={50} sx={{ filter: 'grayscale(1)' }}></Box>
                <Typography variant="body1" color="initial" mt={1} className="!text-white">
                  Withdraw
                </Typography>
              </NavLink>
            </Box>
            <Box
              sx={{
                width: "24%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                "&>a>p": {
                  fontSize: "12px",
                  color: "white",
                  textAlign: "center",
                },
                mt: "30px",
                "&>a>img": { margin: "auto" },
              }}
            >
              <NavLink to="/depositHistory">
                <Box component="img" src={wdhistory} width={50} sx={{ filter: 'grayscale(1)' }}></Box>
                <Typography variant="body1" color="initial" mt={1} className="!text-white">
                  Deposit <br />
                  history
                </Typography>
              </NavLink>
            </Box>
            <Box
              sx={{
                width: "24%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                "&>a>p": {
                  fontSize: "12px",
                  color: "white",
                  textAlign: "center",
                },
                "&>a>img": { margin: "auto" },
              }}
            >
              <NavLink to="/withdravalHistory">
                <Box component="img" src={deposite} width={50} sx={{ filter: 'grayscale(1)' }}></Box>
                <Typography variant="body1" color="initial" mt={1} className="!text-white">
                  Withdrawal history
                </Typography>
              </NavLink>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "100%",
            borderRadius: "10px ",
            padding: "20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            mb: "50px",
          }}
        >
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                5 star xxx
              </Typography>
            </Box>
          </Box>
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                5 star xxx
              </Typography>
            </Box>
          </Box>
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                5 star xxx
              </Typography>
            </Box>
          </Box>
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                5 star xxx
              </Typography>
            </Box>
          </Box>
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                5 star xxx
              </Typography>
            </Box>
          </Box>
          <Box sx={style.wthui}>
            <Box>
              <Typography variant="body1" color="initial">
                0.000
              </Typography>
              <Typography variant="body1" color="initial">
                5 star xxx
              </Typography>
            </Box>
          </Box>
        </Box>
        {openDialogBoxHomeBanner && (
          <Dialog
            PaperProps={{ width: "500px", height: "500px" }}
            open={openDialogBoxHomeBanner}
          >
            <div>
              <p>
                <IconButton onClick={() => setopenDialogBoxHomeBanner(false)}>
                  <CloseIcon />
                </IconButton>
              </p>
              <p>
                <img src={sunlotteryhomebanner} />
              </p>
            </div>
          </Dialog>
        )}
        <CustomCircularProgress isLoading={isLoading} />
      </Container>
    </Layout>
  );
}

export default Wallet;

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
    width: "31%",
    minHeight: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
};
