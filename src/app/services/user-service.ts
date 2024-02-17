import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { Repo } from '../models/Repo';
import { Users, UsersTable } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  apiUrl = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  searchUsers(user: string, pageNumber: number): Observable<UsersTable> {
    return this.http.get<UsersTable>(
      `${this.apiUrl}/users?q=${user} type:user&per_page=10&page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer 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`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
  }
}
