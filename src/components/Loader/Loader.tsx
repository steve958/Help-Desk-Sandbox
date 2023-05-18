import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loader_container">
      <CircleLoader size={250} color="#19467c" className="loader_item" />
    </div>
  );
};

export default Loader;
