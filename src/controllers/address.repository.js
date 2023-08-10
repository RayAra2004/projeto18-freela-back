import { db } from "../database/database.connection.js";

export async function createAddress({ postcode, street, number, city, neighbourdhood, type_street }){
    
    if(typeof(city) !== 'number'){
        const id_city = await db.query(`INSERT INTO city(city) VALUES($1) RETURNING city_pk;`, [city]);
    }

    if(typeof(neighbourdhood) !== 'number'){
        const id_neighbourdhood = await db.query(`INSERT INTO neighbourdhood(neighbourdhood) VALUES($1) RETURNING neighbourdhood_pk;`, [neighbourdhood]);
    }

    if(typeof(type_street) !== 'number'){
        const id_type_street = await db.query(`INSERT INTO type_street(type_street) VALUES($1) RETURNING type_street_pk;`, [type_street])
    }

    
}