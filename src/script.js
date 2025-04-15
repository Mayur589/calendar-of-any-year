const month = document.getElementById('month');
const year = document.getElementById('year');
const submit = document.getElementById('submit');
const areaToAddDates = document.getElementById('calander-view');

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
            calanderOfTheMonth[i] = n;
            i++;
            n = (n + 1) % 7;
            days--;
        }
    }
    
    buildCalander();

    function addToHtml() {
        console.log(calanderOfTheMonth);
        let html = '';
        calanderOfTheMonth.forEach((element, index) => {
            html += `<div id="${element}" class="dates">${index + 1}</div>`;
        });
        areaToAddDates.innerHTML = html;
    }

    addToHtml();
    
    
});



