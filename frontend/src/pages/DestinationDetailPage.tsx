import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../components/layout/Container";
import Navbar from "../components/layout/Navbar";
import "./DestinationDetailPage.css";
import { FaUserCircle } from "react-icons/fa";
import InfoCarousel from "../components/destinations/InfoCarousel";
import { MapGoogle } from "../components/map/MapGoogle";
import { api } from "../services/api";

interface Destino { 
  id: string;
  nomeCidade: string;
  urlImagem: string;
  descrição?: string;
  estado?: {
    nome: string;
    sigla: string;
  };
}

const DestinationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [destino, setDestino] = useState<Destino | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca o destino pelo ID vindo da URL
  useEffect(() => {
    async function fetchDestino() {
      try {
        const response = await api.get(`/cidades/${id}`);
        console.log("Destino carregado:", response.data);
        setDestino(response.data);
      } catch (err) {
        console.error("Erro ao buscar destino:", err);
        setError("Destino não encontrado.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDestino();
  }, [id]);

  if (loading)
    return (
      <div>
        <Navbar />
        <div className="detail-container">
          <h2>Carregando destino...</h2>
        </div>
      </div>
    );

  if (error || !destino)
    return (
      <div>
        <Navbar />
        <div className="detail-container">
          <h2>{error || "Destino não encontrado!"}</h2>
        </div>
      </div>
    );

  // Renderiza o conteúdo se o destino foi encontrado
  return (
    <div>
      <Navbar />
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${destino.urlImagem})` }}
      >
        <h1>{destino.nomeCidade}</h1>
      </div>

      <div className="flex_area">
        <p className="sugested_user">Rota sugerida por:</p>
        <div className="user">
          <FaUserCircle size={30} />
          <p>Viviany Silva</p>
        </div>
      </div>

      <Container>
        <main className="detail-container">
          <section className="description-section">
            <h2>Descrição</h2>
            <p>{destino.descrição}</p>
          </section>

          <section className="map-section">
            <h2>Localização</h2>
            <MapGoogle city={destino.nomeCidade} state={destino.estado?.sigla || ""} />
          </section>
        </main>
      </Container>
    </div>
  );
};

export default DestinationDetailPage;
