import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product.service';
import { Image } from '../../../shared/models/Image';
import { Product } from '../../../shared/models/Product';
import { read } from 'fs';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { floor, random } from 'mathjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [NgbModalConfig, NgbModal],
})
export class ProductComponent {
  
  model: Product = new Product();
  images: Image[] = [];
  thumbnail: Image = new Image();
  products: Product[] = [];

  constructor(config: NgbModalConfig,
		private modalService: NgbModal,
    private productServices: ProductService,) {
      config.backdrop = 'static';
		  config.keyboard = false;
      this.resetForm();
      this.loadData();
  }
  

  loadData() {
    this.products = [];
    this.productServices.getThumbnail().subscribe(res => {
      this.products = res;
      // for (let i = 0; i < this.products.length; i++) {
      //   this.productServices.getImage(this.products[i].imageUrl).subscribe(res => {
      //     this.products[i].imageHTML = res.img;
      //   });
      // }
    });
  }


  submitForm() {
    // Handle form submission logic here, e.g., sending data to backend
    // this.productService.uploadImage(this.images);
    this.images.push(this.thumbnail);

    this.images.forEach(image => {
      this.model.imgUrls!.push(image.name);
    });

    this.productServices.uploadProduct(this.model, this.images);

    // Reset form after submission
    this.resetForm();
    // this.router.navigate(['/admin/product']);
  }

  getRandomNumber(): number {
    // Generate a random number between 0 and 50 (inclusive)
    const randomNumber = floor(random() * 51);
  
    // Scale the random number by 0.1 to get a step of 0.1
    const scaledNumber = randomNumber * 0.1;
  
    return scaledNumber;
  }

  resetForm() {
    this.model = new Product();
    this.model.stock = 1;
    this.model.price = 0;
    this.model.star = this.getRandomNumber();

    this.images = [];
    this.thumbnail = new Image();
  }

  handleImageChange(event: any) {
    
    if(!(event.target.files && event.target.files.length > 0)) return; 
    
    this.images = [];
    let files = event.target.files;
    
    Object.keys(files).forEach((key) => {
      let reader = new FileReader();
      let file: File = files[key];

      reader.onload = () => {
        if (reader.result) {
          let image = new Image();

          image.name = file.name.toString();
          image.type = file.type;
          image.data = reader.result.toString();
          image.id = this.model.id
          
          this.images.push(image);
          // this.formData.images.push(data);
        }
      };

      reader.readAsDataURL(file);
    })
  }

  addThumbToFilename(filename: string): string {
    const extension = filename.split('.').pop(); // Get the file extension
    const baseFilename = filename.replace(`.${extension}`, ''); // Remove the extension
    const newFilename = `${baseFilename}_thumb.${extension}`; // Add "_thumb" and reattach the extension
    return newFilename;
  }

  handleImageChangeThumbnail(event: any) {
    
    if(!(event.target.files && event.target.files.length > 0)) return; 
    
    this.thumbnail = new Image();
    let file = event.target.files[0];

    let reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        this.thumbnail.name = this.addThumbToFilename(file.name);
        this.thumbnail.type = file.type;
        this.thumbnail.data = reader.result.toString();
        this.thumbnail.id = this.model.id
      }
    };

    reader.readAsDataURL(file);

    console.log(this.thumbnail);
  }

  open(content: any) {
		this.modalService.open(content);
	}

  deleteProduct(product: Product) {
    this.productServices.deleteProduct(product.id);
  }
}
