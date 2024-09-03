import {
  Box,
  Container,
  Stack,
  Typography
} from "@mui/material";
import CryptoJS from 'crypto-js';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { starblue, stardarkblue } from "../../../Shared/color";
import logo from "../../../assets/images/logo.png";
import LoginWithEmail from "./LoginWithEmail";
import LoginWithMobile from "./LoginWithMobile";
import output from "../../../assets/images/21782191820.jpg";




function Login() {
  const navigate = useNavigate()
  const [Nav, setNav] = useState(1);

  const dispatch = useDispatch()
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );


 

  // useEffect(() => {
  //   !aviator_login_data && get_user_data_fn(dispatch);
  // }, []);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  // useEffect(() => {
  //   (logindata) && navigate('/dashboard')
  // }, [])

  return (
    <Container
      sx={{
        height: '100%',

        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 'auto',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${output})`,
            backgroundSize: '100% 100%',
            opacity: 0.5,
            zIndex: -1,
          }}
        />


        <Box sx={{}}>
          <Box
            sx={{
              width: "95%",
              marginLeft: "2.5%",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ width: "100%", pt: "3vh" }}>
              <Box
                component="img"
                src={logo}
                sx={{ width: "130px", margin: "auto" }}
              ></Box>
            </Box>
            <Box >
              {/* <Swiper
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
              style={{ height: '25vh !important', borderRadius: '5px', overflow: 'hidden', marginTop: '30px ', marginBottom: '30px' }}>
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
                  src={one}
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
            </Swiper> */}
            </Box>
            <Box
              sx={{
                mt: "10vh",

                borderRadius: "10px",
                padding: "0px 10px 20px 10px",
                "& > p:nth-child(1)": {
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "white",
                },
                "& > p:nth-child(2)": {
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "white",
                },
                // WebkitBackdropFilter: "blur(6px)",
                backdropFilter: "blur(3px)",
                border: "1px solid #7330fa75",
                background: '#0000006e !important',
              }}

            >
              <Box>
                <Stack direction="row">
                  <Box
                    component={NavLink}
                    onClick={() => setNav(1)}
                    className={Nav === 1 ? "activeNav nav" : "nav"}
                  >
                    <Typography variant="h3">LOGIN WITH PHONE</Typography>
                  </Box>
                  <Box
                    component={NavLink}
                    onClick={() => setNav(2)}
                    className={Nav === 2 ? "activeNav nav" : " nav"}
                  >
                    <Typography variant="h3">LOGIN WITH EMAIL</Typography>
                  </Box>
                </Stack>
              </Box>
              {Nav === 1 ? <LoginWithMobile /> : <LoginWithEmail />}
            </Box>
            <Box sx={{ py: 3 }}></Box>
          </Box>

        </Box>

      </Box>

    </Container >
  );
}

export default Login;









const styles = {

  swiperImage: { width: "100%", height: '25vh !important', borderRadius: '10px', overflow: 'hidden', objectFit: "fill" },

};
