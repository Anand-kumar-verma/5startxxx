import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loss from "../../../assets/images/loss.png"
import win from "../../../assets/images/winnner.png";
import { apiConnectorGet } from "../../../services/apiconnector";
import { useQuery } from "react-query";
import { endpoint } from "../../../services/urls";


const WinLossPopup = () => {
  const [loding, setloding] = useState(false);
  const [status, setstatus] = useState("");
  const [newstatus, setstatusNew] = useState("");
  const [all_result, setall_result] = useState();

  const { data } = useQuery(
    ["my_history"],
    () => apiConnectorGet(endpoint?.node?.satta_game_myhistory),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );
  const res = data?.data?.data;

  const MyHistoryFn = async () => {
    setloding(true);
    try {
      const firstId = res?.[0]?.gamesno;
      const winAmnt =
      res
          ?.filter((i) => i?.gamesno === firstId)
          ?.reduce((a, b) => a + Number(b?.win || 0), 0) || 0;
      const amntAmnt =
      res
          ?.filter((i) => i?.gamesno === firstId)
          ?.reduce((a, b) => a + Number(b?.amount || 0), 0) || 0;
      setall_result(res?.[0]);

      if (winAmnt) {
        setstatus({
          status: "1",
          amount: winAmnt,
        });
      } else {
        setstatus({
          status: "2",
          amount: amntAmnt,
        });
        // toast("Your Loss");
      }
      // setstatus(response?.data?.data?.[0]);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    MyHistoryFn();
    setTimeout(() => {
      localStorage.setItem("betApplied", false);
    }, 5000);
  }, []);

  useEffect(() => {
    setstatusNew(status);
  }, [status]);

  return (
    <Box
      sx={{
        width: "300px",
        height: "400px",
        margin: "auto",
        backgroundImage: `url(${(status?.status === "1" && Loss) || (status?.status === "2" && win)
          })`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {!loding && newstatus && (
        <>
          <Typography
            variant="body1"
            color="initial"
            className="crlg !text-center"
          >
             {(status?.status === "1" && "Win") ||
              (status?.status === "2" && "Loss")}
          </Typography>

          
          <Typography
            variant="body1"
            color="initial"
            className={`bonustext ${status?.status === "1" ? "!text-green" : "!text-red"
              }
            !mr-0
            `}
          >
            {(status?.status === "1" && (
              <>
                <div className="!text-sm !ml-7 !flex !items-center !gap-2">
                  <span>Results: </span>
                  <span>
                  {all_result?.satta_type === "satta_gaziabad"
                            ? "GHAZIABAD"
                            : all_result?.satta_type === "satta_faridabad"
                            ? "FARIDABAD"
                            : all_result?.satta_type === "satta_gali"
                            ? "GALI"
                            : "DESAWAR"}{" "}
                  </span>
                  <span
                    className="!bg-green-500 !text-center !p-2 !rounded-md"
                  >
                    {Number(all_result?.result_number)}
                  </span>

                 
            
                </div>
                <div className="!text-[20px] !mt-4">Bonus</div>
              </>
            )) ||
              (status?.status === "2" && "Loss Amount")}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonusamt  ${status?.status === "1" ? "!text-green-500" : "!text-red-300"
              }`}
          >
            ₹ {Number(status?.amount || 0)?.toFixed(2) || 0}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonuspr ${status?.status === "1" ? "!text-white" : "!text-black"
              }`}
          >
            Period min :{all_result?.gamesno}
            {/* {(status?.gameid === "1" && "One") ||
              (status?.gameid === "3" && "Three") ||
              (status?.gameid === "5" && "Five")}{" "} */}
          </Typography>
          <Typography variant="body1" color="initial" className="bonuscl">
            {(status?.status === "1" && "") || (status?.status === "2" && "Try Again")}
            {/* Auto Close in 5 sec{" "} */}
          </Typography>
        </>
      )}
    </Box>
  );
};


export default WinLossPopup;
