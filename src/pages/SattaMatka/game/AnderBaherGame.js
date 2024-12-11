import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { apiConnectorPost } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import { stargrad } from "../../../Shared/color";

const AndarBaharTable = ({ game_type }) => {
  const [betArray, setBetArray] = useState([
    {
      number: "1000",
      amount: null,
    },
    {
      number: "1001",
      amount: null,
    },
    {
      number: "1002",
      amount: null,
    },
    {
      number: "1003",
      amount: null,
    },
    {
      number: "1004",
      amount: null,
    },
    {
      number: "1005",
      amount: null,
    },
    {
      number: "1006",
      amount: null,
    },
    {
      number: "1007",
      amount: null,
    },
    {
      number: "1008",
      amount: null,
    },
    {
      number: "1009",
      amount: null,
    },
    {
      number: "2000",
      amount: null,
    },
    {
      number: "2001",
      amount: null,
    },
    {
      number: "2002",
      amount: null,
    },
    {
      number: "2003",
      amount: null,
    },
    {
      number: "2004",
      amount: null,
    },
    {
      number: "2005",
      amount: null,
    },
    {
      number: "2006",
      amount: null,
    },
    {
      number: "2007",
      amount: null,
    },
    {
      number: "2008",
      amount: null,
    },
    {
      number: "2009",
      amount: null,
    },
  ]);
  const client = useQueryClient();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const existingIndex = betArray.findIndex(
      (item) => Number(item.number) === Number(name)
    );
    const updatedBetArray = betArray.map((item, index) =>
      index === existingIndex ? { ...item, amount: value } : item
    );
    setBetArray(updatedBetArray);
  };

  async function placeBet() {
    let min = Number(moment(Date.now())?.format("mm"));
    let time = (min >= 25 && min <= 30) || (min >= 55 && min <= 60);
    if (time)
      return toast("Time Over, Please try in next trade.", {
        id: 1,
      });
    try {
      let betArrayCurrent = betArray?.filter(
        (i) =>
          i?.amount !== "" && i?.amount !== null && Number(i.number) >= 1000
      );
      const checkIfAmountLessThan5 = betArrayCurrent?.filter(
        (i) => Number(i?.amount) < 5
      );
      if (checkIfAmountLessThan5?.length > 0)
        return toast("Amount on all number should be grater or equal to 5");
      const newArrya = betArrayCurrent?.filter((i) => i?.amount !== null);
      if (newArrya?.length <= 0)
        return toast("Please choose no.", {
          id: 1,
        });
      const reqBody = {
        bet_array: JSON.stringify(newArrya),
        satta_type_user: game_type,
      };
      const response = await apiConnectorPost(
        endpoint?.node?.bet_satta,
        reqBody
      );
      if (response?.data?.msg === "Bid placed Successfully1") {
        toast(response?.data?.msg);
        localStorage.setItem(`betApplied_${game_type}`, true);
        client.refetchQueries("walletamount");
        setBetArray(
          betArray?.map((i) => {
            return {
              ...i,
              amount: "",
            };
          })
        );
      }
    } catch (e) {
      toast("Something went wrong", e);
    }
  }
  console.log(betArray);
  const renderRowsa = (labelPrefix) => {
    return Array.from({ length: 10 }, (_, index) => (
      <Grid container key={index} spacing={2}>
        <Grid item xs={4}>
          <Typography
            variant="body1"
            className="fp13"
            align="center"
            sx={{ color: "white", mt: 1 }}
          >
            {`${index}${labelPrefix}`}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                "&:hover fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
            placeholder="₹"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            id={`100${index}`}
            name={`100${index}`}
            value={
              betArray?.find((i) => Number(i?.number) === Number(`100${index}`))
                ?.amount
            }
            onChange={(e) => handleChange(e)}
          />
        </Grid>
      </Grid>
    ));
  };
  const renderRowsb = (labelPrefix) => {
    return Array.from({ length: 10 }, (_, index) => (
      <Grid container key={index} spacing={2}>
        <Grid item xs={4}>
          <Typography
            variant="body1"
            className="fp13"
            align="center"
            sx={{ color: "white", mt: 1 }}
          >
            {`${labelPrefix}${index}`}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                "&:hover fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                  borderRadius: 0,
                },
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
            placeholder="₹"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            id={`200${index}`}
            name={`200${index}`}
            value={
              betArray?.find((i) => Number(i?.number) === Number(`200${index}`))
                ?.amount
            }
            onChange={(e) => handleChange(e)}
          />
        </Grid>
      </Grid>
    ));
  };

  return (
    <Box sx={{ padding: 2, borderRadius: 2 }} className="w95 !mb-[10%]" mt={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ border: "1px solid white", width: "48%", borderRadius: "5px" }}
        >
          <Typography
            className="fp15"
            variant="body1"
            sx={{
              color: "white",
              py: 1,
              borderBottom: "1px solid white",
              margin: 0,
            }}
            align="center"
            gutterBottom
          >
            ANDAR
          </Typography>
          {renderRowsa("*")}
        </Box>
        <Box
          sx={{ border: "1px solid white", width: "48%", borderRadius: "5px" }}
        >
          <Typography
            className="fp15"
            variant="h5"
            sx={{
              color: "white",
              py: 1,
              borderBottom: "1px solid white",
              margin: 0,
            }}
            align="center"
            gutterBottom
          >
            BAHAR
          </Typography>
          {renderRowsb("*")}
        </Box>
      </Box>
      <div className="mt-2">
        <Button
          sx={{
            marginTop: "16px",
            background: stargrad,
            color: "#fff",
            borderRadius: "8px",
            py: 1,
            mb: 2,
            textTransform: "capitalize",
          }}
          className="w-full !text-xl"
          onClick={placeBet}
        >
          {" "}
          bid placed
        </Button>
      </div>
    </Box>
  );
};

export default AndarBaharTable;
