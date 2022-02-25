import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import loadable from './component/Common/loader/loadable';
import Loading from './component/Common/loader';
import pMinDelay from 'p-min-delay';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

// All Page Lazy Import
const ShopTwo = loadable(() => pMinDelay(import ('./page/shop/shop-two'), 250), { fallback: <Loading />});
const ShopList = loadable(() => pMinDelay(import ('./page/shop/shop-list'), 250), { fallback: <Loading />});
const ShopLeftSideBar = loadable(() => pMinDelay(import ('./page/shop/shop-left-sidebar'), 250), { fallback: <Loading />});
const ShopRightSideBar = loadable(() => pMinDelay(import ('./page/shop/shop-right-sidebar'), 250), { fallback: <Loading />});
const ProductDetails = loadable(() => pMinDelay(import ('./page/product/index'), 250), { fallback: <Loading />});
const ProductDetailsTwos = loadable(() => pMinDelay(import ('./page/product/product-details-two'), 250), { fallback: <Loading />});
const Cart = loadable(() => pMinDelay(import ('./page/cart/index'), 250), { fallback: <Loading />});
const CartTwo = loadable(() => pMinDelay(import ('./page/cart/cart-two'), 250), { fallback: <Loading />});
const EmptyCarts = loadable(() => pMinDelay(import ('./page/cart/empty-cart'), 250), { fallback: <Loading />});
const CheckoutOne = loadable(() => pMinDelay(import ('./page/checkout/index'), 250), { fallback: <Loading />});
const CheckoutTwos = loadable(() => pMinDelay(import ('./page/checkout/checkout-two'), 250), { fallback: <Loading />});
const WishLists = loadable(() => pMinDelay(import ('./page/shop/wishList'), 250), { fallback: <Loading />});
const About = loadable(() => pMinDelay(import ('./page/about'), 250), { fallback: <Loading />});
const Bags = loadable(() => pMinDelay(import ('./page/bags'), 250), { fallback: <Loading />});
const Accessories = loadable(() => pMinDelay(import ('./page/accessories'), 250), { fallback: <Loading />});
const Women = loadable(() => pMinDelay(import ('./page/women/women'), 250), { fallback: <Loading />});
const WomenBelts = loadable(() => pMinDelay(import ('./page/women/women-belts'), 250), { fallback: <Loading />});
const Womenshoes = loadable(() => pMinDelay(import ('./page/women/women-shoes'), 250), { fallback: <Loading />});
const Men = loadable(() => pMinDelay(import ('./page/men/men'), 250), { fallback: <Loading />});
const MenBeltts = loadable(() => pMinDelay(import ('./page/men/men-belts'), 250), { fallback: <Loading />});
const Menshoes = loadable(() => pMinDelay(import ('./page/men/men-shoes'), 250), { fallback: <Loading />});
const OrderComplete = loadable(() => pMinDelay(import ('./page/order/order-complete'), 250), { fallback: <Loading />});
const OrderTracking = loadable(() => pMinDelay(import ('./page/order/order-tracking'), 250), { fallback: <Loading />});
const ProductHover = loadable(() => pMinDelay(import ('./page/product/product-hover'), 250), { fallback: <Loading />});
const OrderSuccesses = loadable(() => pMinDelay(import ('./page/order/order-success'), 250), { fallback: <Loading />});
const EmailTemplateOnes = loadable(() => pMinDelay(import ('./page/email/index'), 250), { fallback: <Loading />});
const EmailTemplateTwos = loadable(() => pMinDelay(import ('./page/email/email-template-two'), 250), { fallback: <Loading />});
const EmailTemplateThrees = loadable(() => pMinDelay(import ('./page/email/email-template-three'), 250), { fallback: <Loading />});
const InvoiceOne = loadable(() => pMinDelay(import ('./page/invoice/index'), 250), { fallback: <Loading />});
const InvoiceTwo = loadable(() => pMinDelay(import ('./page/invoice/invoice-two'), 250), { fallback: <Loading />});
const LookBooks = loadable(() => pMinDelay(import ('./page/shop/look-book'), 250), { fallback: <Loading />});
const BlogGridThrees = loadable(() => pMinDelay(import ('./page/blog/blog-grid-two'), 250), { fallback: <Loading />});
const BlogGridTwos = loadable(() => pMinDelay(import ('./page/blog/'), 250), { fallback: <Loading />});
const BlogListView = loadable(() => pMinDelay(import ('./page/blog/blog-list'), 250), { fallback: <Loading />});
const BlogSingleOnes = loadable(() => pMinDelay(import ('./page/blog/blog-single-one'), 250), { fallback: <Loading />});
const BlogSingleTwos = loadable(() => pMinDelay(import ('./page/blog/blog-single-two'), 250), { fallback: <Loading />});
const AllProducts = loadable(() => pMinDelay (import ('./page/vendor/all-products'), 250), { fallback: <Loading />});
const AllOrders = loadable(() => pMinDelay (import ('./page/vendor/all-order'), 250), { fallback: <Loading />});
const AllCategorys = loadable(() => pMinDelay (import ('./page/vendor/all-category'), 250), { fallback: <Loading />});
const AllProdSizes = loadable(() => pMinDelay (import ('./page/vendor/all-size'), 250), { fallback: <Loading />});
const AddProducts = loadable(() => pMinDelay(import ('./page/vendor/add-products'), 250), { fallback: <Loading />});
const AddCategorys = loadable(() => pMinDelay(import ('./page/vendor/add-category'), 250), { fallback: <Loading />});
const AddCategorySizes = loadable(() => pMinDelay(import ('./page/vendor/add-size'), 250), { fallback: <Loading />});
const CustomerOrder = loadable(() => pMinDelay(import ('./page/my-account/customer-order'), 250), { fallback: <Loading />});
const CustomerAccountDetails = loadable(() => pMinDelay(import ('./page/my-account/customer-account-details'), 250), { fallback: <Loading />});
const AccountEdit = loadable(() => pMinDelay(import ('./page/vendor/account-edit'), 250), { fallback: <Loading />});
const Login = loadable(() => pMinDelay(import ('./page/login'), 250), { fallback: <Loading />});
const Register = loadable(() => pMinDelay(import ('./page/register'), 250), { fallback: <Loading />});
const Error = loadable(() => pMinDelay(import ('./page/error'), 250), { fallback: <Loading />});
const PrivacyPolicy = loadable(() => pMinDelay(import ('./page/privacy-policy'), 250), { fallback: <Loading />});
const Faqs = loadable(() => pMinDelay(import ('./page/faqs'), 250), { fallback: <Loading />});
const ComingSoon = loadable(() => pMinDelay(import ('./page/coming-soon'), 250), { fallback: <Loading />});
const ContactOne = loadable(() => pMinDelay(import ('./page/contact'), 250), { fallback: <Loading />});
const ScrollToTop = loadable(() => pMinDelay(import ('./component/Common/ScrollToTop'), 250), { fallback: <Loading />});
const Fashion = loadable(() => pMinDelay(import ('./page/'), 250), { fallback: <Loading />});
const MyAccounts = loadable(() => pMinDelay(import ('./page/my-account'), 250), { fallback: <Loading />});
const Furniture = loadable(() => pMinDelay(import ('./page/furniture'), 250), { fallback: <Loading />});
const Electronics = loadable(() => pMinDelay(import ('./page/electronics'), 250), { fallback: <Loading />});
const ShopGrid = loadable(() => pMinDelay(import ('./page/shop'), 250), { fallback: <Loading />});
const Compares = loadable(() => pMinDelay(import ('./page/shop/compares'), 250), { fallback: <Loading />});
const Womenboots = loadable(() => pMinDelay(import ('./page/women/women-boots'), 250), { fallback: <Loading />});
const MenBootts = loadable(() => pMinDelay(import ('./page/men/men-boots'), 250), { fallback: <Loading />});
const Vendor = loadable(() => pMinDelay(import ('./page/vendor/'), 250), { fallback: <Loading />});
const VendorProfile = loadable(() => pMinDelay (import ('./page/vendor/vendor-profile'), 250), { fallback: <Loading />});
const VendorSetting = loadable(() => pMinDelay(import ('./page/vendor/vendor-setting'), 250), { fallback: <Loading />});
const CustomerDownloads = loadable(() => pMinDelay(import ('./page/my-account/customer-downloads'), 250), { fallback: <Loading />});
const CustomerAddress = loadable(() => pMinDelay(import ('./page/my-account/customer-address'), 250), { fallback: <Loading />});
const ContactTwo = loadable(() => pMinDelay(import ('./page/contact/contact-two'), 250), { fallback: <Loading />});

