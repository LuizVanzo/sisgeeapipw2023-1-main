const { getMarcasDB, addMarcaDB, updateMarcaDB, 
  deleteMarcaDB, getMarcaPorCodigoDB } = require('../useCases/marcaUseCases');

const getMarcas = async (request, response) => {
    await getMarcasDB()
          .then(data => response.status(200).json(data))
          .catch(err => {
            response.status(400).json({
                status : 'error',
                message : 'Erro ao consultar as marcas: ' + err
            })
          })
}

const addMarca = async (request, response) => {
    await addMarcaDB(request.body)
          .then(data => response.status(200).json({
            status : "success", message : "Marca criada",
            objeto : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const updateMarca = async (request, response) => {
    await updateMarcaDB(request.body)
          .then(data => response.status(200).json({
            status : "success", message : "Marca alterado",
            objeto : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const deleteMarca = async (request, response) => {
    await deleteMarcaDB(request.params.codigo)
          .then(data => response.status(200).json({
            status : "success", message : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const getMarcaPorCodigo = async (request, response) => {
    await getMarcaPorCodigoDB(request.params.codigo)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

module.exports = { getMarcas, addMarca, 
    updateMarca, deleteMarca, getMarcaPorCodigo }