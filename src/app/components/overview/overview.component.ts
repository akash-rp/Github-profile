import { ProfileService } from './../../services/profile-service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { Repo } from '../../models/Repo';

@Component({
  selector: 'app-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @Input() user!: string;
  repositories!: Repo[];
  markdownSrc = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getReposList(this.user).subscribe({
      next: (repos) => {
        this.repositories = repos.body!;
        if (this.repositories.length >= 6) {
          this.repositories = this.repositories.slice(0, 6);
        }
      },
    });

    this.markdownSrc = `https://raw.githubusercontent.com/${this.user}/${this.user}/master/README.md`;
  }
}
