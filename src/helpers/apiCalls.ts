import { Ticket } from "../interfaces"

//LOGIN
export async function loginCall(username: string, password: string) {
    try {
        const res = await fetch('http://93.87.67.249:60706/Auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
//COMPANY
export async function newCompanyCall(token: string, companyName: string) {
    try {
        const res = await fetch('http://93.87.67.249:60706/api/Companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                companyName
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function allCompaniesCall(token: string) {
    try {
        const res = await fetch('http://93.87.67.249:60706/api/Companies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err: any) {
        return console.error(err.message)
    }
}
export async function deleteCompanyCall(token: string, id: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Companies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
//PROJECT
export async function newProjectCall(token: string, projectName: string) {
    try {
        const res = await fetch('http://93.87.67.249:60706/api/Projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                projectName
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function allProjectsCall(token: string) {
    try {
        const res = await fetch('http://93.87.67.249:60706/api/Projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err: any) {
        return console.error(err.message)
    }
}
export async function deleteProjectCall(token: string, id: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
//COMPANY PROJECT CONNECTION
export async function createCompProjConnectionCall(token: string, companyId: string, projectId: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/CompanyProjects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                companyId, projectId
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function allCompProjConnectionCall(token: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/CompanyProjects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function deleteCompProjeConnectionCall(token: string, id: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/CompanyProjects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function getSpecificCompProjConnectionCall(token: string, id: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/CompanyProjects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
//USER
export async function createNewUserCall(token: string, userData: any) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...userData
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function allUsersCall(token: string) {
    try {
        const res = await fetch('http://93.87.67.249:60706/api/Users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err: any) {
        return console.error(err.message)
    }
}
export async function deleteUserCall(token: string, id: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
//COMPANY PROJECT USER CONNECTION
export async function createCompProjUserConnectionCall(token: string, userId: string, projectsList: string[]) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/CompanyProjectUsers/multiple`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                companyProjectId: [...projectsList]
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function createSingleConnectionCall(token: string, userId: string, companyProjectId: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/CompanyProjectUsers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                companyProjectId
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function allCompProjUserConnectionCall(token: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/CompanyProjectUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function getUsersConnectionsCall(token: string, userId: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/CompanyProjectUsers/by-user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
//TICKET
export async function createNewTicketCall(token: string, title: string, companyProjectUserId: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                companyProjectUserId,
                title,
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function allTicketsFromUserCall(token: string, userId: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function cancelTicketCall(token: string, ticketId: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/cancel/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function allTicketsCall(token: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function getSpecificTicketCall(token: string, ticketId: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/${ticketId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function allTicketsFromCompanyCall(token: string, companyId: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/company/${companyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function allTicketsFromProjectCall(token: string, projectId: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/project/${projectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function getTicketStatusesCall(token: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/ticketStatuses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function getTicketPrioritiesCall(token: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/ticketPriorities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function getTicketTypesCall(token: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/ticketTypes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function changeTicketStatusCall(token: string, ticketId: string, id: number) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/status/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                statusId: id
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function changeTicketPriorityCall(token: string, tickedId: string, id: number) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/priority/${tickedId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                priorityId: id
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function changeTicketTypeCall(token: string, tickedId: string, id: number) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/type/${tickedId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                typeId: id
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
//MESSAGE
export async function createNewMessageCall(token: string, tickedId: string, message: string, timeSpent?: number) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/messages/${tickedId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                message,
                timeSpent
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function allMessagesFromTicketCall(token: string, ticketId: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/api/Tickets/messages/${ticketId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
//TYPES
export async function getUserTypesCall(token: string) {
    try {
        const res = await fetch(`http://93.87.67.249:60706/userTypes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
