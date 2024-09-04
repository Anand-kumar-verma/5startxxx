import StartIcon from '@mui/icons-material/ArrowRightAlt';
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FitbitIcon from "@mui/icons-material/Fitbit";
import TelegramIcon from "@mui/icons-material/Telegram";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import stage from "../../assets/images/podium.png";
import axios from "axios";
import copy from "clipboard-copy";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { checkTokenValidity } from "../../Shared/CookieStorage";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { gray, starblue, starbluegrad, stardarkblue, stargold, stargrad, stargreen, zubgback, zubgbackgrad, zubgmid } from "../../Shared/color";
import one from "../../assets/banner1.png";
import two from "../../assets/banner2.png";
import three from "../../assets/images/banner (3).jpg";
import five from "../../assets/images/banner (4).jpg";
import four from "../../assets/images/banner (5).jpg";
import game from "../../rollet/assets/images/casino.png";
import satta from "../../pages/SattaMatka/assets/images/satta.jpg";
import position2 from "../../assets/images/positio2.png";
import position3 from "../../assets/images/position3.png";
import position1 from "../../assets/images/positoin1.png";
import crown2 from "../../assets/images/crown2.png";
import refresh from "../../assets/images/refresh.png";
import winp4 from "../../assets/images/winp4.jpg";
import winerbanner1 from "../../assets/images/winerbanner1.png";
import sajid from "../../assets/sajid.PNG";
import tanveer from "../../assets/tanveer.PNG";
import Layout from "../../component/Layout/Layout";
import profile1 from "../../assets/profile1.png";
import profile2 from "../../assets/profile2.png";
import profile3 from "../../assets/profile3.png";
import winning_bg from "../../assets/winning_bg-d9c728ae.png";
import crown1 from "../../assets/crown1.png";
import crown3 from "../../assets/crown3.png";
import place1 from "../../assets/place1.png";
import place2 from "../../assets/place2.png";
import place3 from "../../assets/place3.png";

import {
  please_reconnect_the_serverFun,
  waitingAviatorFun,
} from "../../redux/slices/counterSlice";
import megaphone from "../../rollet/assets/images/megaphone.png";
import taptoplay from "../../rollet/assets/images/taptoplay.png";
import {
  MyProfileDataFn,
  allWithdrawlCashUserFn,
  get_user_data_fn,
  logOutFunctoinRoulette,
  walletamount,
} from "../../services/apicalling";
import {
  download_app_url,
  endpoint,
  fron_end_main_domain,
  // telegram_url,
  telegram_url
} from "../../services/urls";
import Notification from "./Notification";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const imageSources = [
  "https://mui.com/static/images/avatar/2.jpg",
  "https://mui.com/static/images/avatar/3.jpg",
  profile3,
  "https://mui.com/static/images/avatar/4.jpg",
  profile1,
  "https://mui.com/static/images/avatar/1.jpg",
  profile2,
  "https://mui.com/static/images/avatar/5.jpg",
];

