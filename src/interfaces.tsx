export interface isAuthenticated {
  component: React.FC;
}

export interface Ticket {
  id: number;
  //sta jos od podataka
}

export interface UserType {
  userTypeId: number;
  userTypeName: string;
}

export interface User {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean | null;
  email: string;
  phone: string;
  userType: UserType;
}

export interface TicketState {
  tickets: Ticket[];
}

export interface AuthState {
  user: User;
  token: string | null;
  error: string;
}

export interface ToolbarProps {
  handleClickAccount: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ShowProp {
  show: boolean;
  onClose: () => void;
}
