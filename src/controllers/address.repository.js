import { db } from "../database/database.connection.js";

export async function createAddress({ postcode, city}){
    
    let id_city;

    const cityExist = await db.query(`SELECT * FROM city WHERE city = $1;`, [city])

    if(cityExist.rowCount === 0){
        id_city = await db.query(`INSERT INTO city(city) VALUES($1) RETURNING city_pk;`, [city]);
        id_city = id_city.rows[0].city_pk;
    }else{
        id_city = cityExist.rows[0].city_pk;
    }

    return await db.query(
        `INSERT INTO address(fk_city_city_pk, postcode)
        VALUES($1, $2) RETURNING id;`,
        [id_city, postcode]);
}

export async function userAddress(id_user, id_address){
    await db.query(`INSERT INTO users_address(fk_users_id, fk_address_id) VALUES($1, $2);`, [id_user, id_address])
}