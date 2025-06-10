import { authenticateUser } from "app/services/authenticateUser";

const loginStates = {};

bot.onText(/\/login/, (bot, msg, userTokens) => {
  const chatId = msg.chat.id;
  loginStates[chatId] = { step: 'awaiting_login' };
  bot.sendMessage(chatId, 'Введите логин:');
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (!loginStates[chatId]) return; // не в процессе логина

  const state = loginStates[chatId];

  if (state.step === 'awaiting_login') {
    state.login = msg.text;
    state.step = 'awaiting_password';
    bot.sendMessage(chatId, 'Введите пароль:');
  } else if (state.step === 'awaiting_password') {
    const login = state.login;
    const password = msg.text;

    try {
      const token = await authenticateUser(login, password); // функция вызова API
      userTokens[chatId] = token;
      bot.sendMessage(chatId, 'Успешный вход!');
    } catch (e) {
      bot.sendMessage(chatId, 'Ошибка входа. Попробуйте /login снова.');
    }

    delete loginStates[chatId]; // очищаем состояние
  }
});
