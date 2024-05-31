import { render, screen } from '@testing-library/react';
import Contact from '../Contact'
import '@testing-library/jest-dom';

it("Sould load Contact us page", ()=>{ //you can write instead of test to 'it'. 
    render (<Contact/>);

    const heading =screen.getByRole("heading");

    expect(heading).toBeInTheDocument(); 
});

test("Sould load button inside our Contact us page", ()=>{
    render (<Contact/>);

    const button =screen.getByRole("button");

    expect(button).toBeInTheDocument(); 
});

test("Sould load the 'send word' inside our Contact us page", ()=>{
    render (<Contact/>);

    const text=screen.getByText("Send");

    expect(text).toBeInTheDocument(); 
});

test("Sould load the input name inside our Contact us page", ()=>{
    render (<Contact/>);

    const inputName=screen.getByPlaceholderText("Your name");

    expect(inputName).toBeInTheDocument(); 
});

test("Sould load all 2 input boxes from our Contact us page", ()=>{
    render (<Contact/>);

    //Querying
    const inputBoxes=screen.getAllByRole("textbox");

    //this will give the react-fiber-node, virtual DOM, jsx element all are same. 
    // console.log(inputBoxes);

    //assertion
    expect(inputBoxes.length).toBe(3); 
});