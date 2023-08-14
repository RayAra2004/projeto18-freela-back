import { db } from "../database/database.connection.js";

export async function createUser(name, email, phone,  password, tp_user){
    return await db.query(
        `INSERT INTO users(name, email, password, phone, fk_type_users_type_users_pk) VALUES($1, $2, $3, $4, $5) RETURNING id;`,
        [name, email, password, phone, tp_user]
    );

}

export async function login(email){
    return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
}

export async function session(user_id, token){
    await db.query(`INSERT INTO session(token, fk_users_id) VALUES($1, $2);`, [token, user_id]);
}

