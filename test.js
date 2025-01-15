'use strict';

const Datastorage = require('./storageLayer/dataStorageLayer');
const storage = new Datastorage();

// storage.getAll().then(console.log); // storage is working
// storage.get(1).then(console.log); // storage is working

// storage.getAll().then(console.log);

const tmp = {
    id: 12,
    firstname: 'Matt',
    lastname: 'Clarkson',
    department: 'ict',
    salary: 4000
};

storage.updateStorage(tmp).then(console.log).catch(console.log);