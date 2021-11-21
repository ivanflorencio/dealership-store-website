import styles from "./Breadcrumbs.module.css";
export default function Breadcrumbs({ items }) {
	return (
		<div className={styles.breadcrumbs}>
			{items.map((item, i) => (
				<a href={item.href} key={i}>
					{item.title}
				</a>
			))}
		</div>
	);
}
