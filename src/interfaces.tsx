export interface isAuthenticated {
  component: React.FC;
}

export interface Ticket {
  ticketId: string
  title: string
  ticketStatus: TicketStatus
  ticketPriority: TicketPriority
  ticketType: TicketType
  created: Date
  lastUpdated: Date
  creator: User
  companyProjectUser: CompanyProjectUser
}

export interface Message {
  message: string
  messageId: string
  files: Files[]
  sentBy: User
  sentTime: Date
  timeSpent: number
}

export interface Files {
  fileId: string
  fileName: string
  fileLink: string
}

export interface TicketPriority {
  ticketPriorityId: number
  ticketPriorityName: string
}

export interface TicketStatus {
  ticketStatusId: number
  ticketStatusName: string
}

export interface TicketType {
  ticketTypeId: number
  ticketTypeName: string
}

export interface User {
  userId: string
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  userType: UserTypes
}

export interface Company {
  companyId: string
  companyName: string
}

export interface Project {
  projectId: string
  projectName: string
}

export interface CompanyProject {
  companyProjectId: string
  companyProjectName: string
  companyId: string
  projectId: string
}

export interface CompanyProjectUser {
  companyProjectUserId: string
  companyProjectUserName: string
  companyProjectId: string
  userId: string
}

export interface TicketState {
  tickets: Ticket[]
}

export interface AuthState {
  user: User;
  token: string | null
  error: string;
}

export interface UserTypes {
  userTypeId: number
  userTypeName: string
}

export interface ToolbarProps {
  handleClickAccount: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ShowProp {
  show: boolean;
  onClose: () => void
}

export interface UserSlicePayload {
  token: string,
  data: User,
}

export interface UserSliceConnectionsPayload {
  connections: CompanyProjectUser[]
}