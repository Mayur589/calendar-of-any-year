const month = document.getElementById('month');
const year = document.getElementById('year');
const submit = document.getElementById('submit');
const areaToAddDates = document.getElementById('calander-view');
const sunday = document.getElementById('sunday');

let calanderOfTheMonth = [];

const days = {
    'sun': 0,
    'mon': 1,
    'tue': 2,
    'wed': 3,
    'thu': 4,
    'fri': 5,
    'sat': 6
};

const monthToNumberDic = {
    'mar': 1,
    'apr': 2,
    'may': 3,
    'jun': 4,
    'jul': 5,
    'aug': 6,
    'sep': 7,
    'oct': 8,
    'nov': 9,
    'dec': 10,
    'jan': 11,
    'feb': 12
};

function isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100) {
            if (year % 400) {
                return true;
            }
            return false;
        }
        return true;
    }
    return false;
}

submit.addEventListener('click', () => {
    let monthValue = month.value;
    let yearValue = year.value;
    let m = monthValue.toLowerCase().slice(0, 3);

    function calculateFirstDay() {

        const dayNumber = 1;
        const monthNumber = monthToNumberDic[m];
        let D = yearValue % 100;
        const C = (yearValue - D) / 100;

        if (monthNumber === 11 || monthNumber === 12) {
            D -= 1;
        }

        const formula = dayNumber + Math.floor((13 * monthNumber - 1) / 5) + D + Math.floor(D / 4) + Math.floor(C / 4) - 2 * C;
        let firstDayDate;

        if (formula > 0) {
            firstDayDate = formula % 7;
        } else {
            let tempNum = Math.floor((-1 * formula) / 7) + 1;
            firstDayDate = formula - 7 * tempNum * -1;
        }

        return firstDayDate;
    }

    function buildCalander() {
        let isLeap = isLeapYear(yearValue);
        let n = calculateFirstDay();

        const monthsWith31 = ['jan', 'mar', 'may', 'jul', 'aug', 'oct', 'dec'];
        const monthsWith30 = ['apr', 'jun', 'sep', 'nov'];

        if (monthsWith31.includes(m)) {
            putDaysInCalander(31, n);
        } else if (monthsWith30.includes(m)) {
            putDaysInCalander(30, n);
        } else {
            if (isLeap) {
                putDaysInCalander(29, n);
            } else {
                putDaysInCalander(28, n);
            }
        }
    }

    function putDaysInCalander(days, n) {
        let i = 0;

        while (days > 0) {
            n = (n + 1) % 7;
            calanderOfTheMonth[i] = n;
            i++;
            days--;
        }
    }

    buildCalander();

    function reset() {
        for (let i = 0; i < 7; i++) {
            const dayDiv = document.querySelector(`.day[day-data="${i}"]`);
            while (dayDiv.firstChild) {
                dayDiv.removeChild(dayDiv.firstChild);
            }
        }
        document.querySelector('.day[day-data="0"]').textContent = "Sunday";
        document.querySelector('.day[day-data="1"]').textContent = "Monday";
        document.querySelector('.day[day-data="2"]').textContent = "Tuesday";
        document.querySelector('.day[day-data="3"]').textContent = "Wednesday";
        document.querySelector('.day[day-data="4"]').textContent = "Thursday";
        document.querySelector('.day[day-data="5"]').textContent = "Friday";
        document.querySelector('.day[day-data="6"]').textContent = "Saturday";
    }

    function addToHtml() {
        reset();

        const dayToStart = calanderOfTheMonth[0];

        for (let i = 0; i < dayToStart; i++){
            const dayDiv = document.querySelector(`.day[day-data="${i}"]`);
            const dateElement = document.createElement("div");

            dateElement.className = "date";
            dateElement.textContent = "-";
            dayDiv.appendChild(dateElement);
        }

        for (let i = 0; i < calanderOfTheMonth.length; i++) {
            const dayIndex = calanderOfTheMonth[i]; // 0 to 6
            const dateNum = i + 1;

            const dayDiv = document.querySelector(`.day[day-data="${dayIndex}"]`);
            const dateElement = document.createElement("div");
            dateElement.className = "date";
            dateElement.textContent = dateNum;

            dayDiv.appendChild(dateElement);
        }
    }

    addToHtml();





});



