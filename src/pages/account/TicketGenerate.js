import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import moment from "moment";
import theme from "../../utils/theme";
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import { starbluegrad, stargrad, zubgback, zubgmid } from "../../Shared/color";
import logo2 from "../../assets/images/5-Star-XXX-8-29-2024.png";
import Layout from "../../component/Layout/Layout";
import { apiConnectorGet, apiConnectorPost } from "../../services/apiconnector";
import { endpoint } from "../../services/urls";
import { useNavigate } from "react-router-dom";

function TicketGenerate() {
  const [isAllValue, setIsAllValue] = React.useState(false);
  const [visibleData, setvisibleData] = React.useState([]);
  const [isvisible, setisvisible] = React.useState(false);
  const client = useQueryClient();
  const navigate = useNavigate();
  const [image, setImage] = React.useState(null);
  const [loding, setloding] = React.useState(false);

  const initialValue = {
    type: "Select Type",
    description: "",
  };
  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (fk.values.type === "Select Type") return "Select Type of issues.";
      const reqBody = {
        files: image,
        type: Number(fk.values.type),
        description: fk.values.description,
      };
      ticketRaised(reqBody);
    },
  });

  async function ticketRaised(reqBody) {
    setloding(true);
    try {
      const response = await apiConnectorPost(endpoint.ticket_raised, reqBody);
      toast(response?.data?.msg);
      if(response?.data?.msg==="Ticket raised successfully."){
        fk.handleReset()
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
    client.refetchQueries("get_ticket_raised_history");
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const { isLoading, data: TicketRaised } = useQuery(
    ["get_ticket_raised_history"],
    () => apiConnectorGet(endpoint?.ticket_raised_history),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  React.useEffect(() => {
    isAllValue
      ? setvisibleData(TicketRaised?.data?.data)
      : setvisibleData(TicketRaised?.data?.data?.slice(0, 3));
  }, [isAllValue, TicketRaised]);

  return (
    <Layout>
      <Container sx={style.container}>
        <Box sx={style.header1} className={"!w-full !flex !justify-center"}>
       
          <Box component="img" src={logo2} sx={{ width: "150px" }}></Box>
        </Box>
       
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
            background: zubgmid,
            padding: "10px",
            mt: "20px",
            "&>:nth-child(1)": {
              color: "white",
              fontSize: "15px",
              fontWeight: "600",
              mb: "25px",
            },
          }}
        >
         
         <div className="flex justify-start gap-1">
            <KeyboardArrowLeftOutlinedIcon className="!text-white !cursor-pointer"  onClick={()=>navigate("/promotion/customerLine/")}/>
        <span className="font-bold">Ticket Generate</span>
              </div>
          <div className="grid grid-cols-2 gap-1 items-center w-[400px] p-5">
        
            <span className="!text-white !my-3 !text-sm">
              Select Ticket Type*
            </span>
            <TextField
              id="type"
              name="type"
              value={fk.values.type}
              onChange={fk.handleChange}
              className="!w-[100%] !bg-white !my-3"
              select
              size="small"
            >
              <MenuItem value={"Select Type"}>Select Type</MenuItem>
              <MenuItem value={"1"}>Deposit</MenuItem>
              <MenuItem value={"2"}>Withdrawal</MenuItem>
              <MenuItem value={"3"}>Bank Details</MenuItem>
              <MenuItem value={"4"}>Payout </MenuItem>
              <MenuItem value={"5"}>Other issue </MenuItem>
            </TextField>

            <span className="!text-white !my-3 !text-sm">Attachment*</span>
            <div>
              <input
                type="file"
                id="myfile"
                name="myfile"
                className="!text-sm !my-3"
                onChange={handleFileChange}
                required
              />
            </div>
            <span className="!text-white !my-3 !text-sm">Description*</span>
            <textarea
              type="textarea"
              id="description"
              name="description"
              placeholder="Enter Description"
              value={fk.values.description}
              onChange={fk.handleChange}
              className="!w-[100%] !bg-white !text-sm  !p-2 !text-black pt-2 !my-3"
            />

          </div>
        </Box>
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
            background: stargrad,
            padding: "8px",
            mt: "20px",
          }}
        >
          <Button
            sx={{
              // background: zubgbackgrad,
              width: "100%",
              color: "white",
              // padding: "10px",
              borderRadius: "10px",
              textTransform: "capitalize",
            }}
            onClick={() => fk.handleSubmit()}
           
          >
            Submit
          </Button>
        </Box>
        {visibleData?.map((i, index) => {
          return (
            <Box
              key={index}
              sx={{
                mb: 2,
                padding: "10px",
                borderRadius: "10px",
                background: zubgmid,
                width: "92%",
                margin: "auto",
                mt: 2,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  paddingBottom: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #efefef",
                }}
              >
                <Box>
                  <Typography className="!bg-[#267bad] !text-white rounded px-2 py-1 !flex justify-center">
                    Ticket
                  </Typography>
                </Box>
                <Box
                  sx={{
                    color: "#888",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {i?.call_back_status}
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p:nth-child(1)": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                  "&>p:nth-child(2)": {
                    color: theme.palette.primary.main,
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography variant="body1" color="initial">
                  Status
                </Typography>
                <Typography variant="body1" className="">
                  {i?.status === 0 ? "Pending" : "Resolved"}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography variant="body1" color="initial">
                  Type
                </Typography>
                <Typography variant="body1" color="initial">
                  {i?.ticket_type}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography variant="body1" color="initial">
                  Time
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  className="!text-green-500"
                >
                  {moment(i?.timestamp)?.format("DD-MM-YYYY HH:mm:ss")}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                }}
              >
                <Typography variant="body1" color="initial">
                  Ticket Id
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&>p:nth-child(1)": {
                      color: "#888",
                      fontSize: "13px",
                      fontWeight: "600",
                      py: 1,
                    },
                    "&>p:nth-child(2)": {
                      color: theme.palette.primary.main,
                      fontSize: "13px",
                      fontWeight: "600",
                    },
                  }}
                >
                  <Typography variant="body1" color="initial">
                    {i?.ticket_id}
                  </Typography>
                  {/* <IconButton sx={{ padding: 0 }}>
                    <ContentCopyIcon
                      sx={{ color: "#888", width: "15px", ml: 1 }}
                    />
                  </IconButton> */}
                </Stack>
              </Stack>
              <div>
                <p className="!text-blue-500">Query:</p>
                <p className="p-2 !w-full !overflow-auto border-2 text-white !border-gray-400  !min-h-[100px]">
                  {i?.description}
                </p>
              </div>

              {i?.status === 1 && (
                <div>
                  <p className="!text-green-500 !font-bold !w-full flex justify-between items-center">
                    <span>Resolution:</span>
                    <span className="!text-[10px]">
                      {moment(i?.resolution_date)?.format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </span>
                  </p>
                  <p className="!px-5 !w-full !overflow-auto border-2 !border-gray-400 !min-h-[100px] !text-white">
                    {i?.resolution}
                  </p>
                </div>
              )}
              <p
                onClick={() => setisvisible(index)}
                className="!cursor-pointer !text-white"
              >
                View Image
              </p>
              {String(isvisible) && index === isvisible && (
                <div className="!flex w-full ">
                  <img src={i?.file_name} className="!w-full !h-[400px]" />
                </div>
              )}
            </Box>
          );
        })}

        <Button
        className="!m-5"
          sx={style.paytmbtntwo}
          variant="outlined"
          onClick={() => setIsAllValue(!isAllValue)}
        >
          {isAllValue ? "Show Less" : " All history"}
        </Button>
        <CustomCircularProgress isLoading={loding || isLoading }/>

      </Container>
    </Layout>
  );
}

