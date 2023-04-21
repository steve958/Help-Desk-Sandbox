import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { Action } from "../reducers/ticketReducer";
import axios from "axios";
import { Ticket } from "../../interfaces";

export interface getTickets {
  type: ActionType.GET_TICKETS;
  tickets: Ticket[];
}

export const getAllTickets = () => {
  return (dispatch: Dispatch<Action>) => {
    axios
      .get("") //promeniti url
      .then((response) => {
        dispatch({
          type: ActionType.GET_TICKETS,
          tickets: response.data.tickets,
        });
      })
      .catch((err) => console.log(`Error while getting all tickets: ${err}`));
  };
};
