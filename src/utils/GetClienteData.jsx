import { getXataClient } from "@/lib/xata";

const xata = getXataClient()

export default async function GetCLienteData() {

    const records = await xata.db.db_clientes
  .select(["CLIENTE", "COD", "CIDADE"])
  .getAll();


    return records
}

export async function GetProducts() {
  const products = await xata.db.products.select(["id", "product_name", "img"]).getAll();
  
  const formattedProducts = products.map(product => ({
    id: product.id,
    name: product.product_name,
    img_url: product.img.url
  }));

  return formattedProducts;
}
