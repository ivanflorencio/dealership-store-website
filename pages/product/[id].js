import Head from "next/head";
import Header from "../../src/components/Header";
import ProductDetail from "../../src/components/ProductDetail";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { useState } from "react";

export default function ProductDetailPage() {
	//
	const router = useRouter();

	return (
		<div className={styles.container}>
			<Head>
				<title>Dealership Online - Product</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<Header />

			<main className={styles.main}>
				<ProductDetail product={router.query.id} />
			</main>
		</div>
	);
}
