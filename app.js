$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
      let searchText = $('#searchText').val();
      getMovies(searchText);
      e.preventDefault();
    });
  });
  
  function getMovies(searchText) {
    let endpoint = "https://api.themoviedb.org/3/search/movie?api_key=105eb79aa1e6df60a2b95878ad2289aa&language=es&query=" + searchText;
    fetch(endpoint, { method: 'GET', body: null })
      .then((response) => {
        return response.json();
      }).then((data) => {
        let movies = data.results;
        console.log(movies);
  
        let output = '';
        movies.forEach((peli) => {
          output += `
            <div class="col-md-3">
              <div class="well text-center">
                <img src="https://image.tmdb.org/t/p/w500${peli.poster_path}">
                <h5>${peli.title}</h5>
                <a onclick="movieSelected('${peli.id}')" class="btn btn-primary" href="#">Detalles</a>
              </div>
            </div>
          `;
        });
  
        $('#movies').html(output);
      })
  
  }
  
  function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
  }
  
  function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    let endpoint = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=105eb79aa1e6df60a2b95878ad2289aa&language=es";
    fetch(endpoint, { method: 'GET', body: null })
      .then((response) => {
        return response.json();
      }).then((movie) => {
        let output = `
          <div class="row">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Fecha de lanzamiento:</strong> ${movie.release_date}</li>
                <li class="list-group-item"><strong>Popularidad:</strong> ${movie.popularity}</li>
                <li class="list-group-item"><strong>Promedio votos:</strong> ${movie.vote_average}</li>
                <li class="list-group-item"><strong>Total votos:</strong> ${movie.vote_count}</li>
              </ul>
            </div>
          </div>
          <div class="row mt-4">
            <div class="well">
              <h3>Resumen</h3>
              ${movie.overview}
              <hr>
              
              <a href="index.html" class="btn btn-warning mb-5">Buscar otra pelicula</a>
            </div>
          </div>
        `;
  
        $('#movie').html(output);
      })
  
  }
  