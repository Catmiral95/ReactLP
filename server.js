const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка транспортера для Яндекс.Почты
const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.YANDEX_EMAIL,
        pass: process.env.YANDEX_PASSWORD
    }
});

// Проверка подключения
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Ошибка подключения к Яндекс.Почте:', error);
    } else {
        console.log('✅ SMTP подключен успешно');
    }
});

// Функция валидации телефона
const validatePhone = (phone) => {
    const phoneRegex = /^(\+7|7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    return phoneRegex.test(phone);
};

// Функция валидации email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Функция форматирования телефона для читаемого вида
const formatPhone = (phone) => {
    // Очищаем от всех нецифровых символов
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 11) {
        return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
    } else if (cleaned.length === 10) {
        return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`;
    }
    return phone;
};

// ОСНОВНОЙ МАРШРУТ ДЛЯ ОТПРАВКИ ФОРМЫ
app.post('/api/send-message', async (req, res) => {
    // Логируем полученные данные для отладки
    console.log('📨 Получены данные формы:', req.body);

    const { 
        name,           // Ф.И.О.
        phone,          // Телефон
        email,          // Email
        messageTopic,   // Тема сообщения
        message,        // Сообщение
        order           // Скрытое поле (honeypot)
    } = req.body;

    // 1. ПРОВЕРКА HONEYPOT (защита от ботов)
    if (order && order.trim() !== '') {
        console.log('🤖 Запрос от бота отклонен (honeypot сработал)');
        return res.status(200).json({ 
            success: true, 
            message: 'Сообщение успешно отправлено!' 
        });
    }

    // 2. ВАЛИДАЦИЯ ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ
    if (!name || !name.trim()) {
        return res.status(400).json({ 
            success: false, 
            error: 'Пожалуйста, укажите Ф.И.О.' 
        });
    }

    if (!phone || !phone.trim()) {
        return res.status(400).json({ 
            success: false, 
            error: 'Пожалуйста, укажите номер телефона' 
        });
    }

    // Валидация формата телефона
    if (!validatePhone(phone)) {
        return res.status(400).json({ 
            success: false, 
            error: 'Введите корректный номер телефона в формате +7(900)123-45-67 или 89001234567' 
        });
    }

    if (!message || !message.trim()) {
        return res.status(400).json({ 
            success: false, 
            error: 'Пожалуйста, введите текст сообщения' 
        });
    }

    // 3. ВАЛИДАЦИЯ EMAIL (если указан)
    if (email && email.trim() && !validateEmail(email)) {
        return res.status(400).json({ 
            success: false, 
            error: 'Введите корректный email адрес' 
        });
    }

    // Форматируем телефон для красивого отображения
    const formattedPhone = formatPhone(phone);
    const userEmail = email && email.trim() ? email : 'не указан';
    
    // Темы для select (маппинг)
    const topicMap = {
        'Запись на прием': '📅 Запись на прием',
        'Оформление претензии': '📋 Оформление претензии',
        'Представительство в суде': '⚖️ Представительство в суде',
        'Сопровождение сделки': '🤝 Сопровождение сделки',
        'Юридическая консультация': '💡 Юридическая консультация',
        'Другое': '📝 Другое'
    };
    
    const selectedTopic = topicMap[messageTopic] || messageTopic || 'Не выбрана';

    // 4. HTML ШАБЛОН ПИСЬМА (стилизованный под юр. консультацию)
    const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Новое сообщение с сайта</title>
            <style>
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f5f5f5;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                .header h2 {
                    margin: 0;
                    font-size: 24px;
                }
                .header p {
                    margin: 10px 0 0;
                    opacity: 0.9;
                }
                .content {
                    padding: 30px;
                }
                .field {
                    margin-bottom: 25px;
                    border-bottom: 1px solid #e0e0e0;
                    padding-bottom: 15px;
                }
                .field:last-child {
                    border-bottom: none;
                }
                .label {
                    font-weight: 700;
                    color: #667eea;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                }
                .value {
                    font-size: 16px;
                    color: #333;
                    margin-top: 5px;
                    word-wrap: break-word;
                }
                .topic-badge {
                    display: inline-block;
                    background: #667eea;
                    color: white;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 14px;
                }
                .message-box {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 10px;
                    border-left: 4px solid #667eea;
                }
                .footer {
                    background: #f8f9fa;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #999;
                }
                .timestamp {
                    color: #999;
                    font-size: 12px;
                    margin-top: 15px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Лидер Права</h2>
                    <p>📧 Новое обращение</p>
                </div>
                
                <div class="content">
                    <div class="field">
                        <div class="label">👤 Ф.И.О.</div>
                        <div class="value"><strong>${name.trim()}</strong></div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📱 Телефон</div>
                        <div class="value"><strong>${formattedPhone}</strong></div>
                    </div>
                    
                    ${userEmail !== 'не указан' ? `
                    <div class="field">
                        <div class="label">📧 Email</div>
                        <div class="value"><strong>${userEmail}</strong></div>
                    </div>
                    ` : ''}
                    
                    <div class="field">
                        <div class="label">🎯 Тема обращения</div>
                        <div class="value">
                            <span class="topic-badge">${selectedTopic}</span>
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="label">💬 Сообщение</div>
                        <div class="message-box">
                            ${message.trim().replace(/\n/g, '<br>')}
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Сообщение отправлено через форму обратной связи</p>
                    <p>Ответьте на это письмо, чтобы связаться с клиентом</p>
                </div>
                <div class="timestamp">
                    ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
                </div>
            </div>
        </body>
        </html>
    `;

    // Текстовая версия письма (для старых почтовых клиентов)
    const textVersion = `
Новое сообщение с сайта юридической консультации

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Ф.И.О.: ${name.trim()}
📱 Телефон: ${formattedPhone}
${userEmail !== 'не указан' ? `📧 Email: ${userEmail}\n` : ''}🎯 Тема: ${selectedTopic}

💬 Сообщение:
${message.trim()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Дата: ${new Date().toLocaleString('ru-RU')}
    `;

    // 5. НАСТРОЙКИ ОТПРАВКИ ПИСЬМА
    const mailOptions = {
        from: `"Юридическая консультация" <${process.env.YANDEX_EMAIL}>`,
        to: process.env.RECIPIENT_EMAIL || process.env.YANDEX_EMAIL,
        subject: `Новое обращение от ${name.trim()} - ${selectedTopic}`,
        text: textVersion,
        html: htmlTemplate,
        // Если email указан, клиент сможет ответить на письмо
        replyTo: userEmail !== 'не указан' ? userEmail : process.env.YANDEX_EMAIL
    };

    try {
        // Отправка письма
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Письмо успешно отправлено:', info.messageId);
        console.log(`   От: ${name}, Телефон: ${formattedPhone}, Тема: ${selectedTopic}`);
        
        res.status(200).json({ 
            success: true, 
            message: 'Сообщение успешно отправлено!' 
        });
    } catch (error) {
        console.error('❌ Ошибка при отправке письма:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.' 
        });
    }
});

// Дополнительный маршрут для проверки работы сервера
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`\n🚀 Сервер запущен на порту ${PORT}`);
    console.log(`📧 Отправка формы настроена на: ${process.env.YANDEX_EMAIL || 'не указан'}`);
    console.log(`📬 Письма будут приходить на: ${process.env.RECIPIENT_EMAIL || process.env.YANDEX_EMAIL || 'не указан'}`);
    console.log(`\n✅ Готов к приему запросов с React-формы\n`);
});