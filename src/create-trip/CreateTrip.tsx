import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  SelectBudgetOptions,
  SelectTravelerOptions,
} from "@/constants/options";
import { Button } from "@/components/ui/button";

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
  const [place, setPlace] = useState<Option | null>(null);

  const [formData, setFormData] = useState<FormData>({
    location: { label: "", value: "" },
    days: 0,
    budget: "",
    traveler: "",
  });

  const handleInputChange = (name: string, value: Option | string | number) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
            <Button>Generate Trip</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTrip;
