const username = 'comdataadmin'
const password = 'comdataadmin'


export async function loginCall() {
    return fetch('http://93.87.67.249:60706/Auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*'
        },
        body: JSON.stringify({
            username,
            password
        }),
    })
        .then((res) => res.json())
        .then((data) => data)
}