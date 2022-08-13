import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user";

function SignupFormStudent( ){

  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    last_name: "",
    password: "",
    confirmPassword: "",
    admin: false
  });

  const history = useHistory();

  const { first_name, last_name, email, password, confirmPassword, admin } = formData;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    fetch('/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        response.json().then((student) => {
          setUser(student)
          history.push(`/students/${student.id}/courses`);
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

      <form className="signUpFormStudent" onSubmit={ handleSubmit }>
        <h1>Don't have an account?</h1>
        <span>If you're a student, create an account your email and password here</span>


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

export default SignupFormStudent;