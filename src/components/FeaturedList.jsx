/* eslint-disable @next/next/no-img-element */
import next from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import styles from "./FeaturedList.module.css";

export default function FeaturedList({ featuredList }) {
	//
	const currentProductIndex = useRef(0);
	const timer = useRef(null);
	const [currentProduct, setCurrentProduct] = useState(featuredList[currentProductIndex.current]);

	useEffect(() => {
		if (featuredList) {
			setCurrentProduct(featuredList[currentProductIndex.current]);
			timer.current = setInterval(() => {
				if (currentProductIndex.current === featuredList.length - 1) currentProductIndex.current = 0;
				else currentProductIndex.current++;
				setCurrentProduct(featuredList[currentProductIndex.current]);
			}, 2000);
		}
		return () => clearTimeout(timer.current);
	}, [featuredList, currentProductIndex, setCurrentProduct]);

	function selectProduct(index) {
		clearTimeout(timer.current);
		currentProductIndex.current = index;
		setCurrentProduct(featuredList[currentProductIndex.current]);
	}

	return (
		<div className={styles.productList}>
			{currentProduct && (
				<Link href={`/product/${currentProduct.id}`} passHref>
					<a>
						<div className={`${styles.card} ${styles.featured}`}>
							<img src={currentProduct.image} className={styles.image} alt="Dealership Online" />
							<div>
								<h2>
									<small>{currentProduct.category.name}</small>
									{currentProduct.name}
								</h2>
							</div>
							<p>
								<small>$</small>
								{Number(currentProduct.price).toLocaleString()}
							</p>
						</div>
					</a>
				</Link>
			)}
			<div className={styles.navigation}>
				{featuredList.map((product, index) => (
					<a href="#" onClick={() => selectProduct(index)} key={product.id} className={`${currentProduct && currentProduct.id === product.id ? styles.selected : ""}`}>
						&nbsp;
					</a>
				))}
			</div>
		</div>
	);
}
