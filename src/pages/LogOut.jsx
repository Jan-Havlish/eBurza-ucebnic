import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";

const LogOut = () => {
    const navigate = useNavigate();
    const user = useUser();
    const { setNotification, setNotificationType } = useNotification();

    const handleLogOut = () => {
      signOut(auth)
        .then(() => {
          setNotification("Odhlášení proběhlo v pořádku");
          setNotificationType("success");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setNotification("Chyba při odhlašování, " + error);
          setNotificationType("error");
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