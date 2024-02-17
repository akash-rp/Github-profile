import { Component, Input, OnInit } from '@angular/core';
import { Repo } from '../../models/Repo';
import { ProfileService } from '../../services/profile-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-repositories',
  templateUrl: 'repositories.component.html',
  styleUrls: ['repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  @Input() user!: string;

  repositories: Repo[] = [];
  displayedColumns: string[] = ['id'];
  parsedLinks: { [key: string]: string } = {};

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.fetchRepos();
  }

  fetchReposByLink(step: string) {
    this.profileService
      .getReposListByLink(this.parsedLinks[step])
      .subscribe((repos) => {
        const linkHeader = repos.headers.get('link');
        this.parsedLinks = this.parseLinks(linkHeader!);
        this.repositories = repos.body!;
      });
  }

  private parseLinks(linkHeader: string): { [key: string]: string } {
    const links = linkHeader?.split(',').map((link) => link.trim());
    const parsedLinks: { [key: string]: string } = {};

    links?.forEach((link) => {
      const [url, rel] = link.split(';').map((item) => item.trim());
      const urlWithoutBrackets = url.slice(1, -1); // Remove the < and > from the URL
      const relType = rel.split('=')[1].slice(1, -1); // Extract the rel value without quotes
      parsedLinks[relType] = urlWithoutBrackets;
    });

    return parsedLinks;
  }

  private fetchRepos() {
    this.profileService.getReposList(this.user).subscribe((repos) => {
      const linkHeader = repos.headers.get('link');
      this.parsedLinks = this.parseLinks(linkHeader!);
      this.repositories = repos.body!;
    });
  }
}
