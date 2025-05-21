import { CUSTOM_ELEMENTS_SCHEMA, NgModule, provideZoneChangeDetection } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRootComponent } from './app-root.component';
import { AuthenticatedViewComponent } from './authenticated/authenticated-view.component';
import { ErpRoutingModule } from './erp.routes';
import { HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Interceptor } from '../../common/application/interceptor/interceptor';
import { AuthenticationService } from '../../common/application/services/authentication/authentication.service';
import { SearchProductsComponent } from './authenticated/stocks/search-products.component';
import { ProductRepository } from '../domain/repositories/product.repository';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppRootComponent,
    AuthenticatedViewComponent,
    SearchProductsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ErpRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [
    ProductRepository,
    AuthenticationService,
    {
      multi: true,
      useClass: Interceptor,
      provide: HTTP_INTERCEPTORS
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
  bootstrap: [AppRootComponent]
})
export class ErpModule {
}

