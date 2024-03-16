import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useUser } from "../contexts/UserContext";

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinkClass = "cursor-pointer hover:text-sky-300";

  return (
      <header className="w-full h-12 bg-agRed pt-2">
        <nav className="flex items-center h-full text-sky-200 text-2xl">
          <NavLink to="/ucebnice" className={"mr-8 ml-4 " + (location.pathname === "/" ? "active " + navLinkClass : navLinkClass)}>
            Učebnice
          </NavLink>
          <div className="hidden lg:inline-flex space-x-4">
            <NavLink to="/o" className={navLinkClass}>
              O burze
            </NavLink>
            <NavLink to={user ? "/user" : "/login"} className={navLinkClass}>
              {user ? user.displayName : "Přihlásit se"}
            </NavLink>
          </div>
          <MdMenu
            className="ml-auto lg:hidden cursor-pointer hover:text-sky-300 mr-4"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="lg:hidden bg-agBlue fixed top-12 left-0 right-0 text-white flex flex-col items-center m-2">
              <NavLink to="/ucebnice" className={"my-2 " + navLinkClass}>
                Učebnice
              </NavLink>
              <NavLink to="/o" className={navLinkClass}>
                O burze
              </NavLink>
              <NavLink to={user ? "/user" : "/login"} className={navLinkClass}>
                {user ? user.displayName : "Přihlásit se"}
              </NavLink>
            </div>
          )}
        </nav>
      </header>
  );
};

export default NavBar;