import logo from './img/logo.png';
import './style.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <nav className="header__top-nav top-nav" aria-label="Основные разделы на странице">
                    <a href="/" className="logo header__logo">
                        <img className="logo__img" src={logo} alt="Logo" />
                        <p className="logo__desc-box">
                            <span className='logo__desc-title-1'>Государственное бюджетное учреждение дополнительного профессионального образования</span><br />
                            <span className='logo__desc-title-2'>«ИНСТИТУТ РАЗВИТИЯ ОБРАЗОВАНИЯ
                                ЧЕЧЕНСКОЙ РЕСПУБЛИКИ»</span>
                        </p>

                    </a>
                    <ul className="header__menu-top menu-top list-reset">
                        <li className="menu-top__item">
                            <a href="#!" className="menu-list__link">Помощь</a>
                        </li>
                        <li className="menu-top__item">
                            <a href="#!" className="menu-list__link">Войти</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;