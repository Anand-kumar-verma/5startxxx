import { Box, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import home from '../../../../assets/images/home.png';
import homeact from '../../../../rollet/assets/images/home.png';
import promotionact from '../../../../rollet/assets/images/megaphone.png';
import promotion from '../../../../assets/images/megaphone.png';
import puzzleact from '../../../../rollet/assets/images/puzzle.png';
import puzzle from '../../../../assets/images/puzzle.png';
import useract from '../../../../rollet/assets/images/user.png';
import user from '../../../../assets/images/user.png';
import walletact from '../../../../rollet/assets/images/wallet-filled-money-tool.png';
import wallet from '../../../../assets/images/wallet-filled-money-tool.png';
import { starbluegrad, stardarkblue, stargold } from "../../../../Shared/color";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import MediationRoundedIcon from '@mui/icons-material/MediationRounded';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0px",
        width: "100%",
        backgroundColor: "transparent",
        zIndex: '10000000000000000000000000000',
      }}
    >
      <Box sx={style.root}>
        <Stack direction="row" sx={style.stack}>
          <Box sx={{ ...style.nav, background: location.pathname == "/dashboard" ? stargold : '' }} onClick={() => navigate("/dashboard")}>
            {location.pathname == "/dashboard" && (
              <HomeRoundedIcon sx={{ color: 'white' }} />

            )}
            {location.pathname !== "/dashboard" && (
              <HomeRoundedIcon sx={{ color: 'white' }} />
            )}
            <Typography variant="body1" className="kip13" sx={{ color: 'white' }}>
              Home
            </Typography>
          </Box>

          <Box sx={{ ...style.nav, background: location.pathname == "/promotion" ? stargold : '' }} onClick={() => navigate("/promotion")}>
            {location.pathname == "/promotion" && (
              <MediationRoundedIcon sx={{ color: 'white' }} />
            )}
            {location.pathname !== "/promotion" && (
              <MediationRoundedIcon sx={{ color: 'white' }} />
            )}
            <Typography variant="body1" className="kip13" sx={{ color: 'white' }}>
              Promotion
            </Typography>
          </Box>
          <Box sx={{ ...style.nav, background: location.pathname == "/wallet" ? stargold : '' }} onClick={() => navigate("/wallet")}>
            {location.pathname == "/wallet" && (
              <StorefrontRoundedIcon sx={{ color: 'white' }} />
            )}
            {location.pathname !== "/wallet" && (
              <StorefrontRoundedIcon sx={{ color: 'white' }} />
            )}
            <Typography variant="body1" className="kip13" sx={{ color: 'white' }}>
              Wallet
            </Typography>
          </Box>
          <Box sx={{ ...style.nav, background: location.pathname == "/account" ? stargold : '' }} onClick={() => navigate("/account")}>
            {location.pathname == "/account" && (
              <MenuOpenRoundedIcon sx={{ color: 'white' }} />
            )}
            {location.pathname !== "/account" && (
              <MenuOpenRoundedIcon sx={{ color: 'white' }} />
            )}
            <Typography variant="body1" className="kip13" sx={{ color: 'white' }}>
              Account
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
    // <Box
    //   sx={{
    //     position: "fixed",
    //     bottom: "0px",
    //     width: "100%",
    //     backgroundColor: 'transparent',
    //   }}
    // >
    //   <Box sx={style.root}>
    //     <Stack direction="row" sx={style.stack}>
    //       <Box sx={style.nav} onClick={() => navigate("/dashboard")}>
    //         {location.pathname == "/dashboard" && <Box component='img' src={homeact} width={25} />}
    //         {location.pathname !== "/dashboard" && <Box component='img' src={home} width={25} />}
    //         <Typography variant="body1" sx={style.text}>
    //           Home
    //         </Typography>
    //       </Box>
    //       <Box sx={style.nav} onClick={() => navigate("/activity")}>
    //         {location.pathname == "/activity" && <Box component='img' src={puzzleact} width={25} />}
    //         {location.pathname !== "/activity" && <Box component='img' src={puzzle} width={25} />}
    //         <Typography variant="body1" sx={style.text}>
    //           Activity
    //         </Typography>
    //       </Box>
    //       <Box sx={style.nav} onClick={() => navigate("/promotion")}>
    //         {location.pathname == "/promotion" && <Box component='img' src={promotionact} width={25} />}
    //         {location.pathname !== "/promotion" && <Box component='img' src={promotion} width={25} />}
    //         <Typography variant="body1" sx={style.text}>
    //           Promotion
    //         </Typography>
    //       </Box>
    //       <Box onClick={() => navigate("/wallet")} sx={style.nav}>
    //         {location.pathname == "/wallet" && <Box component='img' src={walletact} width={25} />}
    //         {location.pathname !== "/wallet" && <Box component='img' src={wallet} width={25} />}
    //         <Typography variant="body1" sx={style.text}>
    //           Wallet
    //         </Typography>
    //       </Box>
    //       <Box sx={style.nav} onClick={() => navigate("/account")}>
    //         {location.pathname == "/account" && <Box component='img' src={useract} width={25} />}
    //         {location.pathname !== "/account" && <Box component='img' src={user} width={25} />}
    //         <Typography variant="body1" sx={style.text}>
    //           Account
    //         </Typography>
    //       </Box>
    //     </Stack>
    //   </Box>
    // </Box>
  );
}

export default Footer;

const style = {
  root: {
    background: starbluegrad,
    height: "60px",
    borderRadius: "5px 5px 0px 0px",
    // padding: "10px 20px 0px 20px",
    maxWidth: "575px",
    margin: "auto",
    position: 'relative',
    zIndex: 5000000,
    overflow: 'hidden',
  },
  icon: { fontSize: "25px", "&>path": { color: "white !important" } },
  text: { fontSize: "13px", fontWeight: 500, color: starbluegrad },
  stack: { alignItems: "end", justifyContent: "space-between" },
  nav: {
    width: '25%',

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",
  },
};
