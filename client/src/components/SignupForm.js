import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignupForm( {setCurrentUser} ){
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  const { first_name, last_name, email, password, confirmPassword } = formData;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    fetch('/professors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        response.json().then((professor) => {
          setCurrentUser(professor)
          history.push(`/`);
        });
      } else {
        response.json().then((resp) => alert(resp.errors));
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  return (

      <form className="signUpForm" onSubmit={ handleSubmit }>
        <h1>Don't have an account?</h1>
        <span>Create an account your email and password</span>


        <input 
          label='First_name'
          type='text'
          required
          onChange={ handleChange }
          placeholder='first_name'
          name='first_name'
          value={ first_name }
        />

        <input 
          label='Last_name'
          type='text'
          required
          onChange={ handleChange }
          placeholder='last_name'
          name='last_name'
          value={ last_name }
        />

        <input
          label='Email'
          type='email'
          required
          onChange={ handleChange }
          placeholder='email'
          name='email'
          value={ email }
        />

        <input
          label='Password'
          type='password'
          required
          onChange={ handleChange }
          placeholder='password'
          name='password'
          value={ password }
        />

        <input
          label='Confirm Password'
          type='password'
          required
          onChange={ handleChange }
          placeholder='confirm_password'
          name='confirmPassword'
          value={ confirmPassword }
        />

        <button type='submit'>Create Account</button>
      </form>

  );
};

export default SignupForm;