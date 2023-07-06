const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.data._id !== action.itemID),
      };

    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
