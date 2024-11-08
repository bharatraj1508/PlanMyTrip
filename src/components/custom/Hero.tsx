import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Hero() {
  return (
    <>
      <div className="flex flex-col items-center mx-56 gap-9">
        <h2 className="font-extrabold text-[50px] text-center mt-16">
          <span className="text-[#f56551]">
            {" "}
            Discover Your Next Adventure with AI:
          </span>{" "}
          Personlized Itineraries at Your Fingertips
        </h2>
        <p className="text-xl text-gray-500 text-center">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored at your interests and budget.
        </p>
        <Link to={"/create-trip"}>
          <Button>Get started</Button>
        </Link>
      </div>
    </>
  );
}

export default Hero;
