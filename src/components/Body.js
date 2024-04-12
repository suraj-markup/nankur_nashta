import RestaurantCard from "./ResCard";
import Shimmer from "./Shimmer";
import { useState,useEffect } from "react";

const Body = () => {
   
    const [list,setList]=useState([]);
    const [newList,setNewList]=useState([]);

    const [searchText,setSearchText] = useState("");

    //whenever state variables update, react triggers a reconciliation cycle(re-renders the whole component)
    console.log("Body Render");
    
    useEffect(() => {
      fetchData();
    },[]);

    const fetchData = async () =>{
        const data = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.5940947&lng=85.1375645&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();

        console.log(json);
        //optional caining
        setList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setNewList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
    
    
  return list.length === 0 ? (
      <Shimmer/>
    ) :(  
    <div className="body">
      <div className="special">
        <div className="search">
          <input type =" text"  className="search-box" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
            <button className="search-btn" onClick={()=>{
                console.log(searchText);
                let filteredData = list.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                setNewList(filteredData);
                console.log(filteredData);
                }}>search
            </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            let filteredData = newList.filter((res) => res.info.avgRating > 4);
            setNewList(filteredData);
            console.log(filteredData);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>

      <div className="res-container">
        {newList.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
