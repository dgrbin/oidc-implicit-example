document.getElementById('login').addEventListener("click", redirectToLogin, false);
document.getElementById('clear').addEventListener("click", clearUrl, false);

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;


function currentURLWithoutHash() {
  return window.location.href.split('#')[0];
}

var mgr = new Oidc.UserManager({
    authority: 'https://accounts.google.com/',
    client_id: '295915365156-q9ejiq0cdeubab3v4fg4r188bltf0mti.apps.googleusercontent.com',
    redirect_uri: currentURLWithoutHash(),
    response_type: 'id_token token',
    scope: 'openid profile email',

    filterProtocolClaims: true,
    loadUserInfo: true
});

//
// Redirect to Google to authenticate the user
//
function redirectToLogin(e) {
  e.preventDefault();

  mgr.signinRedirect({state:'some data'}).then(function() {
      console.log("signinRedirect done");
  }).catch(function(err) {
      console.log(err);
  });
}

function clearUrl(e) {
  e.preventDefault();
  window.location = currentURLWithoutHash();
}

//
// Handle the authentication response returned
// by Google after the user has attempted to authenticate
//
function processLoginResponse() {
  mgr.signinRedirectCallback().then(function(user) {
      console.log("signed in", user);

      document.getElementById("loginResult").innerHTML = '<h3>Success</h3><pre><code>' + JSON.stringify(user, null, 2) + '</code></pre>'

  }).catch(function(err) {
      console.log(err);
  });
}

//
// Look out for a authentication response
// then log it and handle it
//
if (window.location.href.indexOf("#") >= 0) {
  processLoginResponse();
}
