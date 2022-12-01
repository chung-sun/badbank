'use strict';
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
//const url = process.env.DEV_DB_URL;
const url = process.env.MONDODB_CONNECTION;
let db = null;

// connect to mongodb
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {

    // connect to badbank databse
    try {
        db = client.db('badbank');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
    

});

// create user account
function create (name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        //const doc = {name, email, password, balance: 0};
        const doc = {
            name: name,
            email: email,
            password: password,
            role: 5,
            balance: 0.00
        };
        collection.insertOne(doc, {w:1}, function (err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
};

// find one user
function findUser (email) {
    return new Promise((resolve, reject) => {
        const customer = db.collection('users').findOne({"email": email}, function (err, user) {
            err ? reject(err) : resolve(user);
        });
    });
};

// update one user
function update (email, deposit) {
    return new Promise((resolve, reject) => {
        const customer = db.collection('users').updateOne({"email": email}, {$inc: {"balance": Number(deposit)}}, function (err, user) {
            err ? reject(err) : resolve(user);
        });
    });

};

// findUpdate find and update one user
function findUpdate (email, amount) {
    return new Promise((resolve, reject) => {
        const customer = db.collection('users').findOneAndUpdate({"email": email}, {$inc: {"balance": Number(amount)}}, {returnDocument: 'after'}, function (err, user) {
            err ? reject(err) : resolve(user);
        });
    });
};

// findOneAndUpdate find and update one user
function findUpdateUser (email, name) {
    return new Promise((resolve, reject) => {
        const customer = db.collection('users').findOneAndUpdate({"email": email}, { $set: {"email": email, "name": name} }, {returnDocument: 'after'}, function (err, user) {
            err ? reject(err) : resolve(user);
        });
    });
};

// get all users
function all () {
    return new Promise((resolve, reject) => {
        const customer = db.collection('users').find({}).toArray(function (err, docs) {
            err ? reject(err) : resolve(docs);
        });
    });
};

// delete all users
function deleteAll () {
    return new Promise((resolve, reject) => {
        const deleteUser = db.collection('users').deleteMany({}, function (err) {
            err ? reject(err) : resolve('Deleted')
        });
    });
};

module.exports = {create, findUser, update, findUpdate, findUpdateUser, all, deleteAll};