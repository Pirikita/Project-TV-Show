//You can edit ALL of the code here
let allEpisodes = []; // Empty array to fill with the retrieved data below

const searchBoxDiv = document.createElement("div"); // Creates a card to include the search box and the text of episode display
const searchBox = document.createElement("input"); // Created the box
searchBox.className = "input-box"; // Use it for styling after
searchBox.type = "text";
const searchText = document.createElement("span"); // Text that will appear next to the box
searchText.textContent = "Displaying episodes x out of y"; // Will adjust the x and y after
searchBoxDiv.appendChild(searchBox); // The big box will include the search box
searchBoxDiv.appendChild(searchText); // and the text next to it

const episodesContainer = document.createElement("div"); // Creates a big container to put all the episodes div inside

// runs when the page loads
function setup() {
  // find the root element in the HTML
  const rootElem = document.getElementById("root");
  rootElem.appendChild(searchBoxDiv);
  rootElem.appendChild(episodesContainer);

  // fill the empty array of line 2 with data
  allEpisodes = getAllEpisodes();
  // display them on the page
  makePageForEpisodes(allEpisodes);
}
// shows the episodes on the page
function makePageForEpisodes(episodeList) {
  // clear anything that might already be in the episodes
  episodesContainer.innerHTML = "";

  // go through each episode
  for (let i = 0; i < episodeList.length; i++) {
    const episode = episodeList[i];

    // container for each episode
    const episodeDiv = document.createElement("div");

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
    // show the episode title
    const title = document.createElement("h2");
    title.textContent = episodeCode + " - " + episode.name; // Added a space before and after -
    episodeDiv.appendChild(title);

    // show episode image if it exists
    if (episode.image && episode.image.medium) {
      const img = document.createElement("img");
      img.src = episode.image.medium;
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

  const credit = document.createElement("p");

  const link = document.createElement("a");
  link.href = "https://www.tvmaze.com/";
  link.target = "_blank";
  link.textContent = "TVMaze.com";

  credit.textContent = "Data originally from ";
  credit.appendChild(link);

  rootElem.appendChild(credit);
}
// run setup when page finishes loading
window.onload = setup;
