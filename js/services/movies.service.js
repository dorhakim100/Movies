'use strict'

let gCache = loadFromStorage('quotesCache') || [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
]

function getGenres(onSuccess) {
  console.log(Date.now())
  const req = new XMLHttpRequest()

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      const ans = JSON.parse(req.responseText)
      onSuccess(ans)
    }
  }

  req.open(
    'GET',
    'https://api.themoviedb.org/3/genre/movie/list?api_key=35a2e166387e103a04fd0ffcb58df7c0',
    true
  )
  req.send()
  console.log(Date.now())
}

function getFromServer(api, storageKey) {
  if (loadFromStorage(storageKey)) {
    return loadFromStorage(storageKey)
  }
  const elLoader = document.querySelector('.loader')
  elLoader.classList.remove('hidden')
  const req = new XMLHttpRequest()

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      const output = JSON.parse(req.responseText)

      if (!loadFromStorage(storageKey)) {
        saveToStorage(storageKey, output)
      }
      let movies = output
      const toRender = []
      for (var i = 0; i < movies.results.length; i++) {
        const { title } = movies.results[i]
        const posterCode = movies.results[i].poster_path
        toRender[i] = { title, posterCode }
      }
      console.log(toRender)
      setTimeout(() => {
        renderMovies(toRender, storageKey)

        elLoader.classList.add('hidden')
      }, 1500)
      // return output
    }
  }

  req.open('GET', api, true)
  req.send()

  console.log(Date.now())
}
