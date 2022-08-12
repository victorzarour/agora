import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user";


const LoginForm = () => {

  const { setUser } = useContext(UserContext)
  const [ formData, setFormData ] = useState({
    email: "",
    password: ""
  });

  const history = useHistory();

  const { email, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }).then( (resp) => {
      if (resp.ok) {
        resp.json().then( (user) => {
          setUser(user);
          history.push(`/professors/${user.id}/courses`);
        });
      } else {
        resp.json().then( (json) => {
          alert(json.errors)
        });
      }
    });
  };

  return (

      <form className="form" onSubmit={ handleSubmit }>

        <h1>Welcome back!</h1>
        <span>Login to continue</span>

        <input
        label="Email"
        type="text"
        required
        onChange={ handleChange }
        placeholder='email'
        name="email"
        value={ email }
        />

        <input
        label="Password"
        type="password"
        required
        onChange={ handleChange }
        placeholder='password'
        name="password"
        value={ password }
        />
        <button type="submit">Login</button>
      </form>
  );
};

export default LoginForm;