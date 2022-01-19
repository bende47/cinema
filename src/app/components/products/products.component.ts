import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products/products.service";
import {Product} from "../../model/product.model";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {NotificationService} from "../../services/notification/notification.service";
import {DialogService} from "../../services/dialog/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //products?: Product[]
  products$ ?: Observable<AppDataState<Product[]>>;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productsService: ProductsService,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  /*onGetAllProducts() {
    this.productsService.getAllProducts()
      .subscribe(data => {
        this.products = data;
      }, error => {
        console.log(error);
      })
  }*/

  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      )
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      )
  }

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      )
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.libelle)
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      )
  }


  public deleteProduct(p: Product) {
    this.dialogService.confirm('Suppression du produit', 'Voulez vous vraiment supprimer le produit <' + p.name + '>')
      .then(confirm => {
          if (confirm) {
            this.productsService.deleteProducts(p.id)
              .subscribe(data => {
                this.notificationService.showSuccess("Produit supprimé avec succès", "");
                this.onGetAllProducts();
              }, error => {
                this.notificationService.showError("Une erreur est survene, veuillez reéssayez", "Suppresion du produit");
              })
          }
        }
      ).catch(() => console.log('Une erreur est survenue'));
  }

  onNewProducts() {
    this.router.navigateByUrl("/newProducts");
  }

  editProduct(p: Product) {
    this.router.navigateByUrl("/editProducts/"+p.id);
  }
}
