# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informandoo seu e-mail;
- O usuário deve receber um email com instruções de recuperação da senha;
- O usuário deve poder resetar sua senha;
  **RNF**
- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios e, produção;
- O envio de e-mails deve acontecer em segundo plano (background job);
  **RN**
- O link enviado por email para resetar a senha, deve expirar em 2h;
- O usuário precisas confirmar a nova senha ao resetar sua senha;

# Atualização de perfil

**RF**

- O usuário deve poder atualizar seu nome, email, e senha;
  **RNF**

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O prestador deve receber uma notificaçãos sempre que houver um novo agendamento;
- O pestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve visualiazar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviço

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder istar os dias de um mês com pelo menos um horário disponível de um prestador.
- O usuário deve poder listar horparios disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenad em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que ja passou;
- O usuário não pode agendar serviços consigo mesmo;
