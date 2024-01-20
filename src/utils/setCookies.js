export default function setCookie(name, val, time = 36000000) {
  return (document.cookie = `${name}=${val};max-age=${time}`);
}
