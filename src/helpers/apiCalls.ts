import { Ticket } from "../interfaces"
const url = 'https://api.helpdesk.comdata.rs'
// const url = 'http://93.87.67.249:60706'
//LOGIN
export async function loginCall(username: string, password: string) {
    try {
        const res = await fetch(`${url}/Auth/login`, {
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
        const res = await fetch(`${url}/api/Companies`, {
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
        const res = await fetch(`${url}/api/Companies`, {
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
        const res = await fetch(`${url}/api/Companies/${id}`, {
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
        const res = await fetch(`${url}/api/Projects`, {
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
        const res = await fetch(`${url}/api/Projects`, {
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
        const res = await fetch(`${url}/api/Projects/${id}`, {
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
        const res = await fetch(`${url}/api/CompanyProjects`, {
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
        const res = await fetch(`${url}/api/CompanyProjects`, {
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
        const res = await fetch(`${url}/api/CompanyProjects/${id}`, {
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
        const res = await fetch(`${url}/api/CompanyProjects/${id}`, {
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
        const res = await fetch(`${url}/api/Users`, {
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
export async function changePasswordAdminCall(token: string, userId: string, newPassword: string) {
    try {
        const res = await fetch(`${url}/api/Users/Change-Password/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                newPassword
            })
        })
        const data = await res.json()
        return data
    } catch (err) {
        return console.error(err)
    }
}
export async function changePasswordUserCall(token: string, userId: string, oldPassword: string, newPassword: string) {
    try {
        const res = await fetch(`${url}/api/Users/Change-Password/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                oldPassword,
                newPassword
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
        const res = await fetch(`${url}/api/Users`, {
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
        const res = await fetch(`${url}/api/Users/${id}`, {
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
export async function editUserCall(token: string, id: string, userData: any) {
    try {
        const res = await fetch(`${url}/api/Users/${id}`, {
            method: 'PUT',
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
//COMPANY PROJECT USER CONNECTION
export async function createCompProjUserConnectionCall(token: string, userId: string, projectsList: string[]) {
    try {
        const res = await fetch(`${url}/api/CompanyProjectUsers/multiple`, {
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
        const res = await fetch(`${url}/api/CompanyProjectUsers`, {
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
        const res = await fetch(`${url}/api/CompanyProjectUsers`, {
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
        const res = await fetch(`${url}/api/CompanyProjectUsers/by-user/${userId}`, {
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
export async function deleteCompProjUserConnectionCall(token: string, id: string) {
    try {
        const res = await fetch(`${url}/api/CompanyProjectUsers/${id}`, {
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
//TICKET
export async function createNewTicketCall(token: string, title: string, companyProjectUserId: string) {
    try {
        const res = await fetch(`${url}/api/Tickets`, {
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
        const res = await fetch(`${url}/api/Tickets/user/${userId}`, {
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
        const res = await fetch(`${url}/api/Tickets/cancel/${ticketId}`, {
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
        const res = await fetch(`${url}/api/Tickets`, {
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
        const res = await fetch(`${url}/api/Tickets/${ticketId}`, {
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
        const res = await fetch(`${url}/api/Tickets/company/${companyId}`, {
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
        const res = await fetch(`${url}/api/Tickets/project/${projectId}`, {
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
        const res = await fetch(`${url}/api/Tickets/ticketStatuses`, {
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
        const res = await fetch(`${url}/api/Tickets/ticketPriorities`, {
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
        const res = await fetch(`${url}/api/Tickets/ticketTypes`, {
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
export async function changeTicketSettingsCall(token: string, ticketId: string, statusId: number, priorityId: number, typeId: number) {
    try {
        const res = await fetch(`${url}/api/Tickets/properties/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                statusId: statusId,
                typeId: typeId,
                priorityId: priorityId
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
        const res = await fetch(`${url}/api/Tickets/messages/${tickedId}`, {
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
        const res = await fetch(`${url}/api/Tickets/messages/${ticketId}`, {
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
        const res = await fetch(`${url}/userTypes`, {
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
