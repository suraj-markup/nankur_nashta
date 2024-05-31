import { CDN_URL } from "../utils/constant";

const RestaurantCard = (props) => {
  const { resData } = props;
  
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    locality,
    areaName,
  } = resData?.info;
  const { slaString } = resData?.info.sla;
  // console.log(resData.info);
  return (     
    <div data-testid="resCard" className="p-[10px] m-5 w-[255px] h-auto border-black border-2 shadow-3xl hover:bg-orange-100 rounded-lg">
      <div className="justify-center items-center flex-col">
        <img
          src={CDN_URL + cloudinaryImageId}
          className=" rounded-xl w-[240px] h-[200 px]"
        />
      </div>

      <h3 className="font-bold text-xl py-1">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h5>
        {locality}, {areaName}
      </h5>

      <div className="p-0 flex justify-evenly">
        <p>{avgRating + " ⭐"}</p>
        <p>.</p>
        <p>{slaString}</p>
        <p>.</p>
        <p>{costForTwo}</p>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return(
      <div>
        <label> Promoted</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
