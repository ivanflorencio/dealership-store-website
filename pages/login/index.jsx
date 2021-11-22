import Head from "next/head";
import Header from "../../src/components/Header";
import Login from "../../src/components/Login";
import styles from "../../styles/Home.module.css";

export default function LoginPage() {
	//
	return (
		<div className={styles.container}>
			<Head>
				<title>Dealership Online - Login</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<Header />

			<main className={styles.main}>
				<Login></Login>
			</main>
		</div>
	);
}
