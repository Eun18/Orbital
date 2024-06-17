import React from "react";
import Navbar from "../GLOBAL/components/Navbar";
import image from "../GLOBAL/assets/images.png";
import "./ProductDetail.css";
import { FaRegHeart } from "react-icons/fa";

function ProductDetail() {
  return (
    <>
      <Navbar />
      <br />
      <div className="product-info">
        <img src={image} alt="recco1" />
        <div className="product-details">
          <h4> Item </h4>
          <p> abc </p>
          <br />
          <h4> Condition </h4>
          <p> abc </p>
          <br />
          <h4> Price </h4>
          <p> abc </p>
          <br />
          <h4> Description </h4>
          <p> abc </p>
          <br />
          <h4> Meet-Up Location </h4>
          <p> abc </p>
          <br />
          <h4> Seller </h4>
          <p> abc </p>
          <br />
          <button> Chat with Seller </button>
          <button>
            {" "}
            <FaRegHeart />{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export { ProductDetail };
