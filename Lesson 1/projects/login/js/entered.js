$(document).ready(function() {

    let token = localStorage.getItem("token");
    const decodedHeader = jwtDecode(token);
    console.log(decodedHeader);
    
    document.getElementById('login').innerHTML = decodedHeader["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    document.getElementById('region').innerHTML = decodedHeader.region;
    document.getElementById('role').innerHTML = decodedHeader["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    document.getElementById('access').innerHTML = token;
    document.getElementById('refresh').innerHTML = decodedHeader.refresh_token;
})