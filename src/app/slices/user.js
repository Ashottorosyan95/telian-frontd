import {createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

// User Slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: false,
        user: {},
        userOrders: [],
        allOrders: [],
    },
    reducers: {
        // Login
        login: (state, action) => {
            state.status = true;
            state.user = {
                id: action.user.id,
                name: action.user.username,
                role: action.user.type === 0 ? 'customer' : 'admin',
                email: action.user.email,
                avatar: action.user.avatar
            };
            Cookies.set('user_id', action.user.id);
        },
        // Register
        register: (state, action) => {
            let { user, email, pass } = action.payload;
            state.status = true
            state.user = {
                name: user,
                role: 'customer',
                email: email
            }
        },
        // Logout
        logout: (state) => {
            state.status = false;
            state.user = {};
            Cookies.remove('user_id');
        },
        getUserOrders: (state, action) => {
            state.userOrders = action.payload.orders;
        },
        getAllOrders: (state, action) => {
            state.allOrders = action.payload.orders;
        },
    }
})

const userReducer = userSlice.reducer
export default userReducer
