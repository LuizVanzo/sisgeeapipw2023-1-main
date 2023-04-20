const { Router } = require('express');

const {getMarcas, addMarca, updateMarca, deleteMarca, getMarcaPorCodigo } = require('../controllers/marcasController')

const { getModelo, addModelo, updateModelo, deleteModelo, getModeloPorCodigo} = require('../controllers/modelosController')

const rotas = new Router();

rotas.route('/marcas')
     .get(getMarcas)
     .post(addMarca)
     .put(updateMarca);

rotas.route('/marcas/:codigo')
     .get(getMarcaPorCodigo)
     .delete(deleteMarca);

rotas.route('/modelos')
     .get(getModelo)
     .post(addModelo)
     .put(updateModelo);

rotas.route('/modelos/:codigo')
     .get(getModeloPorCodigo)
     .delete(deleteModelo);

module.exports = rotas;