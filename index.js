import React from "react";
import ReactDOM from "react-dom"; 

/*
- Header
  - Logo
  - Nav Item
- Body 
  - Search 
  - Restaurant card
    - Img
    - Restaurant Name
    - Rating
    - Distance 
    - cuisine  
- Footer
  - Copyright
  - Links 
  - Address

*/

const Header = ()=>{
  return (
    <div className="header">
      <div className="logo-container">
        <img src="https://img.freepik.com/free-vector/food-shopping-logo-template-design_460848-10299.jpg?size=626&ext=jpg" className="logo"></img>
      </div>

      <div className="nav-menu">
        <ul >
          <li>Home</li>
          <li>About Us</li>
          <li>Contact US</li>
          <li>Cart</li>
          <li>Home</li>
        </ul>

      </div>

    </div>
  )
}
const RestaurantCard = ()=>{
  return(
    <div className="card-container">
      <div className="food-photo-container">
        <img src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" className="food-photo"/>
      </div>
      
        <h3>Suraj Restaurant</h3>
        <h4>chinese, Pan-Asian</h4>

      <div className="about-res">
        <p>⭐4.3</p>
        <p>.</p>
        <p>23 MINS</p>
        <p>.</p>
        <p>₹ 400 FOR TWO</p>
      </div>
      

    </div>
  )
}

const Body = ()=>{
  return (
    <div className="body">
      <div className="search">
      <p>search</p>
      </div>

      <div className="res-container">
        <RestaurantCard/>
      </div>

    </div>
  )

}

const AppLayout = ()=>{
  return (
    <div className="App">
      <Header/>
      <Body/>
    </div>

  )
}

const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout/>);