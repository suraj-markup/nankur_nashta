import { createSlice } from "@reduxjs/toolkit";

const cartSlice =createSlice({
    name: 'cart',

    initialState: {
        items:[],
    },

    reducers: {
        addItems: (state, action)=>{

            //Vanila(older) redux => Don't mutate the state, returning was necessary
            //const newState=[...oldState]
            //newState.items.push(action.paylaod);
            //return newState; 

            //new redux toolkit uses immer library to solve the problem of not mutating the state.
            //and in the newer version it is still following the original implementation internally behind the scenes
            //mutating the state here
            state.items.push(action.payload);
        },

        removeItems: (state)=>{
            state.items.pop();
        },

        clearCart: (state)=>{
            state.items.length = 0;
        }
    }
});

export const {addItems,removeItems,clearCart} = cartSlice.actions;

export default cartSlice.reducer;