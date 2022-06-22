"use strict";

// NAVBAR =================================================
const navbar = document.querySelector("nav");
const hamburgerIcon = document.querySelector(".hamburger");

hamburgerIcon.addEventListener("click", () => {
  navbar.classList.toggle("hidden");
});

// PROJECTS ===============================================
const sectionProjects = document.querySelector("#projects");
const techProjects = document.querySelector(".technical");
const designProjects = document.querySelector(".designs");
const techCardsContainer = document.querySelector(
  ".technical .cards_container"
);
const designCardsContainer = document.querySelector(
  ".designs .cards_container"
);
console.log(designCardsContainer);
const fetchProjects = async function () {
  const data = await fetch("./src/data.json");
  const jsonData = await data.json();
  console.log(jsonData);

  const { designs, projects } = jsonData;
  console.log(designs, projects);
  loadProjects(projects);
  loadDesigns(designs);
};

const loadProjects = function (projectsData) {
  // Add html to DOM
  techCardsContainer.insertAdjacentHTML(
    "afterbegin",
    projectsData
      .map(function (project) {
        return `
        <div class="card group drop-shadow-xl bg-CardBg rounded-md px-6 py-3 border-transparent transition-all duration-100 ease-linear hover:outline-gray-500 hover:outline hover:outline-2 hover:outline-offset-2">
        <div class="card_icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-PotRed" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
         </svg>
        </div>
        <div class="card_content my-4">
          <h3 class="text-xl tracking-wide font-bold mb-2">${project.name}</h3>
          <p class="text-gray-400 font-light">
            ${project.desc}
          </p>
        </div>
        <div class="card_footer flex justify-between items-center">
          <!-- link svg -->
          <a href="${project.link}" target="_blank" noopener noreferrer>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-7 stroke-blue-100 group-hover:stroke-PaleYellow transition hover:scale-110"
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

          <!-- github icon -->
          <a href="${project.source}" target="_blank" noopener noreferrer>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 stroke-blue-100 group-hover:stroke-PaleYellow transition hover:scale-110"
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

const loadDesigns = function (designData) {
  designCardsContainer.insertAdjacentHTML(
    "afterbegin",
    designData
      .map((design) => {
        const tags = design.tags
          .map(
            (tag) =>
              `<span class="bg-blue-200 py-1 px-1.5 rounded-sm mr-3 uppercase text-xs text-black font-bold">${tag}</span>`
          )
          .join("");

        return `
            <div class="card group drop-shadow-xl bg-CardBg rounded-md px-6 pb-3 pt-4 border-transparent transition-all duration-100 ease-linear hover:outline-gray-500 hover:outline hover:outline-2 hover:outline-offset-2">
            <div class="card_tags flex justify-start">
              ${tags}
            </div>
            <div class="card_content mt-4">
              <h3 class="text-xl tracking-wide font-bold mb-1 capitalize">
                ${design.name}
              </h3>
              <p class="text-gray-400 font-light">
                ${design.desc}
              </p>
            </div>
            <div class="card_footer flex justify-end items-center">
              <!-- link svg -->
              <a href="${design.link}" target="_blank" noopener noreferrer>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-7 stroke-Indiblue group-hover:stroke-blue-200 transition hover:scale-110"
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

window.onload(fetchProjects());
