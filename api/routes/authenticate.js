const router = require('express').Router();
const keys = require('../keys');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const { Client } = require('pg');
const crypto = require('crypto');

router.use(['/authenticate', '/api/authenticate'], jsonParser, async (req, res) => {
    // Auth disabled – accept any username and return a random playerID
    const username = (req.body.username || 'player').trim().toLowerCase();
    const playerID = crypto.randomUUID();
    res.status(200).json({ response: 'success', playerID, username });

    // Original DB auth (disabled):
    // const client = new Client()
    // await client.connect()
    // let sql = `SELECT "playerID", "username" from players where username = $1 and password = $2`
    // const values = await client.query(sql, [req.body.username, req.body.password])
    // if (values.rowCount) {
    //     res.status(200)
    //     res.json({response: 'success', playerID: values.rows[0].playerID, username: values.rows[0].username })
    // } else {
    //     res.status(401).jsonp({error: 'failed', reason: 'username or password incorrect'})
    // }
    // await client.end();
});

module.exports = router;