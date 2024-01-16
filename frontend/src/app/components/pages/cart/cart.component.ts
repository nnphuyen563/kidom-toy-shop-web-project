import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Item } from '../../../../item';
import { User } from '../../../../user';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Product } from '../../../shared/models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;
  promotion: any = '';
  userInfo: User | any;
  guestInfo: any = {}; // Đặt giá trị mặc định là một đối tượng trống
  isLoggedIn: boolean = false;
  paymentHandler: any = null;
  discountAmount: number = 0;


  stripeTest!: FormGroup;

  createToken(): void {
  }

  constructor(
    private cartService: CartService,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
    this.initConfig((this.total - this.discountAmount) / 25000);



  }

  private initConfig(total: any): void {
  
  }


  private calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeFromCart(item: Product) {
    this.cartService.removeFromCart(item);
    this.calculateTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.total = 0;
  }

  updateQuantity(item: Product) {
    this.cartService.updateCartItemQuantity(item);
    this.calculateTotal();
  }

  async checkout() {
    if (this.isLoggedIn && this.userInfo) {
      // Cập nhật thông tin người dùng từ form nhập liệu
      this.userInfo.displayName = this.guestName;
      this.userInfo.email = this.guestEmail;
      this.userInfo.address = this.guestAddress;
      this.userInfo.phone = this.guestPhone;
      if (this.selectedPaymentMethod == 'thẻ tín dụng') {
        alert("Thanh toán thành công");
        this.resetForm();
        this.clearCart();
      }
    } else {
      this.guestInfo = {
        name: this.guestName,
        email: this.guestEmail,
        address: this.guestAddress,
        phone: this.guestPhone,
      };
      if (this.selectedPaymentMethod == 'tiền mặt') {
        alert("Thanh toán thành công");
        this.resetForm();
        this.clearCart();
      }
      else {
        
      }
    }
  }


  resetForm() {
    // Reset giá trị của guestInfo về một đối tượng trống
    this.guestInfo = {};

    // Reset form nhập liệu cho guest
    this.guestName = '';
    this.guestEmail = '';
    this.guestAddress = '';
    this.guestPhone = '';
  }

  // Tạo các biến để lưu thông tin nhập liệu của guest thông qua ngModel
  guestName: string = '';
  guestEmail: string = '';
  guestAddress: string = '';
  guestPhone: string = '';
  selectedPaymentMethod: string = '';

  CartNotEmpty(): boolean {
    return this.cartItems.length > 0 && (this.selectedPaymentMethod === 'tiền mặt' || this.selectedPaymentMethod === 'thẻ tín dụng');
  }

}
