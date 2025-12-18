//You can edit ALL of the code here
let allEpisodes = []; // Empty array to fill with the retrieved data below

const navigationDiv = document.createElement("div"); // Altered to create a card to include the episodes menu, search box and the text of episode display
navigationDiv.className = "navigationDiv";

const episodeSelector = document.createElement("select"); // Cretaes the dropdown menu
episodeSelector.className = "episode-selector"; // Use it for styling after

const searchBox = document.createElement("input"); // Created the box
searchBox.className = "input-box"; // Use it for styling after
searchBox.type = "text";
searchBox.setAttribute("aria-label", "Search episodes"); // For better lighthouse accesibility
searchBox.setAttribute("placeholder", "Search episodes..."); // Adding a text in the search box

const searchText = document.createElement("span"); // Text that will appear next to the box
searchText.className = "search-text";

navigationDiv.appendChild(episodeSelector); // The big box will include the episode selector
navigationDiv.appendChild(searchBox); //  the search box
navigationDiv.appendChild(searchText); // and the text next to it

const episodesContainer = document.createElement("div"); // Creates a big container to put all the episodes div inside
// Added all big containers axcept rootElem in the global scope. They will be executed before the setup on loading
episodesContainer.className = "episodes-container";

function setup() {
  // find the root element in the HTML
  const rootElem = document.getElementById("root");
  rootElem.appendChild(navigationDiv); // Created the structure of the root by appending the searchBoxDiv and
  rootElem.appendChild(episodesContainer); // the episodes container

  // fill the empty array of line 2 with data
  allEpisodes = getAllEpisodes();
  // display them on the page
  makePageForEpisodes(allEpisodes);
  populateEpisodeSelector(allEpisodes);

  searchText.textContent = `Displaying ${allEpisodes.length} out of ${allEpisodes.length} episodes`; // Displays the text even without something written in the search box

  const credit = document.createElement("p"); // Moved from the below function
  // so it doesn't recreate itself everytime the function runs

  const link = document.createElement("a");
  link.href = "https://www.tvmaze.com/";
  link.target = "_blank";
  link.textContent = "TVMaze.com";

  credit.textContent = "Data originally from ";
  credit.appendChild(link);

  rootElem.appendChild(credit);

  searchBox.addEventListener("input", function () {
    // Making the search active
    const searchTerm = searchBox.value;
    if (searchTerm === "") {
      // If the search box is empty
      makePageForEpisodes(allEpisodes);
      searchText.textContent = `Displaying episodes ${allEpisodes.length} out of ${allEpisodes.length}`;
    } else {
      const searchTermLower = searchTerm.toLowerCase(); // turns all the input to lower case for better comparison
      const filteredEpisodes = allEpisodes.filter(function (episode) {
        const name = episode.name.toLowerCase();
        const summary = episode.summary.toLowerCase();
        return (
          name.includes(searchTermLower) || summary.includes(searchTermLower)
        );
      });
      makePageForEpisodes(filteredEpisodes);
      searchText.textContent = `Displaying episodes ${filteredEpisodes.length} out of ${allEpisodes.length}`;
    }
  });

  episodeSelector.addEventListener("change", function () {
    const selectedCode = episodeSelector.value; // S01E01 for example
    const targetId = "episode-" + selectedCode; // FOrmat to match the id of the episode card
    const targetElement = document.getElementById(targetId); // The episode card

    if (targetElement) {
      // If the card exists
      targetElement.scrollIntoView({ behavior: "smooth" }); // "Jump" to it
    }
  });
}
// shows the episodes on the page
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root"); // define it again

  // clear anything that might already be in the episodes
  episodesContainer.innerHTML = "";

  // go through each episode
  for (let i = 0; i < episodeList.length; i++) {
    const episode = episodeList[i];

    // container for each episode
    const episodeDiv = document.createElement("div");
    episodeDiv.className = "episode-card";

    let season = episode.season;
    let number = episode.number;

    // adding 0's if needed
    if (season < 10) {
      season = "0" + season;
    }
    if (number < 10) {
      number = "0" + number;
    }

    const episodeCode = "S" + season + "E" + number;
    episodeDiv.id = "episode-" + episodeCode;
    // show the episode title
    const title = document.createElement("h2");
    title.textContent = episodeCode + " - " + episode.name; // Added a space before and after -
    episodeDiv.appendChild(title);

    // show episode image if it exists
    if (episode.image && episode.image.medium) {
      const img = document.createElement("img");
      img.className = "episode-img";
      img.src = episode.image.medium.replace("http://", "https://"); // Forced https for better score in lighthouse
      img.alt = episode.name + "image";
      episodeDiv.appendChild(img);
    }
    //show the episode summary
    const summary = document.createElement("div");
    summary.innerHTML = episode.summary || "No summary available";
    episodeDiv.appendChild(summary);

    // add episode to the page
    episodesContainer.appendChild(episodeDiv); // Added the episode card to the bigger container of episodes
  }
}

function populateEpisodeSelector(episodeList) {
  // Fill episode selector with titles of episodes to choose from
  for (let i = 0; i < episodeList.length; i++) {
    // Loop through episodes
    const episode = episodeList[i]; // for each episode

    let season = episode.season; // Copied code from above to create the episodeCode
    let number = episode.number;

    // adding 0's if needed
    if (season < 10) {
      season = "0" + season;
    }
    if (number < 10) {
      number = "0" + number;
    }

    const episodeCode = "S" + season + "E" + number;

    const option = document.createElement("option"); // Created an element for all options in the dropdown menu
    option.textContent = episodeCode + " - " + episode.name;
    option.value = episodeCode; // for better matching with the card after

    episodeSelector.appendChild(option); // Append the options to the episodeSelector box
  }
}
// run setup when page finishes loading
window.onload = setup;
