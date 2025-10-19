import React, { useState } from "react";
import { useUI } from "../../context/UIContext"; // <<< Usando o contexto real

const CollaboratorForm = () => {
  // Usando as funções reais do seu contexto UI
  const { closeModal } = useUI();

  // Lógica de submissão (simulada por enquanto)
  const registerCollaborator = (data: any) => {
    console.log("Registrando colaborador:", data);
    return {
      success: true,
      message: "Cadastro de colaborador realizado com sucesso!",
    };
  };

  const [formData, setFormData] = useState({
    profissao: "",
    cpf: "",
  });

  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerCollaborator(formData);
    if (result.success) {
      console.log(result.message);
      closeModal(); // Fecha o modal após o sucesso
    } else {
      console.error(result.message);
    }
  };

  // --- ESTILOS IDÊNTICOS AO LoginForm ---

  const commonInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 15px",
    border: `1px solid var(--cor-primaria)`,
    borderRadius: "25px",
    boxSizing: "border-box",
    fontSize: "16px",
    outline: "none",
    color: "#333",
    transition: "border-color 0.2s",
  };

  // Botão de submissão, seguindo o padrão do botão de Login
  const submitButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 10px",
    background: isPrimaryHovered ? "var(--cor-hover)" : "var(--cor-primaria)",
    border: `1px solid ${
      isPrimaryHovered ? "var(--cor-hover)" : "var(--cor-primaria)"
    }`,
    borderRadius: "25px",
    color: "var(--cor-fundo)",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background 0.2s, border-color 0.2s",
    userSelect: "none" as const,
  };

  return (
    // Container principal sem sombra ou bordas, exatamente como o LoginForm
    <div
      style={{
        padding: "20px",
        position: "relative",
        maxWidth: "400px",
        margin: "auto",
        backgroundColor: "var(--cor-fundo)",
      }}
    >
      {/* Título com o mesmo estilo do LoginForm */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "20px",
          lineHeight: "1.2",
        }}
      >
        Torne-se um <br /> colaborador
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <input
            name="profissao"
            type="text"
            placeholder="Profissão"
            value={formData.profissao}
            onChange={handleChange}
            style={commonInputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            name="cpf"
            type="text"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            style={commonInputStyle}
            required
          />
        </div>

        {/* Botão de submissão com estilo e hover corretos */}
        <button
          type="submit"
          style={submitButtonStyle}
          onMouseEnter={() => setIsPrimaryHovered(true)}
          onMouseLeave={() => setIsPrimaryHovered(false)}
          onMouseDown={() => setIsPrimaryHovered(true)}
          onMouseUp={() => setIsPrimaryHovered(false)}
          onTouchStart={() => setIsPrimaryHovered(true)}
          onTouchEnd={() => setIsPrimaryHovered(false)}
        >
          Enviar solicitação
        </button>
      </form>
    </div>
  );
};

export default CollaboratorForm;
