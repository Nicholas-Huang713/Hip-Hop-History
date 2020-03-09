import React from 'react';
import axios from 'axios';
import '../App.css';
import {getJwt} from '../helpers/jwt';
import unliked from './images/unliked.png';
import liked from './images/liked.png';

class EraList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: undefined,
            stringList: undefined
        }
    }

    componentDidMount() {
        this.retrieveUser();
    }

    retrieveUser(){
        const jwt = getJwt();
        axios({
            url: '/api/getuser',
            method: 'GET',
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            const user = res.data;  
            this.pushToList(user);          
        })
        .catch((err) => {
            console.log('Error:' + err);
        }); 
    }

    pushToList(user){
        let list = user[0].favelist;
        let updatedList = [];
        for(let i = 0; i < list.length; i++){
            updatedList.push(parseInt(Object.keys(list[i])));
        }
        this.setState({
            stringList: updatedList, 
            currentUser: user
        })
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
        .then(() => {
            this.retrieveUser();
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
    }

    unlikeSong = (id) => {
        const jwt = getJwt();
        axios({
            url: '/api/unlike',
            method: 'PUT',
            data: JSON.stringify(id),
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then(() => {
            this.retrieveUser();
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
    }
    
    render() {
        const {chooseSong, seventyList, eightyList, ninetyList} = this.props;
        const {currentUser, stringList} = this.state;
        const {era} = this.props.match.params;
        if(currentUser === undefined && stringList === undefined){
            return <div><h1>Loading...</h1></div>
        }
        let bgUrl;
        let songList;
        if(era === "70"){
            bgUrl = 'seventy-bg-style';
            songList = seventyList;
        }else if(era ==="80"){
            bgUrl = 'eighty-bg-style';
            songList = eightyList;
        }else{
            bgUrl = 'ninety-bg-style';
            songList = ninetyList;
        }
        return( 
            <div className={`mt-2 text-left dashboard-height ${bgUrl}`}>
                <div className="era-title col-l-3 col-m-6 col-4 col-s-12"><h1 className="text-white bg-dark">The {era}'s</h1></div>
                <div className="list-container">                
                    {
                        songList.map((song) => {
                            return (
                                <div className="list-style" key={song.id}>
                                        {
                                            stringList.includes(parseInt(song.id)) ?
                                            <img onClick={() => this.unlikeSong(song.id)} src={liked} className="like-button" alt="like button" />
                                            :
                                            <img onClick={() => this.likeSong(song.id)} src={unliked} className="like-button" alt="unlike button" />
                                        }
                                        <button className="song-button col-s-12 col-l-4 col-5 col-m-9 text-left" onClick={() => chooseSong(song.id)}> 
                                            <img src={song.album.cover_small} alt="artist" /> 
                                            <b>{song.artist.name}</b> - {song.title} 
                                        </button>   
                                </div>
                            )       
                        })
                    }
                </div>
            </div>   
        )
    }
}

export default EraList;