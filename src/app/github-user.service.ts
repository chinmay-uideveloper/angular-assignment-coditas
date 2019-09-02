import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubUserService {

  url = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUserProfiles(query: string, pageNumber: number) {
    return this.http.get(this.url + '/search/users?q=' + query + '&page=' + pageNumber + '&per_page=3');
  }

  getUserRepositories(username: string) {
    return this.http.get(this.url + '/users/' + username + '/repos');
  }
}
