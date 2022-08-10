import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Home({setCurrentUser, currentUser}) {

    return (
        <div>
            <SignupForm setCurrentUser={ setCurrentUser }/>
            <LoginForm setCurrentUser={ setCurrentUser }/>
            {currentUser ? currentUser.first_name : null}
        </div>
    ); 
}

export default Home;