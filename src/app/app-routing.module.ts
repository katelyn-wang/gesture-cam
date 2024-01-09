import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'view', component:ViewPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
