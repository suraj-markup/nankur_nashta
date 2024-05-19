import User from "./User";
import {Component} from "react";
import { useEffect,React } from "react";
import UserClass from "./UserClass";

//when multiple child component is present then it  batches the render phase of all child component and then it execute the commit part that is DOM manipulation. It happens because DOM update is the most costly work in react

class About extends Component {
    constructor(props){
        super(props);
        console.log("Parent constructor");
    }
    componentDidMount(){
        console.log("Parent componentdidMount");

    }
  
    render(){
        console.log("Parent render");

        return (
            <div>
                <h1>this is about page.</h1>
                <h2>this is namaste react.</h2>
                <UserClass name={"First"} location={"Patna, Bihar"}/>
                <UserClass name={"second" } location={"rajasthan"} />
            </div>
        )
    }
}


export default About;