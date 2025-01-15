'use strict';

const path = require('path');
const express = require('express');
const app = express(); // you can write whatever you want - app is just the name

const { port, host } = require('./config.json');


const Datastorage = require('./storageLayer/dataStorageLayer');
const register = new Datastorage();

const homePath = path.join(__dirname, 'menu.html');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(homePath));
app.get('/keys', (req, res) => register.KEYS.then(keys => res.json(keys)));

// other version with async in teachers material

app.get('/all', (req, res) => register.getAll().then(all => res.json(all)));

/* or:
app.get('/all', async (req, res) => res.json(await register.getAll()));
 */

app.post('/search', async (req, res) => res.json(await register.get(req.body.value, req.body.key)));

// other version without async in teachers material


app.post('/add', (req, res) =>
    register.insert(req, res)
        .then(result => res.json(req, result))
        .catch(error => res.json(req, error))
);


app.post('/remove', (req, res) =>
    register.remove(req.body.value)
        .then(result => res.json(req, result))
        .catch(error => res.json(req, error))
);


app.listen(port, host, () => console.log(`Server ${host}:${port} is serving...`));