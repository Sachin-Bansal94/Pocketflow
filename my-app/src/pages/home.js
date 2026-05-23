import React, { useState, useEffect } from "react";

import DefaultLayout from "../components/DefaultLayout";
import AddEditTransaction from "../components/addEditTransaction";

import {
  message,
  Table,
  Select,
  DatePicker
} from "antd";

import API from "../api/axiosConfig";

import Spinner from "../components/spinner";

import moment from "moment";

import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "../resources/transaction.css";

import Analytics from "../components/analytics";

const { Option } = Select;
const { RangePicker } = DatePicker;

function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [transaction, setTransaction] = useState([]);

  const [loader, setLoader] = useState(false);

  const [freq, setFreq] = useState("7");

  const [rangeDate, setRangeDate] = useState([]);

  const [type, setType] = useState("all");

  const [viewType, setViewType] = useState("table");

  const [selectItemForEdit, setSelectItemForEdit] = useState(null);

  // ================= CHECK LOGIN =================

  useEffect(() => {

    const user = localStorage.getItem(
      "expenseTracker-user"
    );

    if(!user){
      window.location.href = "/";
    }

  }, []);

  // ================= GET TRANSACTIONS =================

  const getTransactions = async () => {

    try {

      setLoader(true);

      const user = JSON.parse(
        localStorage.getItem("expenseTracker-user")
      );

      const response = await API.post(
        "/api/transaction/transaction-get",
        {
          userEmail: user.email,
          freq,
          range: rangeDate,
          type,
        }
      );

      if(response.data.success){

        setTransaction(
          response.data.transactions || []
        );

      } else {

        message.error(response.data.message);
      }

      setLoader(false);

    } catch(err){

      console.log(err);

      setLoader(false);

      message.error("Failed to Fetch Transactions");
    }
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {

    getTransactions();

   

}, [freq, rangeDate, type]);

  // ================= DELETE =================

  const delTransaction = async(transaction_id)=>{

    try {

      setLoader(true);

      const response = await API.post(
        "/api/transaction/transaction-del",
        {
          tId: transaction_id
        }
      );

      if(response.data.success){

        message.success("Deleted Successfully");

        getTransactions();

      } else {

        message.error(response.data.message);
      }

      setLoader(false);

    } catch(err){

      console.log(err);

      setLoader(false);

      message.error("Delete Failed");
    }
  };

  // ================= TABLE =================

  const columns = [

    {
      title: "Date",

      dataIndex: "dateexpense",

      render: (text) => (
        <span>
          {moment(text).format("YYYY-MM-DD")}
        </span>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
    },

    {
      title: "Type",
      dataIndex: "type",
    },

    {
      title: "Category",
      dataIndex: "category",
    },

    {
      title: "Reference",
      dataIndex: "reference",
    },

    {
      title: "Description",
      dataIndex: "description",
    },

    {
      title: "Actions",

      render: (text, record) => {

        return (

          <div>

            <EditOutlined
              onClick={() => {
                setSelectItemForEdit(record);
                setIsModalOpen(true);
              }}
            />

            <DeleteOutlined
              className="mx-3"
              onClick={() =>
                delTransaction(record.transaction_id)
              }
            />

          </div>
        );
      },
    },
  ];

  return (

    <DefaultLayout>

      {loader && <Spinner />}

      <div className="filter d-flex justify-content-between align-items-center mb-2">

        <div className="d-flex">

          <div className="d-flex flex-column justify-content-start">

            <h6>Select Frequency</h6>

            <Select
              value={freq}
              onChange={(value) => setFreq(value)}
            >

              <Option value="7">
                Last 1 Week
              </Option>

              <Option value="30">
                Last 1 Month
              </Option>

              <Option value="365">
                Last 1 Year
              </Option>

              <Option value="custom">
                Custom
              </Option>

            </Select>

            {
              freq === "custom" && (

                <RangePicker
                  className="mt-2"
                  value={rangeDate}
                  onChange={(value) =>
                    setRangeDate(value)
                  }
                />

              )
            }

          </div>

          <div className="d-flex flex-column mx-5">

            <h6>Select Type</h6>

            <Select
              value={type}
              onChange={(value) => setType(value)}
            >

              <Option value="all">
                All
              </Option>

              <Option value="income">
                Income
              </Option>

              <Option value="expense">
                Expense
              </Option>

            </Select>

          </div>

        </div>

        <div className="d-flex align-items-center">

          <div className="d-flex mx-3">

            <div className="view-switch mx-2">

              <UnorderedListOutlined
                className={
                  viewType === "table"
                    ? "active-icon"
                    : "inactive-icon"
                }
                onClick={() => setViewType("table")}
              />

            </div>

            <div className="view-switch mx-2">

              <AreaChartOutlined
                className={
                  viewType === "analytics"
                    ? "active-icon"
                    : "inactive-icon"
                }
                onClick={() =>
                  setViewType("analytics")
                }
              />

            </div>

          </div>

          <button
            className="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add New
          </button>

        </div>

      </div>

      <div className="tableAnalytics">

        {
          viewType === "table" ? (

            <Table
              columns={columns}
              dataSource={transaction}
              rowKey="transaction_id"
              pagination={{ pageSize: 5 }}
            />

          ) : (

            <Analytics
              transactions={transaction}
            />

          )
        }

      </div>

      {
        isModalOpen && (

          <AddEditTransaction
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            getTransactions={getTransactions}
            selectItemForEdit={selectItemForEdit}
            setSelectItemForEdit={setSelectItemForEdit}
          />

        )
      }

    </DefaultLayout>
  );
}

export default Home;