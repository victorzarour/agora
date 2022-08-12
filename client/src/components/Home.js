import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { NavLink, useHistory } from 'react-router-dom'

function Home() {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext)

    const handleLogout = () => {
        fetch('/logout', {
          method: 'DELETE'
        })
        .then((res) => {
          if (res.ok) {
            setUser(false);
            history.push('/');
          }
        });
      };
    

    return (
        <div>
            <SignupForm />
            <LoginForm />
        </div>
    ); 
}

export default Home;