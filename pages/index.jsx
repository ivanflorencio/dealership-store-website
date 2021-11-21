import Head from "next/head";
import Image from "next/image";
import Header from "../src/components/Header";
import ProductList from "../src/components/ProductList";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Dealership Online - Home</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<Header />

			<main className={styles.main}>
				<ProductList />
			</main>
		</div>
	);
}