function Dashboard() {
  const dispatch = useDispatch();
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );

  const isAvailableUser = sessionStorage.getItem("isAvailableUser");
  // const aviator_data = localStorage.getItem("aviator_data");
  const value =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  //  console.log(JSON.parse(value));
  const navigate = useNavigate();
  const [poicy, setpoicy] = React.useState(false);
  const [type_of_game, settype_of_game] = React.useState("");
  const [winnner_data, setwinnerdata] = useState([]);
  const [openbannerurl, setopenbannerurl] = useState("");
  const [loding, setloding] = useState(false);
  const [lodingBanner, setlodingBanner] = useState(false);

  useEffect(() => {
    if (!checkTokenValidity()) {
      logOutFunctoinRoulette(navigate);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);
  const client = useQueryClient()

  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };

  const top11WinnerFunction = async () => {
    setloding(true);
    try {
      const response = await axios.get(`${endpoint.top11winner}`);
      setwinnerdata(response?.data?.data);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    top11WinnerFunction();
  }, []);

  const { isLoading, data } = useQuery(["walletamount"], () => walletamount(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const newdata = data?.data?.data || 0;

  const {
    isLoading: allWithdrawlCashUserFnLoding,
    data: allWithdrawlCashData,
  } = useQuery(["allWithdrawlCashUser"], () => allWithdrawlCashUserFn(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const allWithdrawl_CashData = allWithdrawlCashData?.data?.data || [];

  const { isLoading: profile_loding, data: profile } = useQuery(
    ["myprofile"],
    () => MyProfileDataFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const result = profile?.data?.data || [];

  useEffect(() => {
    openbannerFunction();
    localStorage.removeItem("amount_set");
    localStorage.removeItem("Deposit_type");
    localStorage.removeItem("server_provider");
  }, []);

  const openbannerFunction = async () => {
    setlodingBanner(true);
    try {
      const response = await axios.get(`${endpoint.openbannerUrl}`);
      setopenbannerurl(response?.data?.image);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setlodingBanner(false);
  };

  // console.log(openbannerurl);

  // useEffect(() => {
  //   console.log(result?.referral_code, "nandn");
  //   setReferral_code(
  //     CryptoJS.AES.encrypt(
  //       JSON.stringify(result?.referral_code),
  //       "anand"
  //     ).toString()
  //   );
  //   console.log(referal_code, "converted value");
  // }, [result]);

  const initialValues = {
    //  referrel_code: `https://play.ferryinfotech.in/register?ref=${referal_code}`,
    referrel_code: `${fron_end_main_domain}/register?ref=${result?.referral_code}`,
    // referrel_code: `https://play.ferryinfotech.in/register?ref=${referal_code}`,
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      console.log("This is handle submit");
    },
  });

  const handleClosepolicy = () => {
    setpoicy(false);
    sessionStorage.removeItem("isAvailableUser");
  };
  useEffect(() => {
    if (isAvailableUser) {
      setpoicy(true);
    }
  }, []);

  useEffect(() => {
    dispatch(waitingAviatorFun(true));
    dispatch(please_reconnect_the_serverFun(false));
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setdata_array([...data_array, 100]);
  //     setTimeout(() => {
  //       setdata_array(data_array.slice(0, data_array.length));
  //     }, 1000);
  //   }, 3000);
  // }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    localStorage.setItem("isPreBet", false);
    !aviator_login_data && get_user_data_fn(dispatch);
  }, []);

  const game_data = [
    {
      name: "5 Star xxx",
      // img: green_roulette,
    },
    // {
    //   name: "Aviator",
    //   img: aviator_game_image,
    // },
    // {
    //   name: "Sports",
    //   img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_20240110061915xrqy.png",
    // },
    // {
    //   name: "Slots",
    //   img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_20240110061937gbid.png",
    // },
    // {
    //   name: "Popular",
    //   img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_202401100619464x51.png",
    // },
    // {
    //   name: "Casino",
    //   img: "https://ossimg.bdgadminbdg.com/IndiaBDG/gamecategory/gamecategory_20240110061909hwqs.png",
    // },
  ];


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

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };


  return (
    <Layout>
      <Box sx={styles.root}>
        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={{ background: stardarkblue, }}
        >
          <div
            style={{
              background: stargrad, paddind: '10px 0px'
            }}
          >
            <div className="px-2 py-2 flex justify-between">
              <div
                className="flex items-center gap-2"
                style={{ color: "white" }}
              >
                <FitbitIcon />
                <span className="text-[14px]">Welcome To 5 Star xxx</span>
              </div>
              <div
                className="flex gap-1 items-center cursor-pointer"
                onClick={() => (document.location.href = `${download_app_url}`)}
              >
                <CloudDownloadIcon sx={{ color: "white" }} />
                <span className="text-[12px]" style={{ color: "white" }}>
                  Download App
                </span>
              </div>
            </div>
          </div>
          <Box className="!px-2" pt={2}>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: false,
              }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
              style={{ height: '25vh !important', borderRadius: '5px', overflow: 'hidden', marginBottom: '16px' }}>
              <SwiperSlide sx={{ height: '25vh !important', borderRadius: '5px', overflow: 'hidden', }}>
                <Box
                  component="img"
                  src={one}
                  alt="Slide 1"
                  sx={styles.swiperImage}
                />
              </SwiperSlide>
              <SwiperSlide sx={{ height: '25vh !important', borderRadius: '5px', overflow: 'hidden', }}>
                <Box
                  component="img"
                  src={five}
                  alt="Slide 1"
                  sx={styles.swiperImage}
                />
              </SwiperSlide>
              <SwiperSlide style={{ height: '25vh !important', borderRadius: '5px', overflow: 'hidden', }}>
                <Box
                  component="img"
                  src={two}
                  alt="Slide 1"
                  sx={styles.swiperImage}
                />
              </SwiperSlide>
              <SwiperSlide sx={{ height: '25vh !important', borderRadius: '5px', overflow: 'hidden', }}>
                <Box
                  component="img"
                  src={three}
                  alt="Slide 1"
                  sx={styles.swiperImage}
                />
              </SwiperSlide>


              <SwiperSlide sx={{ height: '25vh !important', borderRadius: '5px', overflow: 'hidden', }}>
                <Box
                  component="img"
                  src={four}
                  alt="Slide 1"
                  sx={styles.swiperImage}
                />
              </SwiperSlide>

              <div className="autoplay-progress" slot="container-end" style={{ opacity: 0, }}>
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </Box>
          {/* <Box className="!px-2">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper !rounded-lg "
            >
              {allWithdrawlCashUserFnLoding
                ? [1, 2]?.map((i) => {
                  return (
                    <SwiperSlide>
                      <CircularProgress className="!text-white" />
                    </SwiperSlide>
                  );
                })
                : allWithdrawl_CashData?.map((i, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="!h-20 !w-full  !flex !items-center ">
                        <div className="!w-full grid grid-cols-2 place-items-center !bg-gradient-to-l from-[#212c26] via-[#2f6a45]  to-[#06100d] !py-6">
                          <div className="flex items-center justify-between gap-1 mx-1">
                            <Avatar alt="Remy Sharp" sizes="large">
                              {i?.full_name?.substring(0, 1) || ""}
                            </Avatar>
                            <p className=" !text-white !text-sm !whitespace-nowrap">
                              {i?.full_name?.substring(0, 11) || ""}.....
                            </p>
                          </div>
                          <p className=" !text-white text-sm">
                            Withdraw {rupees}{" "}
                            <spna className={"!font-bold !text-[#FB8356]"}>
                              {Number(i?.amount || 0).toFixed(2)}
                            </spna>
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </Box> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "95%",
              marginLeft: "2.5%",
              background: starblue,
              borderRadius: "10px",
              padding: "10px 10px",
            }}
          >
            <Box sx={{ width: "20%" }}>
              <Box component="img" src={megaphone} width={30}></Box>
            </Box>
            <Box
              sx={{ width: "80%", "&>p": { fontSize: "13px", color: "white" } }}
            >
              <Typography
                variant="body1"
                color="initial"
                className="!text-[#BA903B]"
              >
                See the Installation page for additional docs about how to make
                sure everything is set up correctly.
              </Typography>
            </Box>
          </Box>

          {/* <Stack direction="row" sx={styles.depositWithdrawContainer}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className="serv-item cursor-pointer">
                <Box
                  component="img"
                  src={deposit}
                  alt="Deposit"
                  sx={styles.depositWithdrawIcon}
                  // onClick={() => navigate("/wallet/Recharge")}
                />
              </Box>
              <Typography
                variant="body1"
                color="initial"
                className="db-header"
                sx={{ xolor: "white", textAlign: "center" }}
              >
                Deposit
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
             <div className="!flex !justify-center gap-1">
             <Typography variant="body1" color="initial" className="b-val ">
                {" "}
                {Number(
                  Number(newdata?.wallet || 0) + Number(newdata?.winning || 0)
                )?.toFixed(2)}
               </Typography>
               <img className="rotate_refresh_image w-8" id="refresh_button"
                src={refresh} width={25} ml={2} onClick={() => {
                refreshFunctionForRotation()
              }} />
             </div>
              <Typography variant="body1" color="initial" className="b-valp ">
                Available Balance
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className="serv-item">
                <Box
                  // onClick={() => navigate("/Withdrawal")}
                  component="img"
                  src={cash}
                  alt="Withdraw"
                  sx={styles.depositWithdrawIcon}
                  className="!cursor-pointer"
                />
              </Box>
              <Typography variant="body1" color="initial" className="db-header">
                Withdraw
              </Typography>
            </Box>
          </Stack> */}


          <Box sx={styles.depositWithdrawContainer}>
            <div className="!flex !justify-center gap-1">
              <Typography variant="body1" color="initial" className="b-val !flex !justify-center gap-1">
                {" "}
                {Number(
                  Number(newdata?.wallet || 0) + Number(newdata?.winning || 0)
                )?.toFixed(2)} <img className="rotate_refresh_image w-8" id="refresh_button"
                  src={refresh} width={15} ml={2} onClick={() => {
                    refreshFunctionForRotation()
                  }} />
              </Typography>

            </div>
            <Typography variant="body1" color="initial" className="b-valp ">
              Available Balance
            </Typography>
          </Box>


          <Box sx={styles.referralLinkContainer}>
            <Typography variant="body1" sx={styles.referralLinkTitle}>
              Referral Link
            </Typography>
            <Stack direction="row" sx={styles.referralLinkInputContainer}>
              <TextField
                className="dbinput"
                fullWidth
                id="referrel_code"
                name="referrel_code"
                value={fk.values.referrel_code}
                // onChange={fk.handleChange}
                sx={styles.referralLinkInput}
              />
              <Button
                variant="contained"
                className="whitebtn"
                sx={styles.referralLinkButton}
                onClick={() => functionTOCopy(fk.values.referrel_code)}
              >
                Copy
              </Button>
            </Stack>
            <Stack direction="row" sx={styles.socialButtonsContainer}>
              <Button
                className="telegrambtn"
                sx={styles.telegramButton}
                onClick={() => window.open(`${telegram_url}`, "_blank")}
              >
                <Stack>
                  <Box sx={styles.socialButtonIcon}>
                    <TelegramIcon sx={styles.socialIcon} />
                  </Box>
                  <Box sx={styles.socialButtonText}>Telegram</Box>
                </Stack>
              </Button>
            </Stack>
          </Box>
          <div
            className="mt-2 w-full "
            style={{
              width: "95%",
              marginLeft: "2.5%",
              marginTop: "20px",
              mb: "20px",
            }}
          >
            <Box sx={{ ...styles.flexbetween, ...styles.gamemenubox }} className="w95">
              <Box sx={{ ...styles.gameimgbox }}>
                <Box component='img' src={game} sx={{ ...styles.gameimg }}></Box>
              </Box>
              <Box sx={{ ...styles.gamenamebox }}>
                <Box sx={{ ...styles.flexbetween }}>
                  <Typography variant="h6" sx={{ fontWeight: '700', color: 'white' }} >Jackpot</Typography>
                </Box>
                <Box sx={{ ...styles.flexbetween, my: 1, ...styles.maxwin }}>
                  <Typography variant="body2" className="kip13" sx={{ textAlign: 'center', color: 'white !important', }}>The Highest Bonus in History</Typography>
                  <Typography variant="body2" className="kip15" sx={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>98456.66</Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="primary"
                className="blinking-button"
                sx={{ ...styles.playbutton }}
                onClick={() => navigate('/rollet')}
              >
                Play Now <StartIcon ml={2} />
              </Button>
            </Box>
          </div>
          <div
            className="mt-2 w-full "
            style={{
              width: "95%",
              marginLeft: "2.5%",
              marginTop: "20px",
              mb: "20px",
              mt: '16px',
            }}
          >
            <Box sx={{ ...styles.flexbetween, ...styles.gamemenubox }} className="w95">
              <Box sx={{ ...styles.gameimgbox }}>
                <Box component='img' src={satta} sx={{ ...styles.gameimg }}></Box>
              </Box>
              <Box sx={{ ...styles.gamenamebox }}>
                <Box sx={{ ...styles.flexbetween }}>
                  <Typography variant="h6" sx={{ fontWeight: '700', color: 'white' }} > Satta Matka </Typography>
                </Box>
                <Box sx={{ ...styles.flexbetween, my: 1, ...styles.maxwin }}>
                  <Typography variant="body2" className="kip13" sx={{ textAlign: 'center', color: 'white !important', }}>The Highest Bonus in History</Typography>
                  <Typography variant="body2" className="kip15" sx={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>98456.66</Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="primary"
                className="blinking-button"
                sx={{ ...styles.playbutton }}
                onClick={() => navigate('/satta/matka')}
              >
                Play Now <StartIcon ml={2} />
              </Button>
            </Box>
          </div>
          {loding ? (
            <div className="w-[100%] flex justify-center">
              <CircularProgress className="!text-white" />
            </div>
          ) : (
            <Box sx={styles.wininfoouter}>
              <Stack direction={"row"} sx={{ alignItems: "center", mb: 2, }}>
                <Box
                  sx={{
                    background: 'white',
                    width: "4px",
                    height: "16px",
                  }}
                ></Box>
                <Typography
                  variant="body1"

                  sx={{ fontSize: "18px", fontWeight: 700, ml: 1, color: 'white' }}
                >
                  Winning information
                </Typography>
              </Stack>
              {winnner_data.slice(3, 8)?.map((i, index) => {
                return (
                  <Stack
                    key={index}
                    direction="row"
                    sx={styles.winnerslider}
                  >
                    <div style={{ position: 'relative' }}>
                      <Box
                        width={25}
                        height={25}
                        component={"img"}
                        src={crown2}
                        sx={styles.bca}
                      ></Box>
                      <Box
                        component={"img"}
                        src={imageSources[index]}
                        alt={`Profile ${index + 1} `}
                        width={45}
                        height={45}
                        sx={styles.winnerprofile}
                      ></Box>

                    </div>
                    <Typography
                      variant="body1"

                      sx={styles.winnername}
                    >
                      <p className="!flex !flex-col" style={{ color: 'white' }}>
                        {i?.email
                          ? i.email.split("@")[0].substring(0, 2) +
                          "**" +
                          (i.email.split("@")[0].length > 2
                            ? i.email.split("@")[0].substring(2, 4)
                            : "")
                          : "**"}
                      </p>
                    </Typography>
                    <Box sx={styles.winnerbannerouter}>
                      <Box
                        height={45}
                        component={"img"}
                        src={winerbanner1}
                        sx={styles.winnerbannerinner}
                      ></Box>
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"

                        sx={styles.winneramout || 0}
                      >
                        Receive ₹{Number((Number(i?.win || 0)) * 200).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body1"

                        sx={styles.winnertitle}
                      >
                        Winning amount
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Box>
          )}

          <Box sx={styles.podiumbox}>
            <Stack direction="row" sx={styles.podiumtextouterbox}>
              <Box sx={styles.winner2box}>
                <Box
                  component={"img"}
                  src={crown2}
                  sx={styles.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile1}
                  sx={styles.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place2}
                  sx={styles.winnerposition}
                ></Box>
                <Box sx={styles.winner2amt}>
                  <Typography variant="body1" >
                    {winnner_data?.[0]?.email
                      ? winnner_data?.[0]?.email?.split("@")?.[0]?.substring(0, 2) +
                      "**" +
                      (winnner_data?.[0]?.email?.split("@")?.[0]?.length > 2
                        ? winnner_data?.[0]?.email?.split("@")?.[0]?.substring(2, 4)
                        : "")
                      : "**"}
                  </Typography>
                  <Typography
                    variant="body1"

                    sx={styles.winningamount}
                  >
                    ₹ {Number(winnner_data?.[0]?.win)?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  position: "absolute",
                  zIndex: 30,
                  top: "-18%",
                  left: "33.33%",
                  height: "100%",
                }}
              >
                <Box
                  component={"img"}
                  src={crown1}
                  sx={styles.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile2}
                  sx={styles.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place1}
                  sx={styles.winnerposition}
                ></Box>
                <Box sx={styles.winner2amt}>
                  <Typography variant="body1" >
                    {winnner_data?.[2]?.email
                      ? winnner_data?.[1]?.email?.split("@")?.[0]?.substring(0, 2) +
                      "**" +
                      (winnner_data?.[1]?.email?.split("@")?.[0]?.length > 2
                        ? winnner_data?.[1]?.email?.split("@")?.[0]?.substring(2, 4)
                        : "")
                      : "**"}
                  </Typography>
                  <Typography
                    variant="body1"

                    sx={styles.winningamount}
                  >
                    ₹  {Number(winnner_data?.[1]?.win)?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  position: "absolute",
                  zIndex: 30,
                  top: 0,
                  right: 0,
                  height: "100%",
                }}
              >
                <Box
                  component={"img"}
                  src={crown3}
                  sx={styles.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile3}
                  sx={styles.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place3}
                  sx={styles.winnerposition}
                ></Box>
                <Box sx={styles.winner2amt}>
                  <Typography variant="body1" >
                    {winnner_data?.[2]?.email
                      ? winnner_data?.[2]?.email?.split("@")?.[0]?.substring(0, 2) +
                      "**" +
                      (winnner_data?.[2]?.email?.split("@")?.[0]?.length > 2
                        ? winnner_data?.[2]?.email?.split("@")?.[0]?.substring(2, 4)
                        : "")
                      : "**"}
                  </Typography>
                  <Typography
                    variant="body1"

                    sx={styles.winningamount}
                  >
                    ₹ {Number(winnner_data?.[2]?.win)?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          {loding ? (
            <div className="w-[100%] flex justify-center">
              {" "}
              <CircularProgress className="!text-white" />
            </div>
          ) : (
            <Box sx={{ ...styles.wininfoouter, mb: "40px" }}>
              {winnner_data.slice(0, 3)?.map((i, index) => {
                return (
                  <Stack
                    key={index}
                    direction="row"
                    sx={styles.winnerslider}
                  >
                    <div style={{ position: 'relative' }}>
                      <Box
                        width={25}
                        height={25}
                        component={"img"}
                        src={crown2}
                        sx={styles.bca}
                      ></Box>
                      <Box
                        component={"img"}
                        src={imageSources[index]}
                        alt={`Profile ${index + 1} `}
                        width={45}
                        height={45}
                        sx={styles.winnerprofile}
                      ></Box>

                    </div>
                    <Typography
                      variant="body1"

                      sx={styles.winnername}
                    >
                      <p className="!flex !flex-col" style={{ color: 'white' }}>
                        {i?.email
                          ? i.email.split("@")[0].substring(0, 2) +
                          "**" +
                          (i.email.split("@")[0].length > 2
                            ? i.email.split("@")[0].substring(2, 4)
                            : "")
                          : "**"}
                      </p>
                    </Typography>
                    <Box sx={styles.winnerbannerouter}>
                      <Box
                        height={45}
                        component={"img"}
                        src={winerbanner1}
                        sx={styles.winnerbannerinner}
                      ></Box>
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"

                        sx={styles.winneramout || 0}
                      >
                        Receive ₹{Number((Number(i?.win || 0)) * 200).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body1"

                        sx={styles.winnertitle}
                      >
                        Winning amount
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}

            </Box>
          )}
          {/* poicy && !lodingBanner && */}
          {false && (
            <Dialog
              open={poicy}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClosepolicy}
              aria-describedby="alert-dialog-slide-description"
              PaperProps={{ className: `!max-w-[500px] ${gray}` }}
            >
              <div
                style={{
                  background: zubgmid,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                {/* {openbannerurl === "https://admin.sunlottery.fun" ||
                  (openbannerurl === "" && (
                    <p style={{ color: "white", fontSize: "14px" }}>
                      Notification
                    </p>
                  ))}{" "} */}
                <p style={{ color: "white", fontSize: "14px" }}>Notification</p>
                <RxCross2
                  style={{ color: "white" }}
                  onClick={handleClosepolicy}
                />
              </div>
              <DialogContent style={{ background: zubgback }}>
                {/*  */}
                {/* {openbannerurl === "https://admin.sunlottery.fun" ||
                openbannerurl === "" ? (
                  <Notification handleClosepolicy={handleClosepolicy} />
                ) : (
                  <img src={openbannerurl} className="w-[100%] h-[100%]" />
                )} */}
                <Notification handleClosepolicy={handleClosepolicy} />
              </DialogContent>
            </Dialog>
          )}

          {/* {poicy && (
            <Dialog
              open={poicy}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClosepolicy}
              aria-describedby="alert-dialog-slide-description"
              PaperProps={{ className: `!max-w-[1000px] ${gray}` }}
            >
              <div
                style={{
                  background: zubgmid,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <p style={{ color: "white", fontSize: "14px" }}>Notification</p>
                <RxCross2
                  style={{ color: "white" }}
                  onClick={handleClosepolicy}
                />
              </div>
              <DialogContent style={{ background: zubgback }}>
                <Notification handleClosepolicy={handleClosepolicy} />
              </DialogContent>
            </Dialog>
          )} */}
        </Container>
      </Box>
      <CustomCircularProgress isLoading={isLoading || profile_loding} />
    </Layout>
  );
}

export default Dashboard;

const styles = {
  root: { background: stardarkblue, pb: 6 },
  dashboardTitle: {
    textAlign: "center",
    color: "white !important",
    fontSize: "21px",
    fontWeight: "500",
  },
  swiperImage: { width: "100%", height: "25vh", objectFit: "fill" },
  depositWithdrawContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 2,
    width: "95%",
    marginLeft: "2.5%",
  },
  depositWithdrawIcon: { width: "30px", height: "30px" },
  referralLinkContainer: {
    background: starblue,
    padding: "15px 15px",
    borderRadius: "5px",
    mt: 2,
    width: "95%",
    marginLeft: "2.5%",
  },
  referralLinkTitle: {
    color: stargold,
    fontSize: "14px",
    fontWeight: "500 !important",
    mb: 1,
  },
  referralLinkInputContainer: { alignItems: "center" },
  referralLinkInput: { width: "100%" },
  referralLinkButton: { marginLeft: 2 },
  socialButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 2,
  },
  telegramButton: {
    fontSize: "14px",
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
  },
  supportButton: {
    fontSize: "14px",
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
  },
  socialButtonIcon: {
    margin: "auto",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: { fontSize: "30px", "&>path": { color: "white" } },
  socialIconinfo: {
    fontSize: "27px",
    margin: "auto",
    "&>path": { color: "white !important" },
  },
  socialButtonText: {
    color: "white !important",
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "14px",
  },
  gameImage: {
    width: "90px",
    height: "80px",
    position: "absolute",
    top: "-20px",
    right: "0px",
  },
  gameTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "white !important",
    transition: "all 0.3s",
  },
  gameDescription: {
    fontSize: "15px",
    fontWeight: "400",
    color: "white !important",
    mt: 2,
    transition: "all 0.3s",
  },
  userImage: { width: "50px", height: "50px" },
  profileBox: {
    "&>.profile": { width: "80px", height: "80px", borderRadius: "50%" },
    position: "relative",
    mb: "15px",
  },
  stageBox: { width: "100%" },
  stageinner: {
    width: "32%",
    position: "absolute",
    top: "0%",
    left: "0%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stageinnerTwo: {
    width: "32%",
    position: "absolute",
    top: "-18%",
    left: "34%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stageinnerThree: {
    width: "32%",
    position: "absolute",
    top: "-4%",
    right: "0%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imgBox: {
    width: "50px",
    height: "50px",
    position: "absolute",
    top: "-23px",
    left: "-15px",
  },
  thirdimg: {
    width: "70px",
    height: "18px",
    position: "absolute",
    bottom: "0",
    left: "7px",
  },
  name: { color: "#8f5206", fontSize: "13px", fontWeight: 500 },
  rupee: {
    color: "#8f5206",
    fontSize: "13px",
    fontWeight: 500,
    background: zubgbackgrad,
    padding: "6px 5px",
    borderRadius: "20px",
  },
  wininfoouter: {
    width: "95%",
    marginLeft: "2.5%",
    padding: "10px 0px",
    mt: "20px",
    borderRadius: "10px",
    position: "relative",
  },
  wininfooutertwo: {
    alignItems: "center",
    justifyContent: "space-between",
    "&>img": {
      width: "100px",
      height: "50px",
      borderRadius: "10px",
      border: "1px solid white",
      marginRight: "10px",
    },
    "&>div>p:nth-child(1)": {
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      textAlign: "center",
    },
    "&>div>p:nth-child(2)": {
      color: "white",
      fontSize: "12px",
      fontWeight: "400",
      textAlign: "center",
    },
  },
  wininfoouterone: {
    width: "45%",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { color: "white", ml: "10px", fontSize: "13px", fontWeight: "500" },
  },
  wininfoinner: {
    alignItems: "center",
    justifyContent: "space-between",
    background: zubgback,
    padding: "10px ",
    borderRadius: "10px",
  },
  winner1: {
    position: "absolute",
    left: "42.5%",
    top: "35%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  winner2: {
    position: "absolute",
    left: "14.5%",
    top: "44%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  winner3: {
    position: "absolute",
    right: "13%",
    bottom: "25%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  flexbetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between;',
    flexWrap: 'wrap',
  },
  gameheading: { fontSize: "20px", fontWeight: 700, color: "white" },
  gamemenubox: { padding: 1, background: starbluegrad, mt: 2, mb: 2, borderRadius: '10px', width: '100%' },
  gameimgbox: { width: '35%', borderRadius: '10px', },
  gameimg: { width: '120px', maxHeight: '120px', borderRadius: '10px' },
  gamenamebox: { width: '63%', },
  playbutton: { background: stargrad, color: 'white', fontWeight: '600', fontSize: "15px", padding: '5px 30px', width: '100%', mt: 1, },
  maxwin: { background: stardarkblue, padding: '2px 5px 2px 5px', borderRadius: '5px' },
  winnerslider: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 0px 10px 5px",
    backgroundImage: `url(${winning_bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    borderRadius: "10px",
    my: 1.5,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    animation: "infinite moves",
  },
  winnerprofile: {
    borderRadius: "50%",
    objectPosition: "top",
    objectFit: "cover",
    marginTop: '-25px',
    marginLeft: '-3px',

  },
  winnername: { fontSize: "12px", fontWeight: 400, mx: 1 },
  winnerbannerouter: {
    background: stardarkblue,
    width: "23%",
    borderRadius: "10px",
    objectPosition: "center",
  },
  winnerbannerinner: {
    width: "100%",
    borderRadius: "10px",
    objectPosition: "top",
    objectFit: "cover",
  },
  winneramout: { fontSize: "12px", fontWeight: 600, marginLeft: 1, color: 'white' },
  winnertitle: { fontSize: "11px", fontWeight: 400, marginLeft: 1, color: 'white' },
  bca: {
    width: '25px',
    height: '25px',
    position: 'absolute',
    bottom: '120%',
    left: '-33%',
    transform: 'rotate(-7deg)',
  },
  podiumbox: {
    backgroundImage: `url(${stage})`,
    width: "95%",
    height: "140px",
    mt: '54px',
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    position: "relative",
    zIndex: 10,
    ml: '2.5%',
  },
  podiumtextouterbox: { width: "100%", height: "100%", position: "relative" },
  winner2box: {
    width: "30%",
    position: "absolute",
    zIndex: 30,
    top: 0,
    left: 0,
    height: "100%",
  },
  winnerposition: {
    width: "70px",
    height: "50px",
    objectFit: "contain",
    position: "absolute",
    left: "21%",
    top: "14%",
  },
  winnerprofilepod: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    left: "25%",
    top: "-11%",
  },
  winnercroun: {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    position: "absolute",
    left: "11%",
    top: "-25%",
    zIndex: 1000,
  },
  winner2amt: {
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: "22%",
    textAlign: "center",
    "&>p": { color: "white", fontWeight: 400, fontSize: "11px" },
  },
  winningamount: {
    marginTop: "5px",
    padding: "5px",
    borderRadius: "10px",
    background: stargold,
    marginLeft: '5%',
    width: '90%',
  },
};
