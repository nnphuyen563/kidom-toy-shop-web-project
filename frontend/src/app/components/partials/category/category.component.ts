import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service'; 
import { Product } from '../../../shared/models/Product';
import { CartService } from '../../../services/cart.service';
import { Item } from '../../../../item';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  products: Product[] = [];

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('catagoryName') ?? '';
      this.productService.getProductsByCategory(this.categoryName).subscribe(res => {
        this.products = res;
        for (let i = 0; i < this.products.length; i++) {
          this.productService.getImage(this.products[i].imageUrl).subscribe(res => {
            this.products[i].imageHTML = res.img;
          });
        }
      });
      console.log(this.products);

    });
  }

  sortByPrice(order: 'lowToHigh' | 'highToLow'): void {
    if (order === 'lowToHigh') {
      this.products.sort((a, b) => a.price - b.price);
    } else {
      this.products.sort((a, b) => b.price - a.price);
    }
  }

  addToCart(product: Product) {
    // Gọi hàm addToCart từ CartService để thêm sản phẩm vào giỏ hàng
    this.cartService.addToCart(product);
  }
}
