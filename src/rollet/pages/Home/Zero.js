import React from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { style } from "./CommonCss";
import toast from "react-hot-toast";
const Zero = ({
  isSelectedDropBet,
  removeSingleBetFunction,
  setOpenDialogBox,
  bet,
  setBetFuncton,
  amount,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="end"
      sx={{ height: "7%", width: "100%" }}
    >
      <Box
        sx={{
          background: "#2A3E2A",
          width: "100%",
          border: "1px solid white",
          position: "relative",
          borderRadius: "0px 0px 50px 50px",
        }}
        onClick={(e) => {
          if (isSelectedDropBet) {
            removeSingleBetFunction("0");
            return;
          }
          let isContainsPre = bet?.find((i) => i?.id === "0");
          if (isContainsPre) {
            // setOpenDialogBox("0");
            if (isContainsPre?.amount < 10) {
              return toast(
                <span
                  className="!p-2"
                  style={{ marginTop: "10% ", backgroundColor: "black" }}
                >
                  Bet must be greater or equal to 10 Rs
                </span>
              );
            } else {
              setBetFuncton("0", 0, Number(isContainsPre?.amount) + amount);
            }
          } else {
            setBetFuncton("0", 0, amount);
          }
          e.stopPropagation();
        }}
      >
        <IconButton sx={{ ...style.btn4, alignItems: "center" }}>
          <span id="0" style={{ fontWeight: "500" }}>
            0
          </span>
        </IconButton>
      </Box>
    </Stack>
  );
};

export default Zero;
