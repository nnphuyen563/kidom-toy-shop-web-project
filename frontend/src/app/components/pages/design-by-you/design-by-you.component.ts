import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
declare var addAcc: any;
declare var removeAcc: any;
declare var addName: any;
declare var $: any;
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../shared/models/Product';

// import 'assets/js/design-by-you.js';

@Component({
  selector: 'app-design-by-you',
  templateUrl: './design-by-you.component.html',
  styleUrl: './design-by-you.component.css',
  providers: [NgbModalConfig, NgbModal],
})
export class DesignByYouComponent implements OnInit{

  ngOnInit() {
    $(() => {
      console.log('hello there!');
    });
  }

  //increase/decrease quantitys
  quantity: number = 1; // Initial quantity value

  decrease(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  increase(): void {
    this.quantity += 1;
  }

  handleChange(event: any): void {
    // Handle manual input change if necessary
    const inputVal = event.target.value;
    if (!isNaN(inputVal)) {
      this.quantity = parseInt(inputVal, 10);
    }
  }
  //change bear
  nameBear: string = "Teddy Bear"
  image: any =
    "assets/img/animals/teddy-bear.png";
  id: string = "BEAR";

  teddy() {
      this.nameBear = "Teddy Bear";
      this.image =
        "assets/img/animals/teddy-bear.png";
      this.id = "BEAR";
    }
  rabbit() {
    this.nameBear = "Pink Rabbit";
    this.image =
      "assets/img/animals/rabbit.png";
      this.id = "RABBIT";
  }
  monkey() {
    this.nameBear = "Brown Monkey";
    this.image =
      "assets/img/animals/monkey.png";
      this.id = "MONKEY";
  }

  loadJsFunc() {
    this.onLoadfunc();
    this.onBtnClick();
    this.changeName();
  }

  onLoadfunc() {
    new addAcc();
  }
  onBtnClick(){
    // Call the sayHello() function from hello.js file
    new removeAcc();
  }
  changeName() {
    new addName();
  }
  constructor(private el: ElementRef, private renderer:Renderer2,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private cartService: CartService
    ){
      config.backdrop = 'static';
		  config.keyboard = false;

      this.loadJsFunc();
    }

  ngAfterViewInit(){

  this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', '#FDF0F0');
  }
  order(content: any) {
		this.modalService.open(content);
    this.addToCart();
	}

  addToCart() {
    var data: Product = {
        imageHTML: this.image,
        imageUrl: this.image,
        name: this.nameBear,
        category: 'Design By You',
        price: 450000,
        id: this.id,
        description: 'Description of product 1',
        star: 5,
        stock: 50,
        time: new Date(),
        quantity: this.quantity
    }

    console.log(data);

		this.cartService.addToCart(data, false);
  }

}
