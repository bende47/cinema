import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {HomeComponent} from "./components/home/home.component";
import {ProductsAddComponent} from "./components/products-add/products-add.component";
import {ProductsEditComponent} from "./components/products-edit/products-edit.component";

const routes: Routes = [
  {path: "products", component: ProductsComponent},
  {path: "newProducts", component: ProductsAddComponent},
  {path: "editProducts/:id", component: ProductsEditComponent},
  {path: "", component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
