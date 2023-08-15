export interface Product {

    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number,
    file?: File;
    enable?: boolean;
    id: string;
    img: string;
    tipo: string;

}


export interface ProductList {

    content: Product[];
    last: boolean;
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;


}
