const { getModeloDB, addModeloDB, updateModeloDB, deleteModeloDB, getModeloPorCodigoDB } = require('../useCases/modeloUseCases');
    
    const getModelo = async (request, response) => {
        await getModeloDB()
              .then(data => response.status(200).json(data))
              .catch(err => {
                response.status(400).json({
                    status : 'error',
                    message : 'Erro ao consultar os modelos: ' + err
                })
              })
    }
    const addModelo = async (request, response) => {
        await addModeloDB(request.body)
              .then(data => response.status(200).json({
                status : "success", message : "Modelo criado",
                objeto : data
              }))
              .catch(err => response.status(400).json({
                status : "error", message: err
              }))
    }

    const updateModelo = async (request, response) => {
      await updateModeloDB(request.body)
            .then(data => response.status(200).json({
              status : "success", message : "Modelo alterado",
              objeto : data
            }))
            .catch(err => response.status(400).json({
              status : "error", message: err
            }))
  }

  const deleteModelo = async (request, response) => {
    await deleteModeloDB(request.params.codigo)
          .then(data => response.status(200).json({
            status : "success", message : data
          }))
          .catch(err => response.status(400).json({
            status : "error", message: err
          }))
}

const getModeloPorCodigo = async (request, response) => {
  await getModeloPorCodigoDB(request.params.codigo)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
          status : "error", message: err
        }))
}
module.exports = { getModelo, addModelo, updateModelo, deleteModelo, getModeloPorCodigo }