'use strict';

var knownEvents = [];
var savedEvents = [];

function renderEvent(parent, event) {
  var img = document.createElement("img");
  img.setAttribute("src", event.images[event.images.length - 1].url);
  img.setAttribute("alt", event.name);
  img.setAttribute("style", "width:100%;");
  parent.appendChild(img);
  var div = document.createElement("div");
  div.classList.add("carousel-caption");
  div.classList.add("d-none");
  div.classList.add("d-md-block");
  var h5 = document.createElement("h2");
  h5.classList.add("black-text");
  h5.innerHTML = event.name;
  div.appendChild(h5);

  var p = document.createElement("h4");
  p.classList.add("black-text");
  p.innerHTML = event.classifications[0].segment.name + " event on " + event.dates.start.localDate;

  var button = document.createElement('button');
  button.classList.add('btn');
  button.classList.add('btn-primary');
  button.innerHTML = "RSVP";
  button.addEventListener("click", (event2) => {
    savedEvents.push(event);
    alert(savedEvents.length);
    button.disabled = true;
    button.classList.remove("btn-primary");
    button.classList.add("btn-success");
    button.innerHTML = "Saved Event";
    event2.preventDefault()
  });
  div.appendChild(p);
  div.appendChild(button);
  parent.appendChild(div);
}

function renderSearchResults() {
    var div = document.querySelector('.carousel-inner');
    renderEvent(div.children[0], knownEvents[0]);
    renderEvent(div.children[1], knownEvents[1]);
    renderEvent(div.children[2], knownEvents[2]);
    renderEvent(div.children[3], knownEvents[3]);
    renderEvent(div.children[4], knownEvents[4]);
}

function renderSavedEvents() {
  if (savedEvents.length <= 0) {
    alert("You have no saved events!");
    return;
  }
  var ol = document.querySelector(".carousel-indicators");
  var li1 = document.createElement("li");
  li1.setAttribute("data-target", "#myCarousel");
  li1.setAttribute("data-slide-to", "0");
  li1.classList.add("active");
  ol.appendChild(li1);
  var event = savedEvents[0];
  var div = document.createElement(".carousel-inner");

  var parent = document.createElement("div");
  parent.classList.add("item active");
  var img = document.createElement("img");
  img.setAttribute("src", event.images[event.images.length - 1].url);
  img.setAttribute("alt", event.name);
  img.setAttribute("style", "width:100%;");
  parent.appendChild(img);
  var divCaption = document.createElement("div");
  divCaption.classList.add("carousel-caption");
  divCaption.classList.add("d-none");
  divCaption.classList.add("d-md-block");
  var h5 = document.createElement("h2");
  h5.classList.add("black-text");
  h5.innerHTML = event.name;
  divCaption.appendChild(h5);

  var p = document.createElement("h4");
  p.classList.add("black-text");
  p.innerHTML = event.classifications[0].segment.name + " event on " + event.dates.start.localDate;
  divCaption.appendChild(p);
  divCaption.appendChild(button);
  parent.appendChild(divCaption);
  div.appendChild(parent);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".identifier-class").innerHTML == "Disocver events coming up.") {
    fetchEvents();
  } else {
    renderSavedEvents()
  }
});

const URL_TEMPLATE = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=LnQn3gazAvJkXOmDzGTX6AcjaaGrUdn2&size=5&city=Seattle";
function fetchEvents() {
  let promise1 = fetch(URL_TEMPLATE)
                  .catch(function(err) {
                    alert(err.message);
                  });
  let promise2 = promise1.then(function(response) {
    if (response == null) {
      return;
    }
    let dataPromise = response.json();
    return dataPromise; 
  });
  let promise3 = promise2.then(function(data) {
    if (data == null) {
      return;
    }
    knownEvents = data._embedded.events;
    renderSearchResults();
    return data;
  });
  return promise3;
}

