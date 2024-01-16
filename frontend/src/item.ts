export interface Item {

    id: number;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    description: string;
    star: number;
    brand?: string; 
    stock: number;
    time: Date;
    quantity: number,

}

export interface Comment {
    id: string;      // Mã duy nhất của bình luận
    username: string; // Tên người bình luận
    text: string;    // Nội dung bình luận
  }

export interface ShoppingCartItem extends Item {
    addedToCartQuantity: number;
}