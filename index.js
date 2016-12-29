const PouchDB = require('pouchdb')
const repl = require('repl')

const db = new PouchDB('local_db')
const external_db = new PouchDB('http://localhost:5984/kittens')
const remote_db = new PouchDB('https://fingerskier.cloudant.com/kittens/_all_docs?limit=100')

let replServer = repl.start({
	prompt: 'pouch\\> '
})

const default_config = {
	_id: 'config',
	background: 'blue',
	foreground: 'white',
	sparkline: 'false'
}

global.btoa = function (str) {return new Buffer(str).toString('base64')}
global.atob = function (str) {return new Buffer(b64Encoded, 'base64').toString()}
;
replServer.context.db = db
replServer.context.blah = 42
replServer.context.logger = function(info){ console.log(info) }
replServer.context.errorer = function(err){
	if (err.name === 'not_found'){
		if (default_doc) return default_doc
		else throw err
	} else if (err.name === 'conflict') {

	} else {
		throw err
	}

	console.error(err)
}
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
replServer.context.mydoc = {
	_id: 'mydoc',
	_attachments: {
		'myattachment.txt': {
			content_type: 'text/plain',
			data: 'aGVsbG8gd29ybGQ='
		}
	}
}
;
db.sync(remote_db, {live:true, retry:true})
.on('active', function(active){
	console.log('db active')
})
.on('change', function(change){
	console.log('db change', change)
})
.on('complete', function(complete){
	console.log('db complete', complete)
})
.on('error', function(error){
	console.log('remote_db sync error')
	console.error(error)
})
.on('paused', function(paused){
	console.log('db paused')
})
;
db.get('config')
.catch(function(err){
	if (err.name === 'not_found'){
		return default_config
	} else {
		throw err
	}
})
.then(function(doc) {
	console.log(doc)
})
.catch(function (err) {
	throw err
})
