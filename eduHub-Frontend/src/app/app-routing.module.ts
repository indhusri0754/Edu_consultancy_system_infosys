import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { HeaderComponent } from './pages/header/header.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { BlogComponent } from './pages/blog/blog.component';
import { Payment1Component } from './pages/payment1/payment1.component';
import { Payment2Component } from './pages/payment2/payment2.component';
import { Dashboard1Component } from './pages/dashboard1/dashboard1.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registration-form', component: RegistrationFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'payment1', component: Payment1Component },
  { path: 'payment2', component: Payment2Component },
  { path: 'dashboard1', component: Dashboard1Component },
  { path: 'courses', component: CoursesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
