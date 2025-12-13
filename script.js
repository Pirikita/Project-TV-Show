//You can edit ALL of the code here

// runs when the page loads
function setup() {
  // get all episodes using the provided function
  const allEpisodes = getAllEpisodes();
  // display them on the page
  makePageForEpisodes(allEpisodes);
}
// shows the episodes on the page
function makePageForEpisodes(episodeList) {
  // find the root element in the HTML
  const rootElem = document.getElementById("root");
  // ORIGINAL LINE OF CODE rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  
  // clear anything that might already be in root
  rootElem.innerHTML = "";

  // go through each episode
  for (let i = 0; i < episodeList.length; i++) {
    const episode = episodeList[i];

    // container for each episode
    const episodeDiv = document.createElement("div");

    // show the episode title
    const title = document.createElement("h2");
    title.textContent = "S" + episode.season + "E" + episode.number + "-" + episode.name;
    episodeDiv.appendChild(title);

    // show episode image if it exists
    if (episode.image && episode.image.medium) {
      const img = document.createElement("img");
      img.src = episode.image.medium;
      img.alt = episode.name + "image";
      episodeDiv.appendChild(img);
    }
    //show the episode summary
    const summary = document.createElement ("div");
    summary.innerHTML = episode.summary || "No summary available";
    episodeDiv.appendChild(summary);

    // add episode to the page
    rootElem.appendChild(episodeDiv);
  }
}
// run setup when page finishes loading 
window.onload = setup;
