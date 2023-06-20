

import './styles.css';


const Registration = ({ id }) => {
    return (
        <div className="registration">
            <div className="container">
                <div className="registration_content__title">
                    Регистрация
                </div>

                <div className="registration__form register">

                    <div className="register__block">
                        <label className="register__label" htmlFor="surname_i" id="surname_l" >
                            <span className="register__required">*</span> Фамилия: </label>
                        <input className="register__input" id="surname_i" type="text" name="surname" aria-labelledby="surname_i"
                            aria-describedby="danger-surname" aria-required="true" required />
                        <span className="txt-danger" id="danger-surname">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="name_i" id="name_l" >
                            <span className="register__required">*</span> Имя: </label>
                        <input className="register__input" id="name_i" type="text" name="name" aria-labelledby="name_i"
                            aria-describedby="danger-name" aria-required="true" required />
                        <span className="txt-danger" id="danger-name">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="patronymic_i" id="patronymic_l" >
                            Отчество: </label>
                        <input className="register__input" id="patronymic_i" type="text" name="patronymic" aria-labelledby="patronymic_i"
                            aria-describedby="danger-patronymic" />
                        <span className="txt-danger" id="danger-patronymic">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="email_i" id="email_l" >
                            <span className="register__required">*</span> Email: </label>
                        <input className="register__input" id="email_i" type="email" name="email" aria-labelledby="email_i"
                            aria-describedby="danger-email" aria-required="true" required />
                        <span className="txt-danger" id="danger-email">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="phone_i" id="phone_l" >
                            <span className="register__required">*</span>  Телефон: </label>
                        <input className="register__input" id="email_i" type="phone" name="phone" aria-labelledby="phone_i"
                            aria-describedby="danger-phone" aria-required="true" required />
                        <span className="txt-danger" id="danger-phone">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="company_i" id="company_l" >
                            <span className="register__required">*</span>  Организация: </label>
                        <input className="register__input" id="email_i" type="text" name="company" aria-labelledby="company_i"
                            aria-describedby="danger-company" aria-required="true" required />
                        <span className="txt-danger" id="danger-company">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="position_i" id="position_l" >
                            <span className="register__required">*</span>  Должность: </label>
                        <input className="register__input" id="position_i" type="text" name="position" aria-labelledby="position_i"
                            aria-describedby="danger-position" aria-required="true" required />
                        <span className="txt-danger" id="danger-position">Заполните поле</span>
                    </div>


                    <div className="register__block">
                        <label className="register__label" htmlFor="position_i" id="position_l" >
                            <span className="register__required">*</span> Город/район: </label>
                        <select className="register__select" name="area" id="area_select">
                            <option value="1" className="register__option">город Аргун</option>
                        </select>
                        <span className="txt-danger" id="danger-position">Заполните поле</span>
                    </div>

                    <button className="register__btn btn">Зарегистрироваться</button>
                </div>


                {/* <div className="message">
                    <h3 className="message__title">Спасибо!</h3>
                    <p className="message__text">Вы успешно зарегистрированы на мероприятие</p>
                </div> */}
            </div>
        </div>
    );
}

export default Registration;