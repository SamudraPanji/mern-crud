import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/products/${id}`
        );
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        console.error(error);
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5500/products/${id}`, {
        name: name,
        price: parseInt(price),
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={updateProduct} className="my-10">
        <div className="flex flex-col">
          {/* Input Product Name */}
          <div className="mb-5">
            <label className="font-bold text-slate-700">Product Name</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          {/* / Input Product Name */}

          {/* Input Price */}
          <div className="mb-5">
            <label className="font-bold text-slate-700">Price</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          {/* / Input Price */}

          {/* Button Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 border-indigo-500 hover:shadow rounded rounded-lg shadow-md"
          >
            Update
          </button>
          {/* / Button Submit */}
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
