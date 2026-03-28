require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// ===== 🚫 Запрещённые слова =====
const bannedWords = [
  "viagra",
  "casino",
  "crypto",
  "bitcoin",
  "loan",
  "earn money",
];

// ===== 🚫 Проверка ссылок =====
const linkPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/i;

// ===== 🔍 Проверка на спам =====
function containsSpam(text = "") {
  const lowerText = text.toLowerCase();

  // Проверка ключевых слов
  if (bannedWords.some((word) => lowerText.includes(word))) {
    return true;
  }

  // Проверка ссылок
  if (linkPattern.test(text)) {
    return true;
  }

  return false;
}

// ===== 📩 Роут отправки =====
app.post("/send-message", async (req, res) => {
  try {
    const { name, phone, email, messageTopic, message, order  } = req.body;

    // ===== 🍯 HONEYPOT =====
    if (order && order.trim() !== "") {
      console.log("🍯 Honeypot triggered");
      return res.status(200).json({ success: true }); // тихий отказ
    }

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false });
    }

    // ===== Проверка на спам =====
    if (containsSpam(message)) {
      console.log("🚫 Spam blocked:", message);
      // Тихий отказ (чтобы бот не понял)
      return res.status(200).json({ success: true });
    }

    const text = `
📌 Новая заявка с сайта

👤 ФИО: ${name}
📞 Телефон: ${phone}
📧 Email: ${email || "Не указан"}
📝 Тема: ${messageTopic}
💬 Сообщение: ${message}
`;

    await axios.post(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: text,
      }
    );

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server started on port ${PORT}`)
);