import { db } from "../database/database.connection.js";

export async function createAddress({ postcode, street, number, city, neighbourhood, type_street }){
    
    let id_city, id_neighbourhood, id_type_street;

    if(typeof(city) !== 'number'){
        id_city = await db.query(`INSERT INTO city(city) VALUES($1) RETURNING city_pk;`, [city]);
        id_city = id_city.rows[0].city_pk;
    }else{
        id_city = city;
    }

    if(typeof(neighbourhood) !== 'number'){
        id_neighbourhood = await db.query(`INSERT INTO neighbourhood(neighbourhood) VALUES($1) RETURNING neighbourhood_pk;`, [neighbourhood]);
        id_neighbourhood = id_neighbourhood.rows[0].neighbourhood_pk;
    }else{
        id_neighbourhood = neighbourhood;
    }

    if(typeof(type_street) !== 'number'){
        id_type_street = await db.query(`INSERT INTO type_street(type_street) VALUES($1) RETURNING type_street_pk;`, [type_street])
        id_type_street = id_type_street.rows[0].type_street_pk;
    }else{
        id_type_street = type_street;
    }

    console.log(id_city, id_neighbourhood, id_type_street)

    return await db.query(
        `INSERT INTO address(fk_city_city_pk, fk_neighbourhood_neighbourhood_pk, postcode, street, number, fk_type_street_type_street_pk)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING id;`,
        [id_city, id_neighbourhood, postcode, street, number, id_type_street]);
}