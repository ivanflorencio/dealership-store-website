/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";

import Breadcrumbs from "../../src/components/Breadcrumbs";
import { useCartContext } from "../context/CartContext";
import styles from "./Cart.module.css";

export default function Cart() {
	//
	const { cart, addCartItem, removeCartItem } = useCartContext();
	const [breadcrumbsItems] = useState([
		{ href: "/", title: "Home" },
		{ href: "/cart/", title: "Cart" },
	]);

	function resumeCart() {
		return (
			<tr>
				<th colSpan={3} className="tx-center">
					Total
				</th>
				<th className="tx-center">{cart.reduce((acc, item) => acc + item.quantity, 0)}</th>
				<th>${Number(cart.reduce((acc, curr) => (acc += Number(curr.product.price * curr.quantity)), 0.0)).toLocaleString()}.00</th>
				<th className="p5">
					<button className={styles.buy}>Buy »</button>
				</th>
			</tr>
		);
	}

	return (
		<div className={styles.cart}>
			{breadcrumbsItems && <Breadcrumbs items={breadcrumbsItems} />}
			{cart.length === 0 && <h2>Your Cart is empty</h2>}
			{cart.length > 0 && (
				<table>
					{cart.length > 5 && resumeCart()}
					{cart.map((item) => (
						<tr key={item.product.id}>
							<td>
								<img src={item.product.image} className={styles.image} alt={item.product.name} />
							</td>
							<td>
								<strong>{item.product.name}</strong>
								<br />
								<Link href={`/product/${item.product.id}`} key={item.product.id} passHref>
									<a>
										<small>view product »</small>
									</a>
								</Link>
							</td>
							<td>
								<small>{item.product.category.name}</small>
							</td>
							<td className="tx-center w100">
								{item.quantity}
								<br />
								<button onClick={() => addCartItem(item.product, +1)}>+</button>
								<button onClick={() => addCartItem(item.product, -1)}>-</button>
							</td>
							<td className="tx-right">${Number(item.product.price).toLocaleString()}.00</td>
							<td className="tx-center">
								<button onClick={() => removeCartItem(item.product.id)}>Remove</button>
							</td>
						</tr>
					))}
					{resumeCart()}
				</table>
			)}
		</div>
	);
}
