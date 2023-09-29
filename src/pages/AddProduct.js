import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CustomInput } from "../components/CustomInput";
import Dropzone from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import { dellImages, uploadImages } from "../features/upload/uploadSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct, resetState } from "../features/product/productSlice";

let userSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  Price: Yup.number().required("Description is Required"),
});

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setimages] = useState();
  const dispatch = useDispatch();

  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoding } =
    newProduct;

  useEffect(() => {
    if (isSuccess && newProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Somthing want wrong!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoding, isError, isSuccess]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.images = img;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      Price: "",
      category: "",
      images: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      formik.resetForm();
      setimages(null);
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/product-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <CustomInput
          type="text"
          label="Enter Product Title"
          name="title"
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          val={formik.values.title}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <div>
          <CustomInput
            theme="snow"
            label="Enter Product Price"
            name="Price"
            onChange={formik.handleChange("Price")}
            value={formik.values.Price}
          />
        </div>
        <div className="error">
          {formik.touched.Price && formik.errors.Price}
        </div>
        <div className="error">
          {formik.touched.category && formik.errors.category}
        </div>
        <div className="bg-white border-1 p-5 text-center">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImages(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="showimage d-flex flex-wrap gap-3">
          {imgState?.map((i, j) => {
            return (
              <div className="position-relative " key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(dellImages(i.public_id))}
                  className="btn-close position-absolute"
                  style={{
                    top: "10px",
                    right: "10px",
                    backgroundColor: "white",
                  }}
                ></button>
                <img src={i.url} alt="" width={200} height={200}></img>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-success border-0 rounde-3 my-5"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
