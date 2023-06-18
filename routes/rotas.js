const { Router } = require('express');

const {getMarcas, addMarca, updateMarca, deleteMarca, getMarcaPorCodigo } = require('../controllers/marcasController')

const { getModelo, addModelo, updateModelo, deleteModelo, getModeloPorCodigo} = require('../controllers/modelosController')

const { getCarros, addCarro, updateCarro, deleteCarro, getCarroPorCodigo} = require('../controllers/carrosController')

const { login, verificaJWT } = require('../controllers/segurancaController')

const rotas = new Router();
//Marcas
rotas.route('/marcas')
     .get(verificaJWT,getMarcas)
     .post(verificaJWT,addMarca)
     .put(verificaJWT,updateMarca);

rotas.route('/marcas/:codigo')
     .get(verificaJWT, getMarcaPorCodigo)
     .delete(verificaJWT, deleteMarca);
//Modelos
rotas.route('/modelos')
     .get(verificaJWT, getModelo)
     .post(verificaJWT, addModelo)
     .put(verificaJWT, updateModelo);

rotas.route('/modelos/:codigo')
     .get(verificaJWT, getModeloPorCodigo)
     .delete(verificaJWT,deleteModelo);
//Carros
rotas.route('/carros')
     .get(verificaJWT, getCarros)
     .post(verificaJWT, addCarro)
     .put(verificaJWT, updateCarro);

rotas.route('/carros/:codigo')
     .get(verificaJWT, getCarroPorCodigo)
     .delete(verificaJWT,deleteCarro);

rotas.route("/login")
     .post(login);
module.exports = rotas;