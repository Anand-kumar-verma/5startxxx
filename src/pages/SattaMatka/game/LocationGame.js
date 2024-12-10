import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { stargrad } from "../../../Shared/color";
import toast from "react-hot-toast";
import { apiConnectorPost } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import { useQueryClient } from "react-query";
import moment from "moment";

function Jodi({ game_type }) {
  const [betArray, setBetArray] = useState([]);
  const client = useQueryClient();
  const buttons = Array.from({ length: 100 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const [open, setOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [amount, setAmount] = useState(0);
  const toggleDrawer = (open) => {
    setOpen(open);
  };

  const myElementRef = useRef(null);

  const handleClick = () => {
    toggleDrawer(false);

    if (myElementRef.current) {
      myElementRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleClickbtn = (number) => {
    setSelectedNumber(number);
  };

  const addNumberINBetArray = (number, amount) => {
    const body = {
      number: number,
      amount: amount,
    };
    placeBet([body]);
  };
  const addNumberINBetArraybET = (number, amount) => {
    const body = {
      number: number,
      amount: amount,
    };
    const existingIndex = betArray.findIndex(
      (item) => Number(item.number) === Number(number)
    );

    if (existingIndex !== -1) {
      const updatedBetArray = betArray.map((item, index) =>
        index === existingIndex ? { ...item, amount: amount } : item
      );
      setBetArray(updatedBetArray);
    } else {
      setBetArray([...betArray, body]);
    }
    setAmount(0);
  };
  async function placeBet(betArrayCurrent) {
    let min = Number(moment(Date.now())?.format("mm"));
    let time = (min >= 25 && min <= 30) || (min >= 55 && min <= 60);
    if (time) return toast("Time Over, Please try in next trade.");
    addNumberINBetArraybET(betArrayCurrent?.[0]?.number,betArrayCurrent?.[0]?.amount);
    try {
      betArrayCurrent?.forEach((i) => {
        if (i?.amount !== null && Number(i?.amount) < 5)
          return toast(
            "Your Amount is less than 5 on " +
              `${
                Number(i?.number) >= 1000 && Number(i?.number) <= 1009
                  ? "Andar"
                  : "Bahar"
              } ${Number(i?.number) % 10}`
          );
      });
      const newArrya = betArrayCurrent?.filter((i) => i?.amount !== null);
      if (newArrya?.length <= 0) return toast("Please choose no.");
      const reqBody = {
        bet_array: JSON.stringify(newArrya),
        satta_type_user: game_type,
      };
      const response = await apiConnectorPost(
        endpoint?.node?.bet_satta,
        reqBody
      );
      toast(response?.data?.msg);
      localStorage.setItem(`betApplied_${game_type}`, true);
      client.refetchQueries("walletamount");
    } catch (e) {
      toast("Something went wrong", e);
    }
  }

  return (
    <Box className="w95">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
          my: 5,
        }}
      >
        {buttons.map((number) => (
          <Button
            onClick={() => {
              handleClickbtn(number);
              setAmount(
                betArray?.find(
                  (i) => Number(i?.number) === Number(selectedNumber || number)
                )?.amount || null
              );
              toggleDrawer(true);
            }}
            key={number}
            variant="contained"
            sx={{
              width: "50px",
              height: "50px",
              textAlign: "center",
              background: betArray?.find(
                (i) => Number(i?.number) === Number(number)
              )
                ? "#4caf50"
                : "#8d819f",
              color: "white",
              "&:hover": {
                background: number === selectedNumber ? "#45a049" : "#6a4a71", // Hover color based on selection
              },
            }}
          >
            <p className="!flex !flex-col !justify-center">
              <span>{number}</span>
              <span className="!text-[10px]">
                {
                  betArray?.find((i) => Number(i?.number) === Number(number))
                    ?.amount
                }
              </span>
            </p>
          </Button>
        ))}
      </Box>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#2C092D",
            borderRadius: "16px 16px 0 0",
            padding: "8px",
            color: "#fff",
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            padding: "20px 16px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: "10px", fontSize: "25px", fontWeight: "600px" }}
          >
            {selectedNumber}
          </Typography>
          <Typography
            variant="subtitle1"
            className="fp15"
            sx={{ marginBottom: "10px" }}
          >
            Enter Bid Amount
          </Typography>
          <TextField
            fullWidth
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            placeholder="00"
            sx={{
              backgroundColor: "#4A234F",
              borderRadius: "50px",
              input: { color: "#fff" },
            }}
          />
          <Button
            className="fp15"
            fullWidth
            variant="contained"
            onClick={() => {
              handleClick();
              selectedNumber !== "" &&
                amount !== "" &&
                amount !== 0 &&
                (Number(amount) < 10
                  ? toast("Amount should be grater or equal to 10")
                  : addNumberINBetArray(selectedNumber, amount));
            }}
            sx={{
              marginTop: "16px",
              background: stargrad,
              color: "#fff",
              borderRadius: "8px",
              py: 1,
              mb: 2,
              textTransform: "capitalize",
            }}
          >
            bid placed
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{
              marginTop: "8px",
              color: "#fff",
              textDecoration: "underline",
            }}
          >
            Remove this bet
          </Button>
        </Box>
      </Drawer>
      <Box sx={{ py: 2 }}></Box>
      <div ref={myElementRef}></div>
    </Box>
  );
}

export default Jodi;
