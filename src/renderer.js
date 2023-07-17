const apiKey = 'c1aecf62';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');
const movieDetails = document.getElementById('results-container');

searchButton.addEventListener('click', searchMovies);
movieDetails.addEventListener('click', searchMovies);

// Search Button to search the movie based on input value.
function searchMovies() {
  const searchTerm = searchInput.value;
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      displayResults(data.Search);
    })
    .catch(error => console.log(error));
}

function displayResults(movies) {
  resultsContainer.innerHTML = '';

  if (!movies) {
    const noResults = document.createElement('p');
    noResults.textContent = 'No movies found.';
    resultsContainer.appendChild(noResults);
    return;
  }

  // Sort movies by release year in descending order
  movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));


  movies.forEach(movie => {
    // search by id
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
    .then((response) => response.json())
    .then((movieData) => {
      console.log(movie)
      
      // Pass the retrieved movie details to the display function

      const movieElement = document.createElement('div');
      movieElement.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h2>${movie.Title}</h2>
        <p>Type: ${movie.Type}</p>
        <p>Year: ${movie.Year}</p>
        <p>IMDB ID: ${movie.imdbID}</p>
        <p>Synopsis: ${movieData.Plot}</p>
        <p>Cast: ${movieData.Actors}</p>
        <p>Release Date: ${movieData.Released}</p>
        <p>Ratings: ${movieData.imdbRating}</p>
      `;
      resultsContainer.appendChild(movieElement);
    })
    .catch(error => console.log(error));
    
  });

  
}

  
