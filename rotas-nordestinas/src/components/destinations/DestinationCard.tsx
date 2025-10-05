import React from "react";
import type { Destino } from "../../types";
import { Link } from "react-router-dom";
import "./DestinationCard.css";

interface DestinationCardProps {
  destino: Destino;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destino }) => {
  return (
    <Link to={`/destinos/${destino.id}`} className="destination-card-link">
      <div className="destination-card">
        <img
          src={destino.imagem}
          alt={`Foto de ${destino.cidade}`}
          className="card-image"
        />
        <div className="card-overlay">
          <h3 className="card-title">{destino.cidade}</h3>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
