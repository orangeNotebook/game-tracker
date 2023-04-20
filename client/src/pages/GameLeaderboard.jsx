import { useParams } from "react-router-dom";
import GameSpecificLeaderboard from "../components/GameLeaderboard";

const GlobalLeaderboard = () => {
  const { gameTitle } = useParams();

  return <GameSpecificLeaderboard gameTitle={gameTitle} />;
};

export default GlobalLeaderboard;
