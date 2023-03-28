import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loader_container">
      <CircleLoader size={150} color="red" className="loader_item" />
    </div>
  );
};

export default Loader;
