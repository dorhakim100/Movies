'use strict'

function init() {
  //   getGenres(renderAns)
  renderInput()
}

function onSelectGenre(input) {
  const elLoader = document.querySelector('.loader')
  elLoader.classList.remove('hidden')

  const genre = input.value
  let id
  let strGenre
  const myKey = '35a2e166387e103a04fd0ffcb58df7c0'
  console.log(genre)
  switch (genre) {
    case 'Action':
      id = 28
      break
    case 'Adventure':
      id = 12
      break
    case 'Animation':
      id = 16
      break
    case 'Comedy':
      id = 35
      break
    case 'Crime':
      id = 80
      break
    case 'Documentary':
      id = 99
      break
    case 'Drama':
      id = 18
      break
    case 'Family':
      id = 10751
      break
    case 'Fantasy':
      id = 14
      break
    case 'History':
      id = 36
      break
    case 'Horror':
      id = 27
      break
    case 'Music':
      id = 10402
      break
    case 'Mystery':
      id = 9648
      break
    case 'Romance':
      id = 10749
      break
    case 'Science Fiction':
      id = 878
      break
    case 'TV Movie':
      id = 10770
      break
    case 'Thriller':
      id = 53
      break
    case 'War':
      id = 10752
      break
    case 'Western':
      id = 37
      break
  }
  console.log(id)
  strGenre = `
  https://api.themoviedb.org/3/discover/movie?api_key=${myKey}&with_
genres=${id}
  `
  let movies
  if (loadFromStorage(genre)) {
    movies = loadFromStorage(genre)
  } else {
    movies = getFromServer(strGenre, genre)
    return
    console.log(strGenre)
  }
  console.log(movies)

  const toRender = []
  for (var i = 0; i < movies.results.length; i++) {
    const { title } = movies.results[i]
    const posterCode = movies.results[i].poster_path
    toRender[i] = { title, posterCode }
  }
  console.log(toRender)
  setTimeout(() => {
    renderMovies(toRender, genre)

    elLoader.classList.add('hidden')
  }, 1500)
}

function renderAns(ans) {
  console.log(ans)
  gCache = ans
  saveToStorage('quotesCache', gCache)
  // document.querySelector('.answer h2').innerText = ans.answer
  // document.querySelector('.answer img').src = ans.image
}

function renderInput() {
  console.log(gCache.genres)
  const elDatalist = document.querySelector('#genres')

  let strHtmls = gCache.genres.map(
    (genre) => `<option value="${genre.name}" label="${genre.name}"></option>`
  )

  elDatalist.innerHTML = strHtmls.join('')
}

function renderMovies(movies, genre) {
  const elMoviesContainer = document.querySelector('.movies-container')

  let strHtmls = movies.map(
    (movie) => ` <div class="card">
  <div class="upper-text"><span>bla bla</span></div>
  <img src="https://image.tmdb.org/t/p/w300${movie.posterCode}" alt="">
  <div class="text-container">
      <h2 class="movie name">Name: <span>${movie.title}</span></h2>
      <h3 class="movie genre">Genre: <span>${genre}</span></h3>
      <h3 class="movie rating">Rating: <span class="stars">${getRandomIntInclusive(
        1,
        5
      )}</span></h3>
      <h3 class="movie description">Description:</h3>
       <p class="movie lorem">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio dolore quas enim dolorem quod nesciunt delectus atque quam consequatur, ad impedit eius aliquam sint voluptatum itaque perspiciatis earum voluptates? Iure.</p>
  </div>
</div>`
  )
  elMoviesContainer.innerHTML = strHtmls.join('')
  renderStars()
}

function renderStars() {
  const elRatingsStars = document.querySelectorAll('.stars')
  for (var i = 0; i < elRatingsStars.length; i++) {
    const stars = elRatingsStars[i].innerText
    switch (stars) {
      case '1':
        elRatingsStars[i].innerText = '⭐️'
        break
      case '2':
        elRatingsStars[i].innerText = '⭐️⭐️'
        break
      case '3':
        elRatingsStars[i].innerText = '⭐️⭐️⭐️'
        break
      case '4':
        elRatingsStars[i].innerText = '⭐️⭐️⭐️⭐️'
        break
      case '5':
        elRatingsStars[i].innerText = '⭐️⭐️⭐️⭐️⭐️'
        break
    }
  }
}
