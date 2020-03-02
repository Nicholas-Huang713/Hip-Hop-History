import React from 'react';
import {getJwt} from '../helpers/jwt';
import axios from 'axios';

class ChooseTheme extends React.Component {
    constructor(props){
        super(props);
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
        .catch((err) => {console.log('Error:' + err)});
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
            .catch((error)=>{console.log(error)}) ;  
        }
    }
   
    render() {
        const {faveList} = this.state;
        const {chooseSong} = this.props;
        return (
            <div > </div>  
        )
    }
}

export default ChooseTheme;