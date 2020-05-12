var el = document.querySelector("input[type=submit]");
el.style.display = "none";
var p = document.querySelector("#pierwszy");
console.log(p);
var newElem = document.createElement("p");
newElem.innerHTML = "Jestem nowym akapitem!";
document.querySelector("body").appendChild(newElem);
var passengers = document.querySelectorAll(".passenger");
var passId = "data-identyfikator-pasazera";
for (var _i = 0, passengers_1 = passengers; _i < passengers_1.length; _i++) {
    var passenger = passengers_1[_i];
    passenger.setAttribute(passId, Math.floor(Math.random() * Math.pow(10, 6)).toString());
}
var maxIdPassenger = null;
for (var _a = 0, passengers_2 = passengers; _a < passengers_2.length; _a++) {
    var passenger = passengers_2[_a];
    if (maxIdPassenger === null) {
        maxIdPassenger = passenger;
    }
    else if (maxIdPassenger.getAttribute(passId) >= passenger.getAttribute(passId)) {
        continue;
    }
    else {
        maxIdPassenger = passenger;
    }
}
console.log(maxIdPassenger);
setTimeout(function () {
    console.log("No już wreszcie.");
}, 2000);
