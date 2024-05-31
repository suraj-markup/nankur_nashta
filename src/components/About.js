import React, { Component } from "react";
import UserClass from "./UserClass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

class About extends Component {
    constructor(props) {
        super(props);
        console.log("Parent constructor");
    }

    componentDidMount() {
        console.log("Parent componentDidMount");
    }

    render() {
        console.log("Parent render");

        return (
            <div className="font-sans p-6 mx-auto max-w-4xl bg-orange-100 rounded-lg shadow-lg text-center mt-10">
                <h1 className="text-4xl font-bold text-orange-800 mb-4">About Us</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Welcome to Nakur Nashta! We are dedicated to delivering the best snacks right to your doorstep. Our mission is to provide delicious, high-quality food that satisfies your cravings and delights your taste buds.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                    At Nakur Nashta, we believe in using the freshest ingredients and traditional recipes to create snacks that remind you of home. Whether you're looking for a quick bite or planning a party, we've got you covered.
                </p>
                <h2 className="text-3xl font-semibold text-orange-700 mb-4">Meet Our Team</h2>
                <div className="flex flex-col md:flex-row justify-around mb-6">
                    <UserClass name={"First"} location={"Patna, Bihar"} />
              
                </div>
                <h2 className="text-3xl font-semibold text-orange-700 mb-4">Follow Us</h2>
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://github.com/suraj-markup" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 text-2xl">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://www.linkedin.com/in/suraj-kumar-86217a20a" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 text-2xl">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="mailto:sk9261712674@gmail.com" className="text-gray-700 hover:text-gray-900 text-2xl">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </div>
            </div>
        );
    }
}

export default About;
