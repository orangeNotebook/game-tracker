import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Matches from "./pages/Matches";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import AddGame from "./pages/AddGame";
import AddMatch from "./pages/AddMatch";
import MatchDetails from "./pages/MatchDetails";
import GlobalLeaderboard from "./pages/GlobalLeaderboard";
import GameLeaderboard from "./pages/GameLeaderboard";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ffa726",
    },
    info: {
      main: "#29b6f6",
    },
    success: {
      main: "#66bb6a",
    },
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ThemeProvider theme={theme}>
              <Layout />
            </ThemeProvider>
          }
        >
          <Route index element={<Home />} />
          <Route path="/game/:gameTitle" element={<Matches />} />
          <Route path="/add-game" element={<AddGame />} />
          <Route path="/add-match/:gameTitle" element={<AddMatch />} />
          <Route
            path="/match-details/:gameTitle/:matchId"
            element={<MatchDetails />}
          />
          <Route path="/leaderboard" element={<GlobalLeaderboard />} />
          <Route path="/leaderboard/:gameTitle" element={<GameLeaderboard />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
