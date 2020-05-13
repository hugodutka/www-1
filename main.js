var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
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
var wait = function (ms) {
    return new Promise(function (r) { return setTimeout(r, ms); });
};
var teczoweKolory = function (el) { return __awaiter(_this, void 0, void 0, function () {
    var colors, _i, colors_1, c;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (el === null)
                    return [2 /*return*/];
                colors = [
                    "red",
                    "orange",
                    "yellow",
                    "green",
                    "blue",
                    "indigo",
                    "purple",
                ];
                _i = 0, colors_1 = colors;
                _a.label = 1;
            case 1:
                if (!(_i < colors_1.length)) return [3 /*break*/, 4];
                c = colors_1[_i];
                return [4 /*yield*/, wait(1000)];
            case 2:
                _a.sent();
                console.log(c);
                el.style.backgroundColor = c;
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
teczoweKolory(document.querySelector(".passengers"));
var displayCommiterInfo = function () { return __awaiter(_this, void 0, void 0, function () {
    var container;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                container = document.querySelector("#commiter-info");
                return [4 /*yield*/, fetch("https://api.github.com/repos/Microsoft/TypeScript/commits")
                        .then(function (response) {
                        return response.json()["catch"](function (e) {
                            if (!response.ok) {
                                console.log("failed to fetch commit data", e);
                                return null;
                            }
                        });
                    })
                        .then(function (json) {
                        if (json === null || json.length === 0)
                            return;
                        var username = json[0].author.login;
                        var avatarUrl = json[0].author.avatar_url;
                        var img = document.createElement("img");
                        img.setAttribute("src", avatarUrl);
                        container.appendChild(img);
                        return fetch("https://api.github.com/users/" + username + "/repos");
                    })
                        .then(function (response) {
                        return response.json()["catch"](function (e) {
                            if (!response.ok) {
                                console.log("failed to fetch repository data", e);
                                return null;
                            }
                        });
                    })
                        .then(function (repos) {
                        if (repos === null)
                            return;
                        repos.sort(function (a, b) {
                            return a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase());
                        });
                        for (var _i = 0, repos_1 = repos; _i < repos_1.length; _i++) {
                            var _a = repos_1[_i], full_name = _a.full_name, html_url = _a.html_url;
                            var div = document.createElement("div");
                            var link = document.createElement("a");
                            div.appendChild(link);
                            link.setAttribute("href", html_url);
                            link.innerText = full_name;
                            container.appendChild(div);
                        }
                    })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
displayCommiterInfo();
var gridContainer = document.querySelector(".container");
var rightCol = document.querySelector(".right-col");
var clickCounter = 0;
var fibs = [0, 1];
var fib = function (i) {
    if (i < 0)
        return 0;
    while (fibs.length < i + 1) {
        fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
    }
    return fibs[i];
};
var clickHandler = function (e) {
    console.log(fib(10 * clickCounter));
    clickCounter++;
    var elem = e.target;
    if (!rightCol.contains(elem))
        return;
    rightCol.classList.toggle("colourful");
};
gridContainer.addEventListener("click", clickHandler);
var reservationsSection = document.querySelector("section.flight-reservation");
reservationsSection.addEventListener("click", function (e) {
    e.stopPropagation();
});
var verifyForm = function () {
    var firstName = document.querySelector("input#first-name");
    var lastName = document.querySelector("input#last-name");
    var date = document.querySelector("input#date");
    var origin = document.querySelector("select#from");
    var destination = document.querySelector("select#to");
    var submit = document.querySelector("input[type=submit][value=Rezerwuj]");
    if (firstName.value.length > 0 &&
        lastName.value.length > 0 &&
        new Date(date.value) > new Date(Date.now()) &&
        origin.value.length > 0 &&
        destination.value.length > 0 &&
        origin.value !== destination.value) {
        submit.style.display = "block";
    }
    else {
        submit.style.display = "none";
    }
};
var showFormSummary = function () {
    var sel = function (q) { return document.querySelector(q); };
    sel("#summary-from").innerText = sel("select#from").value;
    sel("#summary-to").innerText = sel("select#to").value;
    sel("#summary-first-name").innerText = sel("input#first-name").value;
    sel("#summary-last-name").innerText = sel("input#last-name").value;
    sel("#summary-date").innerText = sel("input#date").value;
    sel("#flight-reservation-summary").style.display = "block";
};
var reservationsForm = document.querySelector("form#flight-reservation-form");
reservationsForm.addEventListener("input", verifyForm);
reservationsForm.addEventListener("reset", function () { return setTimeout(verifyForm, 10); });
window.addEventListener("load", verifyForm);
reservationsForm.addEventListener("submit", function (e) {
    showFormSummary();
    e.preventDefault();
});
