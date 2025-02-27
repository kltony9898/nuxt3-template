import type { Pagination, ID, Status, ApiResponse, Prettify } from '~/types/examples/common'

export interface ProductList {
  id: ID;
  name: string;
  price: number;
  stock: number;
  status: Status;
  Pagination: Pagination
}
export interface GetProductListResponse extends ApiResponse<ProductList[]> {
  data: ProductList[]
}

export interface MainProduct {
  id: ID;
  name: string;
  price: number;
  stock: number;
  status: Status;
  Pagination: Pagination
}
export type NestedProduct = MainProduct & {
  category: string
}
// export interface SpecialProduct extends MainProduct {
//   category: string
// }

export type SpecialProduct = Prettify<NestedProduct>
