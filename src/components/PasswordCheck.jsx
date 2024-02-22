import React from "react";
import { projectFirestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

class PasswordCheck extends React.Component {
    constructor(props) {
      super(props);
      this.state = { password: "", authenticated: false, truePassword: "" };
    }
  
    handlePasswordChange = (event) => {
      this.setState({ password: event.target.value });
    };
    
    async getTruePassword() {
      const docRef = doc(projectFirestore, "cloud_settings", "enter_password");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setState({ truePassword: docSnap.data().password });
      } else {
        console.log("No such document!");
      }
    }

    componentDidMount() {
      this.getTruePassword();
    }

    handleLogin = () => {
      // Zde by probíhalo ověření hesla, můžete využít například API volání k serveru
      // Po úspěšném ověření by se nastavila authenticated na true
      // get password from db 


      if (this.state.password === this.state.truePassword) {
        this.setState({ authenticated: true });
      }
    };
  
    render() {
      if (!this.state.authenticated) {
        return (
          <div className="bg-agRed w-screen h-screen flex items-center justify-center">
            <div>
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                <button onClick={this.handleLogin} className="blue-button">Přistoupit</button>
            </div>
          </div>
        );
      } else {
        return this.props.children;
      }
    }
  }

  export default PasswordCheck