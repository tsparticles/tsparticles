import React from 'react'

export default function Login() {
    return (
        <div>
            <div class="container">
                <div class="card card-container">
                    <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                    <p id="profile-name" class="profile-name-card"></p>
                    <form class="form-signin">
                    <span id="reauth-email" class ="reauth-email"></span>
                    <input type ="email" id="inputEmail" class ="form-control" placeholder="Email address" required autofocus/>
                    <input type ="password" id="inputPassword" class ="form-control" placeholder="Password" required/>
                    <div id="remember" class ="checkbox">
                    <label>
                    <input type ="checkbox" value="remember-me"/> Remember me
                    </label>
                    </div>
                    <button class ="btn btn-lg btn-primary btn-block btn-signin" type ="submit">Sign in</button>
                    </form>
                    <a href="#" class ="forgot-password">
                    Forgot the password?
                    </a>
                    </div>
                </div>


            </div>
            )
}
