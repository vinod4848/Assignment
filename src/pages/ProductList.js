import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproducts, deleteproduct } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const [productId, setProductId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteProduct = (id) => {
    dispatch(deleteproduct(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getproducts());
    }, 100);
  };

  const data1 = productState.map((product, index) => ({
    key: index + 1,
    title: product.title,
    price: product.price,
    action: (
      <>
        <Link to={`/admin/product/${product._id}`} className="fs-3 text-danger">
          <BiEdit />
        </Link>
        <button
          className="ms-2 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(product._id)}
        >
          <MdOutlineDelete />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Product</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this Product"
      />
    </div>
  );
};

export default ProductList;
