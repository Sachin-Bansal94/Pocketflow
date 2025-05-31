import React from "react";
import "../resources/analytics.css";
import { Flex, Progress } from "antd";

function Analytics({ transactions }) {
  console.log(transactions);

  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (item) => item.type === "income"
  );
  const totalExpenseTransactions = transactions.filter(
    (item) => item.type === "expense"
  );
  const totalIncomePercentage =
    (totalIncomeTransactions.length * 100) / totalTransactions;
  const totalExpensePercentage =
    (totalExpenseTransactions.length * 100) / totalTransactions;

  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = totalIncomeTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalExpenseTurnover = totalExpenseTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover * 100) / totalTurnover;
  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover * 100) / totalTurnover;

  console.log(totalExpenseTransactions);

  const category = ['salary','freelance','entertainment','education','food','tax','medical'];

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total Transactions: {totalTransactions}</h4>
            <hr />
            <h5>Income: {totalIncomeTransactions.length}</h5>
            <h5>Expense: {totalExpenseTransactions.length}</h5>
            <div className="d-flex mt-3">
              <Progress
                className="mx-5"
                type="circle"
                percent={totalIncomePercentage.toFixed(0)}
                strokeColor={"green"}
              />
              <Progress
                type="circle"
                percent={totalExpensePercentage.toFixed(0)}
                strokeColor={"red"}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total Turnover: {totalTurnover}</h4>
            <hr />
            <h5>Income: {totalIncomeTurnover}</h5>
            <h5>Expense: {totalExpenseTurnover}</h5>
            <div className="d-flex mt-3">
              <Progress
                className="mx-5"
                type="circle"
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
                strokeColor={"green"}
              />
              <Progress
                type="circle"
                percent={totalExpenseTurnoverPercentage.toFixed(0)}
                strokeColor={"red"}
              />
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="row mt-3">
        <div className="col-md-6 mt-3">
            <h3>Income - Category Wise</h3>
          {category.map((c)=>{
            const amount = totalIncomeTransactions
                .filter((transaction)=>transaction.category===c)
                .reduce((acc,t)=> acc+t.amount,0);

            console.log(amount);
            if(amount>0){
                return(
                    <div class="category-card">
                        <h5>{c}</h5>
                        <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)}/>
                    </div>
                );
            } 

          })}
        </div>
        <div className="col-md-6 mt-3">
            <h3>Expense - Category Wise</h3>
          {category.map((c)=>{
            const amount = totalExpenseTransactions
                .filter((transaction)=>transaction.category===c)
                .reduce((acc,t)=> acc+t.amount,0);

            if(amount>0){
                return(
                    <div class="category-card">
                        <h5>{c}</h5>
                        <Progress percent={((amount/totalExpenseTurnover)*100).toFixed(0)}/>
                    </div>
                );
            } 

          })}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
