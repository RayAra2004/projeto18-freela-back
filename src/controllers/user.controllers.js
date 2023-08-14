import { createUser, login, session } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createAddress, userAddress } from "./address.repository.js";

export async function singUp(req, res){
    const { name, email, password, phone, tp_user } = req.body;

    const encriptedPassword = bcrypt.hashSync(password.trim(), 10);

    try{
        const id_user = await createUser(name.trim(), email.trim(), phone.trim(), encriptedPassword, tp_user);
        const id_address = await createAddress(req.body)

        await userAddress(id_user.rows[0].id, id_address.rows[0].id)
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