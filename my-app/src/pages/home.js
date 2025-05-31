import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import AddEditTransaction from "../components/addEditTransaction";
import { Form, Modal, Input, Select, message, Table, DatePicker } from "antd";
import axios from "axios";
import Spinner from "../components/spinner.js";
import moment from "moment";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "../resources/transaction.css";
import Analytics from "../components/analytics.js";

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

  const getTransactions = async () => {
    try {
      setLoader(true);
      const user = JSON.parse(localStorage.getItem("expenseTracker-user")).useremail;

      const response = await axios.post("/api/transaction/transaction-get", {
        userEmail: user,
        freq: freq,
        range: rangeDate,
        type: type,
      });
      console.log(response.data);
      setTransaction(response.data);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      message.error(err.message);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [freq, rangeDate, type]);

  const delTransaction = async(transaction_id)=>{
    try {
      setLoader(true);
      await axios.post("/api/transaction/transaction-del", {
        tId:transaction_id
      });
      getTransactions();
      setLoader(false);
    } catch (err) {
      setLoader(false);
      message.error(err.message);
    }
  }

  const columns = [
    {
      title: "Date",
      dataIndex: "dateexpense",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
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
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectItemForEdit(record);
                console.log(record);
                setIsModalOpen(true);
                console.log(record);
              }}
            />
            <DeleteOutlined className="mx-3" onClick={
              ()=>delTransaction(record.transaction_id)
            }/>
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loader && <Spinner />}

      <div className="filter d-flex justify-content-between align-items-center mb-2">
        <div class="d-flex">
          <div className="d-flex flex-column justify content-start">
            <h6>Select Frequency</h6>
            <Select value={freq} onChange={(value) => setFreq(value)}>
              <Option value="7" selected>
                Last 1 Week
              </Option>
              <Option value="30">Last 1 Month</Option>
              <Option value="365">Last 1 Year</Option>
              <Option value="custom">Custom</Option>
            </Select>
            {freq === "custom" && (
              <RangePicker
                className="mt-2"
                value={rangeDate}
                onChange={(value) => setRangeDate(value)}
              />
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Option value="all">All</Option>
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="d-flex mx-3">
            <div className="view-switch mx-2">
              <UnorderedListOutlined
                className={`${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("table")}
              />
            </div>
            <div
              className={`view-switch mx-2 ${
                viewType === "analytics" ? "active-icon" : "inactive-icon"
              }`}
            >
              <AreaChartOutlined
                className={`${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("analytics")}
              />
            </div>
          </div>

          <button className="primary" onClick={() => setIsModalOpen(true)}>
            Add New
          </button>
        </div>
      </div>

      <div className="tableAnalytics">
        <div>
          {viewType === "table" ? (
            <Table columns={columns} dataSource={transaction} />
          ) : (
            <Analytics transactions={transaction} />
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddEditTransaction
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getTransactions={getTransactions}
          selectItemForEdit={selectItemForEdit}
          setSelectItemForEdit={setSelectItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
