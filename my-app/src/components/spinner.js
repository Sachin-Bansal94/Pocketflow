import React from "react";
import { Spin } from 'antd';
import '../resources/spinner.css';

function Spinner(){
    return (
        <div className="spinner">
            <Spin size="large"></Spin>
        </div>
    )
}
export default Spinner;