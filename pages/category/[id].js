import Head from "next/head";
import Header from "../../src/components/Header";
import ProductList from "../../src/components/ProductList";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

export default function CategoryDetail() {
	//
	const router = useRouter();

	return (
		<div className={styles.container}>
			<Head>
				<title>Dealership Online - Home</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<Header />

			<main className={styles.main}>
				<ProductList category={router.query.id} />
			</main>
		</div>
	);
}
