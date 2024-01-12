const cardContainer = document.getElementById('cardContainer');
const songList = document.getElementById('ul');
const playAudio = new Audio();
// console.log(cardContainer)

function loadData(folder) {
  fetch(`songs/${folder}/info.json`)
  .then(response => response.json())
  .then(data => {
      cardFetch(data, folder)
  })
}

function cardFetch(mydata, folder) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
  <img src="./songs/${folder}/${mydata.img}" alt="cover">
  <h3>${mydata.title}</h3>
  <p>${mydata.description}</p>
  `
  cardContainer.appendChild(card);

  card.addEventListener('click', e => {
    songList.innerHTML = "";
    for (let index = 0; index < mydata.songs.length; index++) {
      const li = document.createElement('li');
      let songName = document.createElement('h3');
      let authorName = document.createElement('p');
      songName.innerHTML = `${mydata.songs[index].title}`
      authorName.innerHTML = `${mydata.songs[index].author}`
      console.log(songName)
      li.innerHTML = `
      <div>
        ${songName.outerHTML}
        ${authorName.outerHTML}
      </div>
      `
      
      li.addEventListener('click', e => {
        let audioUrl = `/songs/${folder}/${mydata.songs[index].song}`;
        console.log(audioUrl)
        playAudio.src = audioUrl;
        playAudio.play()
      })
      
      songList.appendChild(li)
      
    }
  })
}

export {loadData, cardFetch}