window.onload = function() {
    addGreenPlayImgEventListener()
    addListenerToLoveHeart()
    addListenerToFirstButton()
    addEventToArtistName()
    loadPage()
    }


let loadPage = () => {

    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
    .then(response => response.json())
    .then(songs => {
        let row = document.querySelector(".rowrow")
        row.innerHTML = ""
        songs.data.forEach(song => {
            let col = document.createElement("div")
            col.classList.add("col-3")
            col.innerHTML = `<div class="card mb-3">
                                    <div class="row no-gutters row-remove-margin row-remove-margin">
                                        <div class="col-4">
                                            <img class="first-section-img" src=${song.album.cover} alt="...">
                                        </div>
                                        <div class="col-6 flex-container">
                                            <div class="card-body card-body-section1">
                                                <p class="card-text">${song.album.title}</p>
                                            </div>
                                        </div>
                                        <div class="col-2 flex-container">
                                            <img class="green-play-img" src="http://hypebot.typepad.com/.a/6a00d83451b36c69e201bb09b0b161970d-200wi" alt="">
                                        </div>
                                    </div>
                                </div>`
            row.appendChild(col)
        })
    })

    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=queen")
    .then(response => response.json())
    .then(songs => {
        let row = document.querySelector(".queenrow")
        row.innerHTML = ""
        songs.data.forEach(song => {
            let col = document.createElement("div")
            col.classList.add("col-3")
            col.innerHTML = `<div class="card mb-3">
                                    <div class="row no-gutters row-remove-margin row-remove-margin">
                                        <div class="col-4">
                                            <img class="first-section-img" src=${song.album.cover} alt="...">
                                        </div>
                                        <div class="col-6 flex-container">
                                            <div class="card-body card-body-section1">
                                                <p class="card-text">${song.title}</p>
                                            </div>
                                        </div>
                                        <div class="col-2 flex-container">
                                        <a href="./albumPage.html?songId=${song.album.id}">listen...</a>
                                            
                                        </div>
                                    </div>
                                </div>
                                `
            row.appendChild(col)
        })
    })
    
}



function addGreenPlayImgEventListener() {
    let greenPlayNode = document.querySelectorAll('.green-play-img')
    for (let play of greenPlayNode) {
        play.addEventListener('click', addNewArtistToNowPlaying)
    }
}

function addNewArtistToNowPlaying(e) {
    let artistName = e.target.closest('.card').childNodes[5].childNodes[1].innerText
    let songName = e.target.closest('.card').childNodes[5].childNodes[3].innerText
    let currentArtistNode = document.querySelector('.p-artist-name')
    let currentSongNode = document.querySelector('.p-song-name')
    currentArtistNode.innerText = artistName
    currentSongNode.innerText = songName
}

function addListenerToLoveHeart() {
    document.querySelector('.bi-heart').addEventListener('click', showOrHideHeart)
    document.querySelector('.js-heart').addEventListener('click', showOrHideHeart)
}
function showOrHideHeart() {
    document.querySelector('footer i:first-of-type').classList.toggle('visible')
}

function addListenerToFirstButton () {
    let seeAllBtnNode = document.querySelectorAll('.see-all-btn')
    seeAllBtnNode[0].addEventListener('click', addNewRow)
    // console.log(seeAllBtnNode)
}

function addNewRow() {
    let newRowNode = document.querySelector('.hidden-row')
    newRowNode.classList.toggle('second-section-card-hidden')
    newRowNode.classList.toggle('new-row-animation')

    console.log('done')
}
function addEventToArtistName() {
    let artistNode = document.querySelector('.p-artist-name')
    artistNode.addEventListener('click', changePage)
}
function changePage (e) {
    location.href = "/artist.html";
}