import CachedIcon from "@mui/icons-material/Cached";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { withdraw_amount_validation_schema } from "../../Shared/Validation";
import { starbluegrad, zubgback, zubgbackgrad, zubgmid } from "../../Shared/color";
import cip from "../../assets/cip.png";
import payment from "../../assets/wallet2.png";
import playgame from "../../assets/images/card.webp";
import balance from "../../assets/images/send.png";
import audiovoice from "../../assets/images/withdrawol_voice.mp3";
import Layout from "../../component/Layout/Layout";
import { BankListDetails, get_user_data_fn } from "../../services/apicalling";
import { endpoint, rupees } from "../../services/urls";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { apiConnectorGet } from "../../services/apiconnector";
import atmchip from "../../assets/cip.png";
import bankicon from "../../assets/images/bank.png";
import upi from "../../assets/chip.png";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Withdrawl() {
  const location = useLocation();
  const dispatch = useDispatch();
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );
  const { type } = location.state || {};
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const first_rechange =
    aviator_login_data && JSON.parse(aviator_login_data)?.first_recharge;

  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const [amount, setAmount] = React.useState({
    wallet: 0,
    winning: 0,
    cricket_wallet: 0,
  });
  const [Loading, setloding] = React.useState(false);
  const audioRefMusic = React.useRef(null);
  const [openDialogBox, setOpenDialogBox] = React.useState(false);

  React.useEffect(() => {
    !aviator_login_data && get_user_data_fn(dispatch);
  }, []);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  
  const { data: upi_detail } = useQuery(
    ["upi_details"],
    () => apiConnectorGet(endpoint.node.get_upi_list),
    {
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        retryOnMount: false,
        refetchOnWindowFocus: false
    }
);

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


const { data:bank_history } = useQuery(
    ["bank_details"],
    () => apiConnectorGet(endpoint.node.get_bank_list),
    {
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        retryOnMount: false,
        refetchOnWindowFocus: false
    }
);
const bank_data = bank_history?.data?.data 

const game_history_data = React.useMemo(
    () => bank_history?.data?.data?.[0],
    [bank_history?.data?.data]
);

const initialValue = {
  amount: "",
  type: "Bank",
};

const fk = useFormik({
  initialValues: initialValue,
  validationSchema: withdraw_amount_validation_schema,
  enableReinitialize: true,
  onSubmit: () => {
      
      const reqBody = {
          userid: user_id,
          amount: fk.values.amount,
          type: fk.values.type === "UPI" ? "2" : "1",
      };
      // console.log(reqBody);
      withdraw_payment_Function(reqBody);
  },
});

