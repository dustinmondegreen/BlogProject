import Database from "better-sqlite3";
import query from "../schemas/dbschema.js";
const db = new Database('./db/app.db');

export default function initdb(){
    try{
        db.exec(query)
        console.log('DB successfully initalized')
    } catch (error) {
        
        console.log(error)
    }
};

export {db};