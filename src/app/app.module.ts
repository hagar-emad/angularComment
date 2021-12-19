import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JopsComponent } from './MainPageJpos/jops/jops.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { RegisterNameComponent } from './auth/register-name/register-name.component';
import { RegisterCityComponent } from './auth/register-city/register-city.component';
import { RegisterEmployeeComponent } from './auth/register-employee/register-employee.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { GroupsComponent } from './core/groups/groups.component';
import { EventsComponent } from './core/events/events.component';
import { ProfileComponent } from './core/profile/profile.component';
import { NotificationComponent } from './core/notification/notification.component';
import { HeaderComponent } from './layout/header/header.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { NetworkComponent } from './network/network.component';
import { ConnectCardComponent } from './connect-card/connect-card.component';
import { ConnectionComponent } from './connection/connection.component';
import { DetailsComponent } from './core/details/details.component';
import { MessagesComponent } from './messages/messages.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './_services/localization.service';
import { SearchComponent } from './layout/search/search.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
export function httpLoader(http:HttpClient){
  return new TranslateHttpLoader(http,'assets/i18n/','.json')
}

@NgModule({
  declarations: [
    AppComponent,
    JopsComponent,
    RegisterComponent,
    RegisterNameComponent,
    RegisterCityComponent,
    RegisterEmployeeComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    GroupsComponent,
    EventsComponent,
    ProfileComponent,
    NotificationComponent,
    HeaderComponent,
     NetworkComponent, ConnectCardComponent, ConnectionComponent, DetailsComponent, MessagesComponent, SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // NgbModal,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: httpLoader,
        deps:[HttpClient]
      },isolate:true
    }),

  ],


  // declarations: [AppComponent, JopsComponent, RegisterComponent, RegisterNameComponent, RegisterCityComponent, RegisterEmployeeComponent, FooterComponent, LoginComponent],
  // imports: [BrowserModule, FormsModule,AppRoutingModule],
  providers: [TranslateService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translate: TranslateService,private localizationService:LocalizationService) {
    this.translate.use(localizationService.getLanguage());
  }

}
