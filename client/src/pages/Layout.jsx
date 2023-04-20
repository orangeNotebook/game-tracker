import { Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <Paper sx={{ width: "100vw", height: "100vh" }}>
      <Header />
      <Outlet />
    </Paper>
  );
};

export default Layout;
