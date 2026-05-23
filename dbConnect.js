import pkg from "pg";

const { Pool } = pkg;

const db = new Pool({

    user: "postgres",

    host: "localhost",

    database: "pocketflow",

    password: "bansal@4384",

    port: 5432,
});

export default db;