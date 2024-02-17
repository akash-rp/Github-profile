import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { HomeComponent } from './components/Home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':user', component: TabsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
