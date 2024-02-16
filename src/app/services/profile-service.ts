import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { Repo } from '../models/Repo';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getUserDetails(username: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${username}`);
  }

  getReposList(username: string, page: number): Observable<Repo[]> {
    return this.http.get<Repo[]>(
      `${this.apiUrl}/${username}/repos?per_page=10&page=${page}`
    );
  }
}
