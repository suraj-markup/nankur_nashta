import Header from "../Header";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';


it("Should load  Header Component with Login Button", () => {
  render(    //this header uses redux and jsdom does not know redux so we need to provide redux store to the header.
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  ); 
  const loginButton = screen.getByRole("button",{name: "LogIn"});
  expect(loginButton).toBeInTheDocument();
});

it("Should load  Header Component with Cart Items 0 ", () => {
    render(    //this header uses redux and jsdom does not know redux so we need to provide redux store to the header.
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    ); 
    const cartItems = screen.getByText("Cart - (0 items) 🛒");
    expect(cartItems).toBeInTheDocument();
  });


it("Should load  Header Component with Cart Items ", () => {
    render(    //this header uses redux and jsdom does not know redux so we need to provide redux store to the header.
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    ); 
    const cartItems = screen.getByText(/Cart/);
    expect(cartItems).toBeInTheDocument();
  });

it("Should chaneg login button to logout on click ", () => {
    render(    //this header uses redux and jsdom does not know redux so we need to provide redux store to the header.
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    ); 
    const loginButton = screen.getByRole("button",{name: "LogIn"});
    fireEvent.click(loginButton);

    const logOutButton = screen.getByRole("button",{name: "LogOut"});
    fireEvent.click(logOutButton);

    expect(logOutButton).toBeInTheDocument();
  });

//actually we will have to provide details of all the other libraries used other than react like redux, react-router-dom, any image/icon library.
//this is because jest is made for javascript, typescript so if we use anything other than these we will have to mention abt it.