import { toast } from "@/hooks/use-toast";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewTrip() {
  const { tripId } = useParams();

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "PlanMyTrip", tripId!);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      toast({
        title: "OOPS!",
        description: "No trip data found. Generate a new trip first.",
      });
    }
  };

  return (
    <>
      {/* Infomration Section */}

      {/* Hotel Details */}

      {/* Daily plan */}
    </>
  );
}

export default ViewTrip;
