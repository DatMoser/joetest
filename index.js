const express = require('express')
const app = express()

var hana = require('@sap/hana-client');

var conn = hana.createConnection();

var conn_params = {
    serverNode: 'f10e1026-9095-43c1-a969-d649862a1cd6.hana.trial-us10.hanacloud.ondemand.com:443',
    encrypt: 'true',
    sslValidateCertificate: 'false',
    uid: 'DBADMIN',
    pwd: 'Asdfghjkl345'
};

// open DB connection
conn.connect(conn_params, function (err) {
    if (err) throw err;
    console.log("Connection established");

    // Put listener for Photoelectric barrier here
    app.post('/increment', (req, res) => {
        conn.exec('UPDATE Joe SET counter = counter + 1 WHERE id = ?', [1], function (err, result) {
            if (err) { res.send(err) };
            console.log("Increment:", result);
            res.send("Incremented counter")
        })
    })


    app.post('/decrement', (req, res) => {
        conn.exec('UPDATE Joe SET counter = counter - 1 WHERE id = ?', [1], function (err, result) {
            if (err) { res.send(err) };
            console.log("Increment:", result);
            res.send("Decremented counter")
        })
    })


    app.get('/', (req, res) => {
        conn.exec('SELECT * FROM Joe WHERE id = ?', [1], function (err, result) {
            if (err) { res.send(err) }
            else { res.send(result) }
        })
    })


    app.listen(process.env.PORT || 3000,
        () => console.log("Server is running..."));
});
