//readerWriter.js ---- lowest level in the storage layer
'use strict';

const fs = require('fs').promises;

async function readStorage(storageFilePath) {
    try {
        const data = await fs.readFile(storageFilePath, 'utf8');
        return JSON.parse(data);
    }
    catch (err) {
        // console.log(err.message); //for debugging
        return [];
    }
}

async function writeStorage(storageFilePath, data) { // takes js data in an array 
    try {
        await fs.writeFile(storageFilePath,
            JSON.stringify(data, null, 4), {
            encoding: 'utf8',
            flag: 'w'
        }
        );
        return true; // if is okay, then it will return true
        // we need to stringify it to a json object (Der Wert, der in eine JSON-Zeichenkette umgewandelt werden soll.)
    }
    catch (err) {
        // console.log(err.message); //for debugging
        return false;
    }
}

module.exports = { readStorage, writeStorage }

