"use strict";

// NAVBAR =================================================
const header = document.querySelector("header");
const navbar = document.querySelector("nav");
const navlinks = document.querySelector("nav ul");
const hamburgerIcon = document.querySelector(".hamburger");

// Mobile hamburger Menu ---->
hamburgerIcon.addEventListener("click", () => {
  navbar.classList.toggle("hidden");
  navlinks.addEventListener("click", (e) => {
    if(e.target.tagName.toLowerCase() === "a")
      navbar.classList.add("hidden");
  })
});

// Sticky Navbar Implementation ---->
window.addEventListener("scroll", function () {
  if (window.scrollY > header.offsetHeight + 150) {
    header.classList.add("scrollon");
  } else {
    header.classList.remove("scrollon");
  }
});

// PROJECTS ===============================================
const sectionProjects = document.querySelector("#projects");
const sectionDesign = document.querySelector("#designs");
const projectCardsContainer = document.querySelector(
  "#projects .cards_container"
);
const designCardsContainer = document.querySelector(
  "#designs .cards_container"
);
const projectsFilter = document.querySelector(".projects_filter");
const designsFilter = document.querySelector(".designs_filter");

// Fetch Data ---->
const fetchData = async function () {
  const data = await fetch("./src/data.json");
  const jsonData = await data.json();
  return jsonData;
};

const loadContent = async function () {
  const jsonData = await fetchData();

  const { designs, projects } = jsonData;
  loadProjects(projects);
  loadDesigns(designs);
};

// Display Filter Options ---->
const loadTags = function (projects, sectionName) {
  const tagList = projects
    .reduce((acc, project) => {
      return acc.concat(project.tags);
    }, [])
    .filter((tag, i, arr) => i == arr.indexOf(tag));

  const filterContainer =
    sectionName == "projects" ? projectsFilter : designsFilter;

  filterContainer.insertAdjacentHTML(
    "beforeend",
    tagList
      .map((tag) => {
        return `
      <button class="uppercase rounded text-sm text-teal-400 px-3 my-2 border-2 border-teal-400" role="button">${tag}</button>
      `;
      })
      .join("")
  );
};

// Filter Selection ---->
const filterSelection = async function (tagSelected, sectionName) {
  const jsonData = await fetchData();
  const cards = document.querySelectorAll(
    `#${sectionName} .cards_container .card`
  );

  // Activate selected filter
  document.querySelectorAll(`.${sectionName}_filter button`).forEach((btn) => {
    if (btn.innerHTML.trim() === `${tagSelected}`) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  // Hide all cards
  cards.forEach((card) => card.classList.add("hidden"));

  if (tagSelected !== "all") {
    let selectedCards = jsonData[`${sectionName}`].reduce((acc, project, i) => {
      if (project.tags.indexOf(`${tagSelected}`) > -1) acc.push(i);
      return acc;
    }, []);

    // Unhide filtered Cards
    selectedCards.forEach((val) => {
      document
        .querySelector(`#${sectionName} .cards_container .card-${val}`)
        .classList.remove("hidden");
    });
  } else {
    cards.forEach((card) => card.classList.remove("hidden"));
  }
};

// Projects ---->
const loadProjectHTML = function (projectsData) {
  // Add html to DOM
  projectCardsContainer.insertAdjacentHTML(
    "afterbegin",
    projectsData
      .map((project, index) => {
        // Array of Tags
        const tags = project.tags.map(
          (tag) =>
            `<button class="bg-teal-400 hover:bg-teal-100 px-2 rounded mr-3 uppercase font-bold text-xs text-black" data-tag="${tag}">${tag}</button>`
        );

        return `
        <div class="card card-${index} group drop-shadow-xl bg-CardBg rounded-md px-6 py-4 border-transparent transition-all duration-100 ease-linear hover:outline-gray-500 hover:outline hover:outline-2 grid grid-rows-cardGrid items-start gap-y-3">        
          <div class="card_tags flex justify-start">
            ${tags.join("")}
          </div>
          <div class="card_content mt-3">
            <h3 class="text-lg tracking-wide font-bold mb-1">${
              project.name
            }</h3>
            <p class="text-gray-400 text-sm">
              ${project.desc}
            </p>
          </div>
          <div class="card_footer flex justify-between items-center">
            <!-- link svg -->
            <a href="${project.link}" target="_blank" noopener noreferrer>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 stroke-Indiblue group-hover:stroke-PaleYellow transition hover:scale-110"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"
                />
                <line x1="10" y1="14" x2="20" y2="4" />
                <polyline points="15 4 20 4 20 9" />
              </svg>
            </a>

            <!-- github icon -->
            <a href="${project.source}" target="_blank" noopener noreferrer>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 stroke-Indiblue group-hover:stroke-PaleYellow transition hover:scale-110"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
                />
              </svg>
            </a>
          </div>
      </div>
        `;
      })
      .join("")
  );
};

const loadProjects = function (projectsData) {
  loadTags(projectsData, "projects");
  loadProjectHTML(projectsData);
  filterSelection("all", "projects");
};

// Designs ---->
const loadDesignHTML = function (designData) {
  designCardsContainer.insertAdjacentHTML(
    "afterbegin",
    designData
      .map((design, index) => {
        const tags = design.tags
          .map(
            (tag) =>
              `<button class="bg-teal-400 hover:bg-teal-100 px-2 my-2 rounded mr-3 uppercase text-xs text-black font-bold">${tag}</button>`
          )
          .join("");

        return `
            <div class="card card-${index} group drop-shadow-xl bg-CardBg rounded-md px-6 pb-3 pt-4 border-transparent transition-all duration-100 ease-linear hover:outline-gray-500 hover:outline hover:outline-2 hover:outline-offset-2 grid grid-rows-cardGrid items-start gap-y-2">
              <div class="card_tags flex justify-start">
                ${tags}
              </div>
              <div class="card_content mt-3">
                <h3 class="text-xl tracking-wide font-bold mb-1 capitalize">
                  ${design.name}
                </h3>
                <p class="text-gray-400 text-sm">
                  ${design.desc}
                </p>
              </div>
              <div class="card_footer flex justify-end items-center">
                <!-- link svg -->
                <a href="${design.link}" target="_blank" noopener noreferrer>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 stroke-Indiblue group-hover:stroke-PaleYellow transition hover:scale-110"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"
                    />
                    <line x1="10" y1="14" x2="20" y2="4" />
                    <polyline points="15 4 20 4 20 9" />
                  </svg>
                </a>
              </div>
          </div>
            `;
      })
      .join("")
  );
};

const loadDesigns = function (designData) {
  loadTags(designData, "designs");
  loadDesignHTML(designData);
  filterSelection("all", "designs");
};

// Listen click of filter tags ---->
projectsFilter.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "button")
    filterSelection(e.target.innerHTML.trim(), "projects");
});

designsFilter.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "button")
    filterSelection(e.target.innerHTML.trim(), "designs");
});

// Load Content ---->
window.addEventListener("DOMContentLoaded", loadContent);
