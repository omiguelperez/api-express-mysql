'use strict';

// Se hace uso del modelo de usuarios

const UserModel = require('../models/users');


module.exports = function(app) {

	/*
	 * Elimina un usuario.
	 */
	app.delete('/users', function(req, res) {
		let userId = req.body.id;

		UserModel.deleteUser(userId, function(err, response) {
			if (response.deleted) return res.redirect('/users');

			res.statusCode = 500;
			res.end(response.message);
		});
	});

	/*
	 * Formulario para eliminar un usuario.
	 */
	app.get('/delete', function(req, res) {
		res.render('delete', {
			title: 'Formulario para eliminar un usuario'
		});
	});

	/*
	 * Formulario para editar un usuario.
	 */

	app.get('/user/update/:id', function(req, res) {
		let userId = req.param('id');

		if (!isNaN(userId)) {
			UserModel.getUser(userId, function(err, response) {
				if (typeof response != 'undefined' && response.length > 0) {
					res.render('update', {
						title: 'Formulario para editar un usuario',
						info: response
					});
				}

				res.statusCode = 500;
				res.end('Usuario no encontrado.');
			});
		} else {
			res.statusCode = 500;
			res.end('Ha ocurrido un error.');
		}
	});

	/*
	 * Devuelve un usuario.
	 */

	app.get('/users/:id', function(req, res) {
		let userId = req.param('id');

		if (!isNaN(userId)) {
			UserModel.getUser(userId, function(err, response) {
				if (typeof(response) != 'undefined' && response.length > 0) {
					res.statusCode = 200;
					res.json(response);
				}
				res.statusCode = 404;
				res.end('Usuario no encontrado.');
			});
		} else {
			res.statusCode = 500;
			res.end('Ha ocurrido un error.');
		}
	});

	/*
	 * Devuelve todos los usuarios.
	 */

	app.get('/users', function(req, res) {
		UserModel.getUsers(function(err, response) {
			res.statusCode = 200;
			res.json(response);
		});
	});

	/*
	 * Guardar un usuario.
	 */
	app.post('/users', function(req, res) {
		// Datos del usuario
		let userData = {
			id: null,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			created_at: null,
			updated_at: null
		};

		UserModel.insertUser(userData, function(err, response) {
			if (response && response.insertId) {
				return res.redirect('/users/' + response.insertId);
			}
			res.statusCode = 500;
			res.end('No se pudo registrar el usuario.');
		});
	});

	/*
	 * Actualizar los datos de un usuario.
	 */
	app.put('/users', function(req, res) {
		let userData = {
			id: req.body.id,
			username: req.body.username,
			email: req.body.email
		};

		UserModel.updateUser(userData, function(err, response) {
			if (response.updated) {
				return res.redirect('/users/' + response.updateId);
			}
			res.statusCode = 500;
			res.end('No se pudo editar el usuario.');
		});
	});

	/*
	 * Formulario para registrar usuario.
	 */

	app.get('/create', function(req, res) {
		res.render('new', {
			title: 'Formulario para registrar usuario'
		});
	});

};