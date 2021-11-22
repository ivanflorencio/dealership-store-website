import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartLink from "./CartLink";
import * as API from "../api";

import styles from "./Header.module.css";
import { useRouter } from "next/router";

export default function Header() {
	//
	const [categoryList, setCategoryList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const router = useRouter();

	useEffect(() => {
		API.Category.getAll().then((data) => {
			setCategoryList(data.results);
		});
	}, []);

	useEffect(() => {
		if (router.asPath.startsWith("/category/")) {
			setSelectedCategory(router.query.id);
		} else if (router.asPath.startsWith("/product/")) {
			setSelectedCategory(100);
		}
	}, [router]);

	return (
		<header className={styles.mainHeader}>
			<div className={styles.title}>
				<figure className={styles.logo}>
					<Link href="/">
						<a>
							<Image src="/logo.svg" alt="Dealership Online" width={50} height={50} />
						</a>
					</Link>
				</figure>
				<h1>
					<Link href="/">
						<a>
							Dealership <span>Online</span>
						</a>
					</Link>
				</h1>
				<CartLink />
			</div>
			<div className={styles.navigation}>
				<ul>
					<li className={selectedCategory ? "" : styles.active}>
						<Link href="/">Home</Link>
					</li>
					{categoryList.map((category) => (
						<li key={category.id} className={Number(selectedCategory) === category.id ? styles.active : ""}>
							<Link href={`/category/${category.id}`}>{category.name}</Link>
						</li>
					))}
				</ul>
				<ul>
					<li>
						<Link href="/login">Login</Link>
					</li>
				</ul>
			</div>
		</header>
	);
}
