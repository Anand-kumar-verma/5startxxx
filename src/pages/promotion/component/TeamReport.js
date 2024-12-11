import {
  Box,
  Container
} from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { starblue, starbluegrad, zubgback } from "../../../Shared/color";
import logo2 from "../../../assets/images/5-Star-XXX-8-29-2024.png";
import Layout from "../../../component/Layout/Layout";
import { apiConnectorGet } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";

function TeamReports() {
  const { isLoading, data } = useQuery(
    ["team_data"],
   async () =>await apiConnectorGet(endpoint?.get_team_data),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const result = data?.data?.data;

  return (
    <Layout>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header} className={"!w-full !flex !justify-center"}>
          <Box
            component="img"
            src={logo2}
            sx={{ width: '150px' }}
          ></Box>
        </Box>
        <Box sx={{ paddingTop: 2 }} className="mb-10">
          <Box
            sx={{
              background: starblue,
              borderRadius: "10px",
              padding: "30px 20px",
              "&>div": { mb: 2 },
              "&>div>div:nth-child(1)": {
                borderRight: "1px solid black",
                width: "50%",
                textAlign: "center",
              },
              "&>div>div:nth-child(2)": { width: "50%", textAlign: "center" },
              "&>div>div>p": {
                color: "white",
                fontSize: "14px",
                fontWeight: 500,
              },
            }}
          >
            <div className="!grid !grid-cols-10 !text-white !text-xs pl-2 !place-items-center !bg-opacity-5" >
              <span>S.No.</span>
              <span>User </span>
              <span className="!col-span-2">Name</span>
              <span className="!col-span-2">Mobile No</span>
              <span className="!col-span-2">Amount</span>
              <span className="!col-span-2">Win Amnt</span>
            </div>
            <div className="h-[2px] w-full !bg-[#281970]"></div>
            {result?.map((i, index) => {
              return (
                <div className="!grid !grid-cols-10 !text-white !text-xs !place-items-center">
                  <span >{index + 1}</span>
                  <span>{i?.username}</span>
                  <span className="!text-center !col-span-2">{i?.full_name || "No data found"}</span>
                  <span className="!col-span-2">{i?.mobile || "987654210"}</span>
                  <span className="!col-span-2">{Number(i?.wallet)?.toFixed(2) || 0}</span>
                  <span className="!col-span-2">{Number(i?.winning_wallet)?.toFixed(2) || 0}</span>
                </div>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default TeamReports;

const style = {

  header: {
    padding: "0px 8px",
    background: starbluegrad,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
  },
};
