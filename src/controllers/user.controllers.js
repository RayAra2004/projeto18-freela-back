import { createUser } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

export async function singUp(req, res){
    const { name, email, password, tp_user } = req.body;

    const encriptedPassword = bcrypt.hashSync(password.trim(), 10)

    try{
        await createUser(name.trim(), email.trim(), encriptedPassword, tp_user);
        res.sendStatus(201);
    }catch(err){
        if(err.code === '23505') return res.status(409).send("Email já cadastrado no sistema!!")
        res.status(500).send(err.message);
    }
}