import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule)

if (environment.hmr) {
  hmrBootstrap(module, bootstrap);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap()
  });
}