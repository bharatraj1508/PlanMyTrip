import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import heroImg from "../../assets/hero-image-globe.jpg";
import { FlipWords } from "../ui/flip-words";
import { TextGenerateEffect } from "../ui/text-generate-effect";

function Hero() {
  const words = ["Travel Plan", "Itineraries", "Hotels"];

  const desc = `Planning a trip to an unfamiliar destination? We create personalized itineraries and travel plans to make your journey seamless and stress-free.`;

  return (
    <>
      <div className="flex flex-col items-center md:mx-56 md:gap-9 gap-4 h-screen justify-center">
        <h2 className="font-extrabold md:text-[50px] text-[30px] text-center md:mt-16">
          <span className="text-[#f56551]">
            {" "}
            Having trouble searching for
            <FlipWords className="text-[#f56551]" words={words} />?
          </span>{" "}
          <br />
          We will generate your travel through AI
        </h2>
        <p className="text-center">
          <TextGenerateEffect
            className="md:text-xl text-gray-500"
            words={desc}
          />
        </p>
        <Link to={"/create-trip"}>
          <Button className="px-8 py-2 rounded-3xl bg-[#f56551] text-white font-bold transition duration-300 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#f56551]">
            Get started
          </Button>
        </Link>

        <div>
          <img
            className="hover:scale-110 transition-all duration-500"
            src={heroImg}
            alt="hero-img"
          />
        </div>
      </div>
    </>
  );
}

export default Hero;
