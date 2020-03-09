import React from 'react';
import '../App.css';

class SongDetails extends React.Component {
    render() {
        const {song} = this.props;
        return (
            <div className="footer bg-dark text-light song-details-style col-s-12 col-">
                <div className="media">
                    <img className=" mr-3 cover-style" src={song.album.cover_medium} alt="Album Cover" />
                    <div className="media-body">
                        <h5 className="mt-2">{song.title_short}</h5>
                        <p> <img src={song.artist.picture_small} alt="artist" /> {song.artist.name}</p>
                        <p><audio src={song.preview} className="col-s-12 col-m-8 col-8 col-l-4" controls autoPlay></audio></p>
                    </div>                
                </div>
            </div>
        )
    } 
}
export default SongDetails;