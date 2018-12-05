import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Movies, MoviesService } from '../movies.service';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.css']
})


export class MovieDetailsComponent {
	comment = "";
	comments = []
	@ViewChild('scrollMe') input;
	constructor(private movieService: MoviesService, public dialogRef: MatDialogRef<MovieDetailsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Movies) {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	addComment() {
		var data = {
			id: this.data._id,
			comments: this.comment
		}
		console.log(data)
		this.movieService.updateComments(data).subscribe((res: Movies) => { this.data = res; });
		this.comment = ""

	}

	close() {
		this.dialogRef.close();
	}



}
