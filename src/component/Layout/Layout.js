import { Box } from "@mui/material";
import Footer from "./component/Footer/Footer";
import { useEffect } from "react";

function Layout(props) {
  const { header = true, footer = true, children } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    
    <Box
      sx={{
        background: "#0A001B",
        backgroundSize: "cover", // You can adjust the background size as needed
        backgroundPosition: "center", // You can adjust the background position as needed
        backgroundRepeat: "no-repeat", // You can adjust the background repeat as needed
        // Other styles for the container
      }}
    >
      {children}
      {footer && (
        <Box>
          <Footer />
        </Box>
      )}
    </Box>
  );
}

export default Layout;
