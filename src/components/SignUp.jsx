/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import Breadcrumbs from "../../src/components/Breadcrumbs";
import styles from "./Login.module.css";
import { useCartContext } from "../context/CartContext";
import { useState } from "react";

export default function SignUp() {
	//
	const { cart, addCartItem, removeCartItem } = useCartContext();
	const [breadcrumbsItems, setBreadcrumbsItems] = useState([
		{ href: "/", title: "Home" },
		{ href: "/signup", title: "Sign Up" },
	]);

	return <div className={styles.login}>{breadcrumbsItems && <Breadcrumbs items={breadcrumbsItems} />}</div>;
}
