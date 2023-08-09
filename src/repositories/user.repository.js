import { db } from "../database/database.connection.js";

export async function createUser(name, email, password, tp_user){
    await db.query(
        `INSERT INTO users(name, email, password, fk_type_users_type_users_pk) VALUES($1, $2, $3, $4);`,
        [name, email, password, tp_user]
    );

}