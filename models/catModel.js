let cats = require('../data/cats');
const { v4: uuidv4 } = require('uuid');// this generates unique ids
const { writeDataToFile } = require('../utils');// import from utils.js


function findAll() {
    return new Promise((resolve, reject) => {
        resolve(cats);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const cat = cats.find((c) => c.id === id);
        resolve(cat);
    });
}

function add(cat) {
    return new Promise((resolve, reject) => {
        const newCat = { id: uuidv4(), ...cat };
        cats.push(newCat);
        writeDataToFile('./data/cats.json', cats);// utility function to write data (located in utils.js)
        resolve(newCat);// newCat will be sent back to us
    });
}

function update(id, cat) {
    return new Promise((resolve, reject) => {
        const index = cats.findIndex((c) => c.id === id);
        cats[index] = { id, ...cat };
        writeDataToFile('./data/cats.json', cats);
        resolve(cats[index]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        cats = cats.filter((c) => c.id !== id);
        writeDataToFile('./data/cats.json', cats);
        resolve();
    });
}

module.exports = {
    findAll,
    findById,
    add,
    update,
    remove
};