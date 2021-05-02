import { ACTIONS } from './Actions';

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.CLOSE_CART:
      return {
        ...state,
        isCartOpen: false,
      };
    case ACTIONS.OPEN_CART:
      return {
        ...state,
        isCartOpen: true,
      };
    case ACTIONS.ADD_ITEM_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case ACTIONS.REMOVE_ITEM_FROM_CART:
      const newItems = state.cart.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        cart: newItems,
      };

    default:
      return state;
  }
};

export default reducers;
