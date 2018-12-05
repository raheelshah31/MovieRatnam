import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MoviesService {
	movieServerURl = '/api/movies';
	constructor(private http: HttpClient) { }

	getMovies() {
		return this.http.get<Movies>(this.movieServerURl);
	}

	searchMovies(query) {
		return this.http.get<Movies>(this.movieServerURl + "?query=" + query);
	}

	updateComments(data){
		return this.http.post(this.movieServerURl,data);
	}
}

export interface Movies {
	_id: string;
	color: string;
	director_name: string;
	num_critic_for_reviews?: number;
	duration?: number;
	director_facebook_likes: number;
	actor_3_facebook_likes?: number;
	actor_2_name: string;
	actor_1_facebook_likes: number;
	gross?: number;
	genres: string;
	actor_1_name: string;
	movie_title: string;
	num_voted_users: number;
	cast_total_facebook_likes: number;
	actor_3_name: string;
	facenumber_in_poster: number;
	plot_keywords: string;
	movie_imdb_link: string;
	num_user_for_reviews?: number;
	language: string;
	country: string;
	content_rating: string;
	budget?: number;
	title_year?: number;
	actor_2_facebook_likes: number;
	imdb_score: number;
	aspect_ratio?: number;
	movie_facebook_likes: number;
	movie_poster?: string;
	comments:Array<String>;
}
