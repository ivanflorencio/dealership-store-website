import Product from "./Product";
import Category from "./Category";

//Common configuration
let HttpHeaders = new Headers();
HttpHeaders.set("Authorization", `Basic ${process.env.NEXT_PUBLIC_API_CREDENTIALS}`);

export { Product, Category, HttpHeaders };
