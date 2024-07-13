  import RestaurantCard, {withPromotedLabel} from "./ResCard";
  // import API from
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import axios from "axios";
  import Shimmer from "./Shimmer";
  import { useState,useEffect } from "react";
  import { Link } from "react-router-dom";
  import useOnlineStatus from "../utils/useOnlineStatus";
  const Body = () => {
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState(25.5940947);
    const [lng, setLng] = useState(85.1375645);

    const handleGeocode = async () => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API}`);
            const data = response.data;
            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
                fetchData(lat, lng);
            } else {
                console.error("No location found");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    console.log(lat);
    console.log(lng);
    

  

      const [list,setList]=useState([]);
      const [newList,setNewList]=useState([]);
      
      const promotedCard=withPromotedLabel(RestaurantCard);

      const [searchText,setSearchText] = useState("");

      //whenever state variables update, react triggers a reconciliation cycle(re-renders the whole component)
      console.log("Body Render");
      
      useEffect(() => {
        fetchData();
        AOS.init();
      },[]);

      const fetchData = async (latitude = lat, longitude = lng) =>{
          const data = await fetch(
            `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);

          const json = await data.json();

          // console.log(json.info);
          //optional chaining
          setList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
          setNewList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      }
      const onlineStatus=useOnlineStatus();
      if(onlineStatus===false){
        return(<h1>Seems like you are not connected to the internet. Please check your internet connection...</h1>)
      }
      if(list.length === 0){
        return (<div>No reataurant available this time</div>)
      }
    return list.length === 0 ? (
        <Shimmer/>
      ) :(  
      <div className="body">
        <div className="flex justify-around items-center">
          <div  data-aos="fade-up" className="m-2 mt-5 w-auto">
            <input type =" text"  data-testid="searchInput" className="px-4 py-2 bg-blue-100 m-4 rounded-lg border-blue-150 border-2 hover:bg-blue-200" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
            
              <button className="px-4 py-2 bg-orange-100 hover:bg-orange-200 m-4 rounded-lg" onClick={()=>{
                  console.log(searchText);
                  let filteredData = list.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                  setNewList(filteredData);
                  console.log(filteredData);
                  }}>search
              </button>
              
          </div>
          <div data-aos="fade-up" >
              <input
                className="px-4 py-2 bg-blue-100 m-4 rounded-lg border-blue-150 border-2 hover:bg-blue-200"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
              />
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 m-4 rounded-lg"
              onClick={handleGeocode}>Enter Location </button>
              {/* {lat && lng && (
                  <div>
                      <p>Latitude: {lat}</p>
                      <p>Longitude: {lng}</p>
                  </div>
              )} */}
          </div>

          <button data-aos="fade-up"
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

        <div data-aos="fade-up" className="flex flex-wrap ">
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
