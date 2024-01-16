import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCT_IMAGE_DELETE_URL, PRODUCT_IMAGE_URL, PRODUCT_DELETE_URL, PRODUCT_UPLOAD_PRODUCT_URL, PRODUCT_UPLOAD_IMAGE_URL, PRODUCTS_URL, PRODUCT_BY_CATE_URL, PRODUCT_BY_ID_URL, PRODUCT_BY_SEARCH_URL, THUMB_BY_ID_URL, THUMB_URL } from '../shared/constants/urls';
import { Image } from '../shared/models/Image';
import { ToastrService } from 'ngx-toastr';
import { HTTP_FILE_EXISTS } from '../../../../backend/src/constants/http_status';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,
    private toastrService: ToastrService) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  getThumbnail(): Observable<Product[]> {
    return this.http.get<Product[]>(THUMB_URL);
  }

  getDetail(id: string):Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_BY_ID_URL + id);
  }

  getProductThumbnail(id: string): Observable<Product> {
    return this.http.get<Product>(THUMB_BY_ID_URL + id);
  }

  getAllProductsBySearchTerm(searchTerm: string){
    return this.http.get<Product[]>(PRODUCT_BY_SEARCH_URL + searchTerm);
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_BY_CATE_URL + category);
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  deleteImage(id: string, fileNames: string[]) {
    var success = true;

    for(let fileName of fileNames) {
      this.http.get(PRODUCT_IMAGE_DELETE_URL + fileName).subscribe(
        res => {},
        err => {
          success = false;

          this.toastrService.error(
            err.error,
            `Xoá ảnh ` + fileName + ` thất bại`,
          );
        }
      )
    }

    return success;
  }

  getImage(fileName: string): Observable<any> {
    return this.http.get(PRODUCT_IMAGE_URL + fileName);
  }

  deleteOnlyProduct(id: string) {
    this.http.get(PRODUCT_DELETE_URL + id).subscribe(
      res => {
        this.toastrService.success(
          `Xoá sản phẩm ` + id + ` thành công`,
        );
      },
      err => {
        this.toastrService.error(
          err.error,
          `Xoá sản phẩm ` + id + ` thất bại`,
        );
      }
    )
  }

  deleteProduct(id: string) {
    let products;

    this.getDetail(id).subscribe(
      res => {
        products = res;

        var success = true;

        var fileNames = products.map(product => product.imageUrl);

        if (this.deleteImage(id, fileNames)) {
          this.deleteOnlyProduct(id);
        }
        
      },
      err => {
        this.toastrService.error(
          err.error,
          `Xoá sản phẩm ` + id + ` thất bại`,
        );
      }
    )
  }

  uploadImage(images: Image[]) {
    console.log('Upload image');

    var success = true;

    for (let image of images) {
      const formData = new FormData();
      const file = this.DataURIToBlob(image.data)

      formData.append('file', file, image.name);

      this.http.post(PRODUCT_UPLOAD_IMAGE_URL, formData)
      .subscribe(
        res => { success = true; },
        err => {

        }
      );
    }

    return success;
  }

  uploadProduct(product: Product, images: Image[]) {
    var success = false;

    if (images.length == 0) {
      this.toastrService.error(
        "Hãy chọn ảnh cho sản phẩm",
        `Thêm sản phảm thất bại`
        
      );

      return;
    }
    
    console.log('Upload product');
    this.http
    .post(PRODUCT_UPLOAD_PRODUCT_URL, product)
    .subscribe(
      res => {
        if(this.uploadImage(images)) {
          this.toastrService.success(
            `Thêm sản phẩm ` + product.id + ` thành công`,
          );
        } else {
          this.deleteOnlyProduct(product.id);
          this.toastrService.error(
            `Thêm sản phảm thất bại`
          );
        }
      },
      err => {
        this.toastrService.error(
          err.error,
          `Thêm sản phẩm thất bại`
        );
      }
    );
  }
}