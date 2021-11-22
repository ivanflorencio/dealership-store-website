/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import Breadcrumbs from "../../src/components/Breadcrumbs";
import styles from "./Cart.module.css";
import { useCartContext } from "../context/CartContext";
import { useState } from "react";

export default function Cart() {
	//
	const { cart, addCartItem, removeCartItem } = useCartContext();
	const [breadcrumbsItems, setBreadcrumbsItems] = useState([
		{ href: "/", title: "Home" },
		{ href: "/cart/", title: "Cart" },
	]);

	function resumeCart() {
		return (
			<tr>
				<th colSpan={3} style={{ textAlign: "right" }}>
					Total
				</th>
				<th style={{ textAlign: "center" }}>{cart.reduce((acc, item) => acc + item.quantity, 0)}</th>
				<th>${Number(cart.reduce((acc, curr) => (acc += Number(curr.product.price * curr.quantity)), 0.0)).toLocaleString()}.00</th>
				<th style={{ padding: "5px" }}>
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
					{resumeCart()}
					{cart.map((item) => (
						<tr key={item.product.id}>
							<td>
								<img src={item.product.image} className={styles.image} alt="Dealership Online" />
							</td>
							<td>
								<strong>{item.product.name}</strong>
								<br />
								<Link href={`/product/${item.product.id}`} key={item.product.id} passHref>
									<a>view product »</a>
								</Link>
							</td>
							<td>
								<small>{item.product.category.name}</small>
							</td>
							<td style={{ width: "100px", textAlign: "center" }}>
								{item.quantity}
								<br />
								<button onClick={() => addCartItem(item.product, +1)}>+</button>
								<button onClick={() => addCartItem(item.product, -1)}>-</button>
							</td>
							<td style={{ textAlign: "right" }}>${Number(item.product.price).toLocaleString()}.00</td>
							<td>
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
