import React from 'react';
import '../App.css';
import {getJwt} from '../helpers/jwt';
import axios from 'axios';

class ListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            songList: [],
            stringList: []
        }
    }

    componentDidMount() {
        this.retrieveLists();
    }
    
    retrieveLists () {
        this.setState({
            songList: this.props.songList, 
            stringList: this.props.stringList
        });
    }

    likeSong = (id) => {
        const songId = id;
        const jwt = getJwt();
        axios({
            url: '/api/like',
            method: 'PUT',
            data: JSON.stringify(songId),
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
           console.log('User from DB: ' + JSON.stringify(res.data));
           this.setState({
               currentUser: res.data
           })
           this.props.renderPage();
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
    }

    unlikeSong = () => {
        this.setState({
            likeBtnClick: false
        })
    }

    render() {
        const {songList, stringList} = this.state;
       const {chooseSong} = this.props;
        
        return(
            <div></div>
        )
    }
}

export default ListContainer;