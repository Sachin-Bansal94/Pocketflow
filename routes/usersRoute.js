import express from "express";
import db from "../dbConnect.js";

const router = express.Router();

import bcrypt from "bcrypt";

// ================= REGISTER =================

router.post("/register", async(req,res)=>{

    try{

        const { name, email, password } = req.body;

        // CHECK EXISTING USER

        const existingUser = await db.query(
            `
            SELECT *
            FROM users
            WHERE email=$1
            `,
            [email]
        );

        if(existingUser.rows.length > 0){

            return res.send({
                success:false,
                message:"User Already Exists"
            });
        }

        // HASH PASSWORD

        const hashedPassword =
            await bcrypt.hash(password,10);

        // INSERT USER

        await db.query(
            `
            INSERT INTO users(username,email,password)
            VALUES($1,$2,$3)
            `,
            [
                name,
                email,
                hashedPassword
            ]
        );

        res.send({
            success:true,
            message:"Registration Successful"
        });

    } catch(err){

        console.log(err);

        res.send({
            success:false,
            message:err.message
        });
    }
});

// ================= LOGIN =================

router.post("/login", async(req,res)=>{

    try{

        const { email, password } = req.body;

        // FIND USER BY EMAIL

        const userResult = await db.query(
            `
            SELECT *
            FROM users
            WHERE email=$1
            `,
            [email]
        );

        // USER NOT FOUND

        if(userResult.rows.length === 0){

            return res.send({
                success:false,
                message:"User Not Found"
            });
        }

        const user = userResult.rows[0];

        // COMPARE HASHED PASSWORD

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        // PASSWORD WRONG

        if(!isMatch){

            return res.send({
                success:false,
                message:"Invalid Credentials"
            });
        }

        // LOGIN SUCCESS

        res.send({
            success:true,
            message:"Login Successful",
           user:{
   id:user.id,
   username:user.username,
   email:user.email
}
        });

    } catch(err){

        console.log(err);

        res.send({
            success:false,
            message:err.message
        });
    }
});
export default router