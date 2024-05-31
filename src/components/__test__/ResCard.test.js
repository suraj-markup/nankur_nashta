import RestaurantCard from "../ResCard";
import MOCK_DATA from "../mocks/ResCardMock.json";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

it("Should render the ResCard component with props Data", () => {
  render(
    
        <RestaurantCard resData={{ info: MOCK_DATA }} />
      
  );

  const resname = screen.getByText("KFC");
  expect(resname).toBeInTheDocument();
});