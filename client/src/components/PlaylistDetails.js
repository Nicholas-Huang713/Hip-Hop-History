import React from 'react';
import '../App.css';
import axios from 'axios';
import {getJwt} from '../helpers/jwt';
import {withRouter, Link} from 'react-router-dom';

class PlaylistDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: undefined,
            faveList: []
        } 
    }
    componentDidMount() {
        const jwt = getJwt();
        const {id} = this.props.match.params;
        axios({
            url: `/api/playlist/${id}`, 
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
   
    pushToList = (user) => {
        let list = user[0].favelist;
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
        this.setState({currentUser: user});
    }

    render() {
        const {currentUser, faveList} = this.state;
        const {chooseSong} = this.props;
        let name;
        if(currentUser === undefined){
            name = "";
        } 
        else{
            name = currentUser[0].firstname;
        }
        return (
            <div className="userlist-container">
                <div className="row">
                    <div className="col text-center"><h3>{name}'s Playlist</h3></div>
                    <div className="col text-center"><Link to="/dashboard"><button className="btn-sm btn-outline-dark">Back</button></Link></div>
                </div>
                 <div className="row">
                     <div className="col">
                         <div className="list-container">
                            <ul>
                                {
                                    faveList.map((song) => {
                                        return (
                                            <div key={song.id}>
                                                <button className="dashboard-song-button" onClick={() => chooseSong(song.id)}> 
                                                    <div className="media"> 
                                                        <img src={song.album.cover_small} alt="artist" />
                                                        <div className="media-body ml-3 mt-3">
                                                            <b>{song.artist.name}</b> - {song.title} 
                                                        </div>
                                                    </div>                                               
                                                </button>   
                                            </div>  
                                        )       
                                    })
                                }        
                            </ul>
                        </div>
                     </div>
                     <div className="col"></div>
                 </div>
            </div>
        );
    }
}    

export default withRouter(PlaylistDetails);