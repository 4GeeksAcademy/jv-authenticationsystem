import React, { useState, useContext } from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";



const Login2 = () => {
  const navigate= useNavigate();
  const { store, actions } = useContext(Context);
  const [newLogin, setLogin] = useState({
    email: "",
    password: "",
  });
}

  const handleChange = (e) => {
    setLogin({ ...newLogin, [e.target.name]: e.target.value });
    console.log(newLogin);};

  
  const handleLogin = async (e) => {
      e.preventDefault();
      const response = await actions.login(newLogin);
      if (response.success) {
        navigate("/private")}; 
	


	return (
    <div className="bg-dark text-light">
		<div className="container text-left">
      <h1 className="ms-4 mt-4 mb-2 pt-3">Login</h1>
			<form className="px-4 py-3"
      onSubmit= {handleLogin}>
    <div className="form-group">
      <label htmlFor="exampleDropdownFormEmail1">Email address</label>
      <input type="email" 
      className="form-control" 
      id="exampleDropdownFormEmail1" 
      placeholder="email@example.com"
      name="email"
      value={newLogin.email}
      onChange={handleChange}/>
    </div>
    <div className="form-group">
      <label htmlFor="exampleDropdownFormPassword1">Password</label>
      <input type="password" 
      className="form-control" 
      id="exampleDropdownFormPassword1" 
      placeholder="Password"
      name="password"
      value={newLogin.password}
      onChange={handleChange}/>
    </div>
    
    
    <button type="submit" className="btn btn-outline-info mt-3 text-light">Sign in</button>
  </form>
  
		</div>
    </div>
	);
};


export default Login2;