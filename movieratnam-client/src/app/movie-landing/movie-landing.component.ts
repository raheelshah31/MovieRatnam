import { Component, OnInit } from '@angular/core';
import { MoviesService, Movies } from '../movies.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'app-movie-landing',
	templateUrl: './movie-landing.component.html',
	styleUrls: ['./movie-landing.component.css']
})
export class MovieLandingComponent implements OnInit {

	movies: Movies;
	error;
	queryDB = false;
	search: FormControl = new FormControl();
	constructor(private movieService: MoviesService) { }

	ngOnInit() {
		this.getMovies();
		this.search.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
			.subscribe(queryField => this.movieService.searchMovies(queryField)
				.subscribe((data: Movies) => {
					if (data != null) {
						this.movies = null;
						this.movies = { ...data }
					}
				}, error => this.error = error)

			);

	}


	getMovies() {
		this.movieService.getMovies()
			// clone the data object, using its known Config shape
			.subscribe((data: Movies) => {
				if (data != null) {
					this.movies = null;
					this.movies = { ...data }
				}
			}, error => this.error = error);
	}

}
