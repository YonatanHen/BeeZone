export const userService = {
      login,
      logout,
      // getAll
};

const key = "AIzaSyAZBOSJAJEyqr6uAHwxmz-IpFC8gLdErdg";


function login(email, password) {
      const requestOptions = {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                  email,
                  password
            })
      };
      const loginApiUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

      return fetch(`${loginApiUrl}+${key}`, requestOptions)
            .then(handleResponse)
            .then(user => {
                  // login successful if there's a user in the response
                  if (user) {
                        // store user details and basic auth credentials in local storage 
                        // to keep user logged in between page refreshes
                        user.authdata = window.btoa(email + ':' + password);
                        localStorage.setItem('user', JSON.stringify(user));
                  }

                  return user;
            });
}

function logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('user');
}

// function getAll() {
//       const requestOptions = {
//             method: 'GET',
//             headers: authHeader()
//       };

//       return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
      return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                  if (response.status === 401) {
                        // auto logout if 401 response returned from api
                        logout();
                        // eslint-disable-next-line no-restricted-globals
                        location.reload(true);
                  }

                  const error = (data && data.message) || response.statusText;
                  return Promise.reject(error);
            }

            return data;
      });
}