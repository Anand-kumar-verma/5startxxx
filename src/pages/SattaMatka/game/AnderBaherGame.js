
import React from 'react';
import { Grid, TextField, Typography, Box, Button } from '@mui/material';
import { stargrad } from '../../../Shared/color';

const AndarBaharTable = () => {
  const renderRows = (labelPrefix) => {
    return Array.from({ length: 10 }, (_, index) => (
      <Grid container key={index} spacing={2}>
        <Grid item xs={4} >
          <Typography variant="body1" className='fp13' align="center" sx={{ color: 'white', mt: 1, }}>
            {`${labelPrefix}${index}`}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', borderRadius: 0,
                },
                '&:hover fieldset': {
                  borderColor: 'white', borderRadius: 0,
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', borderRadius: 0,
                },
                color: 'white',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
            placeholder='₹'
            variant="outlined"
            size="small"
            fullWidth
            type='number'
          // InputProps={{
          //   startAdornment: (
          //     <Typography variant="h6" sx={{ color: 'white' }}>₹</Typography>
          //   )
          // }}
          />
        </Grid>
      </Grid>
    ));
  };

  return (
    <Box sx={{ padding: 2, borderRadius: 2 }} className="w95" mt={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ border: '1px solid white', width: '48%', borderRadius: '5px' }}>
          <Typography className='fp15' variant="body1" sx={{ color: 'white', py: 1, borderBottom: '1px solid white', margin: 0, }} align="center" gutterBottom>
            ANDER
          </Typography>
          {renderRows('A')}
        </Box>
        <Box sx={{ border: '1px solid white', width: '48%', borderRadius: '5px' }}>
          <Typography className='fp15' variant="h5" sx={{ color: 'white', py: 1, borderBottom: '1px solid white', margin: 0, }} align="center" gutterBottom>
            BAHAR
          </Typography>
          {renderRows('B')}
        </Box>
      </Box>
      <Box sx={{ pt: 4, pb: 2 }}  >
        <Box className="w95" sx={style.flexbetween}>
          <Box sx={{ width: '50%', }}>
            <Typography variant="body1" className='fp13' sx={{ color: 'white' }}>Total Amount:</Typography>
            <Typography variant="body1" className='fp18' sx={{ color: 'white' }}>₹  150.00</Typography>
          </Box>
          <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <Button sx={style.openButton}>Place Bid</Button>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default AndarBaharTable;

const style = {
  flexbetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' },
  openButton: {
    width: '100%', background: '#24cc3b', textTransform: 'capitalize', borderRadius: '5px', color: 'white', mb: 1, py: 1,
    "&:hover": { backgroundColor: '#24cc3b', },
  },
}
