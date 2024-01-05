import React from 'react'
import signInWithGoogleFunction from '../functions/singInWithGoogle'

const LogWithGoogle = () => {
    const alertAndLogin = () => {
        alert("Přihlásit se")
        signInWithGoogleFunction()
    }
  return (
    <div className="card">
        <h1>Přihlásit se pomocí Googlu</h1><br />
        <button onClick={alertAndLogin} className="red-button">Přihlásit se</button>
    </div>
  )
}

export default LogWithGoogle