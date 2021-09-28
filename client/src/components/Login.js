import React from "react";

export default function Login() {
    return (
        <div>
            <form>
            <label htmlFor="email" >
                    E-mail:
                    <input type="email" name="email" id="email" placeholder="E-mail" />
                </label>
                <label htmlFor="password" >
                    Password:
                    <input type="password" name="password" id="password" placeholder="Password" />
                </label>
            </form>
        </div>
    );
}

