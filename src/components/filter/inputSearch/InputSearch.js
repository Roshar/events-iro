import './../style.css';

const InputSearch = ({ val }) => {

    return (
        <section className="filters__search-input-box">
            <input type="text" className="filters__search-input"
                placeholder="Название мероприятия" onChange={(e) => val(e.target.value)} />
            <span className="icon icon_type_search"></span>
        </section>);
}

export default InputSearch;