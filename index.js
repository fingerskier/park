const PouchDB = require('pouchdb')
const repl = require('repl')

const db = new PouchDB('http://localhost:5984/kittens')

let replServer = repl.start({
	prompt: 'pouch\\> '
})

const default_config = {
	_id: 'config',
	background: 'blue',
	foreground: 'white',
	sparkline: 'false'
}
;
replServer.context.db = db
replServer.context.logger = function(info){ console.log(info) }
replServer.context.errorer = function(err){ console.error(err) }
replServer.context.doc = {
	_id: "mittens",
	name: "Mittens",
	occupation: "kitten",
	age: 3,
	hobbies: [
		"thing 1",
		"thing 2",
		"thing 3"
	]
}
;
db.get('config')
.catch(function(err){
	if (err.name === 'not_found'){
		return default_config
	} else {
		throw err
	}
})
.then(function (doc) {
	console.log(doc)
})
.catch(function (err) {
	throw err
})
;
