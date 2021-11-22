import { useContext, createContext } from "react";

export const CartContext = createContext();

const actions = {
	ADD_PRODUCT: "ADD_PRODUCT",
	REMOVE_PRODUCT: "REMOVE_PRODUCT",
};

export const CartReducer = (state, action) => {
	let newState = [...state];
	switch (action.type) {
		//ADD_PRODUCT
		case actions.ADD_PRODUCT:
			const { product, quantity } = action.payload;
			const productIndex = newState.findIndex((item) => item.product && item.product.id === product.id);
			if (productIndex === -1) {
				newState.push({ product, quantity });
			} else {
				newState[productIndex] = { quantity: newState[productIndex].quantity + quantity, product };
				if (newState[productIndex].quantity === 0) {
					newState = newState.filter((item) => item.product.id !== product.id);
				}
			}
			localStorage.setItem("cart", JSON.stringify(newState));
			return newState;
		//REMOVE_PRODUCT
		case actions.REMOVE_PRODUCT:
			newState = newState.filter((item) => item.product.id !== action.payload);
			localStorage.setItem("cart", JSON.stringify(newState));
			return newState;
		default:
			return newState;
	}
};

export const useCartContext = () => {
	//
	const { state, dispatch } = useContext(CartContext);

	const addCartItem = (product, quantity) =>
		dispatch({
			type: actions.ADD_PRODUCT,
			payload: { product, quantity },
		});

	const removeCartItem = (id) =>
		dispatch({
			type: actions.REMOVE_PRODUCT,
			payload: id,
		});

	const cart = state;

	return {
		cart,
		addCartItem,
		removeCartItem,
	};
};
