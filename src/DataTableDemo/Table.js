import { useEffect, useRef } from "react";
import DataTable from "react-data-table-component";

const Table = ({ columns, data, onProductClick, onNextPage }) => {
  const tableRef = useRef();
  const stopScrollDetection = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      stopScrollDetection.current = false;
    }, 2000);
  }, [data]);

  useEffect(() => {
    const container = tableRef.current;

    const scrollElement = container.querySelector(".my-table");
    scrollElement.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [tableRef]);

  const handleScroll = () => {
    const container = tableRef.current;

    const scrollElement = container.querySelector(".my-table");

    const bottom =
      scrollElement.scrollTop + scrollElement.clientHeight >=
      scrollElement.scrollHeight - 100;
    console.log("bottom===>", bottom);

    if (bottom && stopScrollDetection.current === false) {
      stopScrollDetection.current = true;
      onNextPage();
    }
  };

  return (
    <div ref={tableRef}>
      <DataTable
        className="my-table"
        fixedHeader={true}
        columns={columns}
        data={data}
        onRowClicked={onProductClick}
      />
    </div>
  );
};
export default Table;
