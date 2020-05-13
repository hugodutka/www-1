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

const wait = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));

const teczoweKolory = async (el: HTMLElement) => {
  if (el === null) return;
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
  ];
  for (const c of colors) {
    await wait(1000);
    console.log(c);
    el.style.backgroundColor = c;
  }
};

teczoweKolory(document.querySelector(".passengers"));

const displayCommiterInfo = async (): Promise<void> => {
  const container: HTMLElement = document.querySelector("#commiter-info");
  return await fetch(
    "https://api.github.com/repos/Microsoft/TypeScript/commits"
  )
    .then((response) =>
      response.json().catch((e) => {
        if (!response.ok) {
          console.log("failed to fetch commit data", e);
          return null;
        }
      })
    )
    .then((json) => {
      if (json === null || json.length === 0) return;
      const username = json[0].author.login;
      const avatarUrl = json[0].author.avatar_url;
      const img = document.createElement("img");
      img.setAttribute("src", avatarUrl);
      container.appendChild(img);
      return fetch(`https://api.github.com/users/${username}/repos`);
    })
    .then((response) =>
      response.json().catch((e) => {
        if (!response.ok) {
          console.log("failed to fetch repository data", e);
          return null;
        }
      })
    )
    .then((repos) => {
      if (repos === null) return;
      repos.sort((a, b) =>
        a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase())
      );
      for (const { full_name, html_url } of repos) {
        const div = document.createElement("div");
        const link = document.createElement("a");
        div.appendChild(link);
        link.setAttribute("href", html_url);
        link.innerText = full_name;
        container.appendChild(div);
      }
    });
};

displayCommiterInfo();

const gridContainer = document.querySelector(".container");
const rightCol = document.querySelector(".right-col");

var clickCounter = 0;
var fibs = [0, 1];

const fib = (i: number): number => {
  if (i < 0) return 0;
  while (fibs.length < i + 1) {
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
  }
  return fibs[i];
};

const clickHandler = (e: Event) => {
  console.log(fib(10 * clickCounter));
  clickCounter++;
  const elem = e.target as HTMLElement;
  if (!rightCol.contains(elem)) return;
  rightCol.classList.toggle("colourful");
};

gridContainer.addEventListener("click", clickHandler);

const reservationsSection = document.querySelector(
  "section.flight-reservation"
);
reservationsSection.addEventListener("click", (e: Event) => {
  e.stopPropagation();
});

const verifyForm = (): void => {
  const firstName = document.querySelector(
    "input#first-name"
  ) as HTMLInputElement;
  const lastName = document.querySelector(
    "input#last-name"
  ) as HTMLInputElement;
  const date = document.querySelector("input#date") as HTMLInputElement;
  const origin = document.querySelector("select#from") as HTMLSelectElement;
  const destination = document.querySelector("select#to") as HTMLSelectElement;
  const submit = document.querySelector(
    "input[type=submit][value=Rezerwuj]"
  ) as HTMLInputElement;
  if (
    firstName.value.length > 0 &&
    lastName.value.length > 0 &&
    new Date(date.value) > new Date(Date.now()) &&
    origin.value.length > 0 &&
    destination.value.length > 0 &&
    origin.value !== destination.value
  ) {
    submit.style.display = "block";
  } else {
    submit.style.display = "none";
  }
};

const showFormSummary = (): void => {
  const sel = (q: string): any => document.querySelector(q);
  sel("#summary-from").innerText = sel("select#from").value;
  sel("#summary-to").innerText = sel("select#to").value;
  sel("#summary-first-name").innerText = sel("input#first-name").value;
  sel("#summary-last-name").innerText = sel("input#last-name").value;
  sel("#summary-date").innerText = sel("input#date").value;
  sel("#flight-reservation-summary").style.display = "block";
};

const reservationsForm = document.querySelector("form#flight-reservation-form");
reservationsForm.addEventListener("input", verifyForm);
reservationsForm.addEventListener("reset", () => setTimeout(verifyForm, 10));
window.addEventListener("load", verifyForm);
reservationsForm.addEventListener("submit", (e) => {
  showFormSummary();
  e.preventDefault();
});
