/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import * as API from "../api";

import styles from "./ProductDetail.module.css";

export default function ProductDetail({ product }) {
	//
	const [productInfo, setProductInfo] = useState(null);
	const [breadcrumbsItems, setBreadcrumbsItems] = useState(null);

	useEffect(() => {
		if (product) {
			API.Product.getById(Number(product)).then((data) => {
				setProductInfo(data);
				setBreadcrumbsItems([
					{ href: "/", title: "Home" },
					{ href: "/category/" + data.category.id, title: data.category.name },
					{ href: "/product/" + data.id, title: data.name },
				]);
			});
		}
	}, [product]);

	return (
		productInfo && (
			<>
				{breadcrumbsItems && <Breadcrumbs items={breadcrumbsItems} />}
				<div className={styles.productDetail}>
					<h2>
						<small>{productInfo.category.name}</small>
						{productInfo.name}
					</h2>
					<img src={productInfo.image} className={styles.image} alt="Dealership Online" />
					<div>
						<p>{productInfo.description}</p>
					</div>
					<p>
						<small>$</small>
						{Number(productInfo.price).toLocaleString()}
					</p>
				</div>
			</>
		)
	);
}
