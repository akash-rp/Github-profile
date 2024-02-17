import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsComponent } from './components/tabs/tabs.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownModule } from 'ngx-markdown';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from './components/Home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    TabsComponent,
    OverviewComponent,
    RepositoriesComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
    MatInputModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MarkdownModule.forRoot(),
    MatGridListModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
