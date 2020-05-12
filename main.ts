let el = document.querySelector("input[type=submit]") as HTMLInputElement;
el.style.display = "none";

let p = document.querySelector("#pierwszy") as HTMLParagraphElement;
console.log(p);

let newElem = document.createElement("p") as HTMLParagraphElement;
newElem.innerHTML = "Jestem nowym akapitem!";
document.querySelector("body").appendChild(newElem);

let passengers = document.querySelectorAll(".passenger") as NodeListOf<
  HTMLElement
>;

const passId = "data-identyfikator-pasazera";

for (let passenger of passengers) {
  passenger.setAttribute(
    passId,
    Math.floor(Math.random() * 10 ** 6).toString()
  );
}

var maxIdPassenger: null | HTMLElement = null;
for (let passenger of passengers) {
  if (maxIdPassenger === null) {
    maxIdPassenger = passenger;
  } else if (
    maxIdPassenger.getAttribute(passId) >= passenger.getAttribute(passId)
  ) {
    continue;
  } else {
    maxIdPassenger = passenger;
  }
}

console.log(maxIdPassenger);

setTimeout(() => {
  console.log("No już wreszcie.");
}, 2000);
