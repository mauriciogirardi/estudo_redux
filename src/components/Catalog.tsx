import { useEffect, useState } from "react";

import { IProduct } from "../store/modules/cart/types";
import CatalogItem from "./CatalogItem";
import api from "../services/api";

const Catalog = () => {
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    async function fetcherData() {
      try {
        const { status, data } = await api.get("products");

        if (status === 200) {
          setCatalog(data);
        }
      } catch (e) {
        console.error(e);
      }
    }

    fetcherData();
  }, []);

  return (
    <>
      <h1>Catalago</h1>

      {catalog.map((product) => (
        <CatalogItem key={product.id} product={product} />
      ))}
    </>
  );
};

export default Catalog;
