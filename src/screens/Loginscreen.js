import React, { useState } from "react";
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Form } from "react-bootstrap";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  
   async function login() {
   
      const user = { email, password};
      try{

        setloading(true);
        const result = (await axios.post('/api/users/login', user)).data;
        setloading(false);

        localStorage.setItem('currentUser', JSON.stringify(result));
        window.location.href='/home'

      }catch(error){
        console.log(error);
        setloading(false);
        seterror(true);
      }
  
  }
  return (
    <div>
      {loading && (<Loader />)}
      <div className="row justify-content-center mt-5 text-center">
        <div className="col-md-3 ">
          {error && (<Error message='Invalid Credentials' />)}
          <div className="bss">
            <h2>Login</h2>
            <Form.Control
              type="email"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
            /><br />
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            /><br />
          
            <button className="btn btn-primary mt-3" onClick={login}>
              Login
            </button><br /><br />
            <p> <strong>Login as Admin</strong><br /> Username : test@gmail.com,<br /> Password : 123456</p>
            <p> <strong>Login as User</strong><br />Username : test1@gmail.com,<br /> Password : 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
