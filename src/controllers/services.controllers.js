import { cretateService } from "../repositories/services.repository.js";

export async function postService(req, res){
    const { name, description, price, url, fk_category_id } = req.body;
    const { user_id } = res.locals;

    try{
        const id_address = createAddress();
        await cretateService(name, description, price, url, fk_category_id, user_id);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}