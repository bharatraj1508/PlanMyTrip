import { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelerOptions,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { checkMissingFields } from "@/utils/function";
import { chatSession } from "@/service/AIModal";
import logo from "../../public/logo.svg";
import { GrGoogle } from "react-icons/gr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/service/UserProvider";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Option = {
  label: string;
  value: string;
};

type FormData = {
  location: Option;
  days: number;
  budget: string;
  traveler: string;
};

function CreateTrip() {
  const { toast } = useToast();
  const [place, setPlace] = useState<Option | null>(null);
  const [openSignInDialog, setOpenSignInDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { user, signIn } = userContext;

  const [formData, setFormData] = useState<FormData>({
    location: { label: "", value: "" },
    days: 0,
    budget: "",
    traveler: "",
  });

  useEffect(() => {
    if (user && loading) OnGenerateTrip();
  }, [user]);

  const handleInputChange = (name: string, value: Option | string | number) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getUserProfile(codeResponse?.access_token),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const { budget, location, traveler, days } = formData;

    if (
      !budget ||
      !(location.label && location.value) ||
      !traveler ||
      days <= 0 ||
      days > 5
    ) {
      toast({
        title: "Error!",
        description: checkMissingFields(location, days, budget, traveler),
      });
      return;
    }

    if (!user) {
      setOpenSignInDialog(true);
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT(location.label, days, budget, traveler);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    setLoading(false);

    saveData(result?.response?.text());
  };

  const saveData = async (tripData: string) => {
    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user")!);

    await setDoc(doc(db, "PlanMyTrip", docId), {
      tripData: JSON.parse(tripData),
      email: user?.email,
      tripSelection: formData,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const getUserProfile = (token: string) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        signIn(res.data);
        setOpenSignInDialog(false);
      });
  };

  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10">
        <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences
        </p>

        <div className="mt-20 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              Please enter your destination?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v as Option);
                  handleInputChange("location", v as Option);
                },
              }}
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              Length of your trip in days ?
            </h2>
            <Input
              placeholder={"Example 3... "}
              type="number"
              onChange={(e) => handleInputChange("days", e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              Select your budget option ?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                    ${
                      formData?.budget == item.title &&
                      "border border-black shadow-lg"
                    }
                    `}
                  onClick={() => handleInputChange("budget", item.title)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              Who do you plan on traveling with on your next adventure?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelerOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                    ${
                      formData?.traveler == item.people &&
                      "border border-black shadow-lg"
                    }
                    `}
                  onClick={() => handleInputChange("traveler", item.people)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div className="my-10 flex justify-end">
            <Button
              disabled={loading}
              onClick={OnGenerateTrip}
              className="rounded-lg bg-gray-800 text-white font-bold transition duration-300 hover:bg-white hover:text-black border-2 border-transparent hover:border-gray-800"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" />
              ) : (
                "Generate Trip"
              )}
            </Button>
          </div>

          <AlertDialog open={loading}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Please wait while we prepare your travel plan...
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Our Generative AI model is preparing the details for your
                  adventure. Based on your {formData.budget} budget for{" "}
                  {formData.days} days in {formData.location.label}
                </AlertDialogDescription>
                <AlertDialogDescription className="flex items-center justify-center">
                  <AiOutlineLoading3Quarters className="w-10 h-10 animate-spin my-4 font-bold" />
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={openSignInDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex gap-5 items-center">
                  <img className="h-10 w-10" src={logo} alt="app-logo" />
                  Sign In with Google
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Please sing in to the app using your google account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  onClick={() => login()}
                  className="flex flex-row items-center mt-6 rounded-lg bg-blue-600 text-white font-bold transition duration-300 hover:bg-white hover:text-black border-2 border-transparent hover:border-blue-600"
                >
                  <GrGoogle />
                  Sign in with google
                </Button>
                <Button
                  onClick={() => setOpenSignInDialog(false)}
                  className="flex flex-row items-center mt-6 rounded-lg bg-gray-800 text-white font-bold transition duration-300 hover:bg-white hover:text-black border-2 border-transparent hover:border-gray-800"
                >
                  Cancel
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}

export default CreateTrip;
