export const addItem=(item)=>{
    return {
        type:'ADD_ITEM',
        payload:item
    }
}

export const deleteItem=(item)=>{
   
    return {
        type:'DELETE_ITEM',
        payload:item
    }
}

export const emptyCart=()=>{
    return{
        type:'EMPTY_CART',
        payload:{}
    }
}
