import React, {useEffect, useState, useContext} from "react";
import{useParams, Link, useNavigate} from 'react-router-dom';
import {db,auth} from '../../config/firebase';
import "../styles/ProductDetail.css";
import { FaRegHeart } from "react-icons/fa";
import { doc, getDoc } from 'firebase/firestore';
import { ChatContext } from '../chats/ChatContext';

export default function ProductDetail() {
  const {productID} = useParams();
  const [product, setProduct] = useState(null);
  const {checkChatroom} = useContext(ChatContext);
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async() => {
      try {
        const docRef = doc(db, "Products", productID);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists){
          setProduct(docSnapshot.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("error fetching product:", error);
      }
    };
    
    fetchProduct();
  }, [productID]);

  const handleChatClick = async (otherUserId) => {
    try {
      const currentUser = auth.currentUser; 
      if (!currentUser) {
        throw new Error("User is not logged in.");
      }
  
      const currentUseruid = currentUser.uid;
      const chatroomId = await checkChatroom(currentUseruid, otherUserId); 
      navigate(`/chat/${chatroomId}`);
    } catch (error) {
      console.error("Error handling chat click:", error);
    }
  };

  if (!product){
    return <div>Loading...</div>;
  }


  return (
    <>
      <br />
      <div className="product-info">
        <img src={product.productImage} alt="Image Not Available" />
        <div className="product-details">
          <h4> Item </h4>
          <p> {product.productName} </p>
          <br />
          <h4> Condition </h4>
          <p> {product.productCondition} </p>
          <br />
          <h4> Price </h4>
          <p> {product.productPrice} </p>
          <br />
          <h4> Description </h4>
          <p> {product.productDescription} </p>
          <br />
          <h4> Meet-Up Location </h4>
          <p> {product.productLocation} </p>
          <br />
          <h4> Seller </h4>
          <p> {product.sellerUserName} </p>
          <br />
          <button onClick={() => handleChatClick(product.sellerId)}>Chat with seller</button>
          <Link to="/"><FaRegHeart /></Link>
        </div>
      </div>
    </>
  );
}
