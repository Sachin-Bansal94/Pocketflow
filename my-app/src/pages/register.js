import react,{useState} from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import Spinner from "../components/spinner.js"

function Register() {
  const navigate = useNavigate();

  const [loader,setLoader] = useState(false);

  const getValue= async(values)=>{

    try{
      setLoader(true);
      const response = await axios.post("/api/user/register",values);

      console.log(response);


      localStorage.setItem('expenseTracker-user',JSON.stringify({useremail:response.data.email, name:response.data.username}));
      message.success("User Registerd Successfully");
      setLoader(false);
      navigate('/');
    }
    catch(err){
      setLoader(false);
      // console.log("There has been an error when sending the data");
      // console.log(err);
      message.error(err.response.data);
    }
    
  }

  return (
    <div className="register">
      {loader && <Spinner/>}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
          
        </div>
        <div className="col-md-5 ">
          <Form layout="vertical" onFinish={getValue}>
          <h1>Register</h1>
          <hr></hr>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered , Click Here to Login</Link>
              <button className="primary" type="submit">REGISTER</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
