export interface newArticule{
  cantidad: number,
  precio: number,
  description: string;
  fotografia: string;
}

export interface newCarrito{
  idArticulo: number;
  cantidad: number;

}

export interface updateArticuloCarrito{
  cantidad: number;
  idArticulo: number;
  idCarrito: number;
  operacion: string;
}
