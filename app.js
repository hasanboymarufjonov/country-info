const root = document.querySelector(":root"),
  body = document.querySelector("body"),
  home = document.getElementById("home"),
  main = document.getElementById("main"),
  theme = document.getElementById("theme"),
  searchBox = document.getElementById("search-box"),
  countryName = document.getElementsByClassName("country-name"),
  switchMode = document.getElementById("dark-light-mode"),
  menu = document.getElementById("menu"),
  searchIcon = document.getElementById("search-icon"),
  search = document.getElementById("search"),
  filter = document.getElementById("filter"),
  countryContainer = document.getElementsByClassName("country"),
  options = document.querySelector(".options"),
  regions = document.getElementsByClassName("region"),
  backBtn = document.getElementById("back-icon"),
  arrow = document.getElementById("arrow"),
  countryPage = document.getElementById("country-page"),
  bigFlag = document.getElementById("flag-image"),
  cName = document.getElementById("c-name"),
  countryData1 = document.getElementsByClassName("country-data-1"),
  countryData2 = document.getElementsByClassName("country-data-2"),
  borderCountries = document.getElementById("border-countries"),
  borders = document.getElementsByClassName("border");

let countries = [];

fetch("https://restcountries.com/v2/all")
  .then((res) => res.json())
  .then((data) => {
    countries = data;
    countries.forEach((country) => {
      main.innerHTML += `<div class="country"><div class="flag-container"><img class="flag" src=${country.flag}></div><div class="country-details"><h2 class="country-name">${country.name}</h2><span><strong>Population: </strong>${country.population}</span><br><span><strong>Region: </strong>${country.region}</span><br><span><strong>Capital: </strong>${country.capital}</span></div></div>`;
    });
    for (let i = 0; i < data.length; i++) {
      let item = countryContainer[i];
      let country = data[i];

      item.addEventListener("click", () => {
        displayCountry(country);
      });

      function displayCountry(country) {
        home.style.overflowY = "hidden";
        home.style.display = "none";
        countryPage.style.transform = "translateX(0)";
        countryPage.scrollTop = 0;

        let currencyString = "";
        country.currencies.forEach((currency) => {
          currencyString += currency.name + ", ";
        });
        currencyString = currencyString.substr(0, currencyString.length - 2);
        let languageString = "";
        country.languages.forEach((language) => {
          languageString += language.name + ", ";
        });
        languageString = languageString.substr(0, languageString.length - 2);
        let borderCountriesString = [];

        if (country.borders) {
          country.borders.forEach((border) => {
            borderCountriesString.push(
              countries.find((item) => item.alpha3Code === border).name
            );
          });
        }

        bigFlag.src = country.flag;
        cName.innerText = country.name;
        countryData1[0].innerHTML = `<strong>Native Name: </strong>${country.nativeName}`;
        countryData1[1].innerHTML = `<strong>Population: </strong>${country.population}`;
        countryData1[2].innerHTML = `<strong>Region: </strong>${country.region}`;
        countryData1[3].innerHTML = `<strong>Sub Region: </strong>${country.subregion}`;
        countryData1[4].innerHTML = `<strong>Capital: </strong>${country.capital}`;

        countryData2[0].innerHTML = `<strong>Top Level Domain: </strong>${country.topLevelDomain}`;
        countryData2[1].innerHTML = `<strong>Currencies: </strong>${currencyString}`;
        countryData2[2].innerHTML = `<strong>Languages: </strong>${languageString}`;

        let border = "";
        borderCountriesString.forEach(
          (item) => (border += `<span class="border">${item}</span>`)
        );
        borderCountries.innerHTML = `<strong style="min-width: 15ch">Border Countries: </strong><div>${border}</div>`;
        for (let j = 0; j < borders.length; j++) {
          borders[j].addEventListener("click", () => {
            let country = countries.find((e) => e.name == borders[j].innerText);
            displayCountry(country);
          });
        }
      }
    }

    search.addEventListener("input", () => {
      countries.forEach((country, j) => {
        if (!country.name.toLowerCase().includes(search.value.toLowerCase())) {
          countryContainer[j].style.display = "none";
        } else {
          countryContainer[j].style.display = "unset";
        }
      });
    });
    for (let i = 0; i < regions.length; i++) {
      const reg = regions[i];
      reg.addEventListener("click", () => {
        countries.forEach((country, j) => {
          if (reg.getAttribute("data-value").toLowerCase() === "all") {
            countries.forEach((country, j) => {
              countryContainer[j].style.display = "unset";
            });
          } else if (
            country.region.toLowerCase() !==
            reg.getAttribute("data-value").toLowerCase()
          ) {
            countryContainer[j].style.display = "none";
          } else {
            countryContainer[j].style.display = "unset";
          }
        });
      });
    }
  });

let mode = localStorage.getItem("mode");

theme.addEventListener("click", () => {
  if (mode === "dark") {
    localStorage.setItem("mode", "light");
  } else {
    localStorage.setItem("mode", "dark");
  }
  mode = localStorage.getItem("mode");
  changeTheme();
});

function changeTheme() {
  if (mode === "dark") {
    root.style.setProperty("--bg", "#202c37");
    root.style.setProperty("--text", "#ffffff");
    root.style.setProperty("--lbg", "#2b3945");
    switchMode.src = "icons/moon-2.svg";
    searchIcon.src = "icons/search-1.svg";
    arrow.src = "icons/arrow-left-2.svg";
  } else {
    root.style.setProperty("--bg", "#fafafa");
    root.style.setProperty("--text", "#111517");
    root.style.setProperty("--lbg", "#ffffff");
    switchMode.src = "icons/moon-1.svg";
    searchIcon.src = "icons/search-2.svg";
    arrow.src = "icons/arrow-left-1.svg";
  }
}

filter.addEventListener("click", () => {
  options.classList.toggle("options-opened");
});

let scroll = document.documentElement.scrollTop;
home.style.overflowY = "visible";
document.addEventListener("scroll", () => {
  if (home.style.overflowY === "visible") {
    scroll = document.documentElement.scrollTop;
  }
});

backBtn.addEventListener("click", () => {
  home.style.display = "block";
  home.style.overflowY = "visible";
  document.documentElement.scrollTop = scroll;
  countryPage.style.transform = "translateX(100%)";
});

changeTheme();

document.addEventListener(
  "mousedown",
  (e) => {
    if (e.detail > 1) {
      e.preventDefault();
    }
  },
  false
);

theme.addEventListener(
  "mousedown",
  (e) => {
    e.preventDefault();
  },
  false
);

filter.addEventListener(
  "mousedown",
  (e) => {
    e.preventDefault();
  },
  false
);
