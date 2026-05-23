import React, { useState } from "react";

import {
  Form,
  Modal,
  Input,
  Select,
  message
} from "antd";

import API from "../api/axiosConfig";

import "../resources/transaction.css";

import Spinner from "../components/spinner.js";

const { Option } = Select;

function AddEditTransaction(props) {

  const [loader, setLoader] = useState(false);

  // ================= FORM SUBMIT =================

  async function formSubmit(values) {

    try {

      setLoader(true);

      // CURRENT USER

      const user = JSON.parse(
        localStorage.getItem("expenseTracker-user")
      );

      // FINAL PAYLOAD

      const payload = {

        ...values,

        userEmail: user.email,

        // IMPORTANT DB COLUMN NAME

        dateexpense: values.date
      };

      let response;

      // ================= EDIT =================

      if(props.selectItemForEdit){

        response = await API.post(
          "/api/transaction/transaction-edit",
          {
            ...payload,

            transaction_id:
              props.selectItemForEdit.transaction_id
          }
        );

      }

      // ================= ADD =================

      else {

        response = await API.post(
          "/api/transaction/transaction-add",
          payload
        );
      }

      // SUCCESS MESSAGE

      if(response.data.success){

        message.success(
          response.data.message
        );

        // REFRESH TRANSACTIONS

        props.getTransactions();

        // CLOSE MODAL

        props.setIsModalOpen(false);

        props.setSelectItemForEdit(null);

      } else {

        message.error(
          response.data.message
        );
      }

      setLoader(false);

    } catch(err){

      console.log(err);

      setLoader(false);

      message.error(
        "Failed To Save Transaction"
      );
    }
  }

  return (

    <Modal
      title={
        props.selectItemForEdit
          ? "Edit Transaction"
          : "Add Transaction"
      }

      open={props.isModalOpen}

      onCancel={() => {

        props.setIsModalOpen(false);

        props.setSelectItemForEdit(null);
      }}

      footer={false}
    >

      {loader && <Spinner />}

      <Form
        layout="vertical"

        className="transactionForm"

        onFinish={formSubmit}

        initialValues={props.selectItemForEdit}
      >

        {/* AMOUNT */}

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required:true,
              message:"Amount Required"
            }
          ]}
        >

          <Input type="number" />

        </Form.Item>

        {/* TYPE */}

        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required:true
            }
          ]}
        >

          <Select>

            <Option value="income">
              Income
            </Option>

            <Option value="expense">
              Expense
            </Option>

          </Select>

        </Form.Item>

        {/* CATEGORY */}

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required:true
            }
          ]}
        >

          <Select>

            <Option value="salary">
              Salary
            </Option>

            <Option value="freelance">
              Freelance
            </Option>

            <Option value="entertainment">
              Entertainment
            </Option>

            <Option value="education">
              Education
            </Option>

            <Option value="food">
              Food
            </Option>

            <Option value="tax">
              Tax
            </Option>

            <Option value="medical">
              Medical
            </Option>

          </Select>

        </Form.Item>

        {/* DATE */}

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required:true
            }
          ]}
        >

          <Input type="date" />

        </Form.Item>

        {/* REFERENCE */}

        <Form.Item
          label="Reference"
          name="reference"
        >

          <Input type="text" />

        </Form.Item>

        {/* DESCRIPTION */}

        <Form.Item
          label="Description"
          name="description"
        >

          <Input type="text" />

        </Form.Item>

        {/* BUTTON */}

        <div className="d-flex justify-content-end">

          <button className="primary">

            SAVE

          </button>

        </div>

      </Form>

    </Modal>
  );
}

export default AddEditTransaction;