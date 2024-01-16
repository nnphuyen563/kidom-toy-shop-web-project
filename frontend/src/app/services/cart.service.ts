import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCartItemsFromLocalStorage(); // Load dữ liệu giỏ hàng từ LocalStorage khi khởi tạo service
  }

  private updateLocalStorage() {
    //Thêm để check
    console.log('Updated Cart Items:', this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemCount.next(this.cartItems.reduce((total, item) => total + item.quantity, 0));
  }

  private loadCartItemsFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    console.log('Loaded Cart Items from LocalStorage:', cartData);
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
      this.cartItemCount.next(this.cartItems.reduce((total, item) => total + item.quantity, 0));
    }
  }

  addToCart(item: Product, alert: Boolean = true) {
    this.loadCartItemsFromLocalStorage();
    //Thêm để check
    console.log('Cart Items after loading:', this.cartItems);
    const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const existingItem = this.cartItems[existingItemIndex];
      //Thêm vào check
      console.log('Existing Item:', existingItem);

      existingItem.quantity += item.quantity;
      
      //Thêm vào check
      console.log('Cart Items after updating:', this.cartItems);
    } else {
      //Thêm vào check
      console.log('New Item:', item);
      // Kiểm tra số lượng sản phẩm trong kho trước khi thêm vào giỏ hàng
      if (item.quantity > 0) {
        this.cartItems.push({ ...item, quantity: 1 }); // Thêm vào giỏ hàng với số lượng là 1
      }
      //Thêm vào check
      console.log('Cart Items after adding new item:', this.cartItems);
    }
    if (alert) {
      this.showSuccessToast("Thêm vào giỏ hàng thành công")
    }

    this.updateLocalStorage(); 
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  getCartItems() {
    //Thêm vào check
    console.log('Cart Items:', this.cartItems);
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.updateLocalStorage(); // Cập nhật dữ liệu vào localStorage sau khi thay đổi giỏ hàng
  }

  removeFromCart(item: Product) {
    const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity -= 1; // Giảm số lượng sản phẩm trong giỏ hàng đi 1
      if (this.cartItems[existingItemIndex].quantity <= 0) {
        // Nếu số lượng sản phẩm trong giỏ hàng bằng 0, xoá sản phẩm khỏi giỏ hàng
        this.cartItems.splice(existingItemIndex, 1);
      }
    }

    this.updateLocalStorage(); // Cập nhật dữ liệu vào localStorage sau khi thay đổi giỏ hàng
  }

  updateCartItems(items: Product[]) {
    this.cartItems = items;
    this.updateLocalStorage(); // Cập nhật dữ liệu vào localStorage sau khi thay đổi giỏ hàng
  }

  updateCartItemQuantity(item: Product) {
    // Kiểm tra số lượng mới có hợp lệ (lớn hơn 0) hay không
    if (item.quantity > 0) {
      // Cập nhật số lượng sản phẩm
      const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
      if (cartItem) {
        cartItem.quantity = item.quantity;
      }
      // Cập nhật dữ liệu vào LocalStorage
      this.updateLocalStorage();
    }
  }

  private showSuccessToast(message: string): void {
    alert(message)
  }
}


