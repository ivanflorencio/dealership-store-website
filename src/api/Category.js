import { HttpHeaders } from ".";

export default class Category {
	static async getAll() {
		const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", { method: "GET", headers: HttpHeaders });
		return await res.json();
	}
}
