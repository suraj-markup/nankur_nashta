import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { CDN_URL } from "../utils/constant";
import { clearCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import GooglePayButton from "@google-pay/button-react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  // console.log(cartItems);
  const dispatch = useDispatch();

  const handleClick=() =>{
    dispatch(clearCart() );

  }
 
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price || item.defaultPrice) / 100;
    }, 0);
  };

  return (
    <div className="mt-4 items-center justify-center h-auto">
      <h1 className="font-bold text-center text-3xl ">Cart</h1>
      {cartItems.length > 0 ? (
        <div >
            <div className="items-center justify-center text-center my-1" >            
            <button onClick={handleClick} className="my-2 p-2 bg-black text-white rounded-lg text-center justify-center items-center active:bg-slate-800"> 
            Clear Cart
            </button>
            </div>
        {cartItems.map((item, idx) => (
         
          <div key={idx} className="my-4 mx-auto w-6/12 bg-gray-100 rounded-lg drop-shadow-lg p-4 flex items-center content-center">
            
            <div className="w-full">
              <ul>
                <li className="my-4 py-4 border-black border-b-2">
                  <div className="flex justify-between">
                    <div className="w-8/12">
                      <p className="text-xs font-normal">
                        {item.isVeg ? "🟢" : "🔴"}
                      </p>
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-lg font-medium my-1">
                        ₹{item?.price / 100 || item?.defaultPrice / 100}
                      </p>
                      <p className="text-xs font-normal my-1">
                        {item?.ratings?.aggregatedRating?.rating
                          ? `⭐${item?.ratings?.aggregatedRating?.rating}`
                          : ""}
                      </p>
                      <p className="text-xs font-normal my-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="relative flex flex-col justify-center items-center">
                      <img
                        src={CDN_URL + item.imageId}
                        className="rounded-xl w-[200px] h-[150px]"
                        alt={item.name}
                      />
                    </div>
                  </div>
                </li>
              </ul>
              
            </div>
          </div>
         
         
        ))}
        <div className="text-center mt-6">
            <p className="text-2xl font-bold">Total Amount: ₹{calculateTotalAmount()}</p>
            <GooglePayButton environment="TEST"></GooglePayButton>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Go to Payment
            </button>
          </div>
        </div>

      
        
      ) : (
        <div className="animate-fadeIn text-center mt-4 text-tomato">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl">Your cart is empty. Add items to your cart.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
