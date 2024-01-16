import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Catagory } from '../../../shared/models/Catagory';
import { CatagoryService } from '../../../services/catagory.service';
import { CartService} from '../../../services/cart.service';
import { Observable } from 'rxjs';
// import { faStar} from '@fortawesome/free-solid-svg-icons';
import { Item } from '../../../../item';


@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
  
  })
export class ProductDetailComponent implements OnInit {
    products: Product[] = [];
    catagorys: Catagory[] =[];
    categoryName: string = '';
    thumbnail: Product = new Product();
    quantity: number=1;
    relatedProducts: Product[] = [];
    isClicked: boolean = false;
    productsRelated: Product[] = [];
    
  constructor(
    private productService: ProductService,
    private catagoryService: CatagoryService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
  ) {
    this.catagorys= catagoryService.getAll(); 
  }
  toggleHeart() {
    this.isClicked = !this.isClicked;
  }

//chọn số lượng
  increase(){
    this.quantity +=1;
  }
  decrease(){
    if (this.quantity > 1){
        this.quantity -=1;
    }
  }
  handleChange(event: any) { // Xử lý sự kiện khi giá trị thay đổi
    console.log('Quantity changed:', this.quantity);
  }
//------------------------------------------------
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.productService.getDetail(params['id']).subscribe(res => {
        this.products = res;

        for (let i = 0; i < this.products.length; i++) {
          this.productService.getImage(this.products[i].imageUrl).subscribe(res => {
            this.products[i].imageHTML = res.img;
          });
        }
      });

      this.productService.getProductThumbnail(params['id']).subscribe(res => {
        this.thumbnail = res;
        this.productService.getImage(this.thumbnail.imageUrl).subscribe(res => {
          this.thumbnail.imageHTML = res.img;
        });

        this.productService.getProductsByCategory(this.thumbnail.category).subscribe(res => {
          this.productsRelated = res;
          this.productsRelated = this.productsRelated.filter(product => product.id !== this.thumbnail.id);
          for (let i = 0; i < this.productsRelated.length; i++) {
            this.productService.getImage(this.productsRelated[i].imageUrl).subscribe(res => {
              this.productsRelated[i].imageHTML = res.img;
            });
          }
        });
      });

    });
  }

  changeThumbnail(index: number): void {
    let temp = this.thumbnail;

    this.thumbnail = this.products[index];
    this.products = this.products.slice(0, index).concat(this.products.slice(index + 1));
    this.products.push(temp);
  }



  // Gọi hàm addToCart từ CartService để thêm sản phẩm vào giỏ hàng
  addToCart(item: Product) {
    item.quantity = this.quantity;
    this.cartService.addToCart(item);
  }
  buyNow(item: Product) {
    item.quantity = this.quantity;
    this.cartService.addToCart(item);
    //Chuyển qua cart
    this.router.navigate(['/cart']);
  }
  
}
