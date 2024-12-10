import { ArrowBackRounded, Wallet } from "@mui/icons-material";
import { Box, Container, Dialog, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavLink, useLocation } from "react-router-dom";
import Layout from "../../../component/Layout/Layout";
import {
  apiConnectorGet,
  apiConnectorPost,
} from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import { stardarkblue, stargrad } from "../../../Shared/color";
import { getSattaType } from "../../../Shared/sharedFunction";
import AndarBaharTable from "./AnderBaherGame";
import Jodi from "./LocationGame";
import WinLossPopup from "./WinLossPopup";
import { useSocket } from "../../../Shared/SocketContext";
function Sattagameplay() {
  const location = useLocation();
  const game_type = location?.state?.satta_type;
  const [value, setValue] = useState(0);
  const [opendialogbox, setOpenDialogBox] = useState(false);
  const isAppliedbet = localStorage.getItem(`betApplied_${game_type}`);
  const socket = useSocket();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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

  useEffect(() => {
    const handleOneMin = (onemin) => {
      const min = Number(String(onemin)?.split("_")?.[0]);
      const sec = Number(String(onemin)?.split("_")?.[1]);
      const time_to_be_intro_mid_min = min > 0 ? 60 - min : min;
      const time_to_be_intro_min =
        time_to_be_intro_mid_min >= 30
          ? time_to_be_intro_mid_min - 30
          : time_to_be_intro_mid_min;
      time_to_be_intro_min === 0 && sec === 0 && setOpenDialogBox(true);
    };
    socket.on("seconds", handleOneMin);
    return () => {
      socket.off("seconds", handleOneMin);
    };
  }, []);
  const { data: history } = useQuery(
    ["game_history", game_type],
    () =>
      apiConnectorPost(endpoint.node.satta_game_gamehistory, {
        startDate: "",
        endDate: "",
        satta_type: game_type,
      }),
    {
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  const gaming = history?.data?.data || [];
  return (
    <Layout>
      <Box sx={style.root}>
        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={style.container}
        >
          <Box sx={{ background: stargrad, py: 2 }}>
            <Box className="w95" sx={style.flexbetween}>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Box component={NavLink} to="/satta/matka">
                  <ArrowBackRounded sx={{ mr: 1, color: "white" }} />
                </Box>
                <Typography
                  variant="body1"
                  className="fp15"
                  sx={{ color: "white" }}
                >
                  {getSattaType?.find((i) => i?.type === game_type)?.name}{" "}
                </Typography>
              </Box>
              <p className="!text-white">{Number(gaming?.[0]?.gamesno) + 1}</p>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Wallet sx={{ mr: 1, color: "white" }} />
                <Typography
                  variant="body1"
                  className="fp15"
                  sx={{ color: "white" }}
                >
                  ₹{" "}
                  {Number(
                    Number(newdata?.wallet || 0) + Number(newdata?.winning || 0)
                  )?.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%", mt: 1 }} className={"!w-[100%]"}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Tab label="Jodi" sx={{ flex: 1, color: "white" }} />
              <Tab label="Andar / Bahar" sx={{ flex: 1, color: "white" }} />
            </Tabs>
            {value === 0 && (
              <Jodi
                game_type={game_type}
              />
            )}
            {value === 1 && <AndarBaharTable game_type={game_type} />}
            
          </Box>
        </Container>
      </Box>
      {opendialogbox && isAppliedbet === "true" && (
        <Dialog
          open={opendialogbox}
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <WinLossPopup game_type={game_type} />
        </Dialog>
      )}
    </Layout>
  );
}

export default Sattagameplay;

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
