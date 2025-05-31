import pg from "pg";
const db = new pg.Client({
    user:"postgres",
	host:"localhost",
    database:"pocketflow",
	password:"welcome123",
    port:5432
});


db.connect();

export default db;