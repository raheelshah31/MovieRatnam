import { Component, OnInit, Input } from '@angular/core';
import { MoviesService, Movies } from '../movies.service';

@Component({
	selector: 'app-movie-cards',
	templateUrl: './movie-cards.component.html',
	styleUrls: ['./movie-cards.component.css']
})
export class MovieCardsComponent implements OnInit {
	@Input() movies: Movies;
	panelOpenState = true;
	objectKeys = Object.keys;
	constructor() { }

	ngOnInit() {
		console.log(this.movies[0]);
	}

	onNavigate(url) {
		window.open(url, "_blank");
	}

}
