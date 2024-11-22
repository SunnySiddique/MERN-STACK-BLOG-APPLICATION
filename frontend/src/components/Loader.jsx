import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loader">
      <FadeLoader height={24} width={4} />
    </div>
  );
};

export default Loader;
