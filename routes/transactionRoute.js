import express from "express";
import db from "../dbConnect.js";
import bodyParser from "body-parser";
import moment from "moment";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/transaction-add", async (req, res) => {
  const amount = req.body.amount;
  const type = req.body.type;
  const category = req.body.category;
  const date = req.body.date;
  const reference = req.body.reference;
  const description = req.body.description;
  const userEmail = req.body.userEmail;

  try {
    const response = await db.query(
      "INSERT INTO transactions VALUES($1,$2,$3,$4,$5,$6,$7)",
      [userEmail, amount, type, date, category, reference, description]
    );

    res.send("Successfully Inserted");
  } catch (err) {
    res.status(500).json("Error with the database");
  }
});

router.post("/transaction-get", async (req, res) => {
  const user = req.body.userEmail;
  const freq = req.body.freq;
  const type = req.body.type;

  try {

    var result=[];

    if(freq==='custom'){
      var startDate,finishDate;

      if(req.body.range.length == 2){
        startDate = req.body.range[0];
        finishDate = req.body.range[1];
      }
      else{
        startDate = moment().toDate();
        finishDate = moment().toDate();
      }

      if(type==='all'){
        result = await db.query(
          "SELECT transaction_id, useremail,amount,type,dateexpense,category,reference,description FROM users JOIN transactions ON email = userEmail WHERE email = $1 AND dateexpense>=$2 AND dateexpense <=$3;",
          [user, startDate,finishDate]
        );
      }
      else{
        result = await db.query(
          "SELECT transaction_id, useremail,amount,type,dateexpense,category,reference,description FROM users JOIN transactions ON email = userEmail WHERE email = $1 AND dateexpense>=$2 AND dateexpense <=$3 AND type =$4;",
          [user ,startDate ,finishDate,type]
        );
      }

      
    }

    else{
      const date = moment().subtract(Number(freq), "d").toDate();

      if(type==='all'){
        result = await db.query(
          "SELECT transaction_id, useremail,amount,type,dateexpense,category,reference,description FROM users JOIN transactions ON email = userEmail WHERE email = $1 AND dateexpense >=$2;",
          [user, date]
        );
      }
      else{
        result = await db.query(
          "SELECT transaction_id, useremail,amount,type,dateexpense,category,reference,description FROM users JOIN transactions ON email = userEmail WHERE email = $1 AND dateexpense >=$2 AND type=$3;",
          [user, date, type]
        );
      }
      
    }

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/transaction-edit",async (req,res)=>{
  const amount = req.body.amount;
  const type = req.body.type;
  const category = req.body.category;
  const date = req.body.date;
  const reference = req.body.reference;
  const description = req.body.description;
  const userEmail = req.body.userEmail;

  const transaction_id = req.body.transaction_id;
  const dateexpense = req.body.date;

  try{
    await db.query("UPDATE transactions SET amount = $1,type = $2,dateexpense = $3, category=$4, reference=$5, description=$6 WHERE transaction_id = $7",[amount,type,dateexpense,category,reference,description,transaction_id]);
    res.send("Successfully Updated");
  }
  catch(err){
    res.status(500).json(err.message);
  }

})

router.post("/transaction-edit",async (req,res)=>{

  const amount = req.body.amount;
  const type = req.body.type;
  const category = req.body.category;
  const date = req.body.date;
  const reference = req.body.reference;
  const description = req.body.description;
  const userEmail = req.body.userEmail;

  const transaction_id = req.body.transaction_id;
  const dateexpense = req.body.date;

  try{
    await db.query("UPDATE transactions SET amount = $1,type = $2,dateexpense = $3, category=$4, reference=$5, description=$6 WHERE transaction_id = $7",[amount,type,dateexpense,category,reference,description,transaction_id]);
    res.send("Successfully Updated");
  }
  catch(err){
    res.status(500).json(err.message);
  }

})

router.post("/transaction-del",async(req,res)=>{
  const transaction_id = req.body.tId;

  try{
    await db.query("DELETE FROM transactions WHERE transaction_id = $1",[transaction_id]);
    res.send("Successfully Updated");
  }
  catch(err){
    res.status(500).json(err.message);
  }

})

export default router;
