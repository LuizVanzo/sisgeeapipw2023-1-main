const { pool } = require('../config')
const  Marca = require('../entities/marca')

const getMarcasDB = async () => {
    try {
        const { rows } = await 
        pool.query('SELECT * FROM marcas ORDER BY codigo');
        return rows.map((marca) => new Marca(marca.codigo, marca.nome, marca.pais));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addMarcaDB = async (body) => {
    try {
        const { nome, pais } = body;
        const results = await pool.query(`INSERT INTO marcas (nome, pais) VALUES ($1, $2) 
            RETURNING codigo, nome, pais`, 
            [nome, pais]);
        const marca = results.rows[0];
        return new Marca(marca.codigo, marca.nome, marca.pais);
    } catch (err){
        throw "Erro ao inserir a marca: " + err;
    }
}

const updateMarcaDB = async (body) => {
    try {
        const { codigo, nome, pais } = body;
        const results = await pool.query(`UPDATE marcas SET nome=$1,
        pais=$2 WHERE codigo=$3 
        RETURNING codigo, nome, pais`, 
            [nome, pais, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const marca = results.rows[0];
        return new Marca(marca.codigo, marca.nome, marca.pais);
    } catch (err){
        throw "Erro ao alterar a marca: " + err;
    }
}

const deleteMarcaDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM marcas 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Marca de código ${codigo} removido com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover a marca: " + err;
    }
}

const getMarcaPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM marcas 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const marca = results.rows[0];
            return new Marca(marca.codigo, marca.nome, marca.pais);
        }
    } catch (err){
        throw "Erro ao recuperar a marca: " + err;
    }
}

module.exports = { getMarcasDB, addMarcaDB, 
    updateMarcaDB, deleteMarcaDB, getMarcaPorCodigoDB }