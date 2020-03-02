import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            browsePage: false
        }
    }
    removeToken = () => {
        localStorage.removeItem("token");
        this.props.resetState();
        this.props.history.push('/');
    };

    handleBrowseClick = () => {
        this.setState({browsePage: true});
        this.props.history.push('/browse');
    };

    handleDashboardClick = () => {
        this.setState({browsePage: false});
        this.props.history.push('/dashboard');
    };

    handleSeventies = () => {
        this.props.history.push('/browse/70');
    }
    
    handleEighties = () => {
        this.props.history.push('/browse/80');
    }

    handleNineties = () => {
        this.props.history.push('/browse/90');
    }

    render() {
        const {browsePage} = this.state;
        return (
            <div>
                {
                    localStorage.getItem("token") ? 
                        <div className="container  mt-3">
                            <div className="row">
                                <div className="col text-left">
                                    {
                                        (localStorage.getItem("token") && browsePage) ? 
                                        <button className="btn btn-outline-dark" onClick={this.handleDashboardClick}>Dashboard</button>
                                        :
                                        <button className="btn btn-outline-dark" onClick={this.handleBrowseClick}>Browse Music</button>
                                    }
                                </div>
                                <div className="col">
                                    {
                                        (localStorage.getItem("token") && browsePage) ? 
                                        <div className="btn-group btn-group-lg" role="group" aria-label="Button Navigation">
                                            <button type="button" className="btn btn-info" onClick={this.props.handleDiscover}>Discover</button>
                                            <button type="button" className="btn btn-outline-dark" onClick={this.handleSeventies}>70's</button>
                                            <button type="button" className="btn btn-outline-dark" onClick={this.handleEighties}>80's</button>
                                            <button type="button" className="btn btn-outline-dark" onClick={this.handleNineties}>90's</button>
                                        </div>
                                        :
                                        <span></span>
                                    }
                                </div>
                                <div className="col text-right">
                                    <button className="btn btn-outline-dark" onClick={this.removeToken}>Logout</button>
                                </div>
                            </div>
                        </div>
                    :
                        <div className="container text-center mt-3">
                            <div className="btn-group btn-group-lg" role="group" aria-label="Button Navigation">
                                <Link to="/login"><button type="button" className="btn btn-outline-dark">Login</button></Link>
                                <Link to="/register"><button type="button" className="btn btn-outline-dark">Register</button></Link>
                            </div>
                        </div>
                }
            </div>
        )
    }
}
export default withRouter(NavBar);