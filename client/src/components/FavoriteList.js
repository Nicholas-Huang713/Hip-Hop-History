import React from 'react';
import {getJwt} from '../helpers/jwt';
import axios from 'axios';
import '../App.css';

class FavoriteList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: [],
            faveList: []
        }
    }

    componentDidMount(){
        this.retrieveUser();
    }

    retrieveUser = () => {
        const jwt = getJwt();
        axios({
            url: '/api/getuser',
            method: 'GET',
            headers: {'Authorization' : `Bearer ${jwt}`}
        })
        .then((res) => {
            const user = res.data;
            this.setState({currentUser: user});
            this.pushToList(user[0].favelist);
        })
        .catch((err) => {
            console.log('Error:' + err);
        });
    }

    pushToList(list){
        if(list.length === 0){
            this.setState({faveList: []});
        }
        let updatedList = [];
        let realList = [];
        for(let i = 0; i < list.length; i++){
            updatedList.push(Object.keys(list[i]));
        }
        for(let i = 0; i < updatedList.length; i++){
            axios({
                "method":"GET",
                "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${updatedList[i]}`,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
                }
            })
            .then((response)=>{
                realList.push(response.data);
                this.setState({faveList: realList});
            })
            .catch((error)=>{
                console.log(error);
            })   
        }
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
        const {faveList} = this.state;
        const {chooseSong} = this.props;
        return (
            <div>
               {
                    faveList.map((song) => {
                        return (
                            <div key={song.id}>
                                <button className="favorite-list-unlike-button" onClick={() => this.unlikeSong(song.id)}>X</button>
                                <button className="btn dashboard-song-button" onClick={() => chooseSong(song.id)}> 
                                    <div className="media"> 
                                    <div className="view zoom"><img src={song.album.cover_small} alt="artist" /></div>
                                        
                                        <div className="media-body ml-3 mt-3">
                                            <b>{song.artist.name}</b> - {song.title} 
                                        </div>
                                    </div>                                        
                                </button>   
                            </div>  
                        )       
                    })
                }                                               
            </div> 
        )
    }
}

export default FavoriteList;