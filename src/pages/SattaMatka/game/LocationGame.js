import { Box, Button, Typography, TextField, Drawer } from '@mui/material';
import React, { useRef, useState } from 'react';
import { stargrad } from '../../../Shared/color';

function Jodi() {
  const buttons = Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0'));

  const [open, setOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  const myElementRef = useRef(null);

  const handleClick = () => {
    toggleDrawer(false);

    if (myElementRef.current) {
      myElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const handleClickbtn = (number) => {
    setSelectedNumber(number);
  };

  return (
    <Box className="w95">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between', my: 5 }}>
        {buttons.map((number) => (
          <Button
            onClick={() => {
              handleClickbtn(number);
              toggleDrawer(true);
            }}
            key={number}
            variant="contained"
            sx={{
              width: '50px',
              height: '50px',
              textAlign: 'center',
              background: number === selectedNumber ? '#4caf50' : '#8d819f',
              color: 'white',
              '&:hover': {
                background: number === selectedNumber ? '#45a049' : '#6a4a71', // Hover color based on selection
              },
            }}
          >
            {number}
          </Button>
        ))}
      </Box>
      <Box sx={{ pb: 4 }}>
        <Box className="w95" sx={style.flexbetween}>
          <Box sx={{ width: '50%' }}>
            <Typography variant="body1" className='fp13' sx={{ color: 'white' }}>Total Amount:</Typography>
            <Typography variant="body1" className='fp18' sx={{ color: 'white' }}>₹ 150.00</Typography>
          </Box>
          <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <Button sx={style.openButton}>Place Bid</Button>
          </Box>
        </Box>
      </Box>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#2C092D',
            borderRadius: '16px 16px 0 0',
            padding: '8px',
            color: '#fff',
          },
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            padding: '20px 16px',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: '10px', fontSize: '25px', fontWeight: '600px' }}>
            43
          </Typography>
          <Typography variant="subtitle1" className='fp15' sx={{ marginBottom: '10px' }}>
            Enter Bid Amount
          </Typography>
          <TextField
            fullWidth
            type="number"
            placeholder="00"
            sx={{
              backgroundColor: '#4A234F',
              borderRadius: '50px',
              input: { color: '#fff' },
            }}
          />
          <Button
            className='fp15'
            fullWidth
            variant="contained"
            onClick={handleClick}
            sx={{
              marginTop: '16px',
              background: stargrad,
              color: '#fff',
              borderRadius: '8px',
              py: 1,
              mb: 2,
            }}
          >
            ADD BID
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{
              marginTop: '8px',
              color: '#fff',
              textDecoration: 'underline',
            }}
          >
            Remove this bet
          </Button>
        </Box>
      </Drawer>
      <Box sx={{ py: 2 }}></Box>
      <div ref={myElementRef}></div>
    </Box>
  )
}

export default Jodi;

const style = {
  flexbetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  openButton: {
    width: '100%',
    background: '#24cc3b',
    textTransform: 'capitalize',
    borderRadius: '5px',
    color: 'white',
    mb: 1,
    py: 1,
    "&:hover": { backgroundColor: '#24cc3b' },
  },
};
