const supabase = require("../database/supabaseClient.js");

exports.listarTodas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("cidades")
      .select(
        `
        id,
        nome,
        url_imagem,
        descricao,
        estado_id: estados (
          nome,
          sigla
        )
      `
      );

    if (error) {
      console.error("Erro Supabase:", error.message);
      return res.status(400).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro interno ao listar cidades:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};


exports.buscarPorNome = async (req, res) => {
  try {
    const nome = req.query.nome;

    const { data, error } = await supabase
      .from("cidades")
      .select("*")
      .ilike("nome", `%${nome}%`);

    if (error) return res.status(400).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    console.error("Erro ao buscar por nome:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

exports.listarPorEstado = async (req, res) => {
  try {
    const { estadoID } = req.params;

    const { data, error } = await supabase
      .from("cidades")
      .select("*")
      .eq("estado_id", estadoID);

    if (error) return res.status(500).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    console.error("Erro ao listar por estado:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: cidade, error: cidadeError } = await supabase
      .from("cidades")
      .select(
        `
        *,
        estado:estados (
          nome,
          sigla
        )
      `
      )
      .eq("id", id)
      .single();

    if (cidadeError) {
      console.error("Erro Supabase ao buscar cidade:", cidadeError);
      return res.status(500).json({ error: cidadeError.message });
    }

    if (!cidade) {
      return res.status(404).json({ error: "Cidade não encontrada." });
    }
    
    if (cidade.usuario_id) {
      const { data: usuario, error: usuarioError } = await supabase
        .from("usuarios")
        .select("nome")
        .eq("id", cidade.usuario_id)
        .single();

      if (usuarioError) {
        console.error("Erro Supabase ao buscar usuário:", usuarioError);
        // Não bloqueia o retorno da cidade se o usuário não for encontrado
        cidade.usuario = null;
      } else {
        cidade.usuario = usuario;
      }
    }

    return res.json(cidade);
  } catch (err) {
    console.error("Erro ao buscar cidade por ID:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
