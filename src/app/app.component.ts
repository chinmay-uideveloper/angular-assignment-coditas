import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubUserService } from '../app/github-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() searchString: string;
  usersList: Array<JSON>;
  totalResults = 0;
  currentPageNumber = 1;
  totalPages = 0;

  constructor(private http: HttpClient, private githubUserService: GithubUserService) { }

  getUsersList(query: string, pageNumber: number) {
    this.githubUserService.getUserProfiles(query, pageNumber).subscribe((data: any) => {
      this.totalResults = data.total_count;
      this.totalPages = Math.ceil(this.totalResults / 3);
      this.usersList = data.items;
      console.log('Search Response');
      console.log(this.usersList);
    });
  }

  updateSearchString(query: string) {
    this.searchString = query;
    if (query) {
      this.getUsersList(query, this.currentPageNumber);
    } else {
      console.log(query);
    }
  }
}
