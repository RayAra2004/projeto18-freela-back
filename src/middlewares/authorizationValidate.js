import { db } from "../database/database.connection.js"

export async function authorizationValidate(req, res, next){
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    if(!token) return res.status(401).send("Token não recebido!!!")

    const tokenExist = await db.query("SELECT * FROM session WHERE token = $1;", [token])

    if(tokenExist.rowCount === 0) return res.status(401).send("Token não existente!! Favor realizar o login!!")

    res.locals.user = tokenExist.rows[0].fk_person_id
    

    next()
}