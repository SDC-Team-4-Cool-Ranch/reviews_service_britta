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
  getAll: (id, count, page) => {
    return client.query(`SELECT json_build_object(
      'product', ${id},
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
      WHERE product_id = ${id} AND reported = false
      GROUP BY r.id
      LIMIT ${count} OFFSET ${page}) reviews_alias))`)
  },

  postOne: (id) => {
    const { rating, summary, body, recommended, reviewer_name, reviewer_email } = req.body;
    let queryString = `INSERT INTO reviews (product_id,rating,date,summary,body,recommend,reviewer_name,reviewer_email) VALUES (${product_id}, ${rating}, ${Date.now()}, ${summary}, ${body}, ${recommended}, ${reviewer_name}, ${reviewer_email})`
    return client.query(queryString);
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