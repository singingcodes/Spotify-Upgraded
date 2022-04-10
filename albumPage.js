window.onload = () => {
  let searchParams = new URLSearchParams(window.location.search);
  let id = searchParams.get("songId");

  console.log(id);

  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id)
    .then((response) => response.json())
    .then((songs) => {
      console.log(songs);

      songCollection = { ...songs };
      let row = document.querySelector(".rowTop");
      row.innerHTML = "";

      let col2 = document.createElement("div");
      col2.classList.add("col-12");
      col2.classList.add("d-flex");
      col2.innerHTML = `
          <div class="col-2">
          <img
          id="hero-img"
          src=${songs.cover}
          class="img-fluid"
          alt=${songs.title}
          />
          </div>
          <div class="col-10">
                    <div class="d-flex flex-column justify-content-end h-100">
                      <small>ALBUM</small>
                      <h1>${songs.title}</h1>
                      <div>
                        <p>
                          <small
                            ><strong>
                              <img
                                src=${songs.cover}
                                height="22px"
                                alt=""
                                style="border-radius: 2rem"
                                alt="Original Album Cover"
                              />
                              ${songs.artist.name} . </strong
                            >${songs.release_date}<strong> . </strong>${songs.nb_tracks}<strong>
                              ,
                            </strong>
                            ${songs.duration}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>`;

      row.appendChild(col2);
      // The end of first part

      let row2 = document.querySelector(".trackRow");
      row2.innerHTML = "";

      let songTrack = songs.tracks.data;
      console.log(songTrack);

      function count() {
        for (let i = 1; i <= songTrack.length; i++) {
          console.log(i);
        }
      }

      songTrack.forEach((song, i) => {
        let col = document.createElement("div");
        col.classList.add("col-12");
        col.classList.add("d-flex");
        col.innerHTML = `<div id="album-track-list" class="col-5">
                    <div class="ml-3 pb-4">
                      <span class="track-num" >${i + 1 + "."}</span>
                      <span class="album-song ml-4"
                        ><strong class="track-decoration">${song.title}</strong
                        ><br /><span class="singer-name">${
                          song.artist.name
                        }</span></span
                      >
                    </div>
                  </div>
                  <div id="album-music-player" class="col-6">
                    <div class="d-flex flex-column"></div>
                  </div>
                  <div id="track-times" class="col-1">
                    <div class="ml-3 pb-5">${song.duration}</div>
                  </div>
                                `;
        row2.appendChild(col);
      });
    });
};

//search bar function to search for songs
const searchAlbum = (event) => {
  let searchQuery = event.target.value;
  console.log(searchQuery);
  let albumRow = document.querySelector(".trackRow");
  albumRow.innerHTML = "";
  let songsTrack = songCollection.tracks.data;
  console.log(songsTrack);
  songsTrack
            .filter((song) => 
              song.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .forEach((song, i) => {
                    let col = document.createElement("div");
                    col.classList.add("col-12");
                    col.classList.add("d-flex");
                    col.innerHTML = `<div id="album-track-list" class="col-5">
                              <div class="ml-3 pb-4">
                                <span class="track-num" >${i + 1 + "."}</span>
                                <span class="album-song ml-4"
                                  ><strong class="track-decoration">${song.title}</strong
                                  ><br /><span class="singer-name">${
                                    song.artist.name
                                  }</span></span
                                >
                              </div>
                            </div>
                            <div id="album-music-player" class="col-6">
                              <div class="d-flex flex-column"></div>
                            </div>
                            <div id="track-times" class="col-1">
                              <div class="ml-3 pb-5">${song.duration}</div>
                            </div>
                                          `;
                    albumRow.appendChild(col);
                  });
};
// play pause button

let showPauseButton = (event) => {
  let playIcon = document.querySelector("#play-pause-button-id");
  console.log(event);
  //let pauseIcon = document.querySelector(".pause-icon");
  if (playIcon.classList.value === "bi bi-play-circle-fill big-play-button") {
    playIcon.classList.value = "bi bi-pause-circle-fill pause-icon";
  } else {
    playIcon.classList.value = "bi bi-play-circle-fill big-play-button";
  }
};

function addEventToHeart() {
  let heartNode = document.querySelector("#heart-icon-1");
  heartNode.addEventListener("click", favouriteSong);
}
addEventToHeart();

function favouriteSong() {
  console.log("hello");
  let heartNode = document.querySelector("#heart-icon-1");
  if (heartNode.classList.value === "bi bi-heart") {
    heartNode.classList.value = "bi bi-heart-fill";
  } else {
    heartNode.classList.value = "bi bi-heart";
  }
}

/*     document.querySelector('#page-heart-icon').classList.toggle('solid-heart-icon') */
