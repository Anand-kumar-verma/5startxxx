import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CryptoJS from 'crypto-js';
import { useFormik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { starbluegrad, zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import payment from "../../../assets/wallet2.png";
import Layout from "../../../component/Layout/Layout";
import { apiConnectorPost } from "../../../services/apiconnector";
import { endpoint } from "../../../services/urls";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";

function AddBankDetails() {
  const login_data = localStorage.getItem("logindataen") && CryptoJS.AES.decrypt(localStorage.getItem("logindataen"), "anand")?.toString(CryptoJS.enc.Utf8) || null
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const client = useQueryClient()
  const [Loading, setloding] = React.useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const initialValues = {
    u_details_type: "",
    u_holder_name: "",
    u_bank_name: "",
    u_account_no: "",
    u_ifsc: "",
    u_upi_id: "",
  };

  const fk = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
 if (!fk.values.u_account_no || !fk.values.u_holder_name ||!fk.values.u_bank_name ||!fk.values.u_account_no || !fk.values.u_ifsc) {
        toast("Please enter all fields");
        return; 
      }  
      const reqBody ={
        user_id: user_id,
        u_details_type:"2" ,
        u_holder_name: fk.values.u_holder_name,
        u_bank_name:fk.values.u_bank_name,
        u_account_no:fk.values.u_account_no,
        u_ifsc:fk.values.u_ifsc,
        u_upi_id:fk.values.u_upi_id,
      }
      addbankDetailsFunction(reqBody);
    },
  });

  const addbankDetailsFunction = async (reqBody) => {
    setloding(true);
    try {
      const response = await apiConnectorPost(`${endpoint.node.add_bank}`, reqBody);
      toast(response?.data?.msg)
      setloding(false);
      if ("BankAdded Successfully." === response?.data?.msg)
      fk.handleReset();
      client.refetchQueries("bank_list_details");
      if (response?.data?.msg) {
        navigate('/add-bank-details/pre-added-bank-details')
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };

  return (
    <Layout>
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
            Add Bank Details
          </Typography>
          <Box component={NavLink} to="/add-bank-details/pre-added-bank-details">
            <HistoryIcon />
          </Box>
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
              mb: 5,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
              <Box component="img" src={payment} width={30} sx={{ filter: 'grayscale(1)' }}></Box>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
              >
                Add Bank Details
              </Typography>
            </Stack>
            <Box mt={2} component="form" onSubmit={fk.handleSubmit}>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Account holder name <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="u_holder_name"
                  name="u_holder_name"
                  type="text"
                  value={fk.values.u_holder_name}
                  onChange={fk.handleChange}
                  placeholder="Enter account holder name *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
               
              </FormControl>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Enter Bank Name <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="u_bank_name"
                  name="u_bank_name"
                  value={fk.values.u_bank_name}
                  onChange={fk.handleChange}
                  placeholder="Enter Bank Name *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
             
              </FormControl>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    Enter Account Number <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="u_account_no"
                  name="u_account_no"
                  value={fk.values.u_account_no}
                  onChange={fk.handleChange}
                  placeholder="Enter Account No *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
               
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    IFSC <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="u_ifsc"
                  name="u_ifsc"
                  type="text"
                  value={fk.values.u_ifsc}
                  onChange={fk.handleChange}
                  placeholder="Enter IFSC *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                
              </FormControl>

              <FormControl fullWidth sx={{ mt: "10px" }}>
                <Stack direction="row" className="loginlabel">
                  <Typography variant="h3">
                    UPI code <span className="!text-red-600">*</span>
                  </Typography>
                </Stack>
                <TextField
                  id="u_upi_id"
                  name="u_upi_id"
                  type="text"
                  value={fk.values.u_upi_id}
                  onChange={fk.handleChange}
                  placeholder="Enter UPI code *"
                  className="withdrawalfield"
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
              
              </FormControl>
          
              <Button
                sx={style.paytmbtntwo}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  fk.handleSubmit();
                }}
              >
                Submit{" "}
              </Button>
              {Loading && (
                    <CustomCircularProgress isLoading={Loading} />)}
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default AddBankDetails;

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
    background: starbluegrad,
    color: "white !important",
    width: "100%",
    mt: "20px",
    padding: "10px",
    "&:hover": { background: starbluegrad, },
  },

  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },

};

