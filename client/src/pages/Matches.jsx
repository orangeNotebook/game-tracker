import { useParams } from "react-router-dom";
import AllMatches from "../components/AllMatches";

const Matches = () => {
  const { gameTitle } = useParams();

  return (
    <div>
      <AllMatches gameTitle={gameTitle} />
    </div>
  );
};

export default Matches;
