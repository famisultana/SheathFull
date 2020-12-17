import {combineReducers} from 'redux';

var cart = {
  items: [],
  totalItems: '',
  totalPrice: 0,
};

const cartReducer = (state = cart, {type, payload}) => {
  if (payload) {
    var {...rest} = payload;
    switch (type) {
      case 'ADD_ITEM':
        const existingItem = state.items.find((item) => item.id == rest.id);
        if (existingItem) {
          existingItem.quantity += 1;
          const obj = {
            ...state,

            totalPrice: state.totalPrice + formatPrice(rest.price),
          };
          return obj;
        } else {
          const obj = {
            ...state,
            items: [...state.items, {...rest, quantity: 1}],

            totalPrice: state.totalPrice + formatPrice(rest.price),
          };
          return obj;
        }

      case 'DELETE_ITEM':
        const item = state.items.find((item) => item.id == payload.id);
        if (item) {
          if (item.quantity == 1) {
            const arr = state.items.filter((item) => item.id !== payload.id);
            const obj = {
              ...state,
              items: arr,

              totalPrice: state.totalPrice - formatPrice(rest.price),
            };
            return obj;
          } else {
            item.quantity -= 1;
            const obj = {
              ...state,

              totalPrice: state.totalPrice - formatPrice(rest.price),
            };
            return obj;
          }
        }

      case 'EMPTY_CART':
        return cart;
    }
  }
  return state;
};

const formatPrice = (price) => {
  var formatted_price = parseFloat(price);
  formatted_price = formatted_price.toFixed(2);
  return parseFloat(formatted_price);
};

export default combineReducers({
  cartReducer,
});
