import "../../styles/home.css";
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";


const Home = () => {
  const { store, actions } = useContext(Context);

  const[newUser, setNewUser] = useState({
    email: "", 
    password: "",
    userName: ""
  })

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await actions.registrationUser(newUser);

  }
	

	return (
    <div className="bg-dark text-light">
		<div className="container text-left">
      <h1 className="ms-4 mt-4 mb-2 pt-3"> Welcome! </h1>
			<form onSubmit= {handleSubmit} className="px-4 py-3">
    <div className="form-group">
      <label htmlFor="exampleDropdownFormEmail1">Email address</label>
      <input 
      type="email" 
      className="form-control" 
      id="exampleDropdownFormEmail1" 
      placeholder="email@example.com"
      name="email"
      value={newUser.email}
      onChange={handleChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="exampleDropdownFormPassword1">Password</label>
      <input 
      type="password" 
      className="form-control" 
      id="exampleDropdownFormPassword1" 
      placeholder="Password"
      name="password"
      value={newUser.password}
      onChange={handleChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="exampleDropdownFormUsername">Username</label>
      <input 
      type="username" 
      className="form-control" 
      id="exampleDropdownFormUsername" 
      placeholder="Username"
      name="userName"
      value={newUser.userName}
      onChange={handleChange}/>
    </div>
    
    <button type="submit" className="btn btn-outline-info mt-3 text-light">Sign in</button>
  </form>
  
		</div>
    </div>
	);
};


export default Home;