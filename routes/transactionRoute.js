import express from "express";

import db from "../dbConnect.js";

const router = express.Router();

// ================= ADD TRANSACTION =================

router.post("/transaction-add", async(req,res)=>{

    try{

        const {
            amount,
            type,
            category,
            reference,
            description,
            dateexpense,
            userEmail
        } = req.body;

        await db.query(
            `
            INSERT INTO transactions
            (
                amount,
                type,
                category,
                reference,
                description,
                dateexpense,
                useremail
            )
            VALUES($1,$2,$3,$4,$5,$6,$7)
            `,
            [
                amount,
                type,
                category,
                reference,
                description,
                dateexpense,
                userEmail
            ]
        );

        res.send({

            success:true,

            message:"Transaction Added Successfully"
        });

    } catch(err){

        console.log(err);

        res.send({

            success:false,

            message:err.message
        });
    }
});

// ================= GET TRANSACTIONS =================

router.post("/transaction-get", async(req,res)=>{

    try{

        const {
            userEmail,
            freq,
            type,
            range
        } = req.body;

        // ================= BASE QUERY =================

        let query = `
            SELECT *
            FROM transactions
            WHERE useremail = $1
        `;

        let queryParams = [userEmail];

        // ================= TYPE FILTER =================

        if(type !== "all"){

            query += `
                AND type = $${queryParams.length + 1}
            `;

            queryParams.push(type);
        }

        // ================= DATE FILTER =================

        // LAST X DAYS

        if(freq !== "custom"){

            query += `
                AND dateexpense >=
                CURRENT_DATE - INTERVAL '${
                    Number(freq)
                } days'
            `;
        }

        // CUSTOM RANGE

        else if(
            range &&
            range.length === 2
        ){

            query += `
                AND dateexpense
                BETWEEN
                $${queryParams.length + 1}
                AND
                $${queryParams.length + 2}
            `;

            queryParams.push(
                new Date(range[0])
                    .toISOString()
                    .split("T")[0]
            );

            queryParams.push(
                new Date(range[1])
                    .toISOString()
                    .split("T")[0]
            );
        }

        // ================= ORDER =================

        query += `
            ORDER BY dateexpense DESC
        `;

        // ================= EXECUTE =================

        const transactions = await db.query(
            query,
            queryParams
        );

        res.send({

            success:true,

            transactions:
                transactions.rows
        });

    } catch(err){

        console.log(err);

        res.send({

            success:false,

            message:err.message
        });
    }
});

// ================= EDIT TRANSACTION =================

router.post("/transaction-edit", async(req,res)=>{

    try{

        const {
            transaction_id,
            amount,
            type,
            category,
            reference,
            description,
            dateexpense,
            userEmail
        } = req.body;

        await db.query(
            `
            UPDATE transactions
            SET
                amount=$1,
                type=$2,
                category=$3,
                reference=$4,
                description=$5,
                dateexpense=$6,
                useremail=$7
            WHERE transaction_id=$8
            `,
            [
                amount,
                type,
                category,
                reference,
                description,
                dateexpense,
                userEmail,
                transaction_id
            ]
        );

        res.send({

            success:true,

            message:"Transaction Updated"
        });

    } catch(err){

        console.log(err);

        res.send({

            success:false,

            message:err.message
        });
    }
});

// ================= DELETE TRANSACTION =================

router.post("/transaction-del", async(req,res)=>{

    try{

        await db.query(
            `
            DELETE FROM transactions
            WHERE transaction_id=$1
            `,
            [req.body.tId]
        );

        res.send({

            success:true,

            message:"Deleted Successfully"
        });

    } catch(err){

        console.log(err);

        res.send({

            success:false,

            message:err.message
        });
    }
});

export default router;