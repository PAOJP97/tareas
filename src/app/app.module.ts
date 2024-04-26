import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignUpComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { SplitterModule } from 'primeng/splitter';
import { BarMenuComponent } from './components/menu/bar_menu/bar-menu.component';
import { SideMenuComponent } from './components/menu/side_menu/side-menu.component';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PanelComponent } from './components/contenido/panel/panel.component';
import { TareasComponent } from './components/contenido/tareas/tareas.component';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { ItemComponent } from './components/contenido/tareas/item/item.component';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormularioComponent } from './components/contenido/tareas/formulario/formulario.component';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationServices } from './services/authentication/authentication.services';


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    MainComponent,
    SignUpComponent,
    BarMenuComponent,
    SideMenuComponent,
    PanelComponent,
    TareasComponent,
    ItemComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    KeyFilterModule,
    SplitterModule,
    MenuModule,
    BrowserAnimationsModule,
    ChartModule,
    ToolbarModule,
    CalendarModule,
    CardModule,
    ConfirmDialogModule,
    SidebarModule,
    CheckboxModule,
    InputTextareaModule,
    FirestoreModule,
    provideFirebaseApp(() => initializeApp({"projectId":"tasks-a20a1","appId":"1:273384349763:web:8cfefebc319baf62a474f6","storageBucket":"tasks-a20a1.appspot.com","apiKey":"AIzaSyD4H9i1UTXqlwQdMUVzK7pcIGJj0Ec6Th8","authDomain":"tasks-a20a1.firebaseapp.com","messagingSenderId":"273384349763"})),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions())
  ],
  providers: [
    DatePipe,
    ConfirmationService,
    MessageService,
    AuthenticationServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
