const { pool } = require('../config');
const Carro = require('../entities/carros');

const getCarrosDB = async () => {
    try {
        const { rows } = await 
        pool.query('SELECT * FROM carros ORDER BY codigo');
        return rows.map((carro) => new Carro(carro.codigo, carro.placa, carro.disponivel, carro.km ,carro.modelo));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addCarroDB = async (body) => {
    try {
        const { placa, disponivel, km, modelo } = body;
        const results = await pool.query(`INSERT INTO carros (placa, disponivel, km, modelo) VALUES ($1, $2, $3, $4) 
            RETURNING codigo, placa, disponivel, km, modelo`, 
            [placa, disponivel, km, modelo]);
        const carro = results.rows[0];
        return new Carro(carro.codigo, carro.placa, carro.disponivel, carro.km ,carro.modelo);
    } catch (err){
        throw "Erro ao inserir o carro: " + err;
    }
}

const updateCarroDB = async (body) => {
    try {
            const { codigo, placa, disponivel, km, modelo } = body;
            const results = await pool.query(`UPDATE carros SET placa=$1,
            disponivel=$2, km=$3, modelo=$4 WHERE codigo=$5 
            RETURNING codigo, placa, disponivel, km, modelo`, 
                [placa, disponivel, km, modelo, codigo]);
            if (results.rowCount == 0){
                throw `Nenhum registro encontrado com o código ${codigo} para
                ser alterado`
            }
            const carro = results.rows[0];
            return new Carro(carro.codigo, carro.placa, carro.disponivel, carro.km ,carro.modelo);
        } catch (err){
            throw "Erro ao alterar a carro: " + err;
        }
}

const deleteCarroDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM carros 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Carro de código ${codigo} removido com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover a carro: " + err;
    }
}

const getCarroPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM carros 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const carro = results.rows[0];
            return new Carro(carro.codigo, carro.placa, carro.disponivel, carro.km ,carro.modelo);
        }
    } catch (err){
        throw "Erro ao recuperar a carro: " + err;
    }
}

module.exports = { getCarrosDB, addCarroDB, 
    updateCarroDB, deleteCarroDB, getCarroPorCodigoDB }