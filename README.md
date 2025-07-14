# Lobby Frontend

Uma interface de usuário interativa para uma rede social, onde jogadores podem compartilhar fotos de seus personagens de jogos favoritos, incluindo skins, nomes de personagens, nomes dos jogos e épocas em que os jogos se passam.

## Descrição

Este frontend foi desenvolvido como uma interface de usuário interativa onde jogadores podem compartilhar fotos de seus personagens de jogos favoritos, incluindo skins, nomes de personagens, nomes dos jogos e épocas em que os jogos se passam. O backend foi criado com o auxílio de inteligência artificial, cujo o foco principal era o FrontEnd apenas.. O projeto e construído para suportar as funcionalidades desejadas no frontend, garantindo uma integração entre os dois lados e permitindo que os usuários desfrutem de uma experiência visual e funcional.

## Para Que Serve

O frontend serve como a camada de interação de uma rede social dedicada a jogadores, oferecendo as seguintes funcionalidades:

- **Postagem de Fotos**: Os usuários podem enviar imagens de seus personagens principais, destacando skins e personalizações
- **Detalhamento de Conteúdo**: Cada postagem permite adicionar o nome do personagem, o nome do jogo, e a época em que o jogo se passa, criando um contexto para as imagens
- **Interação Social**: Os jogadores podem visualizar posts de outros, adicionar comentários e ver o número de acessos, promovendo uma comunidade engajada.
- **Gerenciamento de Perfil**: Usuários podem gerenciar suas postagens, incluindo a opção de deletá-las

Essa interface foi pensada para ser intuitiva, permitindo que os jogadores exibam suas skins e histórias de jogo, conectando-se com outros players.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface de usuário, com componentes reutilizáveis
- **React Router**: Para navegação entre páginas e rotas dinâmicas
- **CSS Modules**: Para estilização específica de componentes
- **Fetch API**: Para requisições HTTP ao backend (via useFetch customizado)
- **Context API**: Para gerenciamento de estado global, como dados do usuário
- **JavaScript (ES6+)**: Para lógica e manipulação de dados
- **HTML5**: Estrutura básica das páginas
- **Vite**: Ferramenta de build e desenvolvimento rápido

## Estrutura do Projeto

```
lobby-frontend/
├── components/         # Componentes reutilizáveis (Input, Button, Image, Header, Footer)
├── hooks/             # Hooks personalizados (useForm, useFetch)
├── components/pages/  # Páginas principais como (UserPhotoPost, FeedModal...)
├── context/           # Gerenciamento de contexto (UserContext)
├── assets/            # Recursos (ícones, imagens)
└── style/       # Arquivos CSS Modules
```

## Funcionalidades Implementadas

- **Formulário de Postagem**: Permite aos usuários enviar fotos com nome, nome do personagem, época do jogo e visualizar uma prévia
- **Exibição de Fotos**: Mostra detalhes de postagens, incluindo autor, título, personagem, época, acessos e comentários
- **Gerenciamento de Usuário**: Integração com autenticação para exibir opções de deletar posts
- **Comentários**: Componente para visualizar e interagir com comentários em cada foto
- **Navegação**: Links para perfis de usuários e detalhes de fotos específicas

## Notas

- Este frontend foi projetado para ser visualmente atraente e funcional, com foco na experiência do usuário
- Melhorias como animações adicionais como TailwindCSS ou responsividade avançada podem ser implementadas futuramente
- A integração com o backend assume que os endpoints estão disponíveis e retornam os dados esperados (nome, personagem, época, etc.)

---

_Desenvolvido com foco no frontend e integração com o backend para proporcionar uma experiência aos players, Seja Bem-vindo ao seu proprio Lobby._
