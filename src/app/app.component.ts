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
  @Input() sortOption: string;
  usersList: any;
  totalResults = 0;
  currentPageNumber = 1;
  totalPages = 0;

  constructor(private http: HttpClient, private githubUserService: GithubUserService) { }

  getUsersList(query: string, pageNumber: number) {
    this.githubUserService.getUserProfiles(query, pageNumber).subscribe((data: any) => {
      this.totalResults = data.total_count;
      this.totalPages = Math.ceil(this.totalResults / 3);
      this.usersList = data.items;

      this.usersList.forEach((item: any, index: number) => {
        this.getRepositoriesList(item.login, index);
        this.getUsersFullName(item.login, index);
      });

      /* console.log('Search Response');
      console.log(this.usersList); */
    });
  }

  getRepositoriesList(username: string, index: number) {
    this.githubUserService.getUserRepositories(username).subscribe((data: any) => {
      this.usersList[index].repositories = data;
    });
  }

  getUsersFullName(username: string, index: number) {
    this.githubUserService.getUsersFullName(username).subscribe((data: any) => {
      this.usersList[index].fullname = data.name;
    });
  }

  updateSearchString(query: string) {
    this.searchString = query;
    if (query) {
      this.getUsersList(query, this.currentPageNumber);
    }
  }

  updateSortOption(sortOption: string) {
    this.sortOption = sortOption;
    if (sortOption) {
      this.getUsersList(sortOption, this.currentPageNumber);
    }
  }

  loadPage(pageNumber: number) {
    this.currentPageNumber = pageNumber;
    this.getUsersList(this.searchString, this.currentPageNumber);
  }
}
