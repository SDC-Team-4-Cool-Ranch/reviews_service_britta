const { Pool, Client } = require('pg');
const { HOST, PORT, USER, DB } = process.env;
const client = new Client({
  host: HOST,
  port: 5432,
  user: USER,
  database: DB,
});

// connect to database
client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error('connection error', err.stack))

module.exports = {
  getAll: (product_id, count, page) => {
    return client.query(`SELECT json_build_object(
      'product', ${product_id},
      'page', ${page},
      'count', ${count},
      'results', (SELECT json_agg(row_to_json(reviews_alias))
        FROM (SELECT r.id AS review_id, r.rating, r.summary, r.recommend, r.response,
          r.body, to_char(to_timestamp(r.date/1000), 'YYYY-MM-DD"T"HH24:MI:SS.MSZ'),
          r.reviewer_name, r.helpfulness,
          json_strip_nulls(json_agg(json_build_object(
          'id', p.id,
          'url', p.url
        ))) AS photos
      FROM reviews r
      LEFT JOIN reviews_photos p ON r.id = p.review_id
      WHERE product_id = ${product_id} AND reported = false
      GROUP BY r.id
      LIMIT ${count} OFFSET ${page}) reviews_alias))`)
  },

  postOne: (product_id, req_body) => {
    const { rating, summary, body, recommended, reviewer_name,
      reviewer_email, photos, characteristics } = req_body;

    let queries = [];

    queries.push(client.query(`INSERT INTO reviews (product_id,rating,date,summary,body,
      recommend,reviewer_name,reviewer_email) VALUES (${product_id}, ${rating},
      ${Date.now()}, ${summary}, ${body}, ${recommended}, ${reviewer_name}, ${reviewer_email})`))

    photos.map((url) => {
      queries.push(client.query(`INSERT INTO reviews_photos (review_id, url)
      VALUES ((SELECT MAX(id) from reviews), '${url}')`))
    })

    let chars = Object.entries(characteristics);
    chars.map(char => {
      queries.push(client.query(`INSERT INTO reviews_characteristics (characteristic_id,review_id,value)
      VALUES (${char[0]}, (SELECT MAX(id) from reviews), ${char[1]})`))
    })

    return Promise.all(queries);
  },

  putHelpful: (id) => {
    return client.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${id}`)
  },

  putReported: (id) => {
    return client.query(`UPDATE reviews SET reported = true WHERE id = ${id}`)
  }


}

// Promise.all(photos.map(url) => (
//   db.query(INSERT INTO