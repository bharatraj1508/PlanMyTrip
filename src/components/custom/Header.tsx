import { useContext } from "react";
import logo from "../../../public/logo.svg";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserContext } from "@/service/UserProvider";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import userImg from "../../assets/user-img.jpg";
import { IoMdAdd } from "react-icons/io";

function Header() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const doLogout = () => {
    signOut();
    navigate("/");
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getUserProfile(codeResponse?.access_token),
    onError: (error) => console.log(error),
  });

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
        navigate("/my-trips");
      });
  };

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { user, isSignedIn, signOut, signIn } = userContext;

  return (
    <>
      <div className="p-4 px-5 shadow-sm flex justify-between items-center h-full">
        <img
          onClick={() => {
            navigate("/");
          }}
          src={logo}
          alt="app-logo"
          className="cursor-pointer"
        />
        {isSignedIn ? (
          <div className="flex flex-row items-center gap-10 md:mr-7 mr-2">
            <div>
              <Link
                to={"/create-trip"}
                className="py-1.5 px-3 flex flex-row gap-1 items-center border border-gray-300 rounded-3xl shadow-sm hover:scale-110 hover:shadow-xl transition-all duration-300"
              >
                <IoMdAdd /> Create Trip
              </Link>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div>
                    {user && (
                      <img
                        className="rounded-full h-10 w-10 hover:scale-125 hover:shadow-md transition-all duration-300"
                        src={user.picture ? user.picture : userImg}
                        alt="user-image"
                      />
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    <div
                      onClick={() => {
                        navigate("/my-trips");
                      }}
                    >
                      <h2>My Trips</h2>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <div onClick={doLogout}>
                      <h2 className="text-red-500">Logout</h2>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => {
              login();
            }}
            className="flex flex-row items-center"
          >
            <GrGoogle />
            Sign In with Google
          </Button>
        )}
      </div>
    </>
  );
}

export default Header;
