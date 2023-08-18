export interface Orders {
  total: number,
  numero: string,
  fechaCreacion: string,
  id_creador: string,
  //adicional
  nombre: string,
  idOrder: string,
  detalles?:DetallesOrders,

  // year: number,
  // month: string,
  yearMonthDate: string


}

export interface DetallesOrders {
  cantidad: number,
  total: number,
  producto: DetailProduct,
}

export interface DetailProduct {

  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number,
  file?: File;
  enable?: boolean;
  id?: string;
  img: string;
  tipo: string;

}

export interface OrderListUser {
  total: number,
  numero: string,
  fechaCreacion: string,
  id_creador: string,
  nombre: string,

  detalle?:DetallesOrders,
  yearMonthDate: string
}

export interface OrderData {
  cantidad: number,
  id_creador: string,
  total: number,
  detalles: [],
  //
  id: string,
  descripcion: string,
  precio: number,
  tipo: string,
  img: string,

}


export interface Product {

  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number,
  file?: File;
  enable?: boolean;
  id?: string;
  img: string;
  tipo: string;

}

