'use strict'

// Se hace uso del modelo de usuarios

const UserModel = require('../models/users')


module.exports = function(app) {

	/*
	 * Devuelve un usuario.
	 */

	app.get('/users/:id', function(req, res) {
		let idUsuario = req.params.id

		if (!isNaN(idUsuario)) {
			UserModel.getUser(idUsuario, function(err, response) {
				if (typeof(response) != 'undefined' && response.length > 0) {
					res.statusCode = 200
					res.json(response)
				}
				res.statusCode = 404
				res.end('Usuario no encontrado.')
			})
		}
	})

	/*
	 * Devuelve todos los usuarios.
	 */

	app.get('/users', function(req, res) {
		UserModel.getUsers(function(err, response) {
			res.statusCode = 200
			res.json(response)
		})
	})

}