import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import EraList from './components/EraList';
import DashBoard from './components/DashBoard';
import NavBar from './components/NavBar';
import AllMusic from './components/AllMusic';
import axios from 'axios';
import logo from './images/logo.png';
import SongDetails from './components/SongDetails';
import PlaylistDetails from './components/PlaylistDetails';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      randomList: [],
      seventyList: [],
      eightyList: [],
      ninetyList: [],
      currentSong: undefined
    }
  }

  componentDidMount() {
    const seventyIds = [3824597, 3824607, 131224316, 458844802, 65724608, 409962402, 409962392, 541741502, 1580525, 73526356, 511626682];
    const eightyIds = [2300829, 3200551, 116945540, 112658750, 409962042, 12343556, 78034213, 116945536, 6627454, 2300839, 623723392];
    const ninetyIds = [627421302, 70816229, 3616616, 66027422, 377242021, 77096692, 65938214, 409964442, 15220137, 66853804];
    const seventyList = [];
    const eightyList = [];
    const ninetyList = [];
    const randomList = [];
    for(const [index, value] of seventyIds.entries()) {
      axios({
          "method":"GET",
          "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${value}`,
          "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
          }
      })
      .then((response)=>{
          seventyList.push(response.data);
          randomList.push(response.data);
      })
      .catch((error)=>{
          console.log(error);
      })    
    }
    for(const [index, value] of eightyIds.entries()) {
      axios({
          "method":"GET",
          "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${value}`,
          "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
          }
          })
          .then((response)=>{
            eightyList.push(response.data);
            randomList.push(response.data);
          })
          .catch((error)=>{
            console.log(error);
      })     
    }
    for(const [index, value] of ninetyIds.entries()) {
      axios({
          "method":"GET",
          "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${value}`,
          "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
          }
          })
          .then((response)=>{
            ninetyList.push(response.data);
            randomList.push(response.data);
          })
          .catch((error)=>{
            console.log(error);
      })      
    }
    this.setState({ seventyList, eightyList, ninetyList, randomList });
  }

  chooseSong = (id) => {
    axios({
        "method":"GET",
        "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${id}`,
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key":"97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e"
        }
        })
        .then((response) =>{
          this.setState({currentSong : response.data})
        })
        .catch((error)=>{
          console.log(error)
    })    
  }

  handleDiscover = () => {
    const {randomList} = this.state;
    const total = randomList.length;
    const randNum = Math.floor(Math.random() * total);
    const randSong = randomList[randNum];
    this.setState({
        hasClicked: true,
        currentSong: randSong
    })
  }

  resetState = () => {
    this.setState({ currentSong: undefined });
    this.renderPage();
  }

  renderPage = () => {
    this.forceUpdate();
  }

  render() {
    const {currentSong} = this.state;
    return (
      <div>
        <Router> 
          <nav className="navbar navbar-light bg-dark">
                <div className="navbar-brand text-white">
                  <Link to="/"><img src={logo} className="logo border-white mr-1" alt="logo"/></Link>
                   <span className="h2">Hip Hop History</span>
                </div> 
          </nav>
          <NavBar handleDiscover={this.handleDiscover} resetState={this.resetState}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" render={(props) => <Login {...props} renderPage={this.renderPage} />} />
            <Route path="/register" render={(props) => <Registration {...props} renderPage={this.renderPage} />} />
            <PrivateRoute>
              <Route exact path='/dashboard' render={(props) => <DashBoard {...props} chooseSong={this.chooseSong} renderPage={this.renderPage} />} />
              <Route path='/dashboard/:id' render={(props) => <PlaylistDetails {...props} chooseSong={this.chooseSong}/>} />
              <Route exact path='/browse' component={AllMusic} />
              <Route path='/browse/:era' render={(props) => 
                <EraList {...props} seventyList={this.state.seventyList} eightyList={this.state.eightyList} ninetyList={this.state.ninetyList} renderPage={this.renderPage} chooseSong={this.chooseSong} />} 
              />
            </PrivateRoute>
          </Switch>
        </Router> 
        {
          (currentSong && localStorage.getItem("token")) ?
          <SongDetails song={currentSong}/> 
          :
          <span></span>   
        }
      </div> 
    );
  }
}
export default App;
