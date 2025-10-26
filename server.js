require("dotenv").config(); // Загружаем переменные окружения из .env
const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");

const app = express();
const port = 3001; // Порт для вашего бэкенда

// Инициализация Telegram бота
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!token || !chatId) {
  console.error(
    "Ошибка: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не установлен в .env"
  );
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: false }); // polling: false, т.к. мы только отправляем сообщения

// Middleware
app.use(cors()); // Разрешаем CORS для всех доменов
app.use(bodyParser.json()); // Для парсинга JSON-запросов

// Маршрут для обработки отправки формы
app.post("/api/feedback", async (req, res) => {
  const { name, phone, email, topic, message } = req.body;

  if (!name || !phone || !email || !topic || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Все поля должны быть заполнены." });
  }

  const telegramMessage = `
    Новое сообщение из формы обратной связи:
    Имя: ${name}
    Телефон: ${phone}
    Email: ${email}
    Тема обращения: ${topic}
    Сообщение: ${message}
  `;

  try {
    await bot.sendMessage(chatId, telegramMessage, { parse_mode: "HTML" });
    res
      .status(200)
      .json({ success: true, message: "Сообщение успешно отправлено!" });
  } catch (error) {
    console.error("Ошибка при отправке сообщения в Telegram:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Не удалось отправить сообщение. Попробуйте еще раз.",
      });
  }
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Node.js приложение запущено на http://localhost:${port}`);
});
