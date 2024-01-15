import { NavLink } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const user = useUser();

  return (
    <header className="w-full h-12 bg-agRed pt-2">
      <nav>
        <div className="flex items-center h-full text-sky-200 text-2xl">
          <NavLink to="/ucebnice" className={"cursor-pointer hover:text-sky-300 mr-8 ml-4" + (location.pathname === "/" ? " active" : "")}>
            Učebnice
          </NavLink>
          <div className="hidden lg:inline-flex space-x-4">
            <NavLink to="/o" className="cursor-pointer hover:text-sky-300">
              O burze
            </NavLink>
            {user ? (
              <NavLink to="/user" className="cursor-pointer hover:text-sky-300">
                {user.displayName}
              </NavLink>
            ) : (
              <NavLink to="/login" className="cursor-pointer hover:text-sky-300">
                Přihlásit se
              </NavLink>
            )}
          </div>

          <MdMenu
            className="ml-auto lg:hidden cursor-pointer hover:text-sky-300 mr-4"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && (
          <div className="lg:hidden bg-agBlue fixed top-12 left-0 right-0 text-white flex flex-col items-center m-2">
            <NavLink to="/ucebnice" className="cursor-pointer hover:text-sky-300 w-2/3 my-2">
              Učebnice
            </NavLink>
            <NavLink to="/o" className="cursor-pointer hover:text-sky-300 w-2/3 my-2">
              O burze
            </NavLink>

            {user ? (
              <NavLink to="/user" className="cursor-pointer hover:text-sky-300 w-2/3 my-2">
                {user.displayName}
              </NavLink>
            ) : (
              <NavLink to="/login" className="cursor-pointer hover:text-sky-300 w-2/3 my-2">
                Přihlásit se
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
