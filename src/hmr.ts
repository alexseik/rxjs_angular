import { NgModuleRef, ApplicationRef } from '@angular/core';

import { createNewHosts, hmrModule } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();
  bootstrap().then((mod) => {
    ngModule = mod;
    return hmrModule(mod, module); // this line is missing in Angular 6 HMR story
  });
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    // ngModule.destroy(); - "has been already destroyed error - in NG6"
    makeVisible();
  });
};