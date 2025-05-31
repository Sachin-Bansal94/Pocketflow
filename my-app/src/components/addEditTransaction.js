import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Modal, Input, Select, message } from "antd";
import axios from "axios";
import "../resources/transaction.css";
import Spinner from "../components/spinner.js";

const { Option } = Select;

function AddEditTransaction(props) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  async function formSubmit(values) {
    values = {
      ...values,
      userEmail: JSON.parse(localStorage.getItem("expenseTracker-user")).useremail,
    };

    try {
      setLoader(true);

      var response;

      if(props.selectItemForEdit){
        response = await axios.post("/api/transaction/transaction-edit",{
            ...values,
            transaction_id : props.selectItemForEdit.transaction_id,
        });
      }
      else{
        response = await axios.post(
            "/api/transaction/transaction-add",
            values
          );
      }
      
      message.success(response.data);
      props.getTransactions();
      setLoader(false);
      props.setIsModalOpen(false);
      props.setSelectItemForEdit(null)
    } catch (err) {
      setLoader(false);
      message.error("Incorrect Details entered");
    }
  }
  return (
    <Modal
      title={props.selectItemForEdit?"Edit Transaction" : "Add Transaction" }
      open={props.isModalOpen}
      onCancel={() => {props.setIsModalOpen(false);}}
      footer={false}
    >
      {loader && <Spinner />}
      <Form layout="vertical" class="transactionForm" onFinish={formSubmit} initialValues={props.selectItemForEdit}>
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select>
            <Option value="salary">Salary</Option>
            <Option value="freelance">Freelance</Option>
            <Option value="entertainment">Entertainment</Option>
            <Option value="education">Education</Option>
            <Option value="food">Food</Option>
            <Option value="tax">Tax</Option>
            <Option value="medical">Medical</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary">SAVE</button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransaction;
