# TodoList - Front-End

## Descrição
O **TodoList** é um aplicativo de gerenciamento de tarefas intuitivo e dinâmico. Desenvolvido com as mais modernas tecnologias de front-end, ele permite que usuários organizem, priorizem e acompanhem suas tarefas diárias com facilidade e praticidade. A interface foi projetada para oferecer uma experiência de uso fluida e responsiva, garantindo acessibilidade em diferentes dispositivos.

## Decisões Técnicas
- **Framework:** O projeto foi desenvolvido em **React** com suporte de bibliotecas como **Chakra UI** para componentes estilizados.
- **Validações:** Utilizamos **React Hook Form** integrado com **Zod** para validações robustas e escaláveis nos formulários.
- **Gerenciamento de estado:** A lógica de estado é simplificada usando hooks do React e componentes controlados.
- **Roteamento:** Foi implementado **React Router** para navegação entre as páginas do aplicativo.
- **Comunicação com API:** Requisições são feitas por meio de **Axios**, garantindo eficiência e simplicidade na integração com o back-end.
- **Armazenamento seguro de autenticação:** Os tokens JWT são armazenados e gerenciados com a biblioteca **js-cookie**.

## Funcionalidades
- Cadastro e login de usuários com autenticação JWT.
- Gerenciamento de listas de tarefas personalizadas:
  - Adicionar, editar e excluir listas.
  - Associar escopos e prioridades às listas.
- Gerenciamento de tarefas dentro de listas:
  - Criar, editar e excluir tarefas.
  - Marcar tarefas como concluídas.
- Progresso visual:
  - Barras de progresso exibem a porcentagem de tarefas concluídas em cada lista.
- Interface responsiva:
  - Layout otimizado para dispositivos móveis e desktops.

## Diferenciais
- **Design interativo e moderno:** Construído com Chakra UI e customizações exclusivas, o design é elegante e funcional.
- **Navegação fluida:** Integração com React Router para transições entre páginas e modais, além de telas de carregamento.
- **Organização e produtividade:** Opções de escopo (Trabalho, Estudo, etc.) e prioridade (Alta, Média, Baixa) para cada lista, ajudando os usuários a organizar melhor suas tarefas.
- **Segurança:** Uso de autenticação JWT para proteger as informações do usuário.
- **Feedback ao usuário:** Mensagens e validações claras em formulários e interações.
- **Fácil manutenção:** Código estruturado e desacoplado, com foco na escalabilidade.

### Tela de login

![image](https://github.com/user-attachments/assets/2b18bae3-2de9-452f-a672-43a9b68385da)

### Tela de cadastro

![image](https://github.com/user-attachments/assets/4262b70c-93a4-4384-83ef-e9bbc61492d1)

### Tela inicial

![image](https://github.com/user-attachments/assets/abcb8d39-21a7-4a22-8e8c-f521a69fede0)

### Tela de criar todo list

![image](https://github.com/user-attachments/assets/82cfffce-72cc-4b46-9b9a-6dc7a26ae201)

### Tela de visualizar tarefas de uma todo list

![image](https://github.com/user-attachments/assets/6920f544-7cbd-43de-9e0c-ef883fd742e0)

## Autores 

- Gabriel Mendes

## Link para aplicação 

- [Clique aqui](https://todo-list-five-green-98.vercel.app/)
