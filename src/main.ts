import '@angular/localize/init';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [appConfig.providers, provideAnimations(), provideHttpClient()],
}).catch((err) => console.error(err));
