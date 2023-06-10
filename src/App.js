import Header from './components/header/Header';
import './styles/reset.css';
import './styles/normalize.css';
import './styles/main.css';

function App() {
  return (
    <div className="App">
      <Header />


      <div className="filters">
        <div className="filters__wrapper">
          <div className="filters__header">

            <div className="filters__category-list filter-category">
              <ul className="filters-category__list list-reset">
                <li className="filters-category__item"> <button className="filters-category__btn btn  ">Период</button></li>
                <li className="filters-category__item"> <button className="filters-category__btn btn ">Категория</button></li>
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
                    <button className="filters__btn btn">2023</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn">2022</button>
                  </li>
                </ul>
              </div>
              <div className="filters__list-container">
                <ul className="filters__list list-reset">
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">2023</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Январь</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Февраль</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Март</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Апрель</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Май</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Июнь</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Июль</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Август</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Сентабрь</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Октябрь</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Ноябрь</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline">Декабрь</button>
                  </li>
                  <li className="filters__item">
                    <button className="filters__btn btn btn-outline soon-events">Ближайшие</button>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div >
  );
}

export default App;
