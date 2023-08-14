import { cretateService, getAllServices, getCategorys, getServiceByID, getServiceByUser, onOffService } from "../repositories/services.repository.js";
import { createAddress } from "./address.repository.js";

export async function postService(req, res){
    const { name, description, price, url, fk_category_id} = req.body;
    const { user_id } = res.locals;

    try{       
        await cretateService(name, description, price, url, fk_category_id, user_id);
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

export async function getAllCategory(req, res){
    try{
        const categorys = await getCategorys();
        res.send(categorys.rows);
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function myServices(req, res){
    const { user_id } = res.locals;

    try{
        const myServices = await getServiceByUser(user_id)
        res.send(myServices.rows)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function activeService(req, res){
    const {active, service_id} = req.body;

    try{
        await onOffService(active, service_id);
        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message)
    }
}