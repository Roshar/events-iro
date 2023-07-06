

const formaterDate = (data) => {

    let val1 = Math.round(data.substr(3, 2));

    switch (val1) {
        case 1: return "Янв.";
        case 2: return "Февр.";
        case 3: return "Марта";
        case 4: return "Апр.";
        case 5: return "Мая";
        case 6: return "Июня";
        case 7: return "Июля";
        case 8: return "Авг.";
        case 9: return "Сент.";
        case 10: return "Окт.";
        case 11: return "Нояб.";
        case 11: return "Дек.";
        default: return val1;
    }

}



const generationDate = (dt, full = false) => {

    const mounth = formaterDate(dt)

    let day = dt.substr(0, 2);
    let year = dt.substr(6, 4);

    return full ? day + ' ' + mounth + ' ' + year : day + ' ' + mounth;

}





export default generationDate