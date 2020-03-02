import React from 'react';
import {getJwt} from '../helpers/jwt';
import '../App.css';

class AllMusic extends React.Component {
    componentDidMount() {
        const jwt = getJwt();
        if(!jwt) this.props.history.push('/login');
    }

    render() {
        return(
            <div className="browse-bg-style mt-2 text-white text-center">
                <h1>Choose an era to listen to</h1>
            </div>
        )
    }
}
export default AllMusic; 