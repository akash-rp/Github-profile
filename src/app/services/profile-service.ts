import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
    return this.http.get<Profile>(`${this.apiUrl}/${username}`, {
      headers: {
        Authorization: `Bearer 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`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  getReposList(username: string): Observable<HttpResponse<Repo[]>> {
    return this.http.get<Repo[]>(
      `${this.apiUrl}/${username}/repos?per_page=10`,
      {
        headers: {
          Authorization: `Bearer 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`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
        observe: 'response',
      }
    );
  }

  getReposListByLink(link: string): Observable<HttpResponse<Repo[]>> {
    return this.http.get<Repo[]>(link, {
      headers: {
        Authorization: `Bearer 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`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      observe: 'response',
    });
  }
}
