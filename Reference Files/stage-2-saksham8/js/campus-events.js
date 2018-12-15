let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and year in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let datetime = document.createElement("time");
                datetime.dateTime = year + '-' + (month+1) + '-' + date;
                cell.appendChild(datetime);
                let cellText = document.createTextNode(date);
                cell.addEventListener("click", function() {addToCalendar(cell.childNodes[0].dateTime, cell);});
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                    cell.classList.add("text-white");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
}

function addToCalendar(d, clickedButton) {
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = clickedButton;
    if(btn.childNodes.length > 2) {
        while(btn.childNodes.length != 2) {
            btn.removeChild(btn.childNodes[2]);
        }
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Get submit details when "Add Event" is clicked
    var newEvent = document.getElementsByClassName("add-event");
    newEvent[0].addEventListener("click", function() {
        var eventName = document.getElementById("eventName").value;
        var eventLocation = document.getElementById("eventLocation").value;
        var eventStartsAt = document.getElementById("eventInputF").value;
        let eventCount;
        if(btn.childNodes.length == 2) {
            console.log("inside if")
            let count = 1;
            eventCount = document.createElement("div");
            eventCount.classList.add("events");
            var eventCountText = document.createTextNode(count);
            eventCount.appendChild(eventCountText);
            clickedButton.appendChild(eventCount);
        } else {
            console.log("inside else")
            let noOfEvents = Number(btn.childNodes[2].textContent);
            let element = btn.childNodes[2]; 
            element.innerHTML = ++noOfEvents;
        }
        console.log(clickedButton.childNodes);
    });

    // When the user clicks on the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var inputTagFrom = document.getElementById('eventInputF');
    inputTagFrom.value = d + "T00:00";

    var inputTagTo = document.getElementById('eventInputT');
    inputTagTo.value = d + "T23:59";
}