/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import * as API from "../api";
import { useCartContext } from "../context/CartContext";
import { useCategoryContext } from "../context/CategoryContext";

import styles from "./ProductDetail.module.css";

export default function ProductDetail({ product }) {
	//
	const [productInfo, setProductInfo] = useState(null);
	const [addedItems, setAddedItems] = useState(null);
	const [zoomedPhoto, setZoomedPhoto] = useState(null);
	const [breadcrumbsItems, setBreadcrumbsItems] = useState(null);
	const { addCartItem, cart } = useCartContext();
	const { chooseCategory } = useCategoryContext();

	useEffect(() => {
		if (product) {
			API.Product.getById(Number(product)).then((data) => {
				setProductInfo(data);
				const chosenCategory = data.category;
				chooseCategory(chosenCategory.id);
				setBreadcrumbsItems([
					{ href: "/", title: "Home" },
					{ href: "/category/" + data.category.id, title: data.category.name },
					{ href: "/product/" + data.id, title: data.name },
				]);
			});
		}
	}, [product]);

	useEffect(() => {
		if (product && cart) {
			const thisProduct = cart.find((i) => i.product.id === Number(product));
			if (thisProduct) setAddedItems(thisProduct.quantity);
		}
	}, [cart, product]);

	function zoomPhoto(image) {
		setZoomedPhoto(image);
	}

	return (
		productInfo && (
			<>
				{zoomedPhoto && (
					<dialog open className={styles.zoomedPhoto} onClick={() => setZoomedPhoto(null)}>
						<img src={productInfo.image} alt="Dealership Online" />
					</dialog>
				)}
				{breadcrumbsItems && <Breadcrumbs items={breadcrumbsItems} />}
				<div className={styles.productDetail}>
					<figure onClick={() => zoomPhoto(productInfo.image)}>
						<img src={productInfo.image} className={styles.image} alt="Dealership Online" />
					</figure>
					<div className={styles.info}>
						<h1>
							<small>{productInfo.category.name}</small>
							<br />
							{productInfo.name}
						</h1>
						<strong className={styles.price}>
							<small>$</small>
							{Number(productInfo.price).toLocaleString()}
						</strong>
						<div className={styles.buy}>
							<input ame="quantity" type="number" min="1" max="10" defaultValue="1" />
							<button onClick={() => addCartItem(productInfo, 1)}>Add to cart</button>
							{addedItems && (
								<Link href="/cart" passHref>
									<small>
										{addedItems} item{addedItems > 1 ? "s" : ""} added
										<br />
										<br />
										Go to cart »
									</small>
								</Link>
							)}
						</div>
						<h3>Additional Information</h3>
						{productInfo.description.split("\n").map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</div>
				</div>
			</>
		)
	);
}
