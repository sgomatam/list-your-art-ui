export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
        //return { Authorization: 'Bearer ' + getCookie('USERID') }; //Enable when cookie is set correctly
    } else {
        return { Authorization: 'Bearer ' + '' };
    }
}