const App = () => {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user.user);

  useEffect(() => {
    const userId = Cookies.get('user_id');
    if(userId) {
      axios.post(process.env.REACT_APP_BACKEND_URL + "/loggedInUser", {userId})
      .then(res => {
        if(!res.data.error) {
          dispatch({ type: "user/login", user: res.data.data });
        }
      })
      .catch( e => {
        console.log(e)
      })
    }
    
    // Get product sizes
    axios.get(process.env.REACT_APP_BACKEND_URL + '/product-size').then(res => {
      dispatch({ type: "products/sizes", sizes: res.data.sizes });
    })
    .catch(err => {
      console.log('err', err)
    });

    axios.get(process.env.REACT_APP_BACKEND_URL + `/getAllOrders`).then(res => {
      if(res.status === 200) {
          let orders = res.data.orders;
          let products = res.data.products;
          for(let i = 0; i < orders.length; i++) {
              orders[i].products = [];
              for(let j = 0; j < products.length; j++) {
                  if(products[j].orderId === orders[i].id) {
                      orders[i].products.push(products[j]);
                  }
              }
          }
          dispatch({ type: "user/getAllOrders", payload: {orders} });
        }
    })
    .catch(err => {
      console.log('err', err)
    });
  }, [])

  useEffect(() => {
    const userId = user.id;
      axios.get(process.env.REACT_APP_BACKEND_URL + '/product').then(res => {
        if(res.status === 200) {
            dispatch({ type: "products/getProducts", products: res.data.products });
            const products = res.data.products;

            if(userId) {
                axios.get(process.env.REACT_APP_BACKEND_URL + `/wishlist?userId=${userId}`)
                .then(res => {
                    let wishlist = res.data.wishlist;
                    dispatch({ type: "products/getUserFav", wishlist: wishlist, products: products });
                })
                .catch( e => {
                    console.log(e)
                })
      
                axios.get(process.env.REACT_APP_BACKEND_URL + `/cart?userId=${userId}`)
                .then(res => {
                    let cart = res.data.cart;
                    dispatch({ type: "products/getUserCart", cart: cart, products: products });
                })
                .catch( e => {
                    console.log(e)
                })
    
                axios.get(process.env.REACT_APP_BACKEND_URL + `/getUserOrders?userId=${userId}`).then(res => {
                  if(res.status === 200) {
                      let orders = res.data.orders;
                      let products = res.data.products;
                      for(let i = 0; i < orders.length; i++) {
                          orders[i].products = [];
                          for(let j = 0; j < products.length; j++) {
                              if(products[j].orderId === orders[i].id) {
                                  orders[i].products.push(products[j]);
                              }
                          }
                      }
                      dispatch({ type: "user/getUserOrders", payload: {orders} });
                  }
                })
                .catch(err => {
                  console.log('err', err)
                });
            }
        }
      })
      .catch(err => {
          console.log('err')
      });
  }, [user])

  return (
    <>
      <BrowserRouter>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route path='/' exact component={Fashion} />
            <Route path='/shop' exact component={ShopLeftSideBar} />
            <Route path='/shopTwo' exact component={ShopTwo} />
            <Route path='/shoplist' exact component={ShopList} />
            <Route path='/shop-left-bar' exact component={ShopLeftSideBar} />
            <Route path='/shop-right-bar' exact component={ShopRightSideBar} />
            <Route path='/product-details-one/:id' exact component={ProductDetails} />
            <Route path='/product-details-two/:id' exact component={ProductDetailsTwos} />
            <Route path='/cart' exact component={Cart} />
            <Route path='/cartTwo' exact component={CartTwo} />
            <Route path='/empty-cart' exact component={EmptyCarts} />
            <Route path='/checkout' exact component={CheckoutOne} />
            <Route path='/checkout-two' exact component={CheckoutTwos} />
            <Route path='/wishlist' exact component={WishLists} />
            <Route path='/order-complete' exact component={OrderComplete} />
            <Route path='/order-tracking' exact component={OrderTracking} />
            <Route path='/about' exact component={About} />
            <Route path='/bags' exact component={Bags} />
            <Route path='/accessories' exact component={Accessories} />
            <Route path='/women' exact component={Women} />
            <Route path='/women-belts' exact component={WomenBelts} />
            <Route path='/women-shoes' exact component={Womenshoes} />
            <Route path='/men' exact component={Men} />
            <Route path='/men-belts' exact component={MenBeltts} />
            <Route path='/men-shoes' exact component={Menshoes} />
            <Route path='/product-hover' exact component={ProductHover} />
            <Route path='/order-success' exact component={OrderSuccesses} />
            <Route path='/email-template-one' exact component={EmailTemplateOnes} />
            <Route path='/email-template-two' exact component={EmailTemplateTwos} />
            <Route path='/email-template-three' exact component={EmailTemplateThrees} />
            <Route path='/invoice-one' exact component={InvoiceOne} />
            <Route path='/invoice-two' exact component={InvoiceTwo} />
            <Route path='/lookbooks' exact component={LookBooks} />
            <Route path='/blog-grid-three' exact component={BlogGridThrees} />
            <Route path='/blog-grid-two' exact component={BlogGridTwos} />
            <Route path='/blog-list-view' exact component={BlogListView} />
            <Route path='/blog-single-one' exact component={BlogSingleOnes} />
            <Route path='/blog-single-two' exact component={BlogSingleTwos} />
            <Route path='/vendor/all-products' exact component={AllProducts} />
            <Route path='/vendor/all-category' exact component={AllCategorys} />
            <Route path='/vendor/all-size' exact component={AllProdSizes} />
            <Route path='/vendor/all-order' exact component={AllOrders} />
            <Route path='/vendor/add-products' exact component={AddProducts} />
            <Route path='/vendor/add-category' exact component={AddCategorys} />
            <Route path='/vendor/add-size' exact component={AddCategorySizes} /> 
            <Route path='/my-account/customer-order' exact component={CustomerOrder} />
            <Route path='/my-account/customer-account-details' exact component={CustomerAccountDetails} />
            <Route path='/account-edit' exact component={AccountEdit} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/privacy-policy' exact component={PrivacyPolicy} />
            <Route path='/faqs' exact component={Faqs} />
            <Route path='/coming-soon' exact component={ComingSoon} />
            <Route path='/contact' exact component={ContactOne} />
            <Route exact component={Error} />
            {/* <Route path='/furniture' exact component={Furniture} />
            <Route path='/electronics' exact component={Electronics} />
            <Route path='/shop' exact component={ShopGrid} />
            <Route path='/compare' exact component={Compares} />
            <Route path='/women-boots' exact component={Womenboots} />
            <Route path='/men-boots' exact component={MenBootts} />
            <Route path='/vendor-dashboard' exact component={Vendor} />
            <Route path='/vendor/vendor-profile' exact component={VendorProfile} />
            <Route path='/vendor/vendor-setting' exact component={VendorSetting} />
            <Route path='/my-account' exact component={MyAccounts} />
            <Route path='/my-account/customer-download' exact component={CustomerDownloads} />
            <Route path='/my-account/customer-address' exact component={CustomerAddress} />
            <Route path='/contact-two' exact component={ContactTwo} /> */}
          </Switch>
        </Router>
      </BrowserRouter>

    </>
  );
}

export default App;