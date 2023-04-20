import { useParams } from "react-router-dom";
import MatchDetailsComponent from "../components/MatchDetails";

const MatchDetails = () => {
  const { matchId } = useParams();

  return (
    <div>
      <MatchDetailsComponent matchId={matchId} />
    </div>
  );
};

export default MatchDetails;
