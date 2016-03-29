'use strict';

const mysql = require('mysql');

// Creando la conexión con la base de datos

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '94094uijf',
	database: 'dbapi'
});

// Objeto del modelo de usuarios

let userModel = {};

/*
 * Elimina un usuario.
 */
userModel.deleteUser = function(id, callback) {
	if (connection) {
		let query = 'DELETE FROM users WHERE id = ' + connection.escape(id);
		connection.query(query, function(err, response) {
			if (err) throw err;

			callback(null, { deleted: response.affectedRows });
		});
	}
};

/*
 * Devuelve la lista de usuarios.
 */

userModel.getUsers = function(callback) {
	if (connection) {
		let query = 'SELECT * FROM users ORDER BY id';
		connection.query(query, function(err, response) {
			if (err) throw err;

			callback(null, response);
		});
	}
};

/*
 * Devuelve un usuario.
 */
 
userModel.getUser = function(id, callback) {
	if (connection) {
		let query = 'SELECT * FROM users WHERE id = ' + connection.escape(id)
		connection.query(query, function(err, response) {
			if (err) throw err;

			callback(null, response);
		});
	}
};

/*
 * Guarda un usuario.
 */
 
userModel.insertUser = function(userData, callback) {
	if (connection) {
		let query = 'INSERT INTO users SET ?';
		connection.query(query, userData, function(err, response) {
			if (err) throw err;

			callback(null, { insertId: response.insertId });
		});
	}
};


// Exportar el objeto del modelo para usarlo posteriormente

module.exports = userModel;