import { useParams } from "react-router-dom";
import AllMatches from "../components/AllMatches";
import CreateMatch from "../components/CreateMatch";

const AddMatch = () => {
  const { gameTitle } = useParams();
  return (
    <div>
      <CreateMatch gameTitle={gameTitle} />
    </div>
  );
};

export default AddMatch;
