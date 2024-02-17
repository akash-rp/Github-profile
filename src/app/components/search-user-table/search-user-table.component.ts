import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { switchMap, catchError, map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Users, UsersTable } from '../../models/User';
import { SearchService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-user-table',
  templateUrl: 'search-user-table.component.html',
  styleUrls: ['search-user-table.component.scss'],
})
export class SearchUserTableComponent implements AfterViewInit, OnChanges {
  @Input() query!: string;

  displayedColumns: string[] = ['avatar_url', 'login'];
  dataSource = new MatTableDataSource<Users>();
  isLoading = false;
  isError = false;
  totalData!: number;
  usersData!: Users[];
  pageSizes = [10];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private searchService: SearchService, private router: Router) {}

  ngAfterViewInit() {
    this.setupPagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['query'].firstChange) {
      this.setupPagination();
    }
  }

  setupPagination() {
    this.dataSource.paginator = this.paginator;
    this.isLoading = true;
    this.isError = false;
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => this.getTableData(this.paginator.pageIndex + 1)),
        catchError((error) => {
          console.error('Error fetching data:', error);
          this.isLoading = false;
          this.isError = true;
          return of(null);
        })
      )
      .subscribe((usersData) => {
        if (usersData === null) {
          return;
        }
        this.totalData = usersData.total_count;
        this.isLoading = false;
        this.usersData = usersData.items;
        this.dataSource.data = this.usersData;
      });
  }

  getTableData(pageNumber: number): Observable<UsersTable> {
    return this.searchService.searchUsers(this.query, pageNumber);
  }

  getUserProfile(user: Users) {
    this.router.navigateByUrl('/' + user.login);
  }
}
