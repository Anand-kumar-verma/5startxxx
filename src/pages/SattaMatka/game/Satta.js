import { History, List } from "@mui/icons-material";
import FitbitIcon from "@mui/icons-material/Fitbit";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSocket } from "../../../Shared/SocketContext";
import { stardarkblue, stargrad } from "../../../Shared/color";
import win1 from "../../../assets/images/win3.f7c86b0db9189cc3c7a6 (1).png";
import win from "../../../assets/images/win3.f7c86b0db9189cc3c7a6.png";
import win2 from "../../../assets/images/win4.7a69afe7edb7608a715a.png";
import Layout from "../../../component/Layout/Layout";
import one from "../../../pages/SattaMatka/assets/images/Top-Reasons-Why-Satta-Matka-is-so-Famous-1024x538-Photoroom (1).jpg";
import { apiConnectorGet } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import SattaRule from "./SattaRule";

function Satta() {
  const socket = useSocket();
  const [open2, setOpen2] = useState(false);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const navigate = useNavigate();
  const [minut, setMinut] = useState(0);
  const [one_min_time, setOne_min_time] = useState(0);
  const client = useQueryClient();
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const { data } = useQuery(
    ["game"],
    () => apiConnectorGet(endpoint?.node?.satta_game_Lastfour),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  const game_history = data?.data?.data || 0;

  const { data: statta_matka_staus } = useQuery(
    ["status_of_satta_matka"],
    () => apiConnectorGet(endpoint?.node?.getStatusSattaMatka),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  const statta_matka_staus_result = statta_matka_staus?.data?.data || [];
  useEffect(() => {
    const handleOneMin = (onemin) => {
      const t = Number(String(onemin)?.split("_")?.[1]);
      const min = Number(String(onemin)?.split("_")?.[0]);
      const time_to_be_intro = t > 0 ? 60 - t : t;
      const time_to_be_intro_mid_min = min > 0 ? 60 - min : min;
      const time_to_be_intro_min =
        time_to_be_intro_mid_min > 30
          ? time_to_be_intro_mid_min - 30
          : time_to_be_intro_mid_min;
      setOne_min_time(time_to_be_intro);
      const newmin =
        time_to_be_intro_min < 0
          ? time_to_be_intro_min
          : time_to_be_intro_min - 1;
      setMinut(newmin);

      if (newmin === 29 && time_to_be_intro === 59) {
        client.refetchQueries("game");
        client.refetchQueries("my_history");
      }
    };
    socket.on("onemin", handleOneMin);
    return () => {
      socket.off("onemin", handleOneMin);
    };
  }, []);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const isClosedTime =
    (currentHour === 0 && currentMinute >= 0) ||
    currentHour < 8 ||
    (currentHour === 8 && currentMinute < 29);

  // const isClosedTime = (currentHour === 13 && currentMinute >= 0 && currentMinute <= 57);

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
                style={styles.downloadSection}
              >
                <SattaRule setOpen2={setOpen2} open2={open2} style={style} />

                <p
                  className="text-white !mx-2"
                  onClick={() => {
                    setOpen2(true);
                  }}
                >
                  {" "}
                  Rule
                </p>
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
              <span>{String(minut)?.padStart(2, "0")} </span>:{" "}
              <span className="!w-[20px]">
                {String(one_min_time)?.padStart(2, "0")}
              </span>
            </p>
          </div>

          <div className="mt-2   w-full" style={styles.contentContainer}>
            <Box sx={styles.winbox}>
              <Box
                component="img"
                src={win}
                sx={{ width: "100%", height: "70%" }}
              ></Box>
              <Box sx={styles.positiongame}>
                <Box sx={{ mt: "15px" }}>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-xl !font-bold"
                  >
                    GHAZIABAD
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={styles.gameheading}
                    className="!mt-1 lg:!text-lg !text-[10px]"
                  // className="!mt-1"
                  >
                    Last result as :{" "}
                    <span className="!font-bold  !text-4xl !ml-2 px-2 rounded-full !bg-[#fbab0b] !text-white ">
                      {" "}
                      {String(game_history?.[0]?.gaziyabad || 0).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  right: {
                    xs: "15px",
                    md: "45px",
                  },
                  top: "22px",
                }}
              >
                <Box>
                  {(!statta_matka_staus_result?.find(i => i?.title === "satta_gajiyabad")?.status || isClosedTime) ? (
                    <Box>
                      {/* Game is Closed */}
                      {isClosedTime && (
                        <Box>
                          <Typography
                            className="bg-red-700 p-1 rounded-xl text-white"
                            sx={{ textAlign: "center" }}
                          >
                            Closed
                          </Typography>
                          <div className="flex flex-col justify-center items-center text-white my-2" sx={{ textAlign: "center" }}>
                            <p className="!text-[10px]">Open Timing</p>
                            <p className="!text-[10px]">8:30 AM to 11:59 PM</p>
                          </div>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    minut < 5 ? (
                      <Box>
                        {/* Upcoming Result */}
                        <Typography sx={{ color: "red", textAlign: "center" }}>
                          Closed
                        </Typography>
                        <Button variant="text" sx={styles.upcomingButton}>
                          Upcoming Result
                        </Button>
                        <Typography sx={{ color: "white", textAlign: "center" }}>
                          <span> Time Left: </span>
                          <span>{String(minut).padStart(2, "0")}</span>:
                          <span>{String(one_min_time).padStart(2, "0")}</span>
                        </Typography>
                      </Box>
                    ) : (
                      <Box className="!font-bold !text-white" onClick={() => navigate("/satta/play", { state: { satta_type: 1 } })}>
                        <Typography variant="body1" sx={{ color: "white", textAlign: "center", mb: 1 }}>
                          Open
                        </Typography>
                        <Button variant="text" color="primary" sx={styles.playButton}>
                          Play
                        </Button>
                      </Box>
                    )
                  )}
                </Box>
              </Box>

              <div className="pt-2 px-[10%] !w-full !flex justify-between !font-bold">
                <p>
                  ANDAR
                  <span className="!rounded-full !bg-gray-600 !bg-opacity-30 px-4 ml-2">
                    {String(game_history?.[0]?.gaziyabad || 0).padStart(
                      2,
                      "0"
                    )?.[0] + "*"}
                  </span>
                </p>
                <p>
                  BAHAR
                  <span className="!rounded-full !bg-gray-600 !bg-opacity-30 px-4 ml-2">
                    {"*" +
                      String(game_history?.[0]?.gaziyabad || 0).padStart(
                        2,
                        "0"
                      )?.[1]}
                  </span>
                </p>
              </div>
            </Box>
            <Box sx={styles.winbox}>
              <Box
                component="img"
                src={win2}
                sx={{ width: "100%", height: "70%" }}
              ></Box>
              <Box sx={styles.positiongame}>
                <Box sx={{ mt: "15px" }}>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-xl !font-bold"
                  >
                    FARIDABAD
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={styles.gameheading}
                    // className="!mt-1"
                    className="!mt-1 lg:!text-lg !text-[10px]"
                  >
                    Last result as :{" "}
                    <span className="!font-bold  !text-4xl !ml-2 px-2 rounded-full !bg-green-500 !text-white ">
                      {" "}
                      {String(game_history?.[0]?.faridabad || 0).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  right: {
                    xs: "15px",
                    md: "45px",
                  },
                  top: "22px",
                }}
              >
                <Box>
                  {(!statta_matka_staus_result?.find(
                    (i) => i?.title === "satta_faridabad"
                  )?.status ||
                    isClosedTime)? (
                    <Box>
                    
                      {isClosedTime && (
                        <Box>
                          <Typography
                            className="bg-red-700 p-1 rounded-xl text-white"
                            sx={{ textAlign: "center" }}
                          >
                            Closed
                          </Typography>
                          <div
                            className="flex flex-col justify-center items-center text-white my-2"
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            <p className="!text-[10px]">Open Timing</p>
                            <p className="!text-[10px]">8:30 AM to 11:59 PM</p>
                          </div>
                        </Box>
                      )}
                    </Box>
                  ) : (
                  minut < 5 ? (
                    <Box>
                      <Typography
                        sx={{ color: "red", textAlign: "center" }}
                      >
                        Closed
                      </Typography>
                      <Button variant="text" sx={styles.upcomingButton}>
                        Upcoming Result
                      </Button>
                      <Typography
                        sx={{ color: "white", textAlign: "center" }}
                      >
                        <span> Time Left: </span>
                        <span>{String(minut)?.padStart(2, "0")}</span>:
                        <span>
                          {String(one_min_time)?.padStart(2, "0")}
                        </span>
                      </Typography>
                    </Box>
                    ): (
                    <Box
                      className="!font-bold !text-white"
                      onClick={() => {
                        navigate("/satta/play", {
                          state: {
                            satta_type: 2,
                          },
                        });
                      }}
                    >
                      <Typography
                        variant="body1"
                        // className="fp15"
                        sx={{ color: "white", textAlign: "center", mb: 1 }}
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
                    )
                  )}
                </Box>
              </Box>
              <div className="pt-2 px-[10%] !w-full !flex justify-between !font-bold">
                <p>
                  ANDAR
                  <span className="!rounded-full !bg-gray-600 !bg-opacity-30 px-4 ml-2">
                    {String(game_history?.[0]?.faridabad || 0).padStart(
                      2,
                      "0"
                    )?.[0] + "*"}
                  </span>
                </p>
                <p>
                  BAHAR
                  <span className="!rounded-full !bg-gray-600 !bg-opacity-30 px-4 ml-2">
                    {"*" +
                      String(game_history?.[0]?.faridabad || 0).padStart(
                        2,
                        "0"
                      )?.[1]}
                  </span>
                </p>
              </div>
            </Box>
            <Box sx={styles.winbox}>
              <Box
                component="img"
                src={win1}
                sx={{ width: "100%", height: "70%" }}
              ></Box>
              <Box sx={styles.positiongame}>
                <Box sx={{ mt: "15px" }}>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-xl !font-bold"
                  >
                    GALI
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={styles.gameheading}
                    // className="!mt-1"
                    className="!mt-1 lg:!text-lg !text-[10px]"
                  >
                    Last result as :{" "}
                    <span className="!font-bold  !text-4xl !ml-2 px-2 rounded-full !bg-[#FF0000] !text-white ">
                      {String(game_history?.[0]?.gali || 0).padStart(2, "0")}
                    </span>
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  right: {
                    xs: "15px",
                    md: "45px",
                  },
                  top: "22px",
                }}
              >
                <Box>
                  {(!statta_matka_staus_result?.find(
                    (i) => i?.title === "satta_gali"
                  )?.status ||
                    isClosedTime) ? (
                    <Box>
                     
                      {isClosedTime && (
                        <Box>
                          <Typography
                            className="bg-red-700 p-1 rounded-xl text-white"
                            sx={{ textAlign: "center" }}
                          >
                            Closed
                          </Typography>
                          <div
                            className="flex flex-col justify-center items-center text-white my-2"
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            <p className="!text-[10px]">Open Timing</p>
                            <p className="!text-[10px]">8:30 AM to 11:59 PM</p>
                          </div>
                        </Box>
                      )}
                    </Box>
                  ) : (
                     minut < 5 ? (
                    <Box>
                      <Typography
                        sx={{ color: "red", textAlign: "center" }}
                      >
                        Closed
                      </Typography>
                      <Button variant="text" sx={styles.upcomingButton}>
                        Upcoming Result
                      </Button>
                      <Typography
                        sx={{ color: "white", textAlign: "center" }}
                      >
                        <span> Time Left: </span>
                        <span>{String(minut)?.padStart(2, "0")}</span>:
                        <span>
                          {String(one_min_time)?.padStart(2, "0")}
                        </span>
                      </Typography>
                    </Box>
                  ):(
                    <Box
                      className="!font-bold !text-white"
                      onClick={() => {
                        navigate("/satta/play", {
                          state: {
                            satta_type: 3,
                          },
                        });
                      }}
                    >
                      <Typography
                        variant="body1"
                        // className="fp15"
                        sx={{ color: "white", textAlign: "center", mb: 1 }}
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
                              satta_type: 3,
                            },
                          });
                        }}
                      >
                        Play
                      </Button>
                    </Box>
                  )
                  )}
                </Box>
              </Box>
              <div className="pt-2 px-[10%] !w-full !flex justify-between !font-bold">
                <p>
                  ANDAR
                  <span className="!rounded-full !bg-gray-600 !bg-opacity-30 px-4 ml-2">
                    {String(game_history?.[0]?.gali || 0).padStart(
                      2,
                      "0"
                    )?.[0] + "*"}
                  </span>
                </p>
                <p>
                  BAHAR
                  <span className="!rounded-full !bg-gray-600 !bg-opacity-30 px-4 ml-2">
                    {"*" +
                      String(game_history?.[0]?.gali || 0).padStart(
                        2,
                        "0"
                      )?.[1]}
                  </span>
                </p>
              </div>
            </Box>
            <Box sx={styles.winbox}>
              <Box
                component="img"
                src={win}
                sx={{ width: "100%", height: "70%" }}
              ></Box>
              <Box sx={styles.positiongame}>
                <Box sx={{ mt: "15px" }}>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-xl !font-bold"
                  >
                    DESAWAR
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={styles.gameheading}
                    className="!mt-1 lg:!text-lg !text-[10px]"
                  >
                    Last result as :{" "}
                    <span className="!font-bold !text-4xl !ml-2 px-2 rounded-full !bg-[#761ebc] !text-white ">
                      {String(game_history?.[0]?.disawar || 0).padStart(2, "0")}
                    </span>
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  right: {
                    xs: "15px",
                    md: "45px",
                  },
                  top: "22px",
                }}
              >
                <Box>
                  {(!statta_matka_staus_result?.find(
                    (i) => i?.title === "satta_disawar"
                  )?.status ||
                    isClosedTime) ? (
                    <Box>
                    
                      {isClosedTime && (
                        <Box>
                          <Typography
                            className="bg-red-700 p-1 rounded-xl text-white"
                            sx={{ textAlign: "center" }}
                          >
                            Closed
                          </Typography>
                          <div
                            className="flex flex-col justify-center items-center text-white my-2"
                            sx={{ color: "white", textAlign: "center" }}
                          >
                            <p className="!text-[10px]">Open Timing</p>
                            <p className="!text-[10px]">8:30 AM to 11:59 PM</p>
                          </div>
                        </Box>
                      )}
                    </Box>
                  ) :  (
                   minut < 5 ? (
                    <Box>
                      <Typography
                        sx={{ color: "red", textAlign: "center" }}
                      >
                        Closed
                      </Typography>
                      <Button variant="text" sx={styles.upcomingButton}>
                        Upcoming Result
                      </Button>
                      <Typography
                        sx={{ color: "white", textAlign: "center" }}
                      >
                        <span> Time Left: </span>
                        <span>{String(minut)?.padStart(2, "0")}</span>:
                        <span>
                          {String(one_min_time)?.padStart(2, "0")}
                        </span>
                      </Typography>
                    </Box>
                    ): (
                    <Box
                      className="!font-bold !text-white"
                      onClick={() => {
                        navigate("/satta/play", {
                          state: {
                            satta_type: 4,
                          },
                        });
                      }}
                    >
                      <Typography
                        variant="body1"
                        // className="fp15"
                        sx={{ color: "white", textAlign: "center", mb: 1 }}
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
                              satta_type: 4,
                            },
                          });
                        }}
                      >
                        Play
                      </Button>
                    </Box>
                    )
                  )}
                </Box>
              </Box>
              <div className="pt-2 px-[10%] !w-full !flex justify-between !font-bold">
                <p>
                  ANDAR
                  <span className="!rounded-full !bg-gray-600 !bg-opacity-30 px-4 ml-2">
                    {String(game_history?.[0]?.disawar || 0).padStart(
                      2,
                      "0"
                    )?.[0] + "*"}
                  </span>
                </p>
                <p>
                  BAHAR
                  <span className="!rounded-full !bg-gray-600 !bg-opacity-30 px-4 ml-2">
                    {"*" +
                      String(game_history?.[0]?.disawar || 0).padStart(
                        2,
                        "0"
                      )?.[1]}
                  </span>
                </p>
              </div>
            </Box>
          </div>
        </Container>
      </Box>
    </Layout>
  );
}

export default Satta;
const style = {
  root: { background: stardarkblue, pb: 6 },
  container: { background: stardarkblue },
  banner: { background: stargrad, padding: "10px 0px" },
  bannerText: { color: "white" },
  flexbetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // flexWrap: "wrap",
  },
};

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
    textAlign: "center",
    // width: "12%",
    maxHeight: "100px",
    maxWidth: "100px",
    background: "#761EBC",
    borderRadius: "50%",
    padding: "8px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    filter: "invert(1)",
    maxWidth: "50px",
  },
  // textContainer: { width: "40%" },
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
  winbox: {
    background: "#e9e9e9",
    borderRadius: "20px",
    height: "160px",
    marginBottom: "30px",
    position: "relative",
    boxShadow: "0 0.05333rem 0.10667rem #c5c5da42",
  },
  positiongame: {
    position: "absolute",
    top: "10px",
    left: "20px",
    "&>div>p": { fontSize: "18px", fontWeight: 400, color: "white" },
  },
  gameheading: { fontSize: "22px", fontWeight: 700, color: "white" },
};
