import { Route, RouterModule, Routes } from "@angular/router";
import { InscriptionsComponent } from "./inscriptions.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
    {
        path: '',
        component: InscriptionsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InscriptionsRoutingModule {}