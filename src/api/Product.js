import { HttpHeaders } from ".";

export default class Product {
	static async getAll() {
		const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", { method: "GET", headers: HttpHeaders });
		return await res.json();
	}
	static async getById(id) {
		const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products/" + id, { method: "GET", headers: HttpHeaders });
		return await res.json();
	}
}
