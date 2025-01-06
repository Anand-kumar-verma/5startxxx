import CachedIcon from "@mui/icons-material/Cached";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import {
  starbluegrad,
  zubgback,
  zubgbackgrad,
  zubgmid,
} from "../../../Shared/color";
import audiovoice from "../../../assets/bankvoice.mp3";
import { default as atmchip, default as cip } from "../../../assets/cip.png";
import user from "../../../assets/history2.png";
import playgame from "../../../assets/images/card.webp";
import dot from "../../../assets/images/circle-arrow.png";
import balance from "../../../assets/images/send.png";
import payment from "../../../assets/wallet2.png";
import Layout from "../../../component/Layout/Layout";
import {
  apiConnectorGet,
  apiConnectorPost,
} from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import QRScreen from "./QRScreen";

function WalletRecharge() {
  const [deposit_req_data, setDeposit_req_data] = React.useState();
  const [address, setAddress] = React.useState();
  const [amount, setAmount] = React.useState();
  const [orderID, setOrderId] = React.useState();
  const audioRefMusic = React.useRef(null);
  const [Loading, setLoading] = React.useState(false);
  const client = useQueryClient();
  const { data: wallet } = useQuery(
    ["walletamount"],
    () => apiConnectorGet(endpoint.node.get_wallet),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const newdata = wallet?.data?.data || 0;

  const initialValue = {
    u_gateway_type: "",
    u_req_amount: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (
        !fk.values.u_req_amount 
      ) {
        toast("Please enter Amount");
        return;
      }
      setLoading(true);
      const reqBody = {
        u_gateway_type: 1,
        u_req_amount: fk.values.u_req_amount,
      };
      insertFundFn(reqBody);
    },
  });
  async function insertFundFn(reqBody) {
    try {
      const res = await apiConnectorPost(
        endpoint?.node.paying_request,
        reqBody
      );
      toast(res?.data?.msg);
      setLoading(false);
      if ("PayIn Successfully" === res?.data?.msg) {
        setDeposit_req_data(res?.data?.data?.payment_link);
        setAddress(res?.data?.data?.address);
        setAmount(res?.data?.data?.amount);
        setOrderId(res?.data?.order_id);
        fk.handleReset();
      }
    } catch (e) {
      console.log(e);
    }
    client.refetchQueries("walletamount");
    client.refetchQueries("deposit_history");
  }
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    handlePlaySound();
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
          <Box
            component="img"
            src={user}
            width={30}
            sx={{ filter: "grayscale(1)" }}
          ></Box>
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
            <Box
              component="img"
              src={dot}
              width={15}
              sx={{ filter: "grayscale(1)" }}
            ></Box>
            <Typography variant="body1" color="initial">
              If the transfer time is up, please fill out the deposit form
              again.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box
              component="img"
              src={dot}
              width={15}
              sx={{ filter: "grayscale(1)" }}
            ></Box>
            <Typography variant="body1" color="initial">
              The transfer amount must match the order you created, otherwise
              the money cannot be credited successfully.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box
              component="img"
              src={dot}
              width={15}
              sx={{ filter: "grayscale(1)" }}
            ></Box>
            <Typography variant="body1" color="initial">
              If you transfer the wrong amount, our company will not be
              responsible for the lost amount!
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box
              component="img"
              src={dot}
              width={15}
              sx={{ filter: "grayscale(1)" }}
            ></Box>
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
          <Box
            component="img"
            src={payment}
            width={30}
            sx={{ filter: "grayscale(1)" }}
          ></Box>
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
            onClick={() => fk.setFieldValue("u_req_amount", 500)}
          >
            {" "}
            500
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("u_req_amount", 1000)}
          >
            {" "}
            1K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("u_req_amount", 5000)}
          >
            {" "}
            5K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("u_req_amount", 10000)}
          >
            {" "}
            10K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("u_req_amount", 15000)}
          >
            {" "}
            15K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("u_req_amount", 20000)}
          >
            {" "}
            20K
          </Button>
        </Stack>
      </>
    );
  }, []);

  if (deposit_req_data) {
    return (
      <QRScreen deposit_req_data={deposit_req_data} address={address} amount={amount} orderID={orderID}/>
    );
  }
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
            <Box
              component="img"
              src={cip}
              width={50}
              sx={{ filter: "drop-shadow(2px 4px 6px black)" }}
            ></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "14px ", color: "white", ml: "10px" }}
            >
              **** **** **** ****
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ mt: 2, px: 2 }}>
          <Stack direction="row">
            <Stack
              sx={{
                background: "",
                padding: 2,
                borderRadius: 2,
                mr: 2,
                width: "120px",
                cursor: "pointer",
                backgroundColor: zubgbackgrad
              }}
            >
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

            <span className="!text-white !text-sm ">Amount</span>
            <TextField
              type="text"
              id="u_req_amount"
              name="u_req_amount"
              value={fk.values.u_req_amount}
              onChange={fk.handleChange}
              placeholder="Enter your Amount"
              className="!w-[100%] !bg-white !mt-1"
            />

            {Loading && <CustomCircularProgress isLoading={Loading} />}

            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                // justifyContent: "space-between",
                // flexWrap: "wrap",
                mt: "10px",
              }}
            >
              <Button
                sx={style.paytmbtntwo}
                onClick={(e) => {
                  e.preventDefault();
                  fk.handleSubmit();
                }}
              >
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
