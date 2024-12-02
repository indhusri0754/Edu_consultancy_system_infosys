import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Import standalone components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { HeaderComponent } from './pages/header/header.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { BlogComponent } from './pages/blog/blog.component';
import { Payment1Component } from './pages/payment1/payment1.component';
import { Payment2Component } from './pages/payment2/payment2.component';
import { AdminComponent } from './pages/admin/admin.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppComponent, // Import standalone components
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationFormComponent,
    HeaderComponent,
    CoursesComponent,
    BlogComponent,
    Payment1Component,
    Payment2Component,
    AdminComponent,
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent] // Bootstrap the standalone AppComponent
})
export class AppModule {}
