const errorMessage = document.getElementById('error-message');

// Show the movies currently in theaters when the page first loads
currentMovies();

function currentMovies() {
	const endpoint = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=882711f8feee65fb35f82f654baa2c32";

	// Fetch list of currently playing movies
	$.ajax({
		url: endpoint,
		dataType: "json",
		success: function (data) {
			document.querySelector("#results-total").textContent = data.total_results;
			document.querySelector("#results-displayed").textContent = data.results.length;

			for (movie of data.results) {
				createMovie(movie);
			}

			// console.log(data.total_pages);
		},
		error: function (error) {
			alert("AJAX error");
			console.log(error);
		}
	})
}

document.querySelector("#movie-form").onsubmit = () => {
	const search = document.querySelector("#movie-search").value.trim();

	// Make sure the user submits non-empty text
	errorMessage.textContent = '';

	if (search.length == 0) {
		errorMessage.textContent = "Please enter your search";
		return false;
	}

	// Clear the results of the previous search or movies currently in theaters
	// While I did find this in the jQuery documentation, is this efficient?
	$("#results-list").empty();

	document.querySelector("#now-playing").textContent = '';

	// Putting &page=PAGE_NUMBER lets you change the page number! Don't need to for this assignment
	const endpoint = "https://api.themoviedb.org/3/search/movie?query=" + search + "&api_key=882711f8feee65fb35f82f654baa2c32";

	// Fetch the list of movies matching the search using ajax
	$.ajax({
		url: endpoint,
		dataType: "json",
		success: function (data) {
			document.querySelector("#results-total").textContent = data.total_results;
			document.querySelector("#results-displayed").textContent = data.results.length;

			for (movie of data.results) {
				createMovie(movie);
			}
			// console.log(data.total_pages);
		},
		error: function (error) {
			alert("AJAX error");
			console.log(error);
		}
	})

	// Clear the movie search text after submitting
	document.querySelector("#movie-search").value = '';

	return false;
}

function createMovie(movie) {
	const li = document.createElement("li");
	const img = document.createElement("img");
	const imgDiv = document.createElement("div");
	const title = document.createElement("div");
	const releaseDate = document.createElement("div");
	const rating = document.createElement("div");

	// Use default movie image if the movie does not have a poster path
	if (movie.poster_path) {
		img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
	}
	else {
		img.src = "img/default_movie.jpeg";
	}

	img.alt = movie.title + " Poster";

	title.innerHTML = movie.title;
	releaseDate.innerHTML = movie.release_date;
	rating.innerHTML = movie.vote_average;

	document.querySelector("#results-list").appendChild(li);

	imgDiv.appendChild(img);
	li.appendChild(imgDiv)
	li.appendChild(title);
	li.appendChild(releaseDate);
	li.appendChild(rating);

	li.classList.add("list-group-item", "d-flex", "text-center", "bg-light");
	imgDiv.classList.add("col-3", "text-center", "align-self-center");
	img.classList.add("movie-poster");
	title.classList.add("col-3", "align-self-center");
	releaseDate.classList.add("col-3", "align-self-center");
	rating.classList.add("col-3", "align-self-center");

	// console.log(movie.title);
	// console.log(movie.release_date);
	// console.log(movie.vote_average);
}