// export default function () {
//     return ({
//         headers: {
//             'Authorization': 'Bearer ' + localStorage.getItem('token_statipkro'),
//             'Content-Type': 'application/json'
//         }
//     })
// }
import getCookie from "./getCookies"
export default function () {
    const cookies = getCookie()
    return ({
        headers: {
            'Authorization': 'Bearer ' + cookies['token_statipkro'],
            'Content-Type': 'application/json'
        }
    })
}