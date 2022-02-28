require('dotenv').config();
process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const API = require('./API');
const cron = require('./cron');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard');
const { getChatId, getTelegramId, getDataText } = require('./helper');
const { inlineKeyboards } = require('./inlineKeyboards');
const { connectDB } = require('./DB');
const token = process.env.BOT_TOKEN;

require('./models/user.model');

connectDB();

const User = mongoose.model('users');

const bot = new TelegramBot(token, {
  polling: true,
});
bot.onText(/\/start/, (msg) => {
  const text = `Здравствуйте, ${msg.from.first_name}\nПожалуйста, подпишитесь на получение данных нажав кнопку ниже`;
  sendHTML(getChatId(msg), text, 'subscribe');
});
bot.on('polling_error', (err) => console.log(`err`, err));
bot.on('message', (msg) => {
  const chatId = getChatId(msg);
  const telegramId = getTelegramId(msg);
  switch (msg.text) {
    case kb.subscribe:
      subscribeToData(chatId, telegramId, msg.from.first_name);
      break;
    case kb.unsubscribe:
      unsubscribeToData(chatId);
      break;
    case kb.home.getData:
      sendDataToUser(chatId);
      break;
    case kb.back:
      bot.sendMessage(chatId, `Нажмите на пункт меню`, {
        reply_markup: {
          keyboard: keyboard.home,
        },
      });
      break;
    default:
      break;
  }
});

cron.startAllJobs(sendDataToAllUsers);

function sendHTML(chatId, html, kbName = null, kbInline = null) {
  const options = {
    parse_mode: 'HTML',
  };
  if (kbName) {
    options['reply_markup'] = {
      keyboard: keyboard[kbName],
    };
  }
  if (kbInline) {
    options['reply_markup'] = {
      inline_keyboard: typeof kbInline === 'string' ? inlineKeyboards[kbInline] : kbInline,
    };
  }
  bot.sendMessage(chatId, html, options);
}

async function subscribeToData(chatId, telegramId, name) {
  const user = {
    chatId,
    telegramId,
    name,
  };
  User.findOne({ chatId }).then((el) => {
    if (el) return;
    new User(user).save().catch((e) => console.log('e', e));
  });
  sendHTML(chatId, 'Вы подписались от получения данных', 'home');
}

async function unsubscribeToData(chatId) {
  try {
    await User.deleteOne({ chatId });
    sendHTML(chatId, 'Вы отписались от получения данных', 'subscribe');
  } catch (e) {
    console.log('e', e);
  }
}

async function sendDataToAllUsers() {
  const data = await API.getData();
  const text = getDataText(data);
  User.find().then((users) => {
    users.map(({ chatId }) => {
      sendHTML(chatId, text, 'home');
    });
  });
}

async function sendDataToUser(chatId) {
  const data = await API.getData();
  const text = getDataText(data);
  sendHTML(chatId, text, 'home');
}
