import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ErpModule } from './erp/presentation/erp.module';

platformBrowserDynamic().bootstrapModule(ErpModule)
  .catch(err => console.log(err));