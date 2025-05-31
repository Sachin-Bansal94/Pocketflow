import express from "express";
import db from '../dbConnect.js'
import bodyParser from "body-parser";
import bycrypt from 'bcrypt';
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";

const router = express.Router();

router.use(
    session({
        secret: "TOPSECRETWORD",
        resave: false,
        saveUninitialized: true,
        cookie:{
            maxAge: 1000 * 60 * 60 *24, //this creates a cookie with a time-limit for 1 day
                //maxAge is in milliseconds
        }
    })
);


router.use(bodyParser.urlencoded({extended:true}));

router.use(passport.initialize());
router.use(passport.session());

const saltRounds=10;


router.post('/register',async (req,res)=>{

	const email = req.body.email;
	const name = req.body.name;
	const password= req.body.password;
	
	try{
		const result = await db.query("SELECT * FROM users WHERE email=$1;",[email]);
		if(result.rows.length>0){
			console.log("Already Registered");
			res
					.status(500)
					.json("Already registered");
		}
		
		else{

            bycrypt.hash(password,saltRounds,async (err,hash)=>{
                try{
                    const result = await db.query("INSERT INTO users(username,email,password) VALUES($1,$2,$3) RETURNING username,email;",[name,email,hash]);
                    console.log(result.rows[0]);
                    console.log("hello");
                    res.status(200).json(result.rows[0]);
                }
    
                catch(err){
                    console.log(err.message);
                    res
                        .status(500)
                        .json(err.message);
                }
            })
		}
	}
	catch(err){
		console.log(err.message);
		res
			.status(500)
			.json("500 status error");
	}

})

router.post('/login',async (req,res)=>{
    console.log(req.body);

    const email = req.body.email;
    const loginPassword = req.body.password;

    try {

        const result = await db.query("SELECT * FROM users WHERE email=$1;",[email]);
        console.log(result.rows[0]);

        if(result.rows.length>0){
            const storedPass = result.rows[0].password;

            bycrypt.compare(loginPassword,storedPass,(err,check)=>{
                if(err){
                    console.log(err.message);
                    res.status(500).json(err.message);
                }
    
                else{
                    if(check){
                        result.rows[0].password='';
                        res.status(200).json(result.rows[0]);
                    }
                    else{
                        res.status(401).json("Incorrect Password or Username");
                    }
                }
    
            })
        }
        else{
            res.status(401).json("Incorrect Password or Username");
        }
        


    }
    catch(err){
        console.log(err.message);
    }

});

export default router