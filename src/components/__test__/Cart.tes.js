import RestaurantMenu from '../RestaurantMenu';
import { act } from "react-dom/test-utils";
import MOCK_DATA from "../mocks/mockResMenu.json";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch =jest.fn(()=>{
    return Promise.resolve({
        json: ()=>{
            return Promise.resolve(MOCK_DATA);
        }
    });
})

it("Should load restaurant menu component", async () => { 
  await act(async () => {
    render(
      <BrowserRouter>
      <Provider store={appStore}>
        <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    );
  });

  const accordianHeader =screen.getByText("Party Combo (11)");




});
