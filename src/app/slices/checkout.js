import {createSlice} from "@reduxjs/toolkit";

// Checkout Slice
const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        billingInfo: {
          name: '',
          surname: '',
          email: '',
          number: '',
          address: '',
          Additionalnotes: '',
        },
        paymentMethod: 'cash'
    },
    reducers: {
      billingInfoChange: (state, action) => {
        state.billingInfo = {...state.billingInfo, [action.payload.type]: action.payload.val}
      },
      paymentTypeChange: (state, action) => {
        state.paymentMethod = action.payload.val;
      }
    }
})

const checkoutReducer = checkoutSlice.reducer
export default checkoutReducer
