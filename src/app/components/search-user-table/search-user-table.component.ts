import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatSelectChange } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';

import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Users, UsersTable } from '../../models/User';
import { SearchService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-user-table',
  templateUrl: 'search-user-table.component.html',
  styleUrl: 'search-user-table.component.scss',
})
export class SearchUserTableComponent implements OnChanges {
  @Input() query!: string;
  displayedColumns: string[] = ['avatar_url', 'login'];

  usersTable!: UsersTable;

  totalData!: number;
  usersData!: Users[];

  dataSource = new MatTableDataSource<Users>();

  isLoading = false;

  constructor(private searchService: SearchService, private router: Router) {}

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizes = [10];

  getTableData$(pageNumber: number) {
    return this.searchService.searchUsers(this.query, pageNumber);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getTableData$(this.paginator.pageIndex + 1).pipe(
            catchError(() => observableOf(null))
          );
        }),
        map((usersData) => {
          if (usersData == null) return [];
          this.totalData = usersData.total_count;
          this.isLoading = false;
          return usersData.items;
        })
      )
      .subscribe((usersData) => {
        this.usersData = usersData;
        this.dataSource = new MatTableDataSource(this.usersData);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['query'].firstChange) {
      this.dataSource.paginator = this.paginator;

      this.paginator.page
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoading = true;
            return this.getTableData$(this.paginator.pageIndex + 1).pipe(
              catchError(() => observableOf(null))
            );
          }),
          map((usersData) => {
            if (usersData == null) return [];
            this.totalData = usersData.total_count;
            this.isLoading = false;
            return usersData.items;
          })
        )
        .subscribe((usersData) => {
          this.usersData = usersData;
          this.dataSource = new MatTableDataSource(this.usersData);
        });
    }
  }
  getUserProfile(user: Users) {
    this.router.navigateByUrl('/' + user.login);
  }
}
