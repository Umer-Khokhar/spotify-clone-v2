export const cardContainer = document.getElementById('cardContainer')
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
}

export {loadData, cardFetch}