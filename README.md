# Rotas-Nordestinas

Estrutura do projeto:

rotas-nordestinas/
│
├── rotas-nordestinas/     → React (frontend)
│   ├── public/
│   └── src/
│
└── backend/               → Node.js (backend)
    ├── server.js
    ├── routes/
    ├── controllers/
    └── package.json

## Como rodar (desenvolvimento)

1. Frontend
   - Abra o terminal na pasta do frontend:
     cd "c:\Users\Pedro\OneDrive\Área de Trabalho\Período 2025.2\PDSI I\Rotas-Nordestinas\rotas-nordestinas"
   - Instale dependências:
     npm install
   - Rode em modo dev (Vite):
     npm run dev

2. Backend
   - Abra o terminal na pasta backend:
     cd "c:\Users\Pedro\OneDrive\Área de Trabalho\Período 2025.2\PDSI I\Rotas-Nordestinas\backend"
   - Instale dependências:
     npm install
   - Rode o servidor:
     node server.js
   - (Recomendado no dev) instale nodemon e use:
     npx nodemon server.js

## Observações
