import RestaurantCard, {withPromotedLabel} from "./ResCard";
import Shimmer from "./Shimmer";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body = () => {
   

 

    const [list,setList]=useState([]);
    const [newList,setNewList]=useState([]);
    
    const promotedCard=withPromotedLabel(RestaurantCard);

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

        // console.log(json);
        //optional chaining
        setList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setNewList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
    const onlineStatus=useOnlineStatus();
    if(onlineStatus===false){
      return(<h1>Seems like you are not connected to the internet. Please check your internet connection...</h1>)
    }
    
  return list.length === 0 ? (
      <Shimmer/>
    ) :(  
    <div className="body">
      <div className="flex justify-around items-center">
        <div className="m-2 mt-5 w-auto">
          <input type =" text"  className="px-4 py-2 bg-blue-100 m-4 rounded-lg border-blue-150 border-2 hover:bg-blue-200" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
          
            <button className="px-4 py-2 bg-orange-100 hover:bg-orange-200 m-4 rounded-lg" onClick={()=>{
                console.log(searchText);
                let filteredData = list.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                setNewList(filteredData);
                console.log(filteredData);
                }}>search
            </button>
            
        </div>


        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 m-4 rounded-lg"
          onClick={() => {
            let filteredData = newList.filter((res) => res.info.avgRating > 4);
            setNewList(filteredData);
            console.log(filteredData);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>

      <div className="flex flex-wrap ">
        {newList.map((restaurant) => (
          <Link key={restaurant.info.id} to={`/restaurants/${restaurant.info.id}`}> 
          {restaurant.info.promoted ? <promotedCard  resData={restaurant}/> :<RestaurantCard  resData={restaurant} />

          }
          
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
