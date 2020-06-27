# Recuperação de senha

**Requisitos Funcionales**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruçōes de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionales**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**Regras de Negocio**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Actualização do perfil

**Requisitos Funcionales**

- O usuário deve poder atualizar seu nome, email e senha;

**Regras de Negocio**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**Requisitos Funcionales**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação semore que houver um novo agendamento;
- O prestador deve poder visualizar as notificaçōes não lidas;

**Requisitos Não Funcionales**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificaçōes do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regras de Negocio**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**Requisitos Funcionales**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Requisitos Não Funcionales**

- A listagem de prestadores deve ser armazenada em cache;

**Regras de Negocios**

- Cada agendamento deve durar 1h exactamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro ás 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
