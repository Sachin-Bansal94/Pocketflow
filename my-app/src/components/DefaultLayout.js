import React from "react";

import "../resources/default-layout.css";

import {
    useNavigate
} from "react-router-dom";

import {
    Dropdown
} from "antd";

function DefaultLayout(props){

    const navigate = useNavigate();

    // ================= GET USER =================

    const user = JSON.parse(
        localStorage.getItem(
            "expenseTracker-user"
        )
    );

    // ================= LOGOUT =================

    const handleLogout = () => {

        localStorage.removeItem(
            "expenseTracker-user"
        );

        localStorage.removeItem(
            "expenseTracker-token"
        );

        navigate("/");
    };

    // ================= DROPDOWN ITEMS =================

    const items = [

        {
            key: "1",

            label: (

                <span onClick={handleLogout}>

                    Logout

                </span>
            ),
        },
    ];

    return (

        <div className="layout">

            {/* ================= HEADER ================= */}

            <div className="header d-flex justify-content-between align-items-center">

                {/* LOGO */}

                <div>

                    <h1 className="logo">

                        PocketFlow

                    </h1>

                </div>

                {/* USER */}

                <div>

                    <Dropdown
                        menu={{ items }}
                        placement="bottomLeft"
                    >

                        <button className="primary">

                            {
                                user?.name || "User"
                            }

                        </button>

                    </Dropdown>

                </div>

            </div>

            {/* ================= CONTENT ================= */}

            <div className="content">

                {props.children}

            </div>

        </div>
    );
}

export default DefaultLayout;