// SELECT * FROM reviews WHERE product_id = ?;
const { Client } = require('pg');
const client = new Client();

client.connect();



module.exports = {
  query: (id, callback) => {
    client.query(`SELECT * FROM reviews WHERE product_id = ${id}`)
        .then((data)=> {
            console.log(data)
            // let obj= {} data manipulation
            callback(null, data)
        })
        .catch(() => callback(err))
  }
}