import {createSlice} from "@reduxjs/toolkit";
import Swal from "sweetalert2";


// Product Slice
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productCategories: [],
        productSizes: [],
        carts:[],
        favorites: [],
        single:null,
        // compare: ProductData.slice(0,2),
    },
    reducers: {
        // Get All Products
        getProducts: (state, action) => {
            state.products = action.products;
        },
        // Get Single Product
        getProductById: (state, action) => {
            let { id } = action.payload;
            let arr = state.products.find(item => item.id === parseInt(id))
            state.single = arr
        },
        // Add to Cart
        addToCart: (state, action) => {
            let { id, count, selectedSize } = action.payload;

            // Check existance
            let item = state.carts.find(i => i.id === parseInt(id))
            if (item === undefined) {
                // Get Product
                let arr = state.products.find(item => item.id === parseInt(id))
                arr.quantity = count || 1;
                arr.size = selectedSize;
                state.carts.push(arr)
            } else {
                Swal.fire({
                    title: 'Ձախողվեց!',
                    text: 'Այս ապրանքն արդեն ավելացված է ձեր զամբյուղում',
                    icon: 'warning',
                    imageUrl: item.img,
                    imageWidth: 200,
                    imageAlt: item.title,
                    showConfirmButton: false,
                    timer: 5000
                  })
                }
            },
            updateCart: (state, action) =>{
                let { val, id } = action.payload;
                state.carts.forEach(item => {
                    if(item.id === parseInt(id)){
                        item.quantity = val
                    }
                })
    
            },
            // Remove Cart
            removeCart: (state, action) =>{
                let { id } = action.payload;
                let arr = state.carts.filter(item => item.id !== parseInt(id))
                state.carts = arr
                
            },
            // Delete from Compare
            delCompare: (state, action) =>{
                let { id } = action.payload;
                let arr = state.compare.filter(item => item.id !== parseInt(id))
                state.compare = arr
                
            },
            // Clear Cart
            clearCart: (state, action) =>{
                state.carts = []
            },
            getUserFav: (state, action) => {
                action.wishlist.forEach(item => {
                    let arr = action.products.find(i => i.id === item.productId);
                    arr = {...arr, wishlistId: item.id}
                    state.favorites.push(arr);
                })
            },
            getUserCart: (state, action) => {
                action.cart.forEach(item => {
                    let arr = action.products.find(i => i.id === item.productId)
                    arr = {...arr, cartId: item.id, quantity: item.quantity, size: +item.size}
                    state.carts.push(arr);
                })
            },
            // Add to Favorite / Wishlist
            addToFav: (state, action) => {
                let { id } = action.payload;
    
                // Check existance
                let item = state.favorites.find(i => i.id === parseInt(id))
                if (item === undefined) {
                    // Get Product
                    let arr = state.products.find(item => item.id === parseInt(id))
                    arr.quantity = 1
                    state.favorites.push(arr)
                }else{
                      Swal.fire('Ձախողվեց', "Արդեն ավելացված է ցանկությունների ցանկում", 'warning')
                  }
            },
            // Remove from Favorite / Wishlist
            removeFav: (state, action) =>{
                let { id } = action.payload;
                let arr = state.favorites.filter(item => item.id !== id)
                state.favorites = arr
                
            },
            categories: (state, action) => {
                state.productCategories = action.categories;
            },
            sizes: (state, action) => {
                state.productSizes = action.sizes
            },

            
        // Add to Compare
        // addToComp: (state, action) =>{
        //     if (state.compare.length >= 3) {
        //         Swal.fire({
        //             title: 'Failed!',
        //             text: 'Compare List is Full',
        //             icon: 'warning',
        //             showConfirmButton: false,
        //             timer: 2500,
        //           })
        //         return;
        //     }

        //     let { id } = action.payload;

        //     // Check existance
        //     let item = state.compare.find(i => i.id === parseInt(id))
        //     if (item === undefined) {
        //         // Get Product
        //         let arr = state.products.find(item => item.id === parseInt(id))
        //         state.compare.push(arr)
        //         Swal.fire({
        //             title: 'Success!',
        //             text: 'Successfully added to Compare List',
        //             icon: 'success',
        //             showConfirmButton: false,
        //             timer: 2500,
        //           })
        //     }else{
        //             Swal.fire({
        //                 title: 'Failed!',
        //                 text: 'Already Added in Compare List',
        //                 imageUrl: item.img,
        //                 imageWidth: 200,
        //                 imageAlt: item.title,
        //                 showConfirmButton: false,
        //                 timer: 5000,
        //             })
        //       }
        // },
        // Update Cart
    }
})

const productsReducer = productsSlice.reducer
export default productsReducer
