import React from 'react'
import '../resources/default-layout.css';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Space } from 'antd';

function DefaultLayout(props){

    const navigate = useNavigate();

    const items = [
        {
          key: '1',
          label: (
            <li onClick={ ()=>{
                    localStorage.removeItem("expenseTracker-user");
                    navigate('/login');
                }
            }>
              Logout
            </li>
          ),
        },
      ];

    return (
        <div className="layout">
            <div className="header d-flex justify-content-between align-items-center">
                <div>
                    
                    <h1 className="logo">SHEY MONEY</h1>
                </div>
                <div>
                    <Dropdown
                        menu={{
                        items,
                        }}
                        placement="bottomLeft"
                    >
                        <button className='primary'>{JSON.parse(localStorage.getItem("expenseTracker-user")).name}</button>
                    </Dropdown>
                </div>
            </div>

            <div className='content'>
                {props.children}
            </div>

        </div>
    )
}

export default DefaultLayout;