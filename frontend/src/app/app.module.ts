import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { MenuComponent } from './components/partials/menu/menu.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ForgotPassComponent } from './components/pages/forgot-pass/forgot-pass.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { AccountComponent } from './components/pages/account/account.component';
import { PartialsAccountComponent} from './components/partials/account/account.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailComponent } from './components/pages/blog-detail/blog-detail.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CategoryComponent } from './components/partials/category/category.component';
import { StarRatingComponent } from './components/partials/star-rating/star-rating.component';
import { SearchComponent } from './components/partials/search/search.component';
import { DesignByYouComponent } from './components/pages/design-by-you/design-by-you.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { PolicyComponent } from './components/pages/policy/policy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from './components/partials/title/title.component';
// import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleriaModule } from 'primeng/galleria';
import { IndexComponent } from './components/partials/index/index.component';
import { NavComponent } from './components/partials/nav/nav.component';  
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './components/admin/admin.component';
import { ProductComponent } from './components/admin/product/product.component';
import { OrderComponent } from './components/admin/order/order.component';
import { CustomerComponent } from './components/admin/customer/customer.component';
import { DiscountComponent } from './components/admin/discount/discount.component';
import { BlogAdComponent } from './components/admin/blog-ad/blog-ad.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ProductListComponent } from './components/pages/product-list/product-list.component';
import { Blogdetail1Component } from './components/pages/blogdetail1/blogdetail1.component';
import { Blogdetail2Component } from './components/pages/blogdetail2/blogdetail2.component';
import { Blogdetail3Component } from './components/pages/blogdetail3/blogdetail3.component';
import { Blogdetail4Component } from './components/pages/blogdetail4/blogdetail4.component';
import { Blogdetail5Component } from './components/pages/blogdetail5/blogdetail5.component';
import { Blogdetail6Component } from './components/pages/blogdetail6/blogdetail6.component';
import { requestInterceptor } from './shared/interceptors/http-cancelling.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    ProductDetailComponent,
    LoginComponent,
    SignupComponent,
    ForgotPassComponent,
    AboutUsComponent,
    AccountComponent,
    BlogComponent,
    BlogDetailComponent,
    CartComponent,
    CategoryComponent,
    StarRatingComponent,
    SearchComponent,
    DesignByYouComponent,
    FaqComponent,
    PolicyComponent,
    TitleComponent,
    IndexComponent,
    NavComponent,
    PartialsAccountComponent,
    AdminComponent,
    ProductComponent,
    OrderComponent,
    CustomerComponent,
    DiscountComponent,
    BlogAdComponent,
    DashboardComponent,
    ProductListComponent,
    Blogdetail1Component,
    Blogdetail2Component,
    Blogdetail3Component,
    Blogdetail4Component,
    Blogdetail5Component,
    Blogdetail6Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // TabViewModule,
    MatTabsModule,
    BrowserAnimationsModule, 
    MatIconModule,
    GalleriaModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: requestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
