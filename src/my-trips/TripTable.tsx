import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { AllTripsData } from "./MyTrip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/function";

type TripCardProp = {
  tripData?: AllTripsData[];
  deleteTrip: (id: string) => void;
};

function TripTable({ tripData, deleteTrip }: TripCardProp) {
  const navigate = useNavigate();

  const handleDeleteTrip = (id: string) => {
    deleteTrip(id);
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent trips.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Total Days of visit</TableHead>
            <TableHead>Budget Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead> Trip Created in Local Time</TableHead>
            <TableHead className="text-right">Travelers</TableHead>
            <TableHead className="flex flex-row items-center justify-end">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tripData?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {item.trips.tripSelection.days}
              </TableCell>
              <TableCell>{item.trips.tripSelection.budget}</TableCell>
              <TableCell>{item.trips.tripSelection.location.label}</TableCell>
              <TableCell>
                <h2 className="text-sm text-gray-500 italic">
                  {formatDate(item.id)}
                </h2>
              </TableCell>
              <TableCell className="text-right">
                {item.trips.tripSelection.traveler}
              </TableCell>
              <TableCell className="flex flex-row items-center justify-end">
                <div className="flex flex-row gap-5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <IoEye
                          className="cursor-pointer w-5 h-5 hover:scale-125 hover:text-gray-600 transition-all duration-300"
                          onClick={() => {
                            navigate(`/view-trip/${item.id}`);
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="px-3 py-1 mb-1 rounded-lg border border-gray-400 bg-white shadow-2xl">
                          View
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <MdDelete
                          className="cursor-pointer w-5 h-5 text-red-500 hover:scale-125 hover:text-red-400 transition-all duration-300"
                          onClick={() => {
                            handleDeleteTrip(item.id);
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="px-3 py-1 mb-1 rounded-lg border border-gray-400 bg-white shadow-2xl">
                          Delete
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TripTable;
