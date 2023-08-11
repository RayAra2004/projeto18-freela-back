import { db } from "../database/database.connection.js";

export async function cretateService(name, description, price, url, fk_category_id, user_id, address_id){
    let i = 0;
    const photos = [];
    do{
        let id_photo = await db.query(`INSERT INTO photo(url) VALUES($1) RETURNING id;`, [url[i]]);
        photos.push(id_photo.rows[0].id);
        i++;
    }while(i < url.length);

    const id_service = await db.query(`INSERT INTO services(name, description, price, fk_users_id) VALUES($1, $2, $3, $4) RETURNING id;`, 
    [name, description, price, user_id]);

    i = 0;
    do{
        await db.query(`INSERT INTO services_photo(fk_services_id, fk_photo_id) VALUES($1, $2);`, [id_service.rows[0].id, photos[i]]);
        i++;
    }while(i < photos.length);

    i = 0;
    do{
        await db.query(`INSERT INTO services_category(fk_category_id, fk_services_id) VALUES($1, $2);`, [fk_category_id[i], id_service.rows[0].id])
        i++;
    }while(i < fk_category_id.length);

    await db.query(`INSERT INTO services_address(fk_services_id, fk_address_id) VALUES($1, $2);`, [id_service.rows[0].id, address_id])
}