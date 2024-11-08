import logo from "../../../public/logo.svg";
import { Button } from "../ui/button";

function Header() {
  return (
    <>
      <div className="p-4 px-5 shadow-sm flex justify-between items-center">
        <img src={logo} alt="app-logo" />
        <div>
          <Button>Sign In</Button>
        </div>
      </div>
    </>
  );
}

export default Header;
