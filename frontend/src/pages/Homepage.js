import { Link } from "react-router-dom";
import { GITHUB_REPO_LINK } from "../utils/url-constants";
const Homepage = () => {
  return (
    <div className="homepage">
      <div className="container mx-sm py-8">
        <h1 className="text-2xl font-semibold text-center">
          Homepage : Project in Progress
        </h1>
        <a href={GITHUB_REPO_LINK} rel="noreferrer" target="_blank">
          <h3 className="py-8 text-xl font-semibold underline text-center">
            Github Repository Link
          </h3>
        </a>

        <p className="py-8 text-lg   text-center">
          If you wish to use the service,{" "}
          <Link to="/signup">
            <span className="underline">please click here to signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Homepage;
