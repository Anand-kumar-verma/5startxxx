import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import output from "../../../assets/images/reg.jpg";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { storeCookies } from "../../../Shared/CookieStorage";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { signupSchemaValidataon } from "../../../Shared/Validation";
import { stargreen, zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import logo from "../../../assets/images/logo.png";
import { CandidateNameFn } from "../../../services/apicalling";
import { endpoint } from "../../../services/urls";


function Register() {
  const url = new URL(window.location.href);
  const [refParam, setrefParam] = useState(url.searchParams.get("ref") || "");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [show_confirm_password, set_show_confirm_password] =
    React.useState(false);
  const [loding, setloding] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handle_confirm_ClickShowPassword = () =>
    set_show_confirm_password(!show_confirm_password);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   const value =
  //     url.searchParams.get("ref") &&
  //     crypto.AES.decrypt(
  //       url.searchParams.get("ref")?.split(" ")?.join("+"),
  //       "anand"
  //     )?.toString(crypto.enc.Utf8);
  //   setrefParam(value);
  // }, [url.searchParams.get("ref")]);

  const initialValue = {
    email: "",
    mobile: "",
    name: "",
    password: "",
    confirmed_password: "",
    // referral_code: refParam?.substring(1, refParam.length - 1) || "",
    referral_code: refParam,
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    validationSchema: signupSchemaValidataon,
    onSubmit: () => {
      if (fk.values.password !== fk.values.confirmed_password)
        return toast("Password and confirm password should be same.");
      if (!fk.values.privacy_policy)
        return toast("Please confirm the privacy policy.");
      const reqbody = {
        email: fk.values.email,
        mobile: String(fk.values.mobile) || "",
        password: fk.values.password,
        confirmed_password: fk.values.confirmed_password,
        referral_code: fk.values.referral_code,
        name: fk.values.name,
        privacy_policy: false,
      };

      signupFunction(reqbody);
    },
  });

  const signupFunction = async (reqbody) => {
    setloding(true);
    const fd = new FormData();
    fd.append("email", reqbody.email);
    fd.append("mobile", reqbody.mobile);
    fd.append("name", reqbody.name);
    fd.append("password", reqbody.password);
    fd.append("confirmed_password", reqbody.confirmed_password);
    fd.append("referral_code", reqbody.referral_code);

    try {
      const response = await axios.post(endpoint.signup, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          // Add any other headers you may need, such as authorization
        },
      });
      console.log(response);
      if (response?.data?.status === "200") {
        const value = CryptoJS.AES.encrypt(
          JSON.stringify(response?.data),
          "anand"
        )?.toString();
        localStorage.setItem("logindataen", value);
        sessionStorage.setItem("isAvailableUser", true);
        sessionStorage.setItem("isAvailableCricketUser", true);
        navigate("/dashboard");
        storeCookies();
        document.location.reload();
      }

      toast.success(response?.data?.msg);
      // if (response?.data?.status === "200") {
      //   navigate("/dashboard");
      // }
    } catch (e) {
      toast.error(e?.message);
      console.error(e);
    }
    setloding(false);
  };

  const { isLoading, data } = useQuery(
    ["getname", fk.values.referral_code],
    () => CandidateNameFn({ reffral_id: fk.values.referral_code }),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const result = data?.data?.data;
  return (
    <Container
      sx={{
        // background: stardarkblue,
        height: '100%',
        width: '100%',
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
            opacity: 0.3,
            zIndex: -1,
            backgroundRepeat: 'no-repeat',
            // position: 'fixed',
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
                // src={"https://res.cloudinary.com/do7kimovl/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1715924137/rolletwheel_yxoxqv.avif"}
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
                mt: 3,
                mb: 5,

                borderRadius: "10px",
                padding: "20px 10px",
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
                WebkitBackdropFilter: "blur(6px)",
                backdropFilter: "blur(3px)",
                border: " 1px solid #7330fa75",
                background: '#0000006e !important',
              }}

            >
              <Typography variant="body1" color="initial">
                Register{" "}
              </Typography>
              <Typography variant="body1" color="initial">
                {" "}
                Please register by phone number or email
              </Typography>

              <Box
                component="form"
                sx={{
                  width: "95%",
                  marginLeft: "2.5%",
                  transition: "0.3s",
                }}
                onSubmit={fk.handleSubmit}
              >
                <Box mt={3}>
                  <FormControl fullWidth>
                    <Stack direction="row" className="loginlabel">
                      <Typography variant="h3">Referral Code</Typography>
                    </Stack>
                    <TextField
                      id="referral_code"
                      placeholder="Enter Referral Code"
                      className="loginfields"
                      name="referral_code"
                      value={fk.values.referral_code}
                      onChange={fk.handleChange}
                      onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                    />
                    {/* {fk.touched.referral_code && fk.errors.referral_code ? (
                      <div className="error">{fk.errors.referral_code}</div>
                    ) : result ? (
                      <div className="no-error">Referral From: {result}</div>
                    ) : (
                      <div className="error">Invalid Referral Id</div>
                    )} */}
                    {result !== "false" ? (
              <div className="no-error">{result}</div>
            ) : (
              fk.touched.referral_code &&
              fk.errors.referral_code && (
                <div className="error">{fk.errors.referral_code}</div>
              )
            )}
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Stack direction="row" className="loginlabel">
                      <Typography variant="h3">Name</Typography>
                    </Stack>
                    <TextField
                      id="name"
                      placeholder="Enter Name"
                      className="loginfields"
                      name="name"
                      type="text"
                      value={fk.values.name}
                      onChange={fk.handleChange}
                      onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                    />
                    {fk.touched.name && fk.errors.name && (
                      <div className="error">{fk.errors.name}</div>
                    )}
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Stack direction="row" className="loginlabel">
                      <Typography variant="h3">Mobile</Typography>
                    </Stack>
                    <TextField
                      id="fullWidth"
                      placeholder="Enter Mobile Number"
                      className="loginfields"
                      name="mobile"
                      type="number"
                      value={fk.values.mobile}
                      onChange={fk.handleChange}
                      onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                    />
                    {fk.touched.mobile && fk.errors.mobile && (
                      <div className="error">{fk.errors.mobile}</div>
                    )}
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Stack direction="row" className="loginlabel">
                      <Typography variant="h3">E-mail</Typography>
                    </Stack>
                    <TextField
                      id="fullWidth"
                      type="email"
                      placeholder="Enter email"
                      className="loginfields"
                      name="email"
                      value={fk.values.email}
                      onChange={fk.handleChange}
                      onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                    />
                    {fk.touched.email && fk.errors.email && (
                      <div className="error">{fk.errors.email}</div>
                    )}
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Stack direction="row" className="loginlabel">
                      <Typography variant="h3">Set password</Typography>
                    </Stack>
                    <OutlinedInput
                      placeholder="Enter password"
                      name="password"
                      value={fk.values.password}
                      onChange={fk.handleChange}
                      onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                      className="loginfieldspass"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ color: stargreen }} />
                            ) : (
                              <Visibility sx={{ color: stargreen }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {fk.touched.password && fk.errors.password && (
                      <div className="error">{fk.errors.password}</div>
                    )}
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Stack direction="row" className="loginlabel">
                      <Typography variant="h3">Confirm password</Typography>
                    </Stack>
                    <OutlinedInput
                      className="loginfieldspass"
                      name="confirmed_password"
                      id="confirmed_password"
                      value={fk.values.confirmed_password}
                      onChange={fk.handleChange}
                      onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                      placeholder="Enter confirm password"
                      type={show_confirm_password ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handle_confirm_ClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {show_confirm_password ? (
                              <VisibilityOff sx={{ color: stargreen }} />
                            ) : (
                              <Visibility sx={{ color: stargreen }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {fk.touched.confirmed_password &&
                      fk.errors.confirmed_password && (
                        <div className="error">
                          {fk.errors.confirmed_password}
                        </div>
                      )}
                  </FormControl>
                </Box>
                <Box mt={1}>
                  <FormControl fullWidth>
                    <FormControlLabel
                      // required
                      control={
                        <Checkbox
                          checked={fk.values.privacy_policy}
                          sx={{ color: stargreen }}
                          onClick={() =>
                            fk.setFieldValue(
                              "privacy_policy",
                              !fk.values.privacy_policy
                            )
                          }
                        />
                      }
                      label={<Typography className="fp13">I have read and agree 【Privacy Agreement】</Typography>}
                      sx={{ color: "white" }}
                    />
                  </FormControl>
                </Box>
                <Button
                  sx={{ mt: '20px' }}
                  component={NavLink}
                  className="btnLogin"
                  onClick={fk.handleSubmit}
                >
                  Register
                </Button>
                <Button
                  component={NavLink}
                  to="/"
                  className="btnregister"
                  mt={2}
                >
                  Log in
                </Button>
              </Box>
            </Box>
            <Box sx={{ py: 3 }}></Box>
          </Box>
        </Box>
      </Box>
      <CustomCircularProgress isLoading={loding} />
    </Container>
  );
}

export default Register;
