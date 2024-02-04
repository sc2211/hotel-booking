import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    if (password === cpassword) {
      const user = { name, email, password, cpassword };
      try {
        setloading(true);
        const result = (await axios.post("/api/users/register", user)).data;
        setloading(false);
        setsuccess(true);
        setname('')
        setemail('')
        setpassword('')
        setcpassword('')
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    } else {
      alert("Password didn't match");
    }
  }
  return (
    <div>
      {loading && (<Loader />)}
      {error && (<Error />)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && (<Success message='Registration success' />)}
          <div className="bss">
            <h2>Register</h2>
            <Form.Control
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Name"
              value={name}
              required
              onChange={(e) => {
                setname(e.target.value);
              }}
            /><br />
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
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              placeholder="Confirm password"
              value={cpassword}
              required
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            /><br />

            <button className="register" onClick={register}>
              Register
            </button>&nbsp;&nbsp;
            <Link to='/login' className='click'>Already Registered</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
