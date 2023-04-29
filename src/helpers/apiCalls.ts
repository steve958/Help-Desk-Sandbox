const username = 'comdataadmin'
const password = 'comdataadmin'

//LOGIN
export async function loginCall() {
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