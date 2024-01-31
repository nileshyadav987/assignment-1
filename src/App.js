import logo from './logo.svg';
import './App.css';
import Table from './DataTableDemo/Table';
import BarGraph from './DataTableDemo/BarGraph';
import { useEffect, useRef, useState } from 'react';

function App() {

  const limit = 50;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const stopScrollDetection = useRef(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dataCopyRef = useRef([]);

  const columns = [
    {
      name: "#",
      selector: (row) => (
        <input
          type="checkbox"
          checked={Boolean(row?.checked)}
          onChange={() => onProductClick(row)}
        />
      ),
    },
    {
      name: "Title",
      selector: (row, index) => Number(index + 1) + ". " + row.title,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Discounted Price",
      selector: (row) =>
        Math.round(row.price - (row.price * row.discountPercentage) / 100),
    },
  ];

  useEffect(() => {
    getProducts();
  }, [page]);

  useEffect(() => {
    const r = dataCopyRef.current.filter((v) =>
      v.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(r);
  }, [searchTerm]);

  const getProducts = async () => {
    try {
      const req = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`
      );
      const r = await req.json();
      // console.log("r===>", r.products);
      let temp = r.products;
      if (page === 1) {
        temp = temp.map((item, index) => ({
          ...item,
          checked: index < 5 ? true : false,
        }));
      }
      setData((prev) => {
        dataCopyRef.current = [...prev, ...temp];
        return [...prev, ...temp];
      });
    } catch (error) {
      console.error("error===>", error);
    }
  };

  const onProductClick = (row) => {
    console.log("row===>", row);
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const onNextPage = () => {
    setPage((prev) => prev + 1);
  };

  console.log("page===>", page, data.length);


  return (
    <div className="App">
      <div className="search">
        <input
          className="search-input"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={"Search"}
        />
      </div>
      <div className="table-container">
        <div className="table-wrapper">
          <Table
            holdScroll
            columns={columns}
            data={data}
            onProductClick={onProductClick}
            onNextPage={onNextPage}
          />
        </div>
        <BarGraph data={data.filter((item) => item.checked)} />
      </div>
    </div>
  );
}

export default App;
