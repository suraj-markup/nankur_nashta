import { CDN_URL } from "../utils/constant";

const RestaurantCard = (props)=>{
    const {resData}=props;
    // console.log(resData);
    const {name,cloudinaryImageId,cuisines,avgRating,costForTwo,locality,areaName} = resData?.info;
    const {slaString}=resData?.info.sla;
    
    return(
      <div className="card-container">
        <div className="food-photo-container">
          <img src={CDN_URL+cloudinaryImageId} className="food-photo"/>
        </div>
        
          <h3>{name}</h3>
          <h4>{cuisines.join(", ")}</h4>
          <h5>{locality}, {areaName}</h5>
  
        <div className="about-res">
          <p>{avgRating+ " ⭐" }</p>
          <p>.</p>
          <p>{slaString}</p>
          <p>.</p>
          <p>{costForTwo}</p>
        </div>
        
  
      </div>
    )
  }
  export default RestaurantCard;