import Body from "../Body";
import { act } from "react-dom/test-utils";
import MOCK_DATA from "../mocks/mockResListData.json";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should render the body component with search", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const searchbtn= screen.getByRole("button",{name:"search"});
  const searchInput= screen.getByTestId("searchInput");
//   console.log(searchInput);   
  fireEvent.change(searchInput,{target:{value:"pizza"}});

  fireEvent.click(searchbtn);
//   expect(searchbtn).toBeInTheDocument();
  //screen should have 3 card for current time
  const card=screen.getAllByTestId("resCard");

  expect(card.length).toBe(4);

});
