import React from 'react';
import '../App.css';
import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMsg: ""
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name] : value });
    }

    handleLogin = (event) => {
        const {email, password} = this.state;
        event.preventDefault();
        const currentUser = {
            email,
            password
        }
        axios({
            url: '/api/login',
            method: 'POST',
            data: currentUser 
        })
        .then((res) => {
            localStorage.setItem('token', res.data);
            this.props.history.push('/dashboard');
            this.props.renderPage();  
        })
        .catch((err) => {
            this.setState({errorMsg: err.response.data});
        });        
    }

    componentWillUnmount() {
        this.setState({
            email: "",
            password: "",
            errorMsg: ""
        })
    }

    render() {
        const {errorMsg} = this.state;
        return (
          <div className="logform-bg mt-3">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm">
                    <div className="logform-container mt-5">
                        <form className="logform-style" onSubmit={this.handleLogin}>
                            <h3 className="text-center">Login Here</h3>
                            <p className="text-danger text-center text-uppercase font-italic">{errorMsg}</p>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="text" 
                                        className="form-control"
                                        name="email"                            
                                        value={this.state.email}
                                        onChange={this.handleChange}                            
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" 
                                        className="form-control"
                                        name="password"                            
                                        value={this.state.password}
                                        onChange={this.handleChange}                            
                                    />
                            </div>
                            <button className="btn btn-dark">Login</button>
                        </form>
                    </div>
                </div>
                <div className="col-sm"></div>
            </div>
          </div>  
        )
    }
}
export default Login; 
