import { useReducer } from "react";
import { CartContext, CartReducer } from "../src/context/CartContext";

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

	return (
		<CartContext.Provider value={{ state: cartState, dispatch: cartDispatch }}>
			<Component {...pageProps} />
		</CartContext.Provider>
	);
}

export default App;
