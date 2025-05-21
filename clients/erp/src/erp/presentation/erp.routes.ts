import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedViewComponent } from './authenticated/authenticated-view.component';
import { AuthenticationService } from '../../common/application/services/authentication/authentication.service';
import { NgModule } from '@angular/core';
import { SearchProductsComponent } from './authenticated/stocks/search-products.component';

const routes: Routes = [
    {
        path: '', component: AuthenticatedViewComponent, canActivate: [AuthenticationService],
        children: [
            { path: '', redirectTo: 'app', pathMatch: 'full' },
            { path: 'app', component: SearchProductsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class ErpRoutingModule {
}

