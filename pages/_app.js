import { useReducer } from "react";
import { CartContext, CartReducer } from "../src/context/CartContext";
import { CategoryContext, CategoryReducer } from "../src/context/CategoryContext";

import "../styles/globals.css";

function App({ Component, pageProps }) {
	//
	const initialCartState = [];

	if (typeof window !== "undefined") {
		const storagedCart = localStorage.getItem("cart");
		if (storagedCart) {
			initialCartState = JSON.parse(storagedCart);
		}
	}

	const [cartState, cartDispatch] = useReducer(CartReducer, initialCartState);
	const [categoryState, categoryDispatch] = useReducer(CategoryReducer, []);

	return (
		<CartContext.Provider value={{ state: cartState, dispatch: cartDispatch }}>
			<CategoryContext.Provider value={{ state: categoryState, dispatch: categoryDispatch }}>
				<Component {...pageProps} />
			</CategoryContext.Provider>
		</CartContext.Provider>
	);
}

export default App;
