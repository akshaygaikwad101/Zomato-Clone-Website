import React, { Component } from "react";
import "../Styles/Home.css";
import "../Styles/Details.css";
import Modal from "react-modal";
import axios from "axios";
import { withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";

export class Header extends Component {
  constructor() {
    super();

    this.state = {
      createModalIsOpen: false,
      loginModalIsOpen: false,
      msgModalIsOpen: false,
      firstname: undefined,
      lastname: undefined,
      password: undefined,
      password2: undefined,
      username: undefined,
      user:[],
      message: undefined,
      isAuthenticated: localStorage.getItem("loginData") ? true : false,
      //eslint-disable-next-lin
      loginData: localStorage.getItem("loginData") 
          ? JSON.parse(localStorage.getItem("loginData")) : null,
    };
  }
  componentDidMount() {
    Modal.setAppElement(".head");
  }

  handleClick = () => {
    this.props.history.push(`/`);
  };

  createAccount = (state, value) => {
    this.setState({
      [state]: value,
    });
  };
  logOut = (state, value) => {
    localStorage.removeItem("loginData");
    this.setState({
      [state]: value,
      loginData: null,
    });
  };
  loginAccount = (state, value) => {
    this.setState({
      [state]: value,
      msgModalIsOpen: false,
    });
  };
  signUp = (e) => {
    const { firstname, lastname, username, password, password2 } = this.state;
    e.preventDefault();

    if (!firstname || !lastname || !username || !password) {
      alert("Please fill all the fields");
    } else if (password !== password2) {
      alert("Password does not match");
    } else {
      const userObj = {
        firstname,
        lastname,
        username,
        password,
      };

      axios({
        method: "POST",
        url: "https://guarded-dusk-22777.herokuapp.com/usersignup",
        headers: { "Content-Type": "Application/json" },
        data: userObj,
      })
        .then((response) => {
          this.setState({ message: response.data.message });
        })
        .catch((err) => {
          this.setState({ message: err.response.data.message });
        });
      this.setState({
        msgModalIsOpen: true,
        createModalIsOpen: false,
        firstname: undefined,
        lastname: undefined,
        username: undefined,
        password: undefined,
      });
    }
  };
  signIn = (e) => {
    const { username, password } = this.state;
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill all the fields");
    } else {
      const userObj = {
        username,
        password,
      };

      axios({
        method: "POST",
        url: "https://guarded-dusk-22777.herokuapp.com/userlogin",
        headers: { "Content-Type": "Application/json" },
        data: userObj,
      })
        .then((response) => {
          this.setState({
            user: response.data.response[0],
            isAuthenticated: response.data.isAuthenticated,
            loginModalIsOpen: false,
          });
          localStorage.setItem(
            "loginData",
            JSON.stringify(response.data.response[0])
          );
        })
        .catch((err) => console.log(err));
    }
  };

  handleInputChange = (state, event) => {
    this.setState({
      [state]: event.target.value,
    });
  };
  handleGoogleFailure = (err) => {
    console.log(err);
  };

  handleGoogleLogin = (response) => {
    this.setState({
      user: response.profileObj,
      isAuthenticated: true,
      loginModalIsOpen: false,
      createModalIsOpen: false,
    });
    localStorage.setItem("loginData", JSON.stringify(response.profileObj));
  };

  render() {
    const customStyles = {
      content: {
        zIndex: "10000",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
    const {
      createModalIsOpen,
      msgModalIsOpen,
      loginModalIsOpen,
      user,
      message,
      isAuthenticated,
      loginData,
    } = this.state;

    return (
      <div className="head">
        <div className="navbar bg">
          <div className="container">
            <div className="icon">
              <img
                src="Assets/Zomato-logo1.png"
                alt=""
                onClick={this.handleClick}
              />
            </div>
            <div className="nav-btn">
              {isAuthenticated ? (
                <span style={{ color: "white", marginRight: "10px" }}>
                  {!loginData
                    ? `Welcome ${user.givenName || user.firstname}!`
                    : `Welcome ${loginData.givenName || loginData.firstname}!`}
                </span>
              ) : (
                <input
                  className="button"
                  type="button"
                  value="Login"
                  onClick={() => this.loginAccount("loginModalIsOpen", true)}
                />
              )}
              {isAuthenticated ? (
                <input
                  className="create-account"
                  type="button"
                  value="Log Out"
                  onClick={() => {
                    this.logOut("isAuthenticated", false);
                    this.handleClick();
                  }}
                />
              ) : (
                <input
                  className="create-account"
                  type="button"
                  value="Create an account"
                  onClick={() => this.createAccount("createModalIsOpen", true)}
                />
              )}
            </div>
          </div>
        </div>
        <Modal isOpen={createModalIsOpen} style={customStyles}>
          <div className="modal-container">
            <i
              className="fas fa-times-circle"
              onClick={() => this.createAccount("createModalIsOpen", false)}
            ></i>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputName">First Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Enter First Name"
                  onChange={(event) =>
                    this.handleInputChange("firstname", event)
                  }
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName">Last Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Enter Last Name"
                  onChange={(event) =>
                    this.handleInputChange("lastname", event)
                  }
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(event) =>
                    this.handleInputChange("username", event)
                  }
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={(event) =>
                    this.handleInputChange("password", event)
                  }
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-enter Password"
                  onChange={(event) =>
                    this.handleInputChange("password2", event)
                  }
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
              <br />
              <button
                type="submit"
                className="pay"
                style={{
                  float: "left",
                  marginRight: "20px",
                  height: "44px",
                  marginBottom: "20px",
                }}
                onClick={(event) => this.signUp(event)}
              >
                Sign Up
              </button>
              <GoogleLogin
                clientId="1063915192508-anc0rb46t9eijvt5204fa2rkjo6bfn0e.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={this.handleGoogleLogin}
                onFailure={this.handleGoogleFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            </form>
          </div>
        </Modal>
        <Modal isOpen={msgModalIsOpen} style={customStyles}>
          <div>
            <i
              className="fas fa-times-circle"
              onClick={() => this.loginAccount("createModalIsOpen", false)}
            ></i>
            <h4>{message}</h4>
            <span>click here to </span>
            <small
              onClick={() => this.loginAccount("loginModalIsOpen", true)}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Login
            </small>
          </div>
        </Modal>
        <Modal isOpen={loginModalIsOpen} style={customStyles}>
          <div className="modal-container">
            <i
              className="fas fa-times-circle"
              onClick={() => this.loginAccount("loginModalIsOpen", false)}
            ></i>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputName">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(event) =>
                    this.handleInputChange("username", event)
                  }
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={(event) =>
                    this.handleInputChange("password", event)
                  }
                />
                <small id="emailHelp" className="form-text text-muted"></small>
              </div>
              <br />
              <button
                type="submit"
                className="pay"
                style={{
                  float: "left",
                  marginRight: "20px",
                  height: "44px",
                  marginBottom: "20px",
                }}
                onClick={(event) => this.signIn(event)}
              >
                Sign In
              </button>
              <GoogleLogin
                clientId="1063915192508-anc0rb46t9eijvt5204fa2rkjo6bfn0e.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={this.handleGoogleLogin}
                onFailure={this.handleGoogleFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Header);