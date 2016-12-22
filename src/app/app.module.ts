import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings.component';
import { SettingsEditModal } from '../pages/settings/modal-settings.component';
import { ScheduleService } from '../services/schedule.service';
import { BusService } from '../services/bus.service';
import { StorageService } from '../services/storage.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    SettingsEditModal
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      mode: 'md',
      iconMode: 'md',
      // modalEnter: 'modal-slide-in',
      // modalLeave: 'modal-slide-out',
      tabsPlacement: 'top',
      pageTransition: 'md'
    }, {}
    )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    SettingsEditModal
  ],
  providers: [
    ScheduleService,
    BusService,
    StorageService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
