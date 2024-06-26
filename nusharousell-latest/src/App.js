import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import UserProvider from './screens/GLOBAL/contexts/UserContext';
// import ProductsProvider from './screens/GLOBAL/contexts/ProductsContext';
import Homepage from './screens/homepage/Homepage';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import AddProduct from './screens/sell/AddProduct';
import ProductDetail from './screens/productpage/ProductDetail';
import Profile from './screens/profile/Profile';
import EditProfile from './screens/profile/EditProfile';
import {ProductsContextProvider} from './screens/GLOBAL/components/ProductsContext';
import {ChatContextProvider} from './screens/chats/ChatContext';
import ChatLayout from "./screens/chats/ChatLayout";
import ChatPage from "./screens/chats/ChatPage";
import { ProductsProvider } from './screens/GLOBAL/contexts/ProductsContext';
import { UserProvider } from './screens/GLOBAL/contexts/UserContext';


export default function App() {
	const [product, setProduct] = useState([]);
	/* *******SEARCHING PRODUCT********
  const searchproduct = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };
  */

	return (
		<Router>
			<div className='App'>
				<ProductsContextProvider>
					<ChatContextProvider>
						<UserProvider>
							<ProductsProvider>
								<Routes>
									<Route
										path='/'
										element={<Homepage/>}
									/>
									<Route
										path='/login'
										element={<Login />}
									/>
									<Route
										path='/signup'
										element={<Signup />}
									/>
									<Route
										path='/addproduct'
										element={
											<AddProduct/>
										}
									/>
									<Route
										path='/productdetail/:productID'
										element={<ProductDetail
												product={product}
												setProduct={setProduct} 
											/>
										}
									/>
									<Route path="/chat" element={<ChatLayout />}>
										<Route path="" element={<div className="no-chat-selected">Please select a chat to start messaging</div>} />
										<Route path=":chatroomId" element={<ChatPage />} />
									</Route>

									<Route
										path='/profile'
										element={
											<Profile/>
										}
									/>
									<Route
										path='/profile/edit'
										element={
											<EditProfile/>
										}
									/>
									<Route
										path='*'
										element={<h1>Error 404: Your Mother Not Found</h1>}
									/>
								</Routes>
							</ProductsProvider>
						</UserProvider>
					</ChatContextProvider>
				</ProductsContextProvider>
			</div>
		</Router>
	);
}
