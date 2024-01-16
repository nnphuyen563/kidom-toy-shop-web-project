import { Component } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  categories = [
    { label: 'Đồ chơi ngoài trời', value: 'ĐỒ CHƠI NGOÀI TRỜI' },
    { label: 'Búp bê - Gấu bông', value: 'BÚP BÊ - GẤU BÔNG' },
    { label: 'Thủ công - Mỹ thuật', value: 'THỦ CÔNG - MỸ THUẬT' },
    { label: 'Hoá trang', value: 'HÓA TRANG' },
    { label: 'Thể thao', value: 'THỂ THAO' },
    { label: 'Trí tuệ', value: 'TRÒ CHƠI TRÍ TUỆ' },
  ];
  brands: string[] = [];
  selectedCategory: string = ''; // Initial selected category
  filteredProducts: Product[] = [];
  selectedBrand: string = '';
  showBrandDropdown: boolean = false;
  showCategoryDropdown: boolean = false;
  toggleCategoryDropdown(): void {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }
  toggleBrandDropdown(): void {
    this.showBrandDropdown = !this.showBrandDropdown;
  }

  constructor(
    private productServices: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {
    this.productServices.getThumbnail().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = this.products;
      this.brands = Array.from(
        new Set(this.products.map((product) => product.brand || ''))
      );

      this.applyFilters();
    });
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams
    .subscribe((params) => {
      const categoryName = params['category'];
      if (categoryName) {
        this.onCategoryChange(categoryName);
      }
    });

    this.activatedRoute.params
    .subscribe((params) => {
      if (params.searchTerm) {

        this.productServices
          .getAllProductsBySearchTerm(params.searchTerm)
          .subscribe((searchResults: Product[]) => {
            this.filteredProducts = searchResults;

            this.applyFilters();
          });
      } else {
        this.filteredProducts = this.products;
      }
    });
  }

  addToCart(product: Product) {
    //Thêm để check
    console.log('Adding to Cart:', product);
    // Gọi hàm addToCart từ CartService để thêm sản phẩm vào giỏ hàng
    this.cartService.addToCart(product);
  }
  onCategoryChange(categoryValue: string): void {
    this.selectedCategory = categoryValue;
    this.applyFilters();
  }

  onBrandChange(brandValue: string): void {
    this.selectedBrand = brandValue;
    this.applyFilters();
  }

  applyFilters(): void {
    if (this.selectedCategory && this.selectedBrand) {
      // Nếu cả thể loại và thương hiệu được chọn, áp dụng cả hai bộ lọc
      this.filteredProducts = this.products.filter(
        (product) =>
          product.category === this.selectedCategory &&
          product.brand === this.selectedBrand
      );
    } else if (this.selectedCategory) {
      // Nếu chỉ có thể loại được chọn, áp dụng bộ lọc theo thể loại
      this.filteredProducts = this.products.filter(
        (product) => product.category === this.selectedCategory
      );
    } else if (this.selectedBrand) {
      // Nếu chỉ có thương hiệu được chọn, áp dụng bộ lọc theo thương hiệu
      this.filteredProducts = this.products.filter(
        (product) => product.brand === this.selectedBrand
      );
    } else {
      // Nếu không có sự lựa chọn nào, hiển thị tất cả sản phẩm
      this.filteredProducts = this.products;
    }

    for (let i = 0; i < this.filteredProducts.length; i++) {
      this.productServices
        .getImage(this.filteredProducts[i].imageUrl)
        .subscribe((res) => {
          this.filteredProducts[i].imageHTML = res.img;
        });
    }
  }
  clearCategoryFilter(): void {
    this.selectedCategory = '';
    this.applyFilters();
  }

  clearBrandFilter(): void {
    this.selectedBrand = '';
    this.applyFilters();
  }
}
