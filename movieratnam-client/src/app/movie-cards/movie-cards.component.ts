import { Component, OnInit, Input } from '@angular/core';
import { MoviesService, Movies } from '../movies.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MovieDetailsComponent} from '../movie-details/movie-details.component';

@Component({
	selector: 'app-movie-cards',
	templateUrl: './movie-cards.component.html',
	styleUrls: ['./movie-cards.component.css']
})
export class MovieCardsComponent implements OnInit {
	@Input() movies: Movies;
	panelOpenState = true;
	objectKeys = Object.keys;
	imageSrc= "";
	constructor(public dialog: MatDialog) { }

	ngOnInit() {
		console.log(this.movies[0]);

	}

	onNavigate(url) {
		window.open(url, "_blank");
	}

	openDialog(movie): void {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      data: movie,
      hasBackdrop:true,
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
