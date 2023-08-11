import { createUser, login, session } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function singUp(req, res){
    const { name, email, password, tp_user } = req.body;

    const encriptedPassword = bcrypt.hashSync(password.trim(), 10);

    try{
        await createUser(name.trim(), email.trim(), encriptedPassword, tp_user);
        res.sendStatus(201);
    }catch(err){
        if(err.code === '23505') return res.status(409).send("Email já cadastrado no sistema!!");
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res){
    const { email , password } = req.body;

    try{
        const userExist = await login(email);

        if(userExist.rowCount === 0) return res.status(404).send("Email não cadastrado no sistema!!!");
        if(!(bcrypt.compareSync(password, userExist.rows[0].password))) return res.status(401).send("Senha incorreta!!");

        const token = uuid();

        await session(userExist.rows[0].id, token);

        res.send({token});
    }catch(err){
        res.status(500).send(err.message);
    }
}