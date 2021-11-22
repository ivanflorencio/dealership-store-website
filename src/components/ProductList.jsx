/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import * as API from "../api";
import { useCategoryContext } from "../context/CategoryContext";

import Breadcrumbs from "../../src/components/Breadcrumbs";
import styles from "./ProductList.module.css";
import FeaturedList from "./FeaturedList";

export default function ProductList({ category }) {
	//
	const [productList, setProductListt] = useState([]);
	const [breadcrumbsItems, setBreadcrumbsItems] = useState(null);
	const { chooseCategory } = useCategoryContext();

	useEffect(() => {
		API.Product.getAll().then((data) => {
			if (category) {
				const filteredProducts = data.results.filter((i) => i.category.id === Number(category));
				const chosenCategory = filteredProducts[0]?.category;
				chooseCategory(chosenCategory.id);
				setProductListt(filteredProducts);
				setBreadcrumbsItems([
					{ href: "/", title: "Home" },
					{ href: "/category/" + category, title: chosenCategory.name },
				]);
			} else {
				setProductListt(data.results);
			}
		});
	}, [category]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{breadcrumbsItems && <Breadcrumbs items={breadcrumbsItems} />}
			<div className={styles.productList}>
				<FeaturedList featuredList={productList.filter((i) => i.featured)} />
				{productList.map((product) => (
					<Link href={`/product/${product.id}`} key={product.id} passHref>
						<a>
							<div className={`${styles.card}`}>
								<img src={product.image} className={styles.image} alt="Dealership Online" />
								<div>
									<h2>
										<small>{product.category.name}</small>
										{product.name}
									</h2>
								</div>
								<p>
									<small>$</small>
									{Number(product.price).toLocaleString()}
								</p>
							</div>
						</a>
					</Link>
				))}
			</div>
		</>
	);
}
