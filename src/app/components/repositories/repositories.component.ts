import { Component, OnInit } from '@angular/core';
import { Repo } from '../../models/Repo';
import { ProfileService } from '../../services/profile-service';

@Component({
  selector: 'app-repositories',
  templateUrl: 'repositories.component.html',
  styleUrl: 'repositories.component.scss',
})
export class RepositoriesComponent implements OnInit {
  repositories: Repo[] = [];
  displayedColumns: string[] = ['id'];
  parsedLinks: { [key: string]: string } = {};
  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getReposList('ThusharaX').subscribe({
      next: (repos) => {
        const linkHeader = repos.headers.get('link');
        const links = linkHeader?.split(',').map((link) => link.trim());

        const parsedLinks: { [key: string]: string } = {};

        links?.forEach((link) => {
          const [url, rel] = link.split(';').map((item) => item.trim());
          const urlWithoutBrackets = url.slice(1, -1); // Remove the < and > from the URL
          const relType = rel.split('=')[1].slice(1, -1); // Extract the rel value without quotes
          console.log(relType, urlWithoutBrackets);
          parsedLinks[relType] = urlWithoutBrackets;
        });
        this.parsedLinks = parsedLinks;
        this.repositories = repos.body!;
      },
    });
  }

  public fetchReposByLink(step: string) {
    console.log(this.parsedLinks);
    this.profileService.getReposListByLink(this.parsedLinks[step]).subscribe({
      next: (repos) => {
        const linkHeader = repos.headers.get('link');
        const links = linkHeader?.split(',').map((link) => link.trim());

        const parsedLinks: { [key: string]: string } = {};

        links?.forEach((link) => {
          const [url, rel] = link.split(';').map((item) => item.trim());
          const urlWithoutBrackets = url.slice(1, -1); // Remove the < and > from the URL
          const relType = rel.split('=')[1].slice(1, -1); // Extract the rel value without quotes
          console.log(relType, urlWithoutBrackets);
          parsedLinks[relType] = urlWithoutBrackets;
        });
        this.parsedLinks = parsedLinks;
        this.repositories = repos.body!;
      },
    });
  }
}
