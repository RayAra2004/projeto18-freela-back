import { cretateService } from "../repositories/services.repository.js";
import { createAddress } from "./address.repository.js";

export async function postService(req, res){
    const { name, description, price, url, fk_category_id, address_id, address } = req.body;
    const { user_id } = res.locals;
    let id_address = 0;

    try{
        if(address_id === -1){
            id_address = await createAddress(address);
            id_address = id_address.rows[0].id;
        }else{
            id_address = address_id;
        }
        //Até aqui está funcionando
        
        await cretateService(name, description, price, url, fk_category_id, user_id, id_address);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}