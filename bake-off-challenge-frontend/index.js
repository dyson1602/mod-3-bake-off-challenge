/* Variables */

const bakesContainer = document.querySelector('#bakes-container')
const bakeImg = document.querySelector('#detail img')
const bakeName = document.querySelector('#detail h1')
const bakeDescription = document.querySelector('#detail .description')
const newBakeForm = document.querySelector('#new-bake-form')
const scoreForm = document.querySelector('#score-form')



/* Event Listeners */

bakesContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI')
    oneBakeFetch(event.target.dataset.id)
})

newBakeForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const newBakeObj = {
    name: newBakeForm.name.value,
    description: newBakeForm.description.value,
    image_url: newBakeForm.image_url.value
  }
  newBakeFetch(newBakeObj)
  newBakeForm.reset()
})

scoreForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const bakeId = scoreForm.dataset.id
  scoreObj = {
    score: scoreForm.score.value
  }
  patchScoreFetch(scoreObj, bakeId)
  scoreForm.reset()
})

/* Render Objects  */

const renderBakeDetail = (bakeObj) => {
  bakeImg.src = bakeObj.image_url
  bakeName.textContent = bakeObj.name
  scoreForm.dataset.id = bakeObj.id
  scoreForm["bake score"] = bakeObj.score
  bakeDescription.textContent = bakeObj.description
}

const renderBake = (bakeObj) => {
  const li = document.createElement('li')
  const br = document.createElement('br')
  li.dataset.id = bakeObj.id
  li.textContent = bakeObj.name
  bakesContainer.append(li, br)
}

/* Fetch Requests */

const bakesFetch = () => {
  fetch('http://localhost:3000/bakes')
    .then(resp => resp.json())
    .then(bakeObjs => {
      bakeObjs.forEach(bakeObj => renderBake(bakeObj))
    })
}

const oneBakeFetch = (bakeId) => {
  fetch(`http://localhost:3000/bakes/${bakeId}`)
    .then(resp => resp.json())
    .then(bakeObj => renderBakeDetail(bakeObj))
}

const newBakeFetch = (newBakeObj) => {
  fetch('http://localhost:3000/bakes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBakeObj)
  })
    .then(resp => resp.json())
    .then(newBakeObj => renderBake(newBakeObj))
}

const patchScoreFetch = (scoreObj, bakeId) => {
  fetch(`http://localhost:3000/bakes/${bakeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(scoreObj)
  })
    .then(resp => resp.json())
    .then(newBakeObj => alert("You're rating has been updated!"))
}

// const postConfig = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(newBakeObj)
// }

/* Initialize */

const initialize = () => {
  bakesFetch()
  oneBakeFetch(1)
}

initialize()