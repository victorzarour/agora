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
          if (user.admin === true) {
            history.push(`/professors/${user.id}/courses`);
          } else {
            history.push(`/students/${user.id}/courses`);
          }

        });
      } else {
        resp.json().then( (json) => {
          alert(json.errors)
        });
      }
    });
  };

  return (
    
    <div className="bg-slate-200 min-h-screen flex flex-row">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">

        <form onSubmit={ handleSubmit } className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

          <h1 className="mb-8 text-xl text-center font-bold">Welcome Back!</h1>

          <input
          label="Email"
          type="text"
          required
          className="block border border-grey-light w-full p-3 rounded mb-4"
          onChange={ handleChange }
          placeholder='Email'
          name="email"
          value={ email }
          />

          <input
          label="Password"
          type="password"
          required
          className="block border border-grey-light w-full p-3 rounded mb-4"
          onChange={ handleChange }
          placeholder='Password'
          name="password"
          value={ password }
          />
          <button type='submit' className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-violet-600 focus:outline-none my-1">Login</button>    
        </form>
      </div>
    </div>
  );
};

export default LoginForm;