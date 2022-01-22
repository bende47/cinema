export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export enum ProductsActionsType{
  GET_ALL_PRODUCTS = "[Product] Get All products",
  GET_SELECTED_PRODUCTS = "[Product] Get Selected products",
  GET_AVAILABLE_PRODUCTS = "[Product] Get Available products",
  SEARCH_PRODUCTS = "[Product]  search products",
  NEW_PRODUCTS = "[Product] New products",
  EDIT_PRODUCTS = "[Product] Edit products",
  DELETE_PRODUCTS = "[Product] Delete products",
  SELECT_PRODUCTS = "[Product] Select products",
}

export interface ActionEvent{
  type:ProductsActionsType,
  payload?:any
}

export interface AppDataState<T>{
  dataState?: DataStateEnum,
  data?: T,
  errorMessage?:string
}
