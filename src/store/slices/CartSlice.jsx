import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart', 
    initialState:{
        cartItem: []
    },
    reducers:{
        addToCart:(state, action)=>{

            const items = action.payload
            const dataExist = state.cartItem.find((i) => i.id === items.id)
            if(dataExist){
                dataExist.quantity +=1;
            }
            else{
                state.cartItem.push({...items, quantity: 1})
            }

        }
    }
})

const {actions, reducer} = CartSlice

export const {addToCart} = actions

export default reducer;