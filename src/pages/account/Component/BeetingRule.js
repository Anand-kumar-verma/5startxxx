import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Box, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { starbluegrad, zubgback, zubgmid } from '../../../Shared/color';
import logo2 from "../../../assets/images/5-Star-XXX-8-29-2024.png";
import Layout from '../../../component/Layout/Layout';

function BettingIncomeRule() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Container sx={style.container}>
        <Box sx={style.header} className={"!w-full !flex !justify-center"}>
          <Box
            component="img"
            src={logo2}
            sx={{ width: '150px' }}
          ></Box>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} />
              <Typography variant="body1" color="initial">Sponsor Betting Income</Typography>
            </Stack>
          </Stack>
          <Typography variant="body1" color="initial" className='!text-xl !pt-5'>You will earn 7% of your referral member's every betting amount.</Typography>
        </Box>
      

      </Container>
    </Layout>
  );
}

export default BettingIncomeRule;


export const style = {
  container: { background: zubgback, width: '100%', height: '100vh', overflow: 'auto', },
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
  notificationBox: {
    width: '95%', marginLeft: '2.5%', borderRadius: '10px', background: zubgmid, padding: '10px', mt: '10px',
    '&>div>div>p': { color: 'white', fontSize: '14px', marginLeft: '10px', fontWeight: '500', },
    '&>p': { color: 'white', fontSize: '13px', marginLeft: '0px', fontWeight: '500', mt: '10px', },
    '&>div>div>svg': { color: 'white', fontSize: '24px', }, '&>div>svg': { color: 'white', fontSize: '24px', },
  }, notificationStack: { alignItems: 'center', justifyContent: 'space-between', },
};
