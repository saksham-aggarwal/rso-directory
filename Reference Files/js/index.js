'use strict';

var knownUsers = [];
var button = document.querySelector("#searchButton");
button.addEventListener("click", function(event) {
    renderSearchResults(document.querySelector("#searchQuery").value);
    event.preventDefault();
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function renderUser(user) {
    var div = document.createElement("div");
    div.classList.add("card");
    //<div class = "card">
    var img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", user.picture.large);
    img.setAttribute("alt", "User");
    img.setAttribute("style", "width:100%");
    div.appendChild(img); // <div class= "card"> 
                            //img<src, alt, style>
    var div2 = document.createElement("div");
    div2.classList.add("container"); 
    var h4 = document.createElement("h4");
    h4.classList.add("card-title");
    var b = document.createElement("b");
    b.innerHTML = user.name.first.capitalize() + " " + user.name.last.capitalize();
    h4.appendChild(b);
    div2.appendChild(h4);
    var index = Math.floor((Math.random() * 15));
    var year = ["Freshmen", "Junior", "Sophomore", "Senior"][index % 4];
    var yearParagraph = document.createElement("p");
    yearParagraph.classList.add("card-text");
    yearParagraph.innerHTML = year;
    div2.appendChild(yearParagraph);
    var major = ["Computer Science", "Math", "Physics", "Chemistry", "Law",
                 "Informatics", "HCDE", "Public Health", "Biology", "Electrical Engineering",
                 "Art", "Interaction Design", "Mechanical Engineering", "English"][index];
    var majorParagraph = document.createElement("p");
    majorParagraph.classList.add("card-text");
    majorParagraph.innerHTML = "Major: " + major;    
    div2.appendChild(majorParagraph);
    var RSO = ["NSBE", "Filipino Club", "Jazz Club", "Chess Club", "ABBS", "MSA"][index % 6];
    var RSOParagraph = document.createElement("p");
    RSOParagraph.classList.add("card-text");
    RSOParagraph.innerHTML = "RSO: " + RSO;
    div2.appendChild(RSOParagraph);
    var button = document.createElement("button");
    button.setAttribute("aria-label", "Add as a friend");
    button.classList.add("w3-button");
    button.classList.add("w3-xlarge"); 
    button.classList.add("w3-circle");
    button.classList.add("w3-teal");
    button.innerHTML = "+";
    button.addEventListener("click", function(event) {
        button.innerHTML = "Added as a friend!";
        button.classList.remove("w3-button");
        button.classList.remove("w3-xlarge"); 
        button.classList.remove("w3-circle");
        button.classList.remove("w3-teal");
        button.classList.add("btn");
        button.classList.add("btn-success");
        button.disabled = true;
        event.preventDefault();
    });
    div2.appendChild(button);
    div.appendChild(div2);
    // <div class= "card"> 
        //img<src, alt, style>
        //<div class = 'container'>
            //<h4>user name</h4>
            //<button class = "w3-button">
        //
    //
    return div;
}

function renderSearchResults(term) {
    var section = document.querySelector(".Search-Results");
    while (section.hasChildNodes()) {   
        section.removeChild(section.firstChild);
    }
    if (knownUsers == 0) {
        alert("No users found in databse!");
        return;
    } 
    var results = knownUsers.filter((user) => {
        return (user.name.first.includes(term) || user.name.last.includes(term));
    })
    if (results.length == 0) {
        alert("No users found!");
        return;
    }
    var row = document.createElement("div");
    row.classList.add("card-group");
    results.forEach((user) => {
        var div = renderUser(user);
        row.appendChild(div);
        if (row.childElementCount >= 3) {
            section.appendChild(row);
            section.appendChild(document.createElement("br"));
            row = document.createElement("div");
            row.classList.add("card-group");
        }
    });
    if (row.childElementCount > 0 && row.childElementCount < 3) {
        section.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchUsers();
});

const URL_TEMPLATE = "https://randomuser.me/api/?results=1000";
function fetchUsers() {
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
    knownUsers = data.results;
    return data;
  });
  return promise3;
}