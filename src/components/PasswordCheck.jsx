import React from "react";
import { projectFirestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from 'prop-types'; 

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
        const doc = docSnap.data();
        if (!doc.use){
          this.setState({ authenticated: true });
        }
        this.setState({ truePassword: doc.password });
      } else {
        console.log("No such document!");
      }
    }

    componentDidMount() {
      this.getTruePassword();
    }

    handleLogin = () => {

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

  PasswordCheck.propTypes = {
  children: PropTypes.node
};

  export default PasswordCheck