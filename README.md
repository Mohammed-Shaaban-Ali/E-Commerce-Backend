It seems like I can’t do more advanced data analysis right now. Please try again later.

However, you can manually create the README file by copying the provided content into a file named `README.md` on your local machine. Here is the content you need:

```markdown
# E-Commerce API Documentation

This project is a comprehensive e-commerce platform with a robust backend supporting various functionalities. Below are the detailed routes and features for each module in the project.

## Authentication

- **Register User**
  ```http
  POST /api/user/register
  ```

- **Login User**
  ```http
  POST /api/user/login
  ```

- **Admin Login**
  ```http
  POST /api/user/admin-login
  ```

- **Update Password**
  ```http
  PUT /api/user/password
  ```

- **Get All Users**
  ```http
  GET /api/user/all-users
  ```

- **Forgot Password Token**
  ```http
  POST /api/user/forgot-password-token
  ```

- **Refresh Token**
  ```http
  GET /api/user/refresh
  ```

- **Reset Password**
  ```http
  PUT /api/user/reset-password/:token
  ```

- **Logout User**
  ```http
  GET /api/user/logout
  ```

- **Get Wishlist**
  ```http
  GET /api/user/wishlist
  ```

- **Save Address**
  ```http
  PUT /api/user/save-address
  ```

- **Empty Cart**
  ```http
  DELETE /api/user/empty-cart
  ```

- **Manage Cart**
  ```http
  GET /api/user/cart
  POST /api/user/cart
  ```

- **Month Wise Order Income**
  ```http
  GET /api/user/getMonthWiseOrderIncom
  ```

- **Yearly Total Orders**
  ```http
  GET /api/user/getYearsTotalOrders
  ```

- **Checkout**
  ```http
  POST /api/user/order/checkout
  ```

- **Payment Verification**
  ```http
  POST /api/user/order/paymentVerification
  ```

- **Remove Cart Item**
  ```http
  DELETE /api/user/remove-cart/:id
  ```

- **Update Cart Item Quantity**
  ```http
  PUT /api/user/updateCartItem/:newQuantity/:cartItemId
  ```

- **Apply Coupon**
  ```http
  POST /api/user/cart/applaycoupon
  ```

- **Create Order**
  ```http
  POST /api/user/cart/create-order
  ```

- **Get My Orders**
  ```http
  GET /api/user/cart/myorder
  ```

- **Get All Orders**
  ```http
  GET /api/user/cart/get-all-orders
  ```

- **Get Single Order**
  ```http
  GET /api/user/cart/getsingleOrder/:id
  ```

- **Update Order**
  ```http
  PUT /api/user/cart/updateOrder/:id
  ```

- **Block User**
  ```http
  PUT /api/user/bloch-user/:id
  ```

- **Unblock User**
  ```http
  PUT /api/user/unbloch-user/:id
  ```

- **Manage User**
  ```http
  GET /api/user/
  DELETE /api/user/
  PUT /api/user/
  ```

## Blog Category

- **Blog Categories**
  ```http
  GET /api/blog-category/
  POST /api/blog-category/
  ```

- **Single Blog Category**
  ```http
  GET /api/blog-category/:id
  PUT /api/blog-category/:id
  DELETE /api/blog-category/:id
  ```

## Blog

- **Blogs**
  ```http
  GET /api/blog/
  POST /api/blog/
  ```

- **Upload Blog Image**
  ```http
  PUT /api/blog/upload/:id
  ```

- **Like Blog**
  ```http
  PUT /api/blog/likes
  ```

- **Dislike Blog**
  ```http
  PUT /api/blog/dis-likes
  ```

- **Single Blog**
  ```http
  GET /api/blog/:id
  PUT /api/blog/:id
  DELETE /api/blog/:id
  ```

## Brand Category

- **Brand Categories**
  ```http
  GET /api/brand-category/
  POST /api/brand-category/
  ```

- **Single Brand Category**
  ```http
  GET /api/brand-category/:id
  PUT /api/brand-category/:id
  DELETE /api/brand-category/:id
  ```

## Color

- **Colors**
  ```http
  GET /api/color/
  POST /api/color/
  ```

- **Single Color**
  ```http
  GET /api/color/:id
  PUT /api/color/:id
  DELETE /api/color/:id
  ```

## Coupon

- **Coupons**
  ```http
  GET /api/coupon/
  POST /api/coupon/
  ```

- **Single Coupon**
  ```http
  GET /api/coupon/:id
  PUT /api/coupon/:id
  DELETE /api/coupon/:id
  ```

## Enquiry

- **Enquiries**
  ```http
  GET /api/enquiry/
  POST /api/enquiry/
  ```

- **Single Enquiry**
  ```http
  GET /api/enquiry/:id
  PUT /api/enquiry/:id
  DELETE /api/enquiry/:id
  ```

## Product Category

- **Product Categories**
  ```http
  GET /api/product-category/
  POST /api/product-category/
  ```

- **Single Product Category**
  ```http
  GET /api/product-category/:id
  PUT /api/product-category/:id
  DELETE /api/product-category/:id
  ```

## Product

- **Products**
  ```http
  GET /api/product/
  POST /api/product/
  ```

- **Wishlist**
  ```http
  PUT /api/product/wishlist
  ```

- **Rating**
  ```http
  PUT /api/product/rating
  ```

- **Single Product**
  ```http
  GET /api/product/:id
  PUT /api/product/:id
  DELETE /api/product/:id
  ```

## Upload

- **Upload Image**
  ```http
  POST /api/upload/
  ```

- **Delete Image**
  ```http
  DELETE /api/upload/delete-image/:id
  ```
