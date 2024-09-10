import { History, List, Wallet } from "@mui/icons-material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FitbitIcon from "@mui/icons-material/Fitbit";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { stardarkblue, stargrad } from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import one from "../../../pages/SattaMatka/assets/images/Top-Reasons-Why-Satta-Matka-is-so-Famous-1024x538-Photoroom (1).jpg";
import buildings from "../../../pages/SattaMatka/assets/images/buildings.png";
import { download_app_url, endpoint } from "../../../services/urls";
import moment from "moment";
import { useSocket } from "../../../Shared/SocketContext";
import { useQuery } from "react-query";
import { apiConnectorGet } from "../../../services/apiconnector";

function Satta() {
  const socket = useSocket();
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const navigate = useNavigate();
  const [minut, setMinut] = useState(0);
  const [one_min_time, setOne_min_time] = useState(0);

  
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const { data } = useQuery(["game"], () => apiConnectorGet(endpoint?.node?.satta_game_Lastfour), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
  const game_history= data?.data?.data|| 0

  useEffect(() => {
    const timer = setInterval(() => {
      setMinut(moment(Date.now())?.format("mm"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const handleOneMin = (onemin) => {
      setOne_min_time(onemin);
    };
    socket.on("seconds", handleOneMin);
    return () => {
      socket.off("seconds", handleOneMin);
    };
  }, []);
  return (
    <Layout>
      <Box sx={styles.root}>
        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={styles.container}
        >
          <div style={styles.banner}>
            <div className="px-2 py-2 flex justify-between">
              <div
                className="flex items-center gap-2"
                style={styles.bannerText}
              >
                <FitbitIcon />
                <span className="text-[14px]">
                  Welcome To 5 Star xxx Satta Matka
                </span>
              </div>
              <div
                className="flex gap-1 items-center cursor-pointer"
                onClick={() => (document.location.href = `${download_app_url}`)}
                style={styles.downloadSection}
              >
                <CloudDownloadIcon sx={styles.downloadIcon} />
                <span
                  className="text-[12px]"
                  style={styles.downloadText}
                ></span>
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
              style={styles.swiperContainer}
            >
              <SwiperSlide sx={styles.swiperSlide}>
                <Box
                  component="img"
                  src={one}
                  alt="Slide 1"
                  sx={styles.swiperImage}
                />
              </SwiperSlide>
              <div
                className="autoplay-progress"
                slot="container-end"
                style={styles.autoplayProgress}
              >
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </Box>

          <Box sx={{ ...styles.flexbetween, width: "95%", ml: "2.5%" }}>
            <Button
              component={NavLink}
              to="/SattaChart"
              startIcon={<List />}
              sx={styles.chartButton}
            >
              Chart
            </Button>
            <Button
              component={NavLink}
              to="/history"
              startIcon={<History />}
              sx={styles.walletButton}
            >
              My History
            </Button>
          </Box>

          <div className="!text-white !pt-5 !pl-4 !text-sm !w-full !flex !justify-between">
            <span>Time Left:</span>
            <p className="!pr-5">
              <span>
                {Number(minut) < 30
                  ? String(30 - Number(minut))?.padStart(2,'0')
                  : String(60 - Number(minut))?.padStart(2,'0')}
              </span>
              :
              <span className="!w-[20px]">
                {String(one_min_time)?.padStart(2,'0')}
              </span>
            </p>
          </div>
          <div className="mt-2 w-full" style={styles.contentContainer}>
           <Box sx={styles.contentBox}>
              <Box sx={styles.imageContainer}>
                <Box sx={styles.image} component="img" src={buildings}></Box>
              </Box>
              <Box sx={styles.textContainer}>
                <Typography
                  variant="body1"
                  sx={styles.textWhite}
                  className="fp15"
                >
                  GAZIABAD
                </Typography>
                <Typography
                  variant="body1"
                  sx={styles.textWhite}
                  className="fp13"
                >
                  Last result was : {game_history?.[0]?.gaziyabad}
                </Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Typography
                  variant="body1"
                  className="fp15"
                  sx={{ color: "green", textAlign: "center", mb: 1 }}
                >
                  Open
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={styles.playButton}
                  onClick={() => {
                    navigate("/satta/play", {
                      state: {
                        satta_type: 1,
                      },
                    });
                  }}
                >
                  Play
                </Button>
              </Box>
            </Box>

            <Box sx={styles.contentBox}>
              <Box sx={styles.imageContainer}>
                <Box sx={styles.image} component="img" src={buildings}></Box>
              </Box>
              <Box sx={styles.textContainer}>
                <Typography
                  variant="body1"
                  sx={styles.textWhite}
                  className="fp15"
                >
                  FARIDABAD
                </Typography>
                <Typography
                  variant="body1"
                  sx={styles.textWhite}
                  className="fp13"
                >
                  Last result was : {game_history?.[0]?.faridabad}
                </Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Typography
                  variant="body1"
                  className="fp15"
                  sx={{ color: "green", textAlign: "center", mb: 1 }}
                >
                  Open
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={styles.playButton}
                  onClick={() => {
                    navigate("/satta/play", {
                      state: {
                        satta_type: 2,
                      },
                    });
                  }}
                >
                  Play
                </Button>
              </Box>
            </Box>
            <Box sx={styles.contentBox}>
              <Box sx={styles.imageContainer}>
                <Box sx={styles.image} component="img" src={buildings}></Box>
              </Box>
              <Box sx={styles.textContainer}>
                <Typography
                  variant="body1"
                  sx={styles.textWhite}
                  className="fp15"
                >
                  GALI{" "}
                </Typography>
                <Typography
                  variant="body1"
                  sx={styles.textWhite}
                  className="fp13"
                >
                  Last result was :  {game_history?.[0]?.gali}
                </Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Typography
                  variant="body1"
                  className="fp15"
                  sx={{ color: "#4CBB17", textAlign: "center", mb: 1 }}
                >
                  Open
                </Typography>
                <Button
                  onClick={() => {
                    navigate("/satta/play", {
                      state: {
                        satta_type: 3,
                      },
                    });
                  }}
                  variant="text"
                  color="primary"
                  sx={styles.playButton}
                >
                  Play
                </Button>
              </Box>
            </Box>
            <Box sx={styles.contentBox}>
              <Box sx={styles.imageContainer}>
                <Box sx={styles.image} component="img" src={buildings}></Box>
              </Box>
              <Box sx={styles.textContainer}>
                <Typography
                  variant="body1"
                  sx={styles.textWhite}
                  className="fp15"
                >
                  {" "}
                  DISAWAR
                </Typography>
                <Typography
                  variant="body1"
                  sx={styles.textWhite}
                  className="fp13"
                >
                  Last result was :  {game_history?.[0]?.disawar}
                </Typography>
              </Box>
              <Box sx={styles.buttonContainer}>
                <Typography
                  variant="body1"
                  className="fp15"
                  sx={{ color: "#4CBB17", textAlign: "center", mb: 1 }}
                >
                  Open
                </Typography>
                <Button
                  onClick={() => {
                    navigate("/satta/play", {
                      state: {
                        satta_type: 4,
                      },
                    });
                  }}
                  variant="text"
                  color="primary"
                  sx={styles.playButton}
                >
                  Play
                </Button>
              </Box>
            </Box>
          </div>
        </Container>
      </Box>
    </Layout>
  );
}

export default Satta;

const styles = {
  root: { background: stardarkblue, pb: 6 },
  container: { background: stardarkblue },
  banner: { background: stargrad, padding: "10px 0px" },
  bannerText: { color: "white" },
  downloadSection: { display: "flex", gap: "1rem", alignItems: "center" },
  downloadIcon: { color: "white" },
  downloadText: { color: "white" },
  swiperContainer: {
    height: "30vh !important",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "16px",
  },
  swiperSlide: {
    height: "30vh !important",
    borderRadius: "5px",
    overflow: "hidden",
  },
  swiperImage: { width: "100%", height: "25vh", objectFit: "fill" },
  autoplayProgress: { opacity: 0 },
  flexbetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  chartButton: {
    width: "48%",
    background: "#761EBC",
    color: "white",
    textTransform: "capitalize",
    padding: "8px",
    "&:hover": { backgroundColor: "#24cc3b" },
  },
  walletButton: {
    width: "48%",
    background: "#761EBC",
    color: "white",
    textTransform: "capitalize",
    padding: "8px",
    "&:hover": { backgroundColor: "#24cc3b" },
  },
  contentContainer: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "20px",
    marginBottom: "30px",
  },
  contentBox: {
    padding: "10px",
    background: "#29023B",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  imageContainer: {
    width: "15%",
    maxHeight: "100px",
    maxWidth: "100px",
    background: "#761EBC",
    borderRadius: "50%",
    padding: "10px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    filter: "invert(1)",
    maxWidth: "50px",
  },
  textContainer: { width: "40%" },
  textWhite: { color: "white" },
  buttonContainer: { width: "38%" },
  openButton: {
    width: "100%",
    background: "#24cc3b",
    textTransform: "capitalize",
    borderRadius: "5px",
    color: "white",
    mb: 1,
    "&:hover": { backgroundColor: "#24cc3b" },
  },
  playButton: {
    width: "100%",
    background: "#4CBB17",
    textTransform: "capitalize",
    borderRadius: "5px",
    color: "white",
    padding: "8px 0px",
    "&:hover": { backgroundColor: "#4CBB17" },
  },
  upcomingButton: {
    width: "100%",
    background: stargrad,
    textTransform: "capitalize",
    borderRadius: "5px",
    color: "white",
    padding: "8px 0px",
    "&:hover": { backgroundColor: stargrad },
  },
};
