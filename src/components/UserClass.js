import React from "react";

//oreder of component cycle  
// 1. constructor
// 2. render
// 3. comonentDidMount


class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    
    this.state={
      userInfo:{
        name:"Dummy",
        location:"default",
      }
    }
    
  }

  async componentDidMount() {

    //API call similar as fucntional component useEffect
    const data= await fetch("https://api.github.com/users/suraj-markup");
    const json= await data.json();
    console.log(json);
    this.setState({
      userInfo: json,
    });
  }
  componentDidUpdate(){

  }

  render() {

    let { name, location,avatar_url } = this.state.userInfo;
    
    
    

    return (
      <div className="user-card">
        <img src={avatar_url}></img>
        <h2>Name: {name} </h2>
        <h2>Location: {location} </h2>
        <h2>Contact: @suraj_markup </h2>
      </div>
    );
  }
}

export default UserClass;
