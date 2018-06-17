import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import PlayersList from "./components/PlayersList/PlayersList";
import AddPlayer from "./components/AddPlayer/AddPlayer";
import Player from "./components/Player/Player";

it("renders without crashing", () => {
  shallow(<App />);
});

it("should update player score", () => {
  const players = [
    {
      name: "Kunegunda",
      score: 5
    }
  ];
  const appComponent = shallow(<App />);
  appComponent.setState({ players });

  const onScoreUpdate = appComponent.find(PlayersList).prop("onScoreUpdate");
  onScoreUpdate(0, 5);

  const playersAfterUpdate = appComponent.state("players");

  expect(playersAfterUpdate[0].score).toEqual(10);
});

it("should add newPlayer to the state", () => {
  const appComponent = shallow(<App />);
  const onPlayerAdd = appComponent.find(AddPlayer).prop("onPlayerAdd");
  onPlayerAdd("Ania");

  const players = appComponent.state("players");

  expect(players.length).toEqual(1);
  expect(players[0].name).toEqual("Ania");
  expect(players[0].score).toEqual(0);
});

it("should remove Player from the state", () => {
  const appComponent = mount(<App />);
  const removal = appComponent.find(Player).first();
  const onPlayerRemove = removal.find(".Player__remove");
  onPlayerRemove.simulate("click");

  const players = appComponent.state("players");

  expect(players.length).toEqual(1);
});
