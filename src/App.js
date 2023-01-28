import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import StickyFooter from "./components/footer/StickyFooter";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar/Sidebar";
import { fetchCart, fetchHomePageProducts, useUserInfo } from "./redux";
import { RoutesComponent } from "./Routes";

const StyledContentContainer = styled(Box)(() => ({
    padding: "20px",
    marginLeft: "255px",
    marginTop: "70px",
    minHeight: "100vh",
}));

function App() {
  const dispatch = useDispatch();
  const userInfo = useUserInfo()
  useEffect(() => {
    dispatch(fetchHomePageProducts())
    if (userInfo) {
      dispatch(fetchCart(userInfo._id))
    }
  }, []);
  
  return (
    <Box>
      <Sidebar/>
      <Header />
      <StyledContentContainer>
        <RoutesComponent />
      </StyledContentContainer>
      <StickyFooter/>
    </Box>
  );
}

export default App;
