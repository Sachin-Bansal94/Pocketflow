import express from "express";
import axios from "axios";
import db from './dbConnect.js'
import bodyParser from "body-parser";

const app = express();
const port = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

import userRoute from './routes/usersRoute.js';
app.use('/api/user/',userRoute);

import transactionRoute from './routes/transactionRoute.js';
app.use('/api/transaction/',transactionRoute);


//checks if the server is working on the port of the server
app.listen(port,()=>{
	console.log(`server running on port ${port}`); 
});