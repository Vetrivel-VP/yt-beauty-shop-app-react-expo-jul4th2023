export const addtocart = (data) => {
  return {
    type: "ADD_TO_CART",
    item: data,
  };
};

export const removeFromCart = (_id) => {
  return {
    type: "REMOVE_FROM_CART",
    itemID: _id,
  };
};

export const emptycart = () => {
  return {
    type: "EMPTY_CART",
  };
};