async function withdraw_payment_Function(reqBody) {
  setloding(true);
  try {
      const res = await axios.post(endpoint?.wallet_withdrawl, reqBody);
      toast(res?.data?.message);
      setloding(false);
      if ("Withdrawal Request Placed Successfully" === res?.data?.message)
          fk.handleReset();
      client.refetchQueries("wallet_amount");
      client.refetchQueries("withdrawl_history");
      client.refetchQueries("wallet_amount_amount");
      client.refetchQueries("profile");
      // navigate("/account");
      console.log(res);
  } catch (e) {
      console.log(e);
  }
  setloding(false);
}
const client = useQueryClient();

  const handlePlaySound = async () => {
    try {
      if (audioRefMusic?.current?.pause) {
        await audioRefMusic?.current?.play();
      } else {
        await audioRefMusic?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };

  React.useEffect(() => {
    handlePlaySound();
  }, []);

  return (
    <Layout>
      {React.useMemo(() => {
        return (
          <audio ref={audioRefMusic} hidden>
            <source src={`${audiovoice}`} type="audio/mp3" />
          </audio>
        );
      }, [])}

      <Container
        className="no-scrollbar"
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 4,
        }}
      >
        
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Withdrawal
          </Typography>
          <Box component={NavLink} to="/withdravalHistory">
            <HistoryIcon />
          </Box>
        </Box>
        <Box
          sx={{
            // background: zubgmid,
            borderRadius: "10px",
            padding: "30px 20px",
            width: "95%",
            margin: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ borderRadius: '10px', position: 'absolute', zIndex: '-1', top: 0, left: '0', width: '100%', height: '100%', backgroundImage: `url(${playgame})`, backgroundSize: '100% 100%', opacity: '0.5' }}></Box>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Box component="img" src={balance} width={50}></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: "16px ",
                fontWeight: 500,
                color: "white",
                ml: "10px",
              }}
            >
              {" "}
              Balance
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ alignItems: "center", mt: "10px" }}>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                fontSize: "30px ",
                fontWeight: "600",
                color: "white",
                mr: "10px",
              }}
            >
              {" "}
              {Number(
                  Number(newdata?.wallet || 0) + Number(newdata?.winning || 0)
                )?.toFixed(2)}
            </Typography>
            <CachedIcon sx={{ color: "white" }} />
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mt: "20px",
            }}
          >
            <Box component="img" src={cip} width={50} sx={{ filter: 'drop-shadow(2px 4px 6px black)' }}></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "14px ", color: "white", ml: "10px" }}
            >
              **** **** **** ****
            </Typography>
          </Stack>
        </Box>
         <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: "20px",
              background: zubgmid,
              borderRadius: "10px",
              mb: 5,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
              <Box component="img" src={payment} width={30} sx={{ filter: 'grayscale(1)' }}></Box>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
              >
                Withdrawal amount
              </Typography>
            </Stack>
          <Box sx={{ mt: 2, px: 2 }} >
                <Stack direction="row">
                    <Stack
                        sx={{
                            background:
                            "",
                            padding: 2,
                            borderRadius: 2,
                            mr: 2,
                            width: "120px",
                            cursor: "pointer",
                            backgroundColor: fk.values.type === "Bank" ? zubgbackgrad : zubgback
                        }}
                     
                        onClick={() => fk.setFieldValue("type", "Bank")} >
                        <Box
                            component="img"
                            src={atmchip}
                            width={40}
                            sx={{ margin: "0px auto" }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "white ",
                                fontSize: "14px",
                                fontWeight: "500",
                                textAlign: "center",
                                mt: 1,
                            }}
                        >
                            BANK CARD
                        </Typography>
                    </Stack>
                    <Stack
                       sx={{
                        background:
                        zubgback,
                        padding: 2,
                        borderRadius: 2,
                        mr: 2,
                        width: "120px",
                        cursor: "pointer",
                        backgroundColor: fk.values.type === "UPI" ? zubgbackgrad : zubgback
                    }}
                        onClick={() => fk.setFieldValue("type", "UPI")} >
                        <Box
                            component="img"
                            src={upi}
                            width={40}
                            sx={{ margin: "0px auto" }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "500",
                                textAlign: "center",
                                mt: 1,
                            }}
                        >
                            UPI
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
            {fk.values.type === "Bank" && (
                <>
                  <Box
                sx={{
                    width: "92%",
                    margin: "auto",
                    my: 2,
                    background: zubgback,
                    padding: "10px 0px 10px 10px",
                    borderRadius: '10px'
                }}
            >
                <Stack direction="row" component={NavLink} to="/banks-details">
                    <Box sx={{ width: "35%" }}>
                        <Box
                            component="img"
                            src={bankicon}
                            width={30}
                            sx={{ margin: "auto" }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "15px", fontWeight: "500", mt: 1, color: 'white' }}
                        >
                            {game_history_data?.tr44_holder_name?.substring(0, 8) + "****"}
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "60%", borderLeft: "1px solid gray", pl: "5%" }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "13px", fontWeight: "600", color: 'white' }}
                        >
                            {game_history_data?.tr44_account_no?.substring(0, 5) + "****"}
                        </Typography>
                        <KeyboardArrowRightIcon sx={{ color: 'white' }} />
                    </Stack>
                </Stack>
            </Box>
                </>
            )}
    {fk.values.type === "UPI" && (
                <>
                  <Box
                sx={{
                    width: "92%",
                    margin: "auto",
                    my: 2,
                    background: zubgback,
                    padding: "10px 0px 10px 10px",
                    borderRadius: '10px'
                }}
            >
                <Stack direction="row" component={NavLink} to="/banks-upi">
                    <Box sx={{ width: "35%" }}>
                        <Box
                            component="img"
                            src={bankicon}
                            width={30}
                            sx={{ margin: "auto" }}
                        ></Box>
                        <Typography
                         className="!text-center"
                            variant="body1"
                            sx={{ fontSize: "15px", fontWeight: "500", mt: 1, color: 'white' }}
                        >
                            {upi_detail?.data?.data?.[0]?.tr45_upi_id?.substring(0, 8) + "****"}
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "60%", borderLeft: "1px solid gray", pl: "5%" }}
                    >
                        <Typography
                        className="!text-center"
                            variant="body1"
                            sx={{ fontSize: "13px", fontWeight: "600", color: 'white' }}
                        >
                            {upi_detail?.data?.data?.[0]?.tr45_upi_name?.substring(0, 5) + "****"}
                        </Typography>
                        <KeyboardArrowRightIcon sx={{ color: 'white' }} />
                    </Stack>
                </Stack>
            </Box>
                </>
            )}
            <Box
                sx={{
                    width: "92%",
                    margin: "auto",
                    my: 2,
                    background: zubgback,
                    padding: "10px",
                    borderRadius: '10px'
                }}
            >
                <div className="grid grid-cols-2 gap-1 items-center  p-5 !text-white">
                    <span className="!text-white !text-sm ">Amount </span>
                    <TextField
                        id="amount"
                        name="amount"
                        value={fk.values.amount}
                        onChange={fk.handleChange}
                        placeholder="Amount"
                        className="!w-[100%] !bg-white !mt-5 !rounded"
                    />
                    {fk.touched.amount && fk.errors.amount && (
                        <div className="error">{fk.errors.amount}</div>
                    )}

                  {fk.values.type === "Bank" && (
                        <>
                            {bank_data?.map((item) => {
                                return <>
                                    <span className="!text-white !text-sm "> Bank Name</span>
                                    <p>{item?.tr44_bank_name}</p>
                                    <span className="!text-white !text-sm "> Account Holder Name</span>
                                    <p>{item?.tr44_holder_name}</p>
                                    <span className="!text-white !text-sm "> Account Number</span>
                                    <p>{item?.tr44_account_no}</p>
                                    <span className="!text-white !text-sm "> IFSC Code </span>
                                    <p>{item?.tr44_ifsc_code || 0}</p>
                                </>
                            })}
                        </>
                    )}
                    {fk.values.type === "UPI" && (
                        <>
                            {/* {upidata?.map((item) => {
                                return <> */}
                                    <span className="!text-white !text-sm ">UPI ID</span>
                                    <p>{upi_detail?.data?.data?.[0]?.tr45_upi_name}</p>
                                    <span className="!text-white !text-sm ">UPI Number</span>
                                    <p>{upi_detail?.data?.data?.[0]?.tr45_upi_id}</p>
                                    {/* <span className="!text-white !text-sm ">UPI Type*</span>
                                    <p>{item?.Ifsc}</p> */}
                                {/* </>
                            })} */}
                        </>
                    )}
                </div>
                
                 <Button
                sx={style.paytmbtntwo}
                type="submit"
                // onClick={(e) => {
                //   e.preventDefault();
                //   fk.handleSubmit();
                // }}
              >
                Withdrawal{" "}
              </Button>
                {Loading && (
                    <CustomCircularProgress isLoading={Loading} />)}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                >
                    <Stack direction="row">
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "12px", color: 'white' }}
                        >
                            Withdrawable balance{" "}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "12px",
                                color: zubgbackgrad,
                                ml: 1,
                            }}
                        >
                            ₹{newdata?.winning || 0}
                        </Typography>
                    </Stack>

                    <Button
                        variant="Outlined"
                        color="primary"
                        sx={{
                            border: `1px solid ${zubgback}`,
                            padding: 0,
                            fontSize: "12px",
                            color: 'white',
                            borderRadius: "8px",
                        }}
                    >
                        All
                    </Button>
                </Stack>
             

                <Box mt={3}>
                    <Stack direction="row" alignItems="center" mt={1}>
                        <Box
                            sx={{
                                width: "5px",
                                height: "5px",
                                background: "white",
                                transform: "rotate(45deg)",
                                mr: 1,
                            }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "12px", color: 'white' }}
                        >
                            You have to withdrawal upto {" "}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "12px",
                                color: zubgbackgrad,
                                mx: 0.5,
                            }}
                        >
                            {" "}
                            ₹   {((newdata?.wallet)* 0.10 )?.toFixed(0,2)|| 0}
                            
                        </Typography>
                     
                    </Stack>


                    <Stack direction="row" alignItems="center" mt={1}>
                        <Box
                            sx={{
                                width: "5px",
                                height: "5px",
                                background: "white",
                                transform: "rotate(45deg)",
                                mr: 1,
                            }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "12px", color: 'white' }}
                        >
                            Withdraw time{" "}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "12px",
                                color: zubgbackgrad,
                                mx: 0.5,
                            }}
                        >
                            00:00-23:50{" "}
                        </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" mt={1}>
                        <Box
                            sx={{
                                width: "5px",
                                height: "5px",
                                background: "white",
                                transform: "rotate(45deg)",
                                mr: 1,
                            }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "12px", color: 'white' }}
                        >
                            Please confirm your beneficial account information before
                            withdrawing. If your information is incorrect, our company will
                            not be liable for the amount of loss{" "}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" mt={1}>
                        <Box
                            sx={{
                                width: "5px",
                                height: "5px",
                                background: "white",
                                transform: "rotate(45deg)",
                                mr: 1,
                            }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "12px", color: 'white' }}
                        >
                            If your beneficial information is incorrect, please contact
                            customer service
                        </Typography>
                    </Stack>
                </Box>
            </Box></Box>
        
        <Dialog open={openDialogBox}>
          <div className="!p-5 !max-w-[300px]">
            <p className="!font-bold text-center flex-col">
              <span className="!text-lg">
                Your withdrawl amount will be add in your bank account within 24
                Hrs.
              </span>
              <p className="!text-green-500">Thank You!</p>
              <Button
                onClick={() => setOpenDialogBox(false)}
                className="!mt-1"
                variant="contained"
              >
                OK
              </Button>
            </p>
          </div>
        </Dialog>
      </Container>
    </Layout>
  );
}

export default Withdrawl;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgmid,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
    mb: 2,
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
    background: starbluegrad,
    color: "white !important",
    width: "100%",
    mt: "20px",
    padding: "10px",
    "&:hover": { background: starbluegrad, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
