import { Box, Container } from "@mui/material";
import * as React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { zubgback } from "../../../Shared/color";
import Layout from "../../../component/Layout/Layout";
import { apiConnectorGet } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";

const QRScreen = ({ deposit_req_data, address, orderID }) => {

  const [timeRemaining, setTimeRemaining] = React.useState(300)
  const navigate = useNavigate()
  const callbackFn = async () => {
    try {
      const response = await apiConnectorGet(endpoint.node?.call_back_user + `?order_id=${orderID}`)
      if (response?.data?.data?.tr15_status !== "Pending")
        navigate("/account");
    }
    catch (e) {
      toast("something went wrong")
    }
  }
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/account");
    }, 300000);
    return () => clearTimeout(timer);
  }, [navigate]);


  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      callbackFn()
    }, 30000);
    return () => clearInterval(timer);
  }, [])

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <Layout header={false} footer={false}>
      <Container
        className="no-scrollbar"
        sx={{
          background: "white",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Box sx={style.header}>
          <p className="!text-center">My QR Code</p>
        </Box>
        <div
          className={`!text-black !bg-white !flex !flex-col justify-center items-center no-scrollbar`}
        >
          <img
            className="!h-[60%] !w-[60%] -mb-2"
            src="https://i.pinimg.com/originals/e4/af/9f/e4af9f0025a8ce68bee2cf5a1360a501.gif"
            alt="" />
      
          <div className="!bg-white !flex flex-col justify-center">
          <iframe src={deposit_req_data}  className="!h-screen" />
            <p className="!text-center !font-bold !text-blue-800 !text-xs">
              {address}
            </p>
          </div>
          {/* Countdown timer */}
          <div className="!text-center !font-bold !text-lg ">
            <p>Time Remaining: {formatTime(timeRemaining)}</p>
          </div>

        </div>
      </Container>
    </Layout>
  );
};

export default QRScreen;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgback,
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
  },
};
