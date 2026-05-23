import React from "react";

import "../resources/analytics.css";

import { Progress } from "antd";

function Analytics({ transactions = [] }) {

  // ================= TOTAL COUNTS =================

  const totalTransactions =
    transactions.length;

  const totalIncomeTransactions =
    transactions.filter(
      (item) => item.type === "income"
    );

  const totalExpenseTransactions =
    transactions.filter(
      (item) => item.type === "expense"
    );

  // ================= PERCENTAGES =================

  const totalIncomePercentage =
    totalTransactions > 0
      ? (
          totalIncomeTransactions.length * 100
        ) / totalTransactions
      : 0;

  const totalExpensePercentage =
    totalTransactions > 0
      ? (
          totalExpenseTransactions.length * 100
        ) / totalTransactions
      : 0;

  // ================= TURNOVER =================

  const totalTurnover =
    transactions.reduce(
      (acc, transaction) =>
        acc + Number(transaction.amount),
      0
    );

  const totalIncomeTurnover =
    totalIncomeTransactions.reduce(
      (acc, transaction) =>
        acc + Number(transaction.amount),
      0
    );

  const totalExpenseTurnover =
    totalExpenseTransactions.reduce(
      (acc, transaction) =>
        acc + Number(transaction.amount),
      0
    );

  // ================= TURNOVER PERCENTAGES =================

  const totalIncomeTurnoverPercentage =
    totalTurnover > 0
      ? (
          totalIncomeTurnover * 100
        ) / totalTurnover
      : 0;

  const totalExpenseTurnoverPercentage =
    totalTurnover > 0
      ? (
          totalExpenseTurnover * 100
        ) / totalTurnover
      : 0;

  // ================= CATEGORY =================

  const category = [
    "salary",
    "freelance",
    "entertainment",
    "education",
    "food",
    "tax",
    "medical"
  ];

  return (

    <div className="analytics">

      {/* ================= COUNTS ================= */}

      <div className="row">

        <div className="col-md-4 mt-3">

          <div className="transactions-count">

            <h4>
              Total Transactions:
              {" "}
              {totalTransactions}
            </h4>

            <hr />

            <h5>
              Income:
              {" "}
              {totalIncomeTransactions.length}
            </h5>

            <h5>
              Expense:
              {" "}
              {totalExpenseTransactions.length}
            </h5>

            <div className="d-flex mt-3">

              <Progress
                className="mx-5"
                type="circle"
                percent={
                  totalIncomePercentage.toFixed(0)
                }
                strokeColor="green"
              />

              <Progress
                type="circle"
                percent={
                  totalExpensePercentage.toFixed(0)
                }
                strokeColor="red"
              />

            </div>

          </div>

        </div>

        {/* ================= TURNOVER ================= */}

        <div className="col-md-4 mt-3">

          <div className="transactions-count">

            <h4>
              Total Turnover:
              {" "}
              {totalTurnover}
            </h4>

            <hr />

            <h5>
              Income:
              {" "}
              {totalIncomeTurnover}
            </h5>

            <h5>
              Expense:
              {" "}
              {totalExpenseTurnover}
            </h5>

            <div className="d-flex mt-3">

              <Progress
                className="mx-5"
                type="circle"
                percent={
                  totalIncomeTurnoverPercentage.toFixed(0)
                }
                strokeColor="green"
              />

              <Progress
                type="circle"
                percent={
                  totalExpenseTurnoverPercentage.toFixed(0)
                }
                strokeColor="red"
              />

            </div>

          </div>

        </div>

      </div>

      <hr />

      {/* ================= CATEGORY ANALYTICS ================= */}

      <div className="row mt-3">

        {/* INCOME */}

        <div className="col-md-6 mt-3">

          <h3>
            Income - Category Wise
          </h3>

          {
            category.map((c,index)=>{

              const amount =
                totalIncomeTransactions
                  .filter(
                    (transaction)=>
                      transaction.category === c
                  )
                  .reduce(
                    (acc,t)=>
                      acc + Number(t.amount),
                    0
                  );

              if(amount > 0){

                return (

                  <div
                    className="category-card"
                    key={index}
                  >

                    <h5>{c}</h5>

                    <Progress
                      percent={
                        (
                          (amount /
                            totalIncomeTurnover) * 100
                        ).toFixed(0)
                      }
                    />

                  </div>
                );
              }

              return null;
            })
          }

        </div>

        {/* EXPENSE */}

        <div className="col-md-6 mt-3">

          <h3>
            Expense - Category Wise
          </h3>

          {
            category.map((c,index)=>{

              const amount =
                totalExpenseTransactions
                  .filter(
                    (transaction)=>
                      transaction.category === c
                  )
                  .reduce(
                    (acc,t)=>
                      acc + Number(t.amount),
                    0
                  );

              if(amount > 0){

                return (

                  <div
                    className="category-card"
                    key={index}
                  >

                    <h5>{c}</h5>

                    <Progress
                      percent={
                        (
                          (amount /
                            totalExpenseTurnover) * 100
                        ).toFixed(0)
                      }
                    />

                  </div>
                );
              }

              return null;
            })
          }

        </div>

      </div>

    </div>
  );
}

export default Analytics;