export default function setCookie(name, val, time = 3600) {
    return document.cookie = `${name}=${val};max-age=${time}`
}