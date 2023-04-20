const { pool } = require('../config')
const  Modelo = require('../entities/modelo')

const getModeloDB = async () => {
    try {
        const { rows } = await 
        pool.query('SELECT * FROM modelos ORDER BY codigo');
        return rows.map((modelo) => new Modelo(modelo.codigo, modelo.nome,
            modelo.numero_portas, modelo.lugares,modelo.marca));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addModeloDB = async (body) => {
    try {
        const { nome, numero_portas, lugares, marca } = body;
        const results = await pool.query(`INSERT INTO modelos (nome, numero_portas, 
            lugares, marca) VALUES ($1, $2, $3, $4) 
            RETURNING codigo, nome, numero_portas, lugares, marca`, 
            [nome, numero_portas, lugares, marca]);
        const modelo = results.rows[0];
        return new Modelo(modelo.codigo, modelo.nome, modelo.numero_portas, modelo.lugares,modelo.marca);
    } catch (err){
        throw "Erro ao inserir o modelo: " + err;
    }
}

const updateModeloDB = async (body) => {
    try {
        const { codigo, nome, numero_portas, lugares, marca } = body;
        const results = await pool.query(`UPDATE modelos SET nome=$1,
        numero_portas=$2, lugares=$3, marca=$4 WHERE codigo=$5
        RETURNING  codigo, nome, numero_portas, lugares, marca`, 
            [nome, numero_portas, lugares, marca, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const modelo = results.rows[0];
        return new Modelo(modelo.codigo, modelo.nome, modelo.numero_portas, modelo.lugares,modelo.marca);
    } catch (err){
        throw "Erro ao alterar o modelo: " + err;
    }
}

const deleteModeloDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM modelos 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Modelo de código ${codigo} removido com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover o Modelo: " + err;
    }
}

const getModeloPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM modelos 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const modelo = results.rows[0];
            return new Modelo(modelo.codigo, modelo.nome, modelo.numero_portas, modelo.lugares,modelo.marca);
        }
    } catch (err){
        throw "Erro ao recuperar o modelo: " + err;
    }
}

module.exports  = { getModeloDB, addModeloDB, updateModeloDB, deleteModeloDB, getModeloPorCodigoDB }