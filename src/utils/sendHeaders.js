export default function () {
    return ({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token_statipkro'),
            'Content-Type': 'application/json'
        }
    })
}