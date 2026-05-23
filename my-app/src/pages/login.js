import { Form, Input, Button, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import "../styles/auth.css";

function Login() {

    const navigate = useNavigate();

    const onFinish = async(values) => {

        try {

            const response = await API.post(
                "/api/user/login",
                values
            );

            if(response.data.success){

                localStorage.setItem(
                    "expenseTracker-user",
                    JSON.stringify(response.data.user)
                );

                message.success("Login Successful");

                navigate("/home");

            } else {

                message.error(response.data.message);
            }

        } catch(err){

            console.log(err);

            message.error("Invalid Credentials");
        }
    };

    return (

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
                        label="Email"
                        name="email"
                        rules={[{ required:true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required:true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        Login
                    </Button>

                </Form>

                <p className="auth-link">

                    New User?
                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </Card>

        </div>
    );
}

export default Login;