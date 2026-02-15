# Frida_Pet_Shop
O Objetivo neste trabalho será o desenvolvimento de um site para um PetShop hipotética.

Requisitos
Funcionais:
RF01 – O sistema deve permitir o cadastro de usuários.  
RF02 – O sistema deve permitir login com e-mail e senha.  
RF03 – O sistema deve permitir logout do usuário autenticado.  
RF04 – O sistema deve permitir atualização dos dados do usuário.  
RF05 – O sistema deve permitir diferentes perfis de acesso (ADMIN e CLIENTE).  
RF06 – O sistema deve permitir editar dados do pet.  
RF07 – O sistema deve permitir que Admins removam um pet cadastrado.  
RF08 – O sistema deve permitir que o cliente visualize horários disponíveis.  
RF09 – O sistema deve permitir que o cliente realize agendamento de consulta/serviço.  
RF10 – O sistema deve impedir agendamentos em horários já ocupados.  
RF11 – O sistema deve permitir que o cliente cancele um agendamento.  
RF12 – O administrador deve visualizar todos os agendamentos.  
RF13 – O administrador deve cadastrar produtos.  
RF14 – O administrador deve editar produtos.  
RF15 – O administrador deve excluir produtos.  
RF16 – O sistema deve listar produtos disponíveis para venda.  
RF17 – O sistema deve permitir que o cliente adicione produtos ao carrinho.  
RF18 – O sistema deve permitir finalizar a compra.  
RF19 – O sistema deve baixar o estoque ao finalizar a compra.  
RF20 – O sistema deve impedir compra caso não haja estoque suficiente.  
  
N.Funcionais:  
RNF01 – O sistema deve utilizar autenticação baseada em token (JWT).  
RNF02 – As senhas devem ser armazenadas de forma criptografada.  
RNF03 – O sistema deve restringir acesso a funcionalidades de acordo com perfil de usuário.  
RNF04 – O sistema deve seguir arquitetura REST.  
RNF05 – O sistema deve utilizar padrão MV* (Controller, Service, Repository).  
RNF06 – O sistema deve ser desenvolvido como aplicação monolítica (ou microserviço, se escolhido).  
RNF07 – O sistema deve utilizar banco de dados relacional.  
RNF08 – O sistema deve garantir integridade através de transações.  
RNF09 – O código deve estar versionado em repositório Git.   
RNF10 – O sistema deve ser disponibilizado online em ambiente de produção. (Se possível)   
RNF11 – O sistema deve possuir pipeline de CI/CD automatizado.  
RNF12 – O sistema deve possuir logs de erro.  
RNF13 – O sistema deve possuir endpoint de health check.  
RNF14 – O sistema deve registrar eventos importantes (login, compra, agendamento).  
  
Linguagens:  
  node/js + JavaScript (conhecimento prévio)  
  TypeScript (conhecimento prévio)  
  React (interesse em aprender)  
Banco:  
  SupaBase (conhecimento prévio)  

organização das tarefas  
Lucas:  
-modelagem do banco  
-APIs REST  
-integração com banco  
-transações  

Gabriel:
-testes unitários  
-regras de negócio   
-autenticação JWT  
-observabilidade  
  
dividido para os dois:  
-modelagem inicial  
-pipeline CI/CD  
-interface  
-telas  
-definição e proteção de rotas  










