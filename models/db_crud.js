//Connects to database and determines which environment to use (development or prouction)
const db = require('../db_config');

module.exports = {
    add,
    find,
    findUser,
    addUser,
}

//add
async function add(obj){
    return await db('logs').insert(obj, ['id'])

}
//find
function find(){
    return db('logs')
}

//add
async function addUser(obj){
    return await db('users').insert(obj, ['id'])

}

//find users
function findUser(id){
    return db('users')
}


