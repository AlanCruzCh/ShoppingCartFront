export interface dataJsonShowArticules {
  content: articule[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any[];
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface dataArticulesRegistered {
  content: articule[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface articule {
  idArticle: number;
  precio: number,
  descripcion: string;
  fotografia: string;
}

export interface DataJSONShowCarrito {
  articulos: Articulos;
  costoTotal: number;
}

export interface Articulos {
  content: ArticulosCarrito[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface ArticulosCarrito {
  idArticulo: number;
  idCarrito: number;
  fotografia: string;
  description: string;
  cantidad: number;
  precio: number;
  costo: number;
}

export interface dataArticulesCarritoRegistered {
  content: ArticulosCarrito[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  costoTotal: number;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

