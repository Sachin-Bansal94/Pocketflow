import react,{useState} from "react";
import { Form, message } from "antd";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/spinner.js"
import "../resources/authentication.css";

function Login() {

  const navigate = useNavigate();

  const[loader, setLoader] = useState(false);

  const getValue= async(values)=>{
    try{
      setLoader(true);
      const response = await axios.post("/api/user/login",values);
      localStorage.setItem('expenseTracker-user',JSON.stringify({useremail:response.data.email, name:response.data.username}));
      message.success("You have logged in");
      setLoader(false);
      navigate('/');
    }
    catch(err){
      setLoader(false);
      message.error(err.response.data);
    }
    
  }

  return (
    <div className="register">
      {loader && <Spinner/>}
      <div className="row justify-content-center align-items-center w-100 h-100">
        
        <div className="col-md-5 ">
          <Form layout="vertical" onFinish={getValue}>
          <h1>LOGIN</h1>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">Need to sign up, Click Here to Register</Link>
              <button className="primary" type="submit">LOGIN</button>
            </div>
          </Form>
        </div>

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

      </div>
    </div>
  );
}

export default Login;
