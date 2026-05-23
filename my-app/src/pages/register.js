import { Form, Input, Button, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import "../styles/auth.css";

function Register(){

    const navigate = useNavigate();

    const onFinish = async(values) => {

        try{

            const response = await API.post(
                "/api/user/register",
                values
            );

            if(response.data.success){

                message.success("Registration Successful");

                navigate("/");

            } else {

                message.error(response.data.message);
            }

        }
        catch(err){

            console.log(err);

            message.error("Registration Failed");
        }
    };

    return(

        <div className="auth-container">

            <Card className="auth-card">

                <h1 className="logo-text">
                    PocketFlow
                </h1>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required:true}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required:true}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required:true}]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        Register
                    </Button>

                </Form>

                <p className="auth-link">

                    Already Registered?
                    <Link to="/">
                        Login
                    </Link>

                </p>

            </Card>

        </div>
    );
}

export default Register;