export default TicketGenerate;

const style = {
  container: { background: zubgback, mb: "84px" },
  header: {
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: "20px",
  },
  header1: {
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
  profileBox: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  profileImage: { width: "100%", height: "100%" },
  userInfo: {
    "& > :nth-child(1)": {
      fontSize: "18px",
      fontWeight: "600",
      color: "white",
    },
    "& > :nth-child(2)": {
      fontSize: "14px",
      fontWeight: "400",
      color: "white",
    },
  },
  rankImage: { width: "100px", height: "100px" },
  balanceContainer: {
    // background: zubgmid,
    borderRadius: "10px",
    padding: "20px",
    width: "95%",
    margin: "auto",
    position: "relative",
    marginTop: "2px",
    zIndex: 1,
  },
  balanceText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
    marginLeft: "10px",
  },
  totalBalance: {
    fontSize: "30px",
    fontWeight: "600",
    color: "white",
    marginRight: "10px",
  },
  cachedIcon: { color: "white" },
  cardImage: { width: "50px" },
  cardNumber: { fontSize: "14px", color: "white", marginLeft: "10px" },
  actionContainer: {
    background: zubgmid,
    borderRadius: "10px",
    padding: "10px",
    width: "95%",
    margin: "auto",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBox: { width: "20%" },
  actionImage: {
    width: "30px",
    height: "30px",
    margin: "auto",
    filter: "grayscale(1)",
  },
  actionText: {
    color: "white",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "500",
    mt: "5px",
  },
  actionContainertwo: {
    flexDirection: "column",
    borderRadius: "10px",
    width: "95%",
    margin: "auto",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
