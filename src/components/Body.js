import RestaurantCard from "./ResCard";
import Shimmer from "./Shimmer";
import { useState,useEffect } from "react";

const Body = () => {
   
    const [list,setList]=useState([]);

    useEffect(() => {
      fetchData();
    },[]);

    const fetchData = async () =>{
        const data = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.63510&lng=92.80300&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();

        console.log(json);
        //optional caining
        setList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
    
    if(list.length === 0){
      return <Shimmer/>
    }

  return (
    <div className="body">
      <div className="search">
        <button
          className="filter-btn"
          onClick={() => {
            let filteredData = resObj.filter((res) => res.info.avgRating > 4);
            setList(filteredData);
            console.log(filteredData);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>

      <div className="res-container">
        {list.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
