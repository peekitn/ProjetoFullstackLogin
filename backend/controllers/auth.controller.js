const pool = require('../db/connection');
const bcrypt = require('bcrypt');

const register = async (request, h) => {
  try {
    const { nome, email, senha } = request.payload;

    const usuarioExistente = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (usuarioExistente.rows.length > 0) {
      return h.response({
        error: 'Email já cadastrado'
      }).code(400);
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await pool.query(
      `
      INSERT INTO usuarios (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email
      `,
      [nome, email, senhaHash]
    );

    const usuario = novoUsuario.rows[0];

    await pool.query(
      `
      INSERT INTO usuario_perfil (usuario_id, perfil_id)
      VALUES ($1, $2)
      `,
      [usuario.id, 2]
    );

    return h.response(usuario).code(201);

  } catch (error) {
    console.error(error);

    return h.response({
      error: 'Erro interno'
    }).code(500);
  }
};

module.exports = {
  register
};