import { Profile } from './../../models/profile';
import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile-service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() user!: string;
  profile!: Profile;
  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getUserDetails(this.user).subscribe({
      next: (resp) => {
        this.profile = resp;
      },
    });
  }
}
