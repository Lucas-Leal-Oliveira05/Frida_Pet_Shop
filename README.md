# Frida_Pet_Shop
O Objetivo neste trabalho será o desenvolvimento de um site para um PetShop hipotética.


Requisitos
Funcionais:<br>
RF01 – O sistema deve permitir o cadastro de usuários.<br>
RF02 – O sistema deve permitir login com e-mail e senha.<br>
RF03 – O sistema deve permitir logout do usuário autenticado.<br>
RF04 – O sistema deve permitir a atualização dos dados do usuário.<br>
RF05 – O sistema deve permitir diferentes perfis de acesso (ADMIN e CLIENTE).<br>
RF06 – O sistema deve permitir editar dados do pet.<br>
RF07 – O sistema deve permitir que Administradores removam um animal de estimação cadastrado.<br>
RF08 – O sistema deve permitir que o cliente visualize horários disponíveis.<br>
RF09 – O sistema deve permitir que o cliente realize agendamento de consulta/serviço.<br>
RF10 – O sistema deve impedir agendamentos em horários já ocupados.<br>
RF11 – O sistema deve permitir que o cliente cancele um agendamento.<br>
RF12 – O administrador deve visualizar todos os agendamentos.<br>
RF13 – O administrador deve cadastrar profissionais.<br>
RF14 – O administrador deve editar profissionais.<br>
RF15 – O administrador deve excluir profissionais.<br>
RF16 – O cliente deve poder cadastrar um pet.<br>
RF17 – O cliente deve poder excluir um pet.<br>
RF18 – O administrador deve visualizar o histórico de atendimentos.<br>
RF19 – O sistema deve apresentar um dashboard com informações resumidas para o administrador.<br>
RF20 – O sistema deve permitir confirmar um agendamento antes da finalização.<br>
RF21 – O sistema deve permitir reagendar um atendimento.<br>
RF22 – O sistema deve enviar um e-mail de confirmação ao cliente antes do atendimento.<br>

N.Funcionais:<br>
RNF01 – O sistema deve utilizar autenticação baseada em token (JWT).<br>
RNF02 – As senhas devem ser armazenadas de forma criptografada.<br>
RNF03 – O sistema deve restringir o acesso a funcionalidades de acordo com o perfil do usuário.<br>
RNF04 – O sistema deve seguir arquitetura REST.<br>
RNF05 – O sistema deve utilizar o padrão MV* (Controlador, Serviço, Repositório).<br>
RNF06 – O sistema será desenvolvido como aplicação monolítica.<br>
RNF07 – O sistema deve utilizar banco de dados relacionais.<br>
RNF08 – O sistema deve garantir a integridade através das transações.<br>
RNF09 – O código deve ser versionado no repositório Git.<br>
RNF10 – O sistema deve ser disponibilizado online em ambiente de produção. (Se possível)<br>
RNF11 – O sistema deve possuir pipeline de CI/CD automatizado.<br>
RNF12 – O sistema deve possuir logs de erros.<br>
RNF13 – O sistema deve possuir endpoint de health check.<br>
RNF14 – O sistema deve registrar eventos importantes (login, compra, agendamento).<br>
RNF15 – O sistema deve responder às requisições em até 2 segundos.<br>
RNF16 – O sistema deve suportar múltiplos usuários simultâneos.<br>
  
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










