import React from 'react';
import '../App.css';

class SongDetails extends React.Component {
    render() {
        const {song} = this.props;
        return (
            <div className="bg-dark text-light song-details-style text-center">
                <div className="row">
                    <div className="col-sm-4">
                        <img className="cover-style" src={song.album.cover_medium} alt="Album Cover" />
                    </div>
                    <div className="col-sm mt-4">
                        <h4>{song.title_short}</h4>
                        <p> <img src={song.artist.picture_small}  alt="artist" /> {song.artist.name}</p>
                        <p><audio src={song.preview} className="audio-style" controls autoPlay></audio></p>
                    </div>
                    <div className="col-sm"></div>
                </div>
            </div>
        )
    } 
}
export default SongDetails;