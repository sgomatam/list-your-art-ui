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
        /* 
          Commenting until resolved
          Access to XMLHttpRequest at 'http://lya-api.us-east-2.elasticbeanstalk.com/api/art/add' from origin 'http://list-your-art-ui.s3-website.us-east-2.amazonaws.com' 
          has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
        */
        return { Authorization: 'Bearer ' + user.accessToken };

        //return { Authorization: 'Bearer ' + '' };
        //return { Authorization: 'Bearer ' + getCookie('USERID') }; //Enable when cookie is set correctly
    } else {
        return { Authorization: 'Bearer ' + '' };
    }
}