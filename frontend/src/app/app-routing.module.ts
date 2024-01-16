import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ForgotPassComponent } from './components/pages/forgot-pass/forgot-pass.component';
import { AccountComponent } from './components/pages/account/account.component';
import { CategoryComponent } from './components/partials/category/category.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { PolicyComponent } from './components/pages/policy/policy.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { DesignByYouComponent } from './components/pages/design-by-you/design-by-you.component';
import { IndexComponent } from './components/partials/index/index.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogAdComponent } from './components/admin/blog-ad/blog-ad.component';
import { CustomerComponent } from './components/admin/customer/customer.component';
import { DiscountComponent } from './components/admin/discount/discount.component';
import { OrderComponent } from './components/admin/order/order.component';
import { ProductComponent } from './components/admin/product/product.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProductListComponent } from './components/pages/product-list/product-list.component';
import { Blogdetail1Component } from './components/pages/blogdetail1/blogdetail1.component';
import { Blogdetail2Component } from './components/pages/blogdetail2/blogdetail2.component';
import { Blogdetail3Component } from './components/pages/blogdetail3/blogdetail3.component';
import { Blogdetail4Component } from './components/pages/blogdetail4/blogdetail4.component';
import { Blogdetail5Component } from './components/pages/blogdetail5/blogdetail5.component';
import { Blogdetail6Component } from './components/pages/blogdetail6/blogdetail6.component';


const routes: Routes = [
  {
    path: '', component:IndexComponent,
    children: [
      {path: '', component:HomeComponent},
      {path: 'productDetail/:productName', component:ProductDetailComponent},
      {path: 'login', component:LoginComponent},
      {path: 'signup', component:SignupComponent},
      {path: 'forget-pass', component:ForgotPassComponent},
      {path: 'search/:searchTerm', component:HomeComponent},
      {path: 'productDetail/:productId', component:ProductDetailComponent},
      {path: 'account', component:AccountComponent},
      {path: 'catagory/:catagoryName', component: CategoryComponent},
      {path: 'faq', component:FaqComponent},
      {path: 'policy', component:PolicyComponent},
      {path: 'blog', component:BlogComponent},
      {path: 'aboutus', component: AboutUsComponent},
      {path: 'aboutus', component: AboutUsComponent},
      {path: 'cart', component: CartComponent},
      {path: 'product', component: ProductListComponent},
      {path: 'blog1', component: Blogdetail1Component},
      {path: 'blog2', component: Blogdetail2Component},
      {path: 'blog3', component: Blogdetail3Component},
      {path: 'blog4', component: Blogdetail4Component},
      {path: 'blog5', component: Blogdetail5Component},
      {path: 'blog6', component: Blogdetail6Component},

    ]
  },
  {path: 'design-by-you', component: DesignByYouComponent},
  {path: 'admin', component: AdminComponent,
      children: [
        {path: 'admin', component: AdminComponent},
        {path: 'blogad', component: BlogAdComponent},
        {path: 'customer', component: CustomerComponent},
        {path: 'discount', component: DiscountComponent},
        {path: 'order', component: OrderComponent},
        {path: 'product', component: ProductComponent},
        {path: 'dashboard', component: DashboardComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
