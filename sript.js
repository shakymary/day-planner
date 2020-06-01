let workDay = {};

// running functions when the page loads
// .ready runs on page load
// https://api.jquery.com/ready/
$(document).ready(function () {
    setCurrentDate();
    initializeEvents();
    addColorForTime();
});

function setCurrentDate() {
    // get element from HTML with the id="currentDay"
    const currentDateEl = $("#currentDay");

    // moment() gives current date
    // dddd -> full day
    // MMMM -> full month
    // Do -> date with "th" at the end
    let currentDate = moment();
    let formattedDate = currentDate.format("dddd, MMMM Do")
    currentDateEl.text(formattedDate);
}

function addColorForTime() {
    const currentDate = moment();
    for (let i = 1; i <= 9; i++) {
        const timeId = "time" + i;
        const input = $(`#${timeId} input`);
        const timeString = $(`#${timeId} div div`)
            .text()
            .trim();
        // https://stackoverflow.com/questions/17884586/javascript-parsing-times-without-date
        const time = moment(timeString, "h a");

        if (time.isBefore(currentDate)) {
            input.addClass("past");
        } else if (time.isAfter(currentDate)) {
            input.addClass("future");
        } else {
            input.addClass("present");
        }
    }
}

const forms = $("form");

// https://api.jquery.com/submit/
forms.submit(e => {
    e.preventDefault();
    const currentForm = $(`#${e.target.id}`);
    const value = currentForm.find("input").val();
    saveEventToLocalStorage(e.target.id, value);
});

function saveEventToLocalStorage(id, time) {
    workDay[id] = time;
    localStorage.setItem("workDay", JSON.stringify(workDay));
}

function initializeEvents() {
    // get workday string from localstorage
    const workDayString = localStorage.getItem("workDay");

    // https://www.w3schools.com/js/js_json_parse.asp
    // converts string to object using JSON.parse
    if (workDayString) {
        workDay = JSON.parse(workDayString);
    }

    // looping through all the forms
    for (let form of forms) {
        const inputSelector = "#" + form.id + " input"
        const input = $(inputSelector);
        console.log(input)
        input.val(workDay[form.id] || "");
    }
}