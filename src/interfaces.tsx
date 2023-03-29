export interface isAuthenticated {
  component: React.FC;
}

export interface Ticket {
  id: number;
  //sta jos od podataka
}

export interface TicketState {
  tickets: Ticket[];
}

export interface AuthState {
  user: { id: number; first_name: string; last_name: string }; //ovde mozda tip usera, kao ticket, ali videti sta user sadrzi
  token: string | null;
  error: string;
}
