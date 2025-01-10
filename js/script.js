'use strict';

	document.addEventListener('DOMContentLoaded', () => {
		// Movie database object
		const movieDB = {
			movies: [
				"LOGAN",
				"JUSTICE LEAGUE",
				"LA LA LAND",
				"WHIPLASH",
				"SCOTT PILGRIM VS. THE WORLD"
			]
		};

		// DOM elements
		const adv = document.querySelectorAll('.promo__adv img'), // All advertisement images
			poster = document.querySelector('.promo__bg'),       // Background poster element
			genre = poster.querySelector('.promo__genre'),       // Genre text element
			movieList = document.querySelector('.promo__interactive-list'), // Movie list container
			addForm = document.querySelector('form.add'),        // Form for adding movies
			addInput = addForm.querySelector('.adding__input'),  // Input field for movie title
			checkbox = addForm.querySelector('[type="checkbox"]'); // Checkbox for marking favorites

		// Add a new movie to the list
		addForm.addEventListener('submit', (event) => {
			event.preventDefault(); // Prevent page reload

			let newFilm = addInput.value; // Get the movie title from input
			const favorite = checkbox.checked; // Check if it's marked as a favorite

			if (newFilm) { // If input is not empty
				if (newFilm.length >= 21) {
					newFilm = `${newFilm.substring(0, 22)}...`; // Trim long movie titles
				}
				if (favorite) {
					console.log('Adding a favorite movie'); // Log favorite movies
				}
				movieDB.movies.push(newFilm); // Add movie to database
				sortArr(movieDB.movies); // Sort movies alphabetically
				createMoveList(movieDB.movies, movieList); // Update movie list
			}

			event.target.reset(); // Reset the form fields
		});

		// Remove advertisements from the page
		const deleteAdv = (arr) => {
			arr.forEach(item => {
				item.remove(); // Remove each ad
			});
		};

		// Update genre and background
		const makeChanges = () => {
			genre.textContent = 'Drama'; // Change genre to "Drama"
			poster.style.backgroundImage = 'url("img/bg.jpg")'; // Change background image
		};

		// Sort an array alphabetically
		const sortArr = (arr) => {
			arr.sort();
		};

		// Create and display the movie list
		function createMoveList(films, parent) {
			parent.innerHTML = ''; // Clear existing list
			sortArr(films); // Sort movies alphabetically

			// Add each movie to the list
			films.forEach((film, i) => {
				parent.innerHTML += `
				<li class="promo__interactive-item">${i + 1} ${film}
					<div class="delete"></div>
				</li>`;
			});

			// Add delete functionality to each delete button
			document.querySelectorAll('.delete').forEach((btn, i) => {
				btn.addEventListener('click', () => {
					btn.parentElement.remove(); // Remove the movie from the list
					movieDB.movies.splice(i, 1); // Remove from the database
					console.log(movieDB.movies); // Log the updated database
					createMoveList(films, parent); // Update the list
				});
			});
		}

		// Initial function calls
		deleteAdv(adv); // Remove advertisements
		makeChanges(); // Update genre and background
		createMoveList(movieDB.movies, movieList); // Display movie list
	});
