# Frida_Pet_Shop
O Objetivo neste trabalho será o desenvolvimento de um sistema web para um PetShop hipotética.  

Requisitos  
Funcionais:  
RF01 – O sistema deve permitir o cadastro de usuários.  
RF02 – O sistema deve permitir login com e-mail e senha.  
RF03 – O sistema deve permitir logout do usuário autenticado.  
RF04 – O sistema deve permitir a atualização dos dados do usuário.  
RF05 – O sistema deve permitir diferentes perfis de acesso (ADMIN e CLIENTE).  
RF06 – O sistema deve permitir editar dados do pet.  
RF07 – O sistema deve permitir que Administradores removam um animal de estimação cadastrado.  
RF08 – O sistema deve permitir que o cliente visualize horários disponíveis.  
RF09 – O sistema deve permitir que o cliente realize agendamento de consulta/serviço.  
RF10 – O sistema deve impedir agendamentos em horários já ocupados.  
RF11 – O sistema deve permitir que o cliente cancele um agendamento.  
RF12 – O administrador deve visualizar todos os agendamentos.  
RF13 – O administrador deve cadastrar profissionais.  
RF14 – O administrador deve editar profissionais.  
RF15 – O administrador deve excluir profissionais.  
RF16 – O cliente deve poder cadastrar um pet.  
RF17 – O cliente deve poder excluir um pet.  
RF18 – O administrador deve visualizar o histórico de atendimentos.  
RF19 – O sistema deve apresentar um dashboard com informações resumidas para o administrador.  
RF20 – O sistema deve permitir confirmar um agendamento antes da finalização.  
RF21 – O sistema deve permitir reagendar um atendimento.  
RF22 – O sistema deve enviar um e-mail de confirmação ao cliente antes do atendimento.  

N.Funcionais:  
RNF01 – O sistema deve utilizar autenticação baseada em token (JWT).  
RNF02 – As senhas devem ser armazenadas de forma criptografada.  
RNF03 – O sistema deve restringir o acesso a funcionalidades de acordo com o perfil do usuário.  
RNF04 – O sistema deve seguir arquitetura REST.  
RNF05 – O sistema deve utilizar o padrão MV* (Controlador, Serviço, Repositório).  
RNF06 – O sistema será desenvolvido como aplicação monolítica.  
RNF07 – O sistema deve utilizar banco de dados relacionais.  
RNF08 – O sistema deve garantir a integridade através das transações.  
RNF09 – O código deve ser versionado no repositório Git.  
RNF10 – O sistema deve ser disponibilizado online em ambiente de produção. (Se possível)  
RNF11 – O sistema deve possuir pipeline de CI/CD automatizado.  
RNF12 – O sistema deve possuir logs de erros.  
RNF13 – O sistema deve possuir endpoint de health check.  
RNF14 – O sistema deve registrar eventos importantes (login, compra, agendamento).  
RNF15 – O sistema deve responder às requisições em até 2 segundos.  
RNF16 – O sistema deve suportar múltiplos usuários simultâneos.  
  
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

Figma:

https://www.figma.com/design/rUGZWh0h4n0q6GM8GYLDbk/Frida_PetShop?node-id=0-1&t=6UQ3c18EgQnv0DDl-1

