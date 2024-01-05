import MyBooksAndInterests from "../components/MyBooksAndInterests";
import { useUser } from "../contexts/UserContext";

const Home = () => {
  const user = useUser();

  return (
    <div>
      {user ? <MyBooksAndInterests userEmail={user.email} /> : null}
    </div>
  );
};

export default Home;
