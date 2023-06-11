
import BtnFilter from './../../components/btnFilter/BtnFilter';
import BtnPrimary from '../btnPrimary/BtnPrimary';
import './style.css';

const Filter = () => {
    return (

        <section className="filters">
            <div className="filters__wrapper">
                <div className="filters__header">

                    <div className="filters__category-list filters-category">
                        <ul className="filters-category__list list-reset">
                            <li className="filters-category__item"> <BtnFilter title={'Период'} /> </li>
                            <li className="filters-category__item"> <BtnFilter title={'Категория'} /></li>
                        </ul>
                    </div>

                    <div className="filters__search-input-box">
                        <input type="text" className="filters__search-input" placeholder="Название мероприятия" />
                        <span className="icon icon_type_search"></span>
                    </div>

                </div>
            </div>


            <div className="filters__body ">
                <div className="filters__wrapper ">
                    <div className="filters__list-wrapper">
                        <div className="filters__tabs-container">
                            <ul className="filters__tabs list-reset">
                                <li className="filters__item">
                                    <BtnPrimary title={'2023'} />

                                </li>
                                <li className="filters__item">
                                    <BtnPrimary title={'2022'} />
                                </li>
                            </ul>
                        </div>
                        <div className="filters__list-container">
                            <ul className="filters__list list-reset">
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="2023" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Январь" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Февраль" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Март" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Апрель" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Май" />

                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Июнь" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Июль" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Август" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Сентябрь" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Октябрь" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Ноябрь" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'outline'} title="Декабрь" />
                                </li>
                                <li className="filters__item">
                                    <BtnPrimary type={'soon'} title="Ближайшие" />
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </section>

    );
}

export default Filter;