import React from 'react';
import { Col, Button } from 'react-bootstrap';
import contact from './contact.JPG';
import AudioPlayer from "react-h5-audio-player";

class Tracks extends React.Component{
    state = {
        tracks: [],
        albumStr: null,
        trackActive: null
    }
    componentDidMount(){
        this.artistDetail(this.props.albumId, this.props.base)
    }
    artistDetail = async (albumId, base) => {
        const res = await base.get(`/albums/${albumId.id}/tracks`);	
        this.setState({
            tracks: res.data.items,
            albumStr: albumId.id
        })
    }
    componentDidUpdate(){
        if(this.state.albumStr !== this.props.albumId.id){
             this.artistDetail(this.props.albumId, this.props.base);
        }
    }
    
    render(){
        let { tracks, trackActive } = this.state;
        let { albumId } = this.props;
        return( albumId ? (
            <>
                <Col xs={4} className="song-list my-4">
                    <div className="song-cont">
                        <div className="album-name row mr-2">
                            <Col xs={8} className="pr-0">                            
                            <h5>
                                {albumId.name.split('(')[0]}({albumId.total_tracks})                             
                            </h5>
                            </Col>
                            <Col xs={4} className="px-0 text-right">
                                <Button variant="link" className="p-0">Play All</Button>
                            </Col>
                            
                        </div>

                        {tracks.map( track => (
                            <div 
                                className={((trackActive) && (track.id === trackActive.id)) ? 'active album-details row m-2' : 'album-details row m-2'} 
                                key={track.id} 
                                onClick={() => this.setState({ trackActive: track})}
                            >
                                <Col xs={10} className="pr-0">                            
                                    <p 
                                        className='mb-0'>
                                        {track.name}                                        
                                    </p>
                                </Col>
                                <Col xs={2} className="px-0">
                                    <p className="px-0 mb-0">
                                        {((track.duration_ms/1000)/60).toFixed(2).split(".")[0]}:{((track.duration_ms/1000)/60).toFixed(2).split(".")[1]}
                                    </p>
                                </Col>
                                
                            </div>
                        ))}  
                    </div>
                                    
                    
                </Col>
                
                {trackActive ? <div className="preview-player">
                    <div className="media w-25">
                        <img src={albumId.images.length ? albumId.images[albumId.images.length -1].url : contact} alt="" className="mr-3"/>
                        <div className="media-body mt-3">
                            <p className="mb-0 text-light">{trackActive.name}</p>
                            <p className="mb-0 text-light">{trackActive.artists[0].name}</p>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                    <AudioPlayer
                        autoPlay
                        src={trackActive.preview_url}
                    />
                </div> : null
            }
                
            </>) : null
        )
    }
}

export default Tracks;