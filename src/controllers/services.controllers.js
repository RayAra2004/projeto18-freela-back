import { cretateService, getAllServices, getServiceByID } from "../repositories/services.repository.js";
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
        
        await cretateService(name, description, price, url, fk_category_id, user_id, id_address);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function getServices(req, res){
    try{
        const services = await getAllServices();
        res.status(200).send(services.rows);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function getService(req, res){
    const { id } = req.params;

    try{
        const service = await getServiceByID(id);
        res.send(service.rows[0])
    }catch(err){
        res.status(500).send(err.message);
    }
}