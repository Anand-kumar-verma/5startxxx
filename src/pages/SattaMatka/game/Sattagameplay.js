import { ArrowBackRounded, Wallet } from '@mui/icons-material'
import { Box, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../../../component/Layout/Layout'
import FitbitIcon from "@mui/icons-material/Fitbit";
import { starblue, stardarkblue, stargrad } from '../../../Shared/color';
import { Tabs, Tab, } from '@mui/material';
import Jodi from './LocationGame';
import Haroof from './AnderBaherGame';
import AndarBaharTable from './AnderBaherGame';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiConnectorPost } from '../../../services/apiconnector';
import { endpoint } from '../../../services/urls';
import CustomCircularProgress from '../../../Shared/CustomCircularProgress';

function Sattagameplay() {

  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  

  return (
    <Layout>
      <Box sx={style.root}>
        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={style.container}
        >
          <Box sx={{ background: stargrad, py: 2, }}  >
            <Box className="w95" sx={style.flexbetween}>
              <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <Box component={NavLink} to="/satta/matka">
                  <ArrowBackRounded sx={{ mr: 1, color: 'white', }} />
                </Box>
                <Typography variant="body1" className='fp15' sx={{ color: 'white' }}>Gali </Typography>
              </Box>
              <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <Wallet sx={{ mr: 1, color: 'white', }} />
                <Typography variant="body1" className='fp15' sx={{ color: 'white' }}>₹ 10.50</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '100%', mt: 1 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Tab label="Gali" sx={{ flex: 1, color: 'white' }} />
              <Tab label="Andar / Bahar" sx={{ flex: 1, color: 'white' }} />
            </Tabs>
            {value === 0 && <Jodi />}
            {value === 1 && <AndarBaharTable />}
          </Box>
        </Container>
      </Box >
    </Layout >
  )
}

export default Sattagameplay

const style = {
  root: { background: stardarkblue, pb: 6 },
  container: { background: stardarkblue, },
  banner: { background: stargrad, padding: '10px 0px' },
  bannerText: { color: "white" },
  flexbetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' },
}