import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import copy from "clipboard-copy";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { cashDepositRequestValidationSchema } from "../../../Shared/Validation";
import { starbluegrad, zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import audiovoice from "../../../assets/bankvoice.mp3";
import cip from "../../../assets/cip.png";
import dot from "../../../assets/images/circle-arrow.png";
import payment from "../../../assets/wallet2.png";
import playgame from "../../../assets/images/card.webp";
import atmchip from "../../../assets/cip.png";
import chip from "../../../assets/chip.png";
import balance from "../../../assets/images/send.png";
import user from "../../../assets/history2.png";
import payNameIcon2 from "../../../assets/payNameIcon2.png";
import Layout from "../../../component/Layout/Layout";
import { get_user_data_fn } from "../../../services/apicalling";
import { baseUrl, endpoint } from "../../../services/urls";
import { apiConnectorGet, apiConnectorPost } from "../../../services/apiconnector";
import { useQuery, useQueryClient } from "react-query";
function WalletRecharge() {


  const dispatch = useDispatch();
  const aviator_login_data = useSelector(
    (state) => state.aviator.aviator_login_data
  );


  const audioRefMusic = React.useRef(null);
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  // const aviator_data = localStorage.getItem("aviator_data");
  const user_name =
    aviator_login_data && JSON.parse(aviator_login_data)?.username;
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const [Loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState({
    wallet: 0,
    winning: 0,
    cricket_wallet: 0,
  });
  const [receipt, setReceipt] = React.useState();

  const client = useQueryClient();
  const { data: wallet } = useQuery(
    ["walletamount"],
    () => apiConnectorGet(endpoint.node.get_wallet),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );

  const newdata = wallet?.data?.data || 0;

  const { data: bank_history } = useQuery(
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
  const result = bank_history?.data?.data

  const initialValue = {
    deposit_type: "Bank",
    req_amount: "",
    bank_upi_table_id: "",
    receipt_image: "",
    utr_no: ""
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (!fk.values.req_amount || !fk.values.bank_upi_table_id || !receipt || !fk.values.utr_no) {
        toast("Please enter all fields");
        return; 
      }  
      setLoading(true);
      const reqBody = {
        user_id: user_id,
        deposit_type: fk.values.deposit_type === "UPI" ? "2" : "1",
        req_amount: fk.values.req_amount,
        bank_upi_table_id: fk.values.bank_upi_table_id,
        receipt_image: receipt,
        utr_no: fk.values.utr_no
      };
      insertFundFn(reqBody);
    },
  });
  async function insertFundFn(reqBody) {
    try {
      const res = await apiConnectorPost(endpoint?.node.deposite_request, reqBody);
      toast(res?.data?.msg);
      setLoading(false);
      if ("Request Successfully Accepted." === res?.data?.msg) {
        fk.handleReset();
        setReceipt(null);

      }
    } catch (e) {
      console.log(e);
    }
    client.refetchQueries("walletamount");
    client.refetchQueries("deposit_history");

  }
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
  const upidata = upi_detail?.data?.data;

  const selectedUPIDetails = upidata?.find(
    (item) => item?.tr45_id === fk.values.bank_upi_table_id
  );
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceipt(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    handlePlaySound();
  }, []);

  React.useEffect(() => {
    !aviator_login_data && get_user_data_fn(dispatch);
  }, []);

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


  const audio = React.useMemo(() => {
    return (
      <audio ref={audioRefMusic} hidden>
        <source src={`${audiovoice}`} type="audio/mp3" />
      </audio>
    );
  }, []);

  const rechargeInstruction = React.useMemo(() => {
    return (
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
          <Box component="img" src={user} width={30} sx={{ filter: 'grayscale(1)' }}></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
          >
            {" "}
            Recharge instructions
          </Typography>
        </Stack>
        <Box
          sx={{
            border: "1px solid white",
            padding: 2,
            borderRadius: "10px",
          }}
        >
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box component="img" src={dot} width={15} sx={{ filter: 'grayscale(1)' }}></Box>
            <Typography variant="body1" color="initial">
              If the transfer time is up, please fill out the deposit form
              again.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box component="img" src={dot} width={15} sx={{ filter: 'grayscale(1)' }}></Box>
            <Typography variant="body1" color="initial">
              The transfer amount must match the order you created, otherwise
              the money cannot be credited successfully.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box component="img" src={dot} width={15} sx={{ filter: 'grayscale(1)' }}></Box>
            <Typography variant="body1" color="initial">
              If you transfer the wrong amount, our company will not be
              responsible for the lost amount!
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box component="img" src={dot} width={15} sx={{ filter: 'grayscale(1)' }}></Box>
            <Typography variant="body1" color="initial">
              Note: do not cancel the deposit order after the money has been
              transferred.
            </Typography>
          </Stack>
        </Box>
      </Box>
    );
  }, []);

  const payment_button = React.useMemo(() => {
    return (
      <>
        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
          <Box component="img" src={payment} width={30} sx={{ filter: 'grayscale(1)' }}></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
          >
            Deposit amount
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mt: "10px",
          }}
        >
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("req_amount", 500)}
          >
            {" "}
            500
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("req_amount", 1000)}
          >
            {" "}
            1K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("req_amount", 5000)}
          >
            {" "}
            5K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("req_amount", 10000)}
          >
            {" "}
            10K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("req_amount", 15000)}
          >
            {" "}
            15K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("req_amount", 20000)}
          >
            {" "}
            20K
          </Button>
        </Stack>
      </>
    );
  }, []);

  return (
    <Layout>
      {audio}
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
            Deposit
          </Typography>
          <Box component={NavLink} to="/depositHistory">
            <HistoryIcon />
          </Box>
        </Box>
        <Box
          sx={{
            background: zubgmid,
            borderRadius: "10px",
            padding: "30px 20px",
            width: "95%",
            margin: "auto",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={playgame}
            sx={{
              opacity: "0.3",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          ></Box>
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
                backgroundColor: fk.values.deposit_type === "Bank" ? zubgbackgrad : starbluegrad 
              }}
              onClick={() => fk.setFieldValue("deposit_type", "Bank")} >
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
                backgroundColor: fk.values.deposit_type === "UPI" ? zubgbackgrad : starbluegrad
              }}
              onClick={() => fk.setFieldValue("deposit_type", "UPI")} >
              <Box
                component="img"
                src={chip}
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
        <Box>

          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: "20px",
              background: zubgmid,
              borderRadius: "10px",
              mb: 2,
            }}
          >
            {payment_button}
            <div className="grid grid-cols-2 gap-1 -mt-5 items-center p-5 ">
              {fk.values.deposit_type === "Bank" && (
                <>
                  <span className="!text-white !text-sm">Select Bank </span>
                  <TextField
                    id="bank_upi_table_id"
                    name="bank_upi_table_id"
                    value={fk.values.bank_upi_table_id}
                    onChange={fk.handleChange}
                    placeholder="Select Bank"
                    className="!w-[100%] !bg-white !mt-5"
                    select
                    size="small"
                  >

                    {result?.map((i, index) => {
                      return (
                        <MenuItem value={i?.tr44_id} className="!text-black">
                          {i?.tr44_bank_name} <br /> ({i?.tr44_account_no})
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </>
              )}
              {fk.values.deposit_type === "UPI" && (
                <>
                  <span className="!text-white !text-sm">Select UPI </span>
                  <TextField
                    id="bank_upi_table_id"
                    name="bank_upi_table_id"
                    value={fk.values?.bank_upi_table_id}
                    onChange={fk.handleChange}
                    placeholder="Select UPI"
                    className="!w-[100%] !bg-white !mt-5"
                    select
                    size="small"
                  >

                    {upidata?.map((i) => (
                      <MenuItem key={i?.tr45_id} value={i?.tr45_id}>
                        {i?.tr45_upi_id}
                      </MenuItem>
                    ))}
                  </TextField>
                  {selectedUPIDetails && (
                    <div className="col-span-2 !h-full !w-full flex items-center mt-10 flex-col">
                      <div className="w-72">
                      <img src={`${baseUrl}/uploads/${selectedUPIDetails?.tr45_qr}`} alt="QR Code" />
                      </div>
                      <div className="pt-4 gap-2">
                        <p className="!bg-white !text-xl font-bold px-8 !text-black">
                          {selectedUPIDetails?.tr45_upi_name}
                        </p>
                        <div className="w-full flex justify-center mt-5">
                          <Button
                            size="small !py-1"
                            className="!bg-[#0ee6ac] !text-white place-items-center"
                            onClick={() =>
                              functionTOCopy(
                                selectedUPIDetails.tr45_upi_name
                              )
                            }>
                            Copy
                          </Button>
                         
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <span className="!text-white !text-sm ">Amount</span>
              <TextField
                type="text"
                id="req_amount"
                name="req_amount"
                value={fk.values.req_amount}
                onChange={fk.handleChange}
                placeholder="amount"
                className="!w-[100%] !bg-white !mt-5"
              />

              <span className="!text-white !text-sm ">Transaction Id</span>
              <TextField
                type="text"
                id="utr_no"
                name="utr_no"
                value={fk.values.utr_no}
                onChange={fk.handleChange}
                placeholder="Transaction"
                className="!w-[100%] !bg-white !mt-5"

              />
             
              <span className="!text-white !text-sm ">Receipt</span>
              <input
                type="file"
                id="receipt_image "
                name="receipt_image "

                className="!text-sm !mt-5"
                onChange={handleFileChange}
                required
              />
             
              {Loading && (
                <CustomCircularProgress isLoading={Loading} />)}
            </div>
            <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  // justifyContent: "space-between",
                  // flexWrap: "wrap",
                  mt: "10px",
                }}
              >
                <Button sx={style.paytmbtntwo}
               onClick={(e) => {
                e.preventDefault();
                fk.handleSubmit();
              }}>
                  Deposit
                </Button>
              </Stack>
          </Box>
          {rechargeInstruction}
        </Box>
        <CustomCircularProgress isLoading={Loading} />
      </Container>
    </Layout>
  );
}

export default WalletRecharge;

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
    height: "auto",
    background: zubgmid,
    padding: "10px 0px",
    borderRadius: "10px",
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
    my: "20px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: starbluegrad,
    color: "white !important",
    width: "31%",
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
    mt: "20px",
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
