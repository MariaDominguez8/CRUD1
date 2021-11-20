
module.exports = (id,db) =>(id && !!db.find(e => e.id === id));