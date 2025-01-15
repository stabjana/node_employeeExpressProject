'use strict';

const path = require('path');

const { readStorage, writeStorage } = require('./readerWriter');
const { adapt } = require('./personAdapter');

const storageFilePath = path.join(__dirname, 'employees.json');

const PRIMARY_KEY = 'id'; //hard coded, not nice

async function getAllFromStorage() {
    return await readStorage(storageFilePath);
}

async function getFromStorage(value, key = PRIMARY_KEY) {
    const dataArray = await readStorage(storageFilePath);
    return dataArray.filter(item => item[key] == value)
    // return (await readStorage(storageFilePath)).filter(item=>item[key]==value);
}

async function addToStorage(newObject) {
    const storage = await readStorage(storageFilePath);
    storage.push(adapt(newObject));
    return await writeStorage(storageFilePath, storage);
}

async function removeFromStorage(value) { //value is for primary_key
    const storage = await readStorage(storageFilePath);
    const ind = storage.findIndex(item => item[PRIMARY_KEY] == value);
    if (ind < 0) return false;
    storage.splice(ind, 1);
    return await writeStorage(storageFilePath, storage);
}

async function getKeys() {
    const storage = await readStorage(storageFilePath);
    const keys = new Set(storage.flatMap(item => Object.keys(item)));
    return [...keys];
}

async function updateStorage(modifiedObject) {
    const storage = await readStorage(storageFilePath);
    const oldObject = storage.find(item => item[PRIMARY_KEY] == modifiedObject[PRIMARY_KEY]);     //  oldObject: returns the adress of the object stored in the array (Object reference)
    // if they are matching it will give me the Object
    if (oldObject) {
        Object.assign(oldObject, adapt(modifiedObject)) // replacing this with the new version
        return await writeStorage(storageFilePath, storage);
    }
    return false;
}

module.exports = {
    getAllFromStorage,
    getFromStorage,
    addToStorage,
    removeFromStorage,
    getKeys,
    updateStorage,
    primary_key: PRIMARY_KEY
}