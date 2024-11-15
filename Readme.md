Yuri Yve
RM 551358

Global Solution 2 semestre 2024

<<Monitoramento e Controle Energético - Node js>>

Este projeto visa criar uma aplicação simples para monitorar e ajustar automaticamente parâmetros de temperatura e iluminação em tempo real. O sistema simula a coleta de dados de sensores e, com base nos valores, ajusta o ambiente (por exemplo, climatização e iluminação) conforme necessário.

<<Objetivo>>

O objetivo deste projeto é fornecer uma interface web que exibe dados de temperatura e iluminação, e que pode ajustar automaticamente o ambiente com base em condições específicas. A aplicação interage com um backend para obter os dados mais recentes de sensores (temperatura e lux) e exibe os ajustes realizados, simulando um controle energético eficiente.

<<Estrutura>>

--Frontend (HTML + JavaScript): Responsável pela interface do usuário que exibe os dados dos sensores e logs de ajustes.
--Backend (API em Node.js): Responsável por fornecer os dados dos sensores, que são consumidos pela aplicação frontend.

<<Ferramentas Utilizadas>>

Frontend:
--HTML: Estrutura da página.
--CSS: Estilização da página.
--JavaScript: Lógica de interação com o servidor backend e manipulação dos dados.

Backend:
--Node.js: Ambiente de execução para o servidor backend.
--Express.js: Framework para criação do servidor web e APIs.
--JSON: Formato de dados para troca entre o frontend e o backend.

Autenticação:
--JWT (JSON Web Tokens): Usado para autenticação entre o frontend e o backend.

<<Funcionamento do Código>>

Frontend (HTML + JavaScript):
--A página HTML exibe uma tabela com os valores atuais de temperatura e iluminação, além de um log de ajustes realizados.
--O código JavaScript executa uma requisição GET a cada 5 segundos para buscar os dados de sensores (temperatura e iluminação) do backend.
--Se os valores de temperatura ou iluminação atingirem limites críticos, a aplicação ajusta automaticamente o ambiente (por exemplo, ajustando a temperatura ou iluminando o ambiente).
--O token JWT é enviado no cabeçalho Authorization para autenticação ao fazer as requisições ao backend.

Backend (Node.js + Express.js):
--O servidor Express.js expõe a rota /dados, que retorna dados simulados dos sensores em formato JSON.
--O servidor valida o token JWT para autenticação antes de responder às requisições.
--O backend responde com os dados de sensores, incluindo tipo (temperatura ou iluminação) e valor atual.

Exibição em Tempo Real:
--O frontend atualiza a cada 5 segundos, buscando os dados mais recentes dos sensores e ajustando a interface conforme necessário.


<<Como Rodar o Projeto>>

1. Instalar Dependências
    git clone https://seu-repositorio.git
    cd seu-repositorio
    
    npm install 

2. Rodar o Backend
    node server.js
O servidor estará rodando em http://localhost:3000. A API estará disponível na rota post/dados ou get/dados.

3. Abrir o Frontend
Abra o arquivo index.html em seu navegador para ver a interface da aplicação. O frontend irá buscar os dados automaticamente do backend e exibir os ajustes.

<<Testando a API com JSON>>

Exemplo de Requisição com Postman
--Abra o Postman e crie uma nova requisição GET para http://localhost:3000/get/dados.
--Na aba "Headers", adicione o cabeçalho Authorization com o valor Bearer seu-token-aqui.
--Clique em "Send" e verifique a resposta.
[
  {
    "tipo": "temperatura",
    "valor": 27
  },
  {
    "tipo": "iluminacao",
    "valor": 250
  }
]

