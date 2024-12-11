import { Cancel } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import {
  starblue,
  starbluegrad,
  zubgback,
  zubgbackgrad,
  zubgmid,
} from "../../../Shared/color";
import deposit from "../../../assets/history2.png";
import logo2 from "../../../assets/images/5-Star-XXX-8-29-2024.png";
import Layout from "../../../component/Layout/Layout";
import {
  apiConnectorGet,
  apiConnectorPost,
} from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";

function History() {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [start, setStart] = React.useState(
    moment(Date?.now())?.format("YYYY-MM-DD")
  );
  const [end, setEnd] = React.useState(
    moment(Date?.now())?.format("YYYY-MM-DD")
  );

  const { data } = useQuery(
    ["my_history", start, end],
    () =>
      apiConnectorPost(endpoint.node.satta_game_myhistory, {
        startDate: start || moment(Date?.now())?.format("YYYY-MM-DD"),
        endDate: end || moment(Date?.now())?.format("YYYY-MM-DD"),
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );
  const myhistory = data?.data?.data || [];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      myhistory?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, myhistory]
  );
  return (
    <Layout>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar"
      >
        <CustomCircularProgress isLoading={loading} />
        <Box sx={style.header} className={"!w-full !flex !justify-center"}>
          <Box component="img" src={logo2} sx={{ width: "150px" }}></Box>
        </Box>

        <Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              // background: zubgmid,
              borderRadius: "10px",
              mb: 5,
              mt: 2,
            }}
          >
            {/* <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
              <Box
                component="img"
                src={deposit}
                width={30}
                sx={{ filter: "grayscale(1)" }}
              ></Box>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
              >
                My history
              </Typography>
            </Stack> */}
            <Box sx={style.filterContainer} className="w95 !text-white" mb={4}>
              <Box
                sx={{ display: "flex", width: "100%", gap: "8px" }}
                className="!text-white"
              >
                <TextField
                  label="Start Date"
                  placeholder="Select start date"
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={style.dateField}
                />
                <TextField
                  label="End Date"
                  placeholder="Select end date"
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={style.dateField}
                />
              </Box>
            </Box>

            {visibleRows?.map((item) => {
              return (
                <>
                  <Box
                    sx={{
                      mb: 2,
                      padding: "15px",
                      borderRadius: "10px",
                      background: zubgmid,
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        paddingBottom: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        //   borderBottom: "1px solid white",
                      }}
                    >
                      <Box>
                        <Button
                          sx={{ color: "white", textTransform: "capitalize" }}
                        >
                          {item?.satta_type === "satta_gaziabad"
                            ? "GHAZIABAD"
                            : item?.satta_type === "satta_faridabad"
                            ? "FARIDABAD"
                            : item?.satta_type === "satta_gali"
                            ? "GALI"
                            : "DESAWAR"}{" "}
                          <span className="!pl-3 !text-yellow-500">
                            {item?.gamesno}
                          </span>{" "}
                        </Button>
                        <span className="!pl-3 !text-yellow-500">
                          {moment(item?.datetime)?.format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        </span>
                      </Box>
                      <Box>
                        <Button
                          sx={{
                            // background: zubgmid,
                            background: "white",
                            color: "green",
                            textTransform: "capitalize",
                          }}
                        >
                          {item?.result_number === 0
                            ? "00"
                            : item?.result_number &&
                              String(item?.result_number).padStart(2, "0")}

                          {/* {item?.result_number && String(item?.result_number)?.padStart(2, "0")} */}
                        </Button>
                      </Box>
                    </Stack>
                    <div className="!overflow-scroll">
                      {/* Section for 'No.' */}
                      <p className="!flex">
                        <span className="!text-white min-w-[90px] text-center !border-2 !border-white px-2 py-1 box-border">
                          No.
                        </span>
                        {/* {item?.number?.split(",")?.map((j, index) => (
                          <span
                            key={index}
                            className="!text-white min-w-[90px] text-center !border-2 !border-white px-2 py-1 box-border overflow-x-auto"
                          >
                            {Number(j) >= 1000 && Number(j) <= 1009
                              ? (Number(j) % 10) + "*"
                              : Number(j) >= 2000 && Number(j) <= 2009
                                ? "*" + (Number(j) % 10)
                                : Number(j)}
                          </span>
                        ))} */}
                        {item?.number?.split(",")?.map((j, index) => (
                          <span
                            key={index}
                            className="!text-white min-w-[90px] text-center !border-2 !border-white px-2 py-1 box-border overflow-x-auto"
                          >
                            {Number(j) >= 1000 && Number(j) <= 1009
                              ? (Number(j) % 10) + "*"
                              : Number(j) >= 2000 && Number(j) <= 2009
                              ? "*" + (Number(j) % 10)
                              : Number(j).toString().padStart(2, "0")}
                          </span>
                        ))}
                      </p>

                      {/* Section for 'Bid Amnt.' */}
                      <p className="!flex">
                        <span className="!text-white !text-[11px] min-w-[90px] text-center !border-2 !border-white px-2 py-1 box-border">
                          Bid Amnt.
                        </span>
                        {item?.amount_string
                          ?.split(",")
                          .filter((j) => j.trim() !== "") // Filter out empty strings
                          .map((j, index) => (
                            <span
                              key={index}
                              className="!text-white min-w-[90px] text-center !border-2 !border-white px-2 py-1 box-border overflow-x-auto"
                            >
                              {Number(j) === 0 ? (
                                <Cancel className="!text-red-500" />
                              ) : (
                                <span className="!text-white">
                                  {Number(j)?.toFixed(2)}
                                </span>
                              )}
                            </span>
                          ))}
                      </p>

                      {/* Section for 'Won' */}
                      <p className="!flex">
                        {item?.win_string && (
                          <span className="!text-white min-w-[90px] text-center !border-2 !border-white px-2 py-1 box-border">
                            Won
                          </span>
                        )}
                        {item?.win_string
                          ?.split(" ")
                          .filter((j) => j.trim() !== "") // Filter out empty strings
                          .map((j, index) => (
                            <span
                              key={index}
                              className="!text-white min-w-[90px] text-center !border-2 !border-white px-2 py-1 box-border overflow-x-auto"
                            >
                              {Number(j) === 0 ? (
                                <Cancel className="!text-red-500" />
                              ) : (
                                <span className="!text-green-500">
                                  {Number(j)?.toFixed(2)}
                                </span>
                              )}
                            </span>
                          ))}
                      </p>
                    </div>

                    {/* <div className="!overflow-scroll">
                      <p className="!flex">
                        <span className="!text-white !w-[90px] text-center !border-2 !border-white px-2 py-1">
                          No.
                        </span>
                        {item?.number?.split(",")?.map((j, index) => (
                          <span
                            key={index}
                            className="!text-white !w-[90px] text-center !border-2 !border-white px-2 py-1"
                          >
                            {Number(j) >= 1000 && Number(j) <= 1009
                              ? (Number(j) % 10) + "*"
                              : Number(j) >= 2000 && Number(j) <= 2009
                              ? "*" + (Number(j) % 10)
                              : Number(j)}
                          </span>
                        ))}
                      </p>
                      <p className="!flex">
                        <span className="!text-white !text-[11px] !w-[90px] text-center !border-2 !border-white px-2 py-1">
                          Bid Amnt.
                        </span>
                        {item?.amount_string
                          ?.split(",")
                          .filter((j) => j.trim() !== "") // Filter out empty strings
                          .map((j, index) => (
                            <span
                              key={index}
                              className="!text-white !w-[90px] text-center !border-2 !border-white px-2 py-1"
                            >
                              {Number(j) === 0 ? (
                                <Cancel className="!text-red-500" />
                              ) : (
                                <span className="!text-white">
                                  {Number(j)?.toFixed(2)}
                                </span>
                              )}
                            </span>
                          ))}
                      </p>

                      <p className="!flex">
                        {item?.win_string && (
                          <span className="!text-white !w-[90px] text-center !border-2 !border-white px-2 py-1">
                            Won
                          </span>
                        )}
                        {item?.win_string
                          ?.split(" ")
                          .filter((j) => j.trim() !== "") // Filter out empty strings
                          .map((j, index) => (
                            <span
                              key={index}
                              className="!text-white !w-[90px] text-center !border-2 !border-white px-2 py-1"
                            >
                              {Number(j) === 0 ? (
                                <Cancel className="!text-red-500" />
                              ) : (
                                <span className="!text-green-500">
                                  {Number(j)?.toFixed(2)}
                                </span>
                              )}
                            </span>
                          ))}
                      </p>
                    </div> */}
                  </Box>
                </>
              );
            })}
          </Box>
          <Box sx={{ background: "white" }}>
            <Stack spacing={2}>
              <TablePagination
                className="!fixed !bottom-14 "
                sx={{ background: starblue, color: "white" }}
                rowsPerPageOptions={[10, 15, 20]}
                component="div"
                count={myhistory?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows"
              />
            </Stack>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default History;

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
  dateField: {
    width: "50%",
    padding: "5px",
    borderRadius: "4px",
    backgroundColor: starblue,
    "& .MuiInputBase-root": {
      borderRadius: "4px",
      backgroundColor: starblue,
    },
    "& .MuiInputBase-input": {
      fontSize: "14px",
      color: "#ffffff",
      padding: "8px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#ffffff",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#e0e0e0",
      opacity: 1,
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
    background: zubgbackgrad,
    color: "white !important",
    width: "100%",
    mt: 2,
    border: "1px solid white",
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
