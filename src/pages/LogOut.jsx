import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const LogOut = () => {
    const navigate = useNavigate();
    const user = useUser();

    const handleLogOut = () => {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    
        if (!user) {
            navigate("/login");
        }
        else if (user) {
            handleLogOut();
        }
    
      return (
        <div>LogOut</div>
      )
    
    
}

export default LogOut