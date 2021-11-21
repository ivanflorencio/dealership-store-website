import styles from "./CartLink.module.css";
import Image from "next/image";

export default function CartLink() {
	return (
		<div className={styles.cartLink}>
			<Image src="/cart.svg" alt="Cart" width={30} height={30} />
			<span className={styles.badge}>{0}</span>
		</div>
	);
}
