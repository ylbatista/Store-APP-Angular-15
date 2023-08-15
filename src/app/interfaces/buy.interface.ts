export interface OrderItem {
    id: string,
    total: number,
    cantidad: number,
}

export interface OrderList {
    lista: OrderItem,
    token: string,
    total: number,

}
