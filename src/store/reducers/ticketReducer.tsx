import { getTickets } from "../actions/ticketActions";
import { ActionType } from "../actions/actionTypes";
import { TicketState } from "../../interfaces";

const initialState: TicketState = {
  tickets: [],
};

export type Action = getTickets;

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_TICKETS:
      return {
        ...state,
        tickets: action.tickets,
      };

    default:
      return state;
  }
};

export default reducer;
