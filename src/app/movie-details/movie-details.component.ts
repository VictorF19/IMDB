import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDbService } from '../movie-db.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movieId: string;
  loading: boolean = false;
  movie: any;

  constructor(private route: ActivatedRoute, private movieDbService: MovieDbService) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    // console.log(this.movieId);
    this.getDetails();
  }

  async getDetails() {
    if (this.loading) { return }
    try {

      let res = await this.movieDbService.getById(this.movieId);
      const credits = await this.movieDbService.getCredits(this.movieId);

      this.movie = res;
      this.movie.actors = credits.cast.splice(0, 4);
      this.movie.director = credits.crew.find(crewMember => crewMember.job === 'Director');
      console.log('Actors:', this.movie.actors)
      console.log('Director:',this.movie.director)

    } catch(error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  return() {
    window.history.back();
  }

}
