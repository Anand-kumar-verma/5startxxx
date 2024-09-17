import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { starblue, starbluegrad, stargold, stargrad, zubgback, zubgbackgrad, zubgmid } from "../../Shared/color";
import cip from "../../assets/cip.png";
import dp1 from "../../assets/dp1.png";
import dp2 from "../../assets/dp2.png";
import dp3 from "../../assets/dp3.png";
import dp4 from "../../assets/dp4.png";
import card from "../../assets/images/card-payment.png";

import casino from "../../assets/images/casino.png";
import customer from "../../assets/images/customer-service.png";


import gift from "../../assets/images/gift-box.png";
import atmbg from "../../assets/atmbg.jpeg";
import hand from "../../assets/images/hand.png";
import notification from "../../assets/images/notification.png";
import user2 from "../../assets/images/password (1).png";
import Rank from "../../assets/images/rank.png";
import balance from "../../assets/images/send.png";
import setting from "../../assets/images/settings (1).png";
import trans from "../../assets/images/translation.png";
import s from "../../assets/wallet.png";
import dpt from "../../assets/wallet2.png";
import wtd from "../../assets/history2.png";
import edit from "../../assets/histoty.png";
import sunlotteryhomebanner from "../../assets/sunlotteryhomebanner.jpg";
import Layout from "../../component/Layout/Layout";
import refresh from "../../assets/images/refresh.png";
import logo2 from "../../assets/images/5-Star-XXX-8-29-2024.png";
import {
  MyProfileDataFn,
  logOutFunctoinRoulette,
} from "../../services/apicalling";
import axios from "axios";
import { endpoint, fron_end_main_domain } from "../../services/urls";
import Image from "./Image";
import { BorderColor } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";
import { apiConnectorGet } from "../../services/apiconnector";
function Account() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams?.get("order_id");
  const client = useQueryClient();
  const navigate = useNavigate();
  const profile_data = localStorage.getItem("profile_data");
  const [openDialogBoxHomeBanner, setopenDialogBoxHomeBanner] = useState(false);
  const [imageNumber, setImageNumber] = useState(profile_data || "1");
  const { isLoading, data } = useQuery(["myprofile"], () => MyProfileDataFn(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
  const result = data?.data?.data;

  const imge_array = [
    { id: 1, img: dp1 },
    { id: 2, img: dp2 },
    { id: 3, img: dp3 },
    { id: 4, img: dp4 },
  ];

  async function sendUrlCallBackToBackend(transactionId) {
    try {
      const res = await axios.get(
        `${endpoint?.callback_response}?order_id=${transactionId}`
      );
      if (res?.data?.status === "200") {
        client.removeQueries("myprofile");
        window.location.href = `${fron_end_main_domain}/account`;
      }
    } catch (e) {
      console.log(e);
    }
    client.removeQueries("myprofile");
  }

  const {data:wallet } = useQuery(
    ["walletamount"],
    () => apiConnectorGet(endpoint.node.get_wallet),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus:false
    }
  );

  const newdata = wallet?.data?.data || 0;
  const images = [
    "https://mui.com/static/images/avatar/2.jpg",
    "https://mui.com/static/images/avatar/3.jpg",
    "https://mui.com/static/images/avatar/4.jpg",
    "https://mui.com/static/images/avatar/1.jpg",
    "https://mui.com/static/images/avatar/5.jpg"
  ];

  useEffect(() => {
    if (transactionId) {
      sendUrlCallBackToBackend(transactionId);
    }
  }, []);

  const [selectedImages, setselectedImages] = useState("");
  const [opend, setOpend] = useState(false);
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
  useEffect(() => {
    const element = document.getElementById("refresh_button");
    const item = document.getElementsByClassName("rotate_refresh_image")?.[0]
    if (item) {
      element.classList.remove("rotate_refresh_image");
    }
  }, [])

  return (
    <Layout>
      <Container sx={style.container}>
        <Box sx={style.header1} className={"!w-full !flex !justify-center"}>
          <Box
            component="img"
            src={logo2}
            sx={{ width: '150px' }}
          ></Box>
        </Box>
        <Stack direction="row" sx={style.header}>
          <Box sx={style.profileBox} onClick={() => setOpend(true)}>
            <img src={selectedImages[0] || imge_array[Number(Number(imageNumber) - 1 || 0)]?.img} alt="" className='!rounded-full  w-[72px] h-[72px]' />
            <BorderColor fontSize="small" className="!text-white !-mt-10 !ml-10 !rounded-full !bg-gray-400  " />

          </Box>
          <Image
            setOpend={setOpend}
            setselectedImages={setselectedImages}
            open={opend}
            onClose={() => setOpend(false)}
            images={images} />
          <Box sx={style.userInfo}>
            <Typography variant="" color="initial">
              {result?.full_name}
            </Typography>
            <Typography variant="body1" color="initial">
              UID | {result?.username || 0}
            </Typography>
          </Box>
          <Box sx={style.rankImage}>
            <Box component="img" src={Rank} sx={style.rankImage} />
          </Box>
        </Stack>
        <Box sx={style.balanceContainer}>
          <Box sx={{ borderRadius: '10px', position: 'absolute', zIndex: '-1', top: 0, left: '0', width: '100%', height: '100%', backgroundImage: `url(${atmbg})`, backgroundSize: '100% 100%', opacity: '0.5' }}></Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Box component="img" src={balance} sx={style.cardImage} />
            <Typography variant="body1" color="initial" sx={style.balanceText}>
              Total Balance
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center", mt: "10px" }}>
            <Typography variant="body1" color="initial" sx={style.totalBalance}>
              {(
                Number(
                  Number(newdata?.winning_wallet || 0) +
                  Number(newdata?.wallet || 0)
                ) || 0
              )?.toFixed(0)}
            </Typography>
            <img className="rotate_refresh_image w-8" id="refresh_button"
              src={refresh} width={25} ml={2} onClick={() => {
                refreshFunctionForRotation()
              }} />
            {/* <CachedIcon
              onClick={() => client.refetchQueries("myprofile")}
              sx={style.cachedIcon}
            /> */}
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mt: "20px",
            }}
          >
            <Box component="img" src={cip} sx={style.cardImage} />
            <Typography variant="body1" color="initial" sx={style.cardNumber}>
              Rererral Code: {result?.referral_code}
            </Typography>
          </Stack>
        </Box>

        <Box sx={style.actionContainer}>
          <Box sx={style.actionBox} component={NavLink} to="/wallet">

            <Box component="img" src={s} sx={style.actionImage} />
            <Typography variant="body1" color="initial" sx={style.actionText}>
              Wallet
            </Typography>
          </Box>
          <Box sx={style.actionBox} component={NavLink} to="/wallet/Recharge">

            <Box component="img" src={dpt} sx={style.actionImage} />
            <Typography variant="body1" color="initial" sx={style.actionText}>
              Deposit
            </Typography>
          </Box>
          <Box sx={style.actionBox} component={NavLink} to="/Withdrawal">

            <Box component="img" src={wtd} sx={style.actionImage} />
            <Typography variant="body1" color="initial" sx={style.actionText}>
              Withdraw
            </Typography>
          </Box>
          <Box sx={style.actionBox} component={NavLink} to="/add-bank-details">

            <Box component="img" src={edit} sx={style.actionImage} />
            <Typography variant="body1" color="initial" sx={style.actionText}>
              Add Bank
            </Typography>
          </Box>
        </Box>
        {/* <Box sx={style.actionContainer} component={NavLink} to={"/bathistory"}>
          <Box
            sx={{
              width: "49%",
              background: zubgbackgrad,
              padding: "10px",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Box
                component="img"
                src={casino}
                sx={{ width: "40px", height: "40px", marginRight: "20px" }}
              ></Box>
              <Box
                sx={{
                  "&>:nth-child(1)": {
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "white",
                  },
                  "&>:nth-child(2)": {
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "white",
                  },
                }}
              >
                <p className="!text-sm">Bet</p>
                <p className="!text-[10px]">My betting history</p>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              width: "49%",
              background: zubgbackgrad,
              padding: "10px",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Box
                component="img"
                src={card}
                sx={{ width: "40px", height: "40px", marginRight: "20px" }}
              ></Box>
              <Box
                sx={{
                  "&>:nth-child(1)": {
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "white",
                  },
                  "&>:nth-child(2)": {
                    fontSize: "10px",
                    fontWeight: "500",
                    color: "white",
                  },
                }}
              >
                <p className="!text-sm">Transaction</p>
                <p className="!text-[10px]">My Transaction history</p>
              </Box>
            </Stack>
          </Box>
        </Box> */}
        <Box sx={style.actionContainertwo}>
          <Stack
            sx={{

              background: zubgmid,
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <Stack
              component={NavLink}
              to="/notification"
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
                <Box
                  component="img"
                  src={notification}
                  sx={{ width: "20px", height: "20px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "white", fontSize: "13px", fontWeight: "600" }}
                >
                  Notification
                </Typography>
              </Stack>
              <Box>
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "white", fontSize: "23px", fontWeight: "600" }}
                />
              </Box>
            </Stack>


            <Stack
              component={NavLink}
              to="/Language"
              direction="row"
              sx={{
                borderBottom: "1px solid white",
                padding: " 10px 10px 10px 5px",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box
                  component="img"
                  src={trans}
                  sx={{ width: "25px", height: "25px", marginRight: "10px" }}
                ></Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "white", fontSize: "13px", fontWeight: "600" }}
                >
                  Language
                </Typography>
              </Stack>
              <Box>
                <Typography
                  sx={{ color: "white", fontSize: "13px", fontWeight: "500" }}
                >
                  English
                </Typography>
              </Box>
            </Stack>
          </Stack>
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
            Service center
          </Typography>

          <div className="!w-full !grid !grid-cols-3 !place-items-center">
            {[
              {
                to: "/account/income-main",
                name: "Reward",
                logo: balance,
              },
              { to: "/SettingCenter", name: "Setting", logo: setting },
              {
                to: "/gameNotification",
                name: "Notification",
                logo: notification,
              },
              {
                to: "/SettingCenter/LoginPassword",
                name: "Change Password",
                logo: user2,
              },
              {
                to: "/promotion/customerLine/",
                name: "Customer service",
                logo: customer,
              },
              { to: "/feedback", name: "Feedback", logo: hand },
            ]?.map((i) => {
              return (
                <Box
                  component={NavLink}
                  to={i.to}
                  sx={{
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "10px",
                    "&>p": {
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "500",
                      mt: "5px",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={i.logo}
                    sx={{ width: "30px", height: "30px" }}
                  ></Box>
                  <Typography>{i.name}</Typography>
                </Box>
              );
            })}
          </div>
        </Box>
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
            background: stargrad,
            padding: "8px",
            mt: "20px",
          }}
        >
          <Button
            sx={{
              // background: zubgbackgrad,
              width: "100%",
              color: "white",
              // padding: "10px",
              borderRadius: "10px",
              textTransform: 'capitalize',
            }}
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </Button>
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

export default Account;

const style = {
  container: { background: zubgback, mb: "84px" },
  header: {
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: "20px",
  },
  header1: {
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
  profileBox: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  profileImage: { width: "100%", height: "100%" },
  userInfo: {
    "& > :nth-child(1)": {
      fontSize: "18px",
      fontWeight: "600",
      color: "white",
    },
    "& > :nth-child(2)": {
      fontSize: "14px",
      fontWeight: "400",
      color: "white",
    },
  },
  rankImage: { width: "100px", height: "100px" },
  balanceContainer: {
    // background: zubgmid,
    borderRadius: "10px",
    padding: "20px",
    width: "95%",
    margin: "auto",
    position: 'relative',
    marginTop: "2px",
    zIndex: 1,
  },
  balanceText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
    marginLeft: "10px",
  },
  totalBalance: {
    fontSize: "30px",
    fontWeight: "600",
    color: "white",
    marginRight: "10px",
  },
  cachedIcon: { color: "white" },
  cardImage: { width: "50px" },
  cardNumber: { fontSize: "14px", color: "white", marginLeft: "10px" },
  actionContainer: {
    background: zubgmid,
    borderRadius: "10px",
    padding: "10px",
    width: "95%",
    margin: "auto",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBox: { width: "20%" },
  actionImage: { width: "30px", height: "30px", margin: "auto", filter: 'grayscale(1)' },
  actionText: {
    color: "white",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "500",
    mt: '5px',
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
