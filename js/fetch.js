const cardContainer = document.getElementById("cardContainer");
const songList = document.getElementById("ul");
const playAudio = new Audio();
const progressBar = document.querySelector(".seekbar");
const songNameShow = document.querySelector(".names h3");
const songAuthorShow = document.querySelector(".names p");
const playBtn = document.getElementById("play-btn");
const progressBarLine = document.getElementById("range");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");
const currentTimeVal = document.getElementById("val");
const currentTimeVal2 = document.getElementById("val2");
// console.log(cardContainer)

function loadData(folder) {
  fetch(`songs/${folder}/info.json`)
    .then((response) => response.json())
    .then((data) => {
      cardFetch(data, folder);
    });
}

function cardFetch(mydata, folder) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
  <img src="./songs/${folder}/${mydata.img}" alt="cover">
  <h3>${mydata.title}</h3>
  <p>${mydata.description}</p>
  `;
  cardContainer.appendChild(card);
  card.addEventListener("click", (e) => {
    songList.innerHTML = "";
    for (let index = 0; index < mydata.songs.length; index++) {
      const li = document.createElement("li");
      let songName = document.createElement("h3");
      let authorName = document.createElement("p");
      songName.innerHTML = `${mydata.songs[index].title}`;
      authorName.innerHTML = `${mydata.songs[index].author}`;
      li.innerHTML = `
      <div>
        ${songName.outerHTML}
        ${authorName.outerHTML}
      </div>
      `;
      let currentIndex = index;
      li.addEventListener("click", (e) => {
        progressBar.classList.add('show')
        let audioUrl = `/songs/${folder}/${mydata.songs[currentIndex].song}`;
        playAudio.src = audioUrl;
        playAudio.play();
        songNameShow.innerHTML = songName.innerHTML;
        songAuthorShow.innerHTML = authorName.innerHTML;

        function formateTime(seconds) {
          let minutes = Math.floor(seconds / 60);
          let remainSeconds = Math.floor(seconds % 60);
          return `${minutes}:${remainSeconds < 10 ? "0" : ""}${remainSeconds}`;
        }

        playBtn.addEventListener("click", (e) => {
          if (playAudio.paused) {
            playAudio.play();
            // Update the play button appearance (if needed)
            playBtn.classList.remove("fa-play");
            playBtn.classList.add("fa-pause");
          } else {
            playAudio.pause();
            // Update the play button appearance (if needed)
            playBtn.classList.add("fa-play");
            playBtn.classList.remove("fa-pause");
          }
        });

        function addRange() {
          let progress = Math.floor(
            (100 / playAudio.duration) * playAudio.currentTime
          );
          progressBarLine.style.background = `linear-gradient(to right, #0095ff ${progress}%, #ccc ${progress}%)`;
          progressBarLine.style.transition = "background linear";
          progressBarLine.value = progress;
          currentTimeVal.innerHTML = formateTime(playAudio.currentTime);
          currentTimeVal2.innerHTML = playAudio.duration
            ? formateTime(playAudio.duration)
            : playAudio.duration;
        }
        playAudio.addEventListener("timeupdate", (e) => {
          addRange();
        });
        progressBarLine.addEventListener("input", (e) => {
          let newTime = (progressBarLine.value * playAudio.duration) / 100;
          playAudio.currentTime = newTime;
        });
        function playNextSong() {
          currentIndex = (currentIndex + 1) % mydata.songs.length;
          let newAudioUrl = `/songs/${folder}/${mydata.songs[currentIndex].song}`;
          playAudio.src = newAudioUrl;
          playAudio.load();
          playAudio.play();
          progressBar.classList.add("show");
          songNameShow.innerHTML = mydata.songs[currentIndex].title;
          songAuthorShow.innerHTML = mydata.songs[currentIndex].author;
        }

        function playPreviousSong() {
          // currentIndex = (currentIndex - 1 + mydata.songs.length) % mydata.songs.length;
          if (currentIndex > 0) {
            currentIndex--;
          } else {
            currentIndex = mydata.songs.length - 1;
          }
          let newAudioUrl = `/songs/${folder}/${mydata.songs[currentIndex].song}`;
          playAudio.src = newAudioUrl;
          // playAudio.load();
          playAudio.play();
          progressBar.classList.add("show");
          songNameShow.innerHTML = mydata.songs[currentIndex].title;
          songAuthorShow.innerHTML = mydata.songs[currentIndex].author;
        }

        nextBtn.addEventListener("click", playNextSong);

        previousBtn.addEventListener("click", playPreviousSong);

        playAudio.addEventListener("ended", playNextSong);
      });

      songList.appendChild(li);
    }
    progressBar.classList.add('show')
  });
  
}

export { loadData, cardFetch };
