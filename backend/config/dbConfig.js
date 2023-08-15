const {Pool} = require('pg');

const pool = new Pool({


    user:'conas',
    host:'localhost',
    database:'conas',
    password:1234,
    port:5432,

});

module.exports={pool}

