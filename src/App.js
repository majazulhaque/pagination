import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    console.log(data);
    if (data && data?.products) {
      setProducts(data.products);
      setTotalPage(Math.ceil(data?.total / 10));
    }
  };

  console.log(totalPage);

  const selectPage = (num) => {
    console.log(num);
    if (num < 1 || num > 20) return;
    setPage(num);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      {products?.length > 0 && (
        <div className="products">
          {products?.map((prod) => {
            return (
              <span key={prod.id} className="products__single">
                <img
                  className="products__img"
                  src={prod.thumbnail}
                  alt={`product-img-${prod.id}`}
                />
                <span className="products__title">{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={`pagination__prev ${page <= 1 ? "disable__btn" : ""}`}
            onClick={() => selectPage(page - 1)}
          >
            prev
          </span>
          <span className="pagination__opts">
            {[...Array(totalPage)].map((_, i) => {
              return (
                <span
                  key={i}
                  className={`pagination__number ${
                    page === i + 1 ? "selected__page" : ""
                  }`}
                  onClick={(e) => selectPage(i + 1)}
                >
                  {i + 1}
                </span>
              );
            })}
          </span>
          <span
            className={`pagination__next ${page >= 20 ? "disable__btn" : ""}`}
            onClick={() => selectPage(page + 1)}
          >
            next
          </span>
        </div>
      )}
    </div>
  );
}
