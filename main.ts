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
