import './contacts.css'
import { useState } from 'react';


export default function Contacts(){
    return(
    <section id="contacts">
        <h1>Контакты</h1>
        <div className="container" id="contactsContainer">
                <div className="info col">
                    <div className="row">
                        {/*Тут должна будет быть карта яндекса*/}
                        <img src="/images/address.svg" alt="адрес"/>
                        <p style={{display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                        }}>428003, Чувашская Республика, <br/> г. Чебоксары, ул. Афанасьева, д. 2, оф. 56.</p>
                    </div>
                    <div className="row">
                        <img src="/images/workingHours.svg" alt="часы работы"/>
                        <p>пн-пт 9:00-18:00</p>
                    </div>
                    <div className="row">
                        <img src="/images/phone.svg" alt="телефон"/>
                        <p>+7(961)346-70-77</p>
                    </div>
                    <div className='row'>
                        <img src="/images/mail.svg"/>
                        <p>liderprava21@ya.ru</p>
                    </div>
                    <div className="row">
                        <img src="/images/owner.svg" alt="владелец"/>
                        <p>ИП Артемьев Артём Сергеевич</p>
                    </div>
                <div className="readFeedback row">
                    <p>Читайте отзывы о нас: </p>
                    <a href="https://yandex.ru/maps/org/lider_prava/34845163518/reviews/?ll=50.123226%2C55.641204&z=7">
                        <img src="/images/yandex.svg" alt="Яндекс отзывы"/>
                    </a>
                    <a href="https://2gis.ru/cheboksary/firm/70000001053905641/tab/reviews">
                        <img src="/images/2gis.svg" alt="2gis отзывы"/>
                    </a>
                </div>
            </div>

            <div className="col formDiv">
                <h2>Связаться с нами</h2>
                <br />
                <p>Заполните форму, чтобы записаться на бесплатную консультацию или задать вопрос.</p>
                <hr className="diamondhr" style={{"margin-top":"0px"}}/>
                <Form />
            </div>
        </div>
    </section>)
}

export function Form(){
    
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        
        // Валидация email
        if (value === '') {
            setIsValidEmail(true); // Пустое поле - валидно
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValidEmail(emailRegex.test(value));
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        
        // Валидация телефона
        if (value === '') {
            setIsValidPhone(true); // Пустое поле - валидно
        } else {
            const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            const cleanValue = value.replace(/\D/g, '');
            const hasValidLength = cleanValue.length === 11 || cleanValue.length === 10;
            
            setIsValidPhone(phoneRegex.test(value) && hasValidLength);
        }
    };
    
    return(
            <form className="col">
                    <label htmlFor="name">Ф.И.О.
                        <span className='asterisk'>*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Иванов Иван Иванович"
                    />
                    
                    <label htmlFor="phone">Телефон
                        <span className='asterisk'>*</span>
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="+7(900)123-45-67"
                        value={phone}
                        onChange={handlePhoneChange}
                        style={{ borderColor: isValidPhone ? 'initial' : 'red' }}
                    />
                    {!isValidPhone && phone && (
                        <p style={{color: 'red', fontSize: '14px', margin: '5px 0'}}>
                            Введите корректный номер телефона
                        </p>
                    )}

                    <label htmlFor="email">Адрес электронной почты</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="ivanovii@mail.com"
                        value={email}
                        onChange={handleEmailChange}
                        style={{ borderColor: isValidEmail ? 'initial' : 'red' }}
                    />
                    {!isValidEmail && email && (
                        <p style={{color: 'red', fontSize: '14px', margin: '5px 0'}}>
                            Введите корректный email
                        </p>
                    )}

                    <label htmlFor="topic">Тема сообщения</label>
                    <select id="messageTopic" name="topic">
                        <option value="" disabled selected>Выберите тему сообщения</option>
                        <option value="Запись на прием">Запись на прием</option>
                        <option value="Оформление претензии">Оформление претензии</option>
                        <option value="Представительство в суде">Представительство в суде</option>
                        <option value="Сопровождение сделки">Сопровождение сделки</option>
                        <option value="Юридическая консультация">Юридическая консультация</option>
                        <option value="Другое">Другое</option>  
                    </select>
                    
                    <label htmlFor="message">Сообщение<span className='asterisk'>*</span></label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Текст сообщения"
                    />
                    <p className="disclaimer">Нажимая кнопку, я подтверждаю, что ознакомлен(а) 
                        и принимаю условия<a href="#"> Политики Конфиденциальности </a>
                        и соглашаюсь на <a href="#">обработку персональных данных</a>.</p>
                    <button className="buttonGen" type="submit" name="submit">ОТПРАВИТЬ</button>
            </form>
            )
        }