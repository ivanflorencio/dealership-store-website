import Head from "next/head";
import Header from "../../src/components/Header";
import Cart from "../../src/components/Cart";
import styles from "../../styles/Home.module.css";

export default function CartPage() {
	//
	return (
		<div className={styles.container}>
			<Head>
				<title>Dealership Online - Product</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<Header />

			<main className={styles.main}>
				<Cart></Cart>
			</main>
		</div>
	);
}
