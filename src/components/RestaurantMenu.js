import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constant";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState();
  const [menuCard, setMenuCard] = useState([]);

  const [showContent, setShowContent] = useState([]);

  const { resId } = useParams();
  console.log(resId);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.6208&lng=85.1720&restaurantId=${resId}`
      );

      const json = await data.json();

      console.log(
        json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
      );

      const menuCards =
        json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      setResInfo(json?.data?.cards[2]?.card?.card?.info);
      setMenuCard(menuCards);

      setShowContent(new Array(menuCards.length).fill(true));
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
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
  } = resInfo;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h3>
        ⭐ {avgRating} ({totalRatingsString}) - {costForTwoMessage}
      </h3>
      <h3>{cuisines.join(",")}</h3>
      <h3>Menu</h3>

      {menuCard.map((items, index) => {
        const card = items.card.card;
        const cardType = card["@type"];

        if (
          cardType ===
          "type.googleapis.com/swiggy.presentation.food.v2.MenuCarousel"
        ) {
          return (
            <div className="container" key={index}>
              <div className="block">
                <div className="more-less">
                  <h3>{card.title}</h3>
                  <button
                    className="switch"
                    onClick={() => toggleContent(index)}
                  >
                    {showContent[index] ? "Show less" : "Show more"}
                  </button>
                </div>
                {showContent[index] && (
                  <div className="carousel">
                    {card.carousel.map((carouselItem, idx) => (
                      <div key={idx} className="carousel-item">
                        <img
                          src={CDN_URL + carouselItem.creativeId}
                          alt={carouselItem.title}
                        />
                        <h5>{carouselItem.title}</h5>
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
            <div className="container" key={index}>
              <div className="block">
                <div className="more-less">
                  <h3>{card.title}</h3>
                  <button
                    className="switch"
                    onClick={() => toggleContent(index)}
                  >
                    {showContent[index] ? "Show less" : "Show more"}
                  </button>
                </div>
                {showContent[index] && (
                <ul>
                  {card.itemCards.map((itemCard, idx) => (
                    <li key={idx}>
                      {itemCard.card.info.name} - ₹
                      {itemCard.card.info.price / 100 ||
                        itemCard.card.info.defaultPrice / 100}
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
