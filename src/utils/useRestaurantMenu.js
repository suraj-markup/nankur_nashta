import { useEffect,useState } from "react";

const useRestaurantMenu=(resId)=>{
  
    const [resInfo, setResInfo] = useState(null);
    const [menuCard, setMenuCard] = useState([]);
    const [showContent, setShowContent] = useState([]);
    
    useEffect(()=>{
        fetchMenu();
    },[]);

    const fetchMenu = async () => {
        try {
          const data = await fetch(
            `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.6208&lng=85.1720&restaurantId=${resId}`
          );
    
          const json = await data.json();
    
          console.log(
            json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
          );
          
          setResInfo(json?.data?.cards[2]?.card?.card?.info);
          const menuCards = json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    
          setMenuCard(menuCards);
    
          setShowContent(new Array(menuCards.length).fill(true));
        } catch (error) {
          console.error("Error fetching menu:", error);
        }
      };

    return {resInfo,menuCard,showContent};
}

export default useRestaurantMenu;