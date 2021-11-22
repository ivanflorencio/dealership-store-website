import styles from "./CartLink.module.css";
import Image from "next/image";
import Link from "next/link";

import { useCartContext } from "../context/CartContext";
import { useEffect } from "react";

export default function CartLink() {
	//
	const { cart } = useCartContext();

	return (
		<Link href="/cart" passHref>
			<div className={styles.cartLink}>
				<Image src="/cart.svg" alt="Cart" width={30} height={30} />
				{cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
			</div>
		</Link>
	);
}
