import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constant";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { addItems } from "../utils/cartSlice";
import {useDispatch} from "react-redux";

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);
  // const [menuCard, setMenuCard] = useState([]);

  const [showContent, setShowContent] = useState([]);

  const { resId } = useParams();
  // console.log(resId);

  const { resInfo, menuCard } = useRestaurantMenu(resId);
  
  const dispatch =useDispatch();
  //dispatching the action
  const handleAddItem=(item)=>{
    dispatch(addItems(item));
    

  };

  const toggleContent = (index) => {
    const updatedShowContent = [...showContent];
    updatedShowContent[index] = !updatedShowContent[index];
    setShowContent(updatedShowContent);
  };  

  if (!resInfo) {
    return <Shimmer />;
  }

  const {
    name,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    city,
    sla,
    cuisines,
    isBestseller,
  } = resInfo;

  return (
    <div className="mt-4">
      <h1 className="font-bold text-center text-xl">{name}</h1>
      <h3 className="font-bold text-center text-lg">
        ⭐ {avgRating} ({totalRatingsString}) - {costForTwoMessage}
      </h3>
      <h3 className="font-bold text-center text-lg">{cuisines.join(",")}</h3>
      {/* <h3 className="font-bold text-2xl">Menu</h3> */}

      {menuCard.map((items, index) => {
        const card = items.card.card;
        const cardType = card["@type"];

        if (
          cardType ===
          "type.googleapis.com/swiggy.presentation.food.v2.MenuCarousel"
        ) {
          return (
            <div className="my-4 mx-auto w-6/12 bg-gray-100 rounded-lg drop-shadow-lg p-4 flex items-center content-center " key={index}>
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{card.title} ({card.carousel.length})</h3>
                  <button
                    className="px-2 py-1 border-none bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
                    onClick={() => toggleContent(index)}
                  >
                    {showContent[index] ? "Show less" : "Show more"}
                  </button>
                </div>
                {showContent[index] && (
                  <div className="flex overflow-x-scroll p-[10px]">
                    {card.carousel.map((carouselItem, idx) => (
                      <div key={idx} className="flex-none w-[30%] mr-2 bg-white border border-gray-300 rounded-lg p-2 text-center">
                        <img className="w-full h-auto rounded-lg"
                          src={CDN_URL + carouselItem.creativeId}
                          alt={carouselItem.title}
                        />
                        <button  onClick={()=>{handleAddItem(carouselItem.dish.info)}} className=" bg-black active:bg-slate-900 text-white rounded-md  w-24 h-8  justify-center items-center ">
                              ADD+
                            </button>
                        <h5 className="mt-2 mb-1">{carouselItem.title}</h5>
                        <p>{carouselItem.description}</p>
                        <p>
                          Price: ₹
                          {carouselItem.dish.info.defaultPrice / 100 ||
                            carouselItem.dish.info.price / 100}
                        </p>
                      </div>
                    ))}
                  </div> 
                )}
              </div>
            </div>
          );
        } else if (
          cardType ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) {
          return (
            <div className="my-4 mx-auto w-6/12 bg-gray-100 rounded-lg drop-shadow-lg p-4 flex items-center content-center " key={index}>
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{card.title} ({card.itemCards.length})</h3>
                  <button
                    className="px-2 py-1 border-none bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
                    onClick={() => toggleContent(index)}
                  >
                    {showContent[index] ? "Show less" : "Show more"}
                  </button>
                </div>
                {showContent[index] && (
                  <ul>
                    {card.itemCards.map((itemCard, idx) => (
                      <li className="my-4 py-4 border-black border-b-2" key={idx}>
                        <div className="flex justify-between">

                        <div className="w-8/12">
                        <p className="text-xs font-normal">{itemCard.card.info.isVeg?"🟢":"🔴"}</p>
                        <p className="text-lg font-medium ">{itemCard.card.info.name}</p> 
                        <p className="text-lg font-medium my-1">₹{itemCard.card.info.price / 100 || itemCard.card.info.defaultPrice / 100}</p>
                        <p className="text-xs font-normal my-1">{itemCard.card.info?.ratings?.aggregatedRating?.rating?`⭐${itemCard.card.info?.ratings?.aggregatedRating?.rating}`:"" }</p>
                        <p className="text-xs font-normal my-2">{itemCard.card.info.isBestseller?"BestSeller":""}</p>
                        <p className="text-xs font-normal my-2">{itemCard.card.info.description}</p>
                          
                        </div>
                        <div className="relative flex flex-col justify-center items-center">
                            <img src={CDN_URL + itemCard.card.info.imageId} className="rounded-xl w-[200px] h-[150px]"/>
                            <button  onClick={()=>{handleAddItem(itemCard.card.info)}} className="absolute inset-y-32   active:bg-slate-900 bg-black text-white rounded-md p-2 w-24 h-8 flex justify-center items-center ">
                              ADD+
                            </button>
                          </div>
                          </div>
                          {/* <hr></hr> */}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default RestaurantMenu;
