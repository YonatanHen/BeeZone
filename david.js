// Email and password are send in different req's.

//email
axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZBOSJAJEyqr6uAHwxmz-IpFC8gLdErdg` , {
    idToken: "<The token that should be saved in sessionStorage>",
    email: "<the new email>",
    returnSecureToken: "<true or false>"
})
// docs: https://firebase.google.com/docs/reference/rest/auth#section-change-email

//password
axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZBOSJAJEyqr6uAHwxmz-IpFC8gLdErdg` , {
    idToken: "<The token that should be saved in sessionStorage>",
    password: "<the new password>",
    returnSecureToken: "<true or false>"
})
// docs: https://firebase.google.com/docs/reference/rest/auth#section-change-password
