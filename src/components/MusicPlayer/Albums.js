import React from 'react';
import { Row, Col } from 'react-bootstrap';
import contact from './contact.JPG';
import Tracks from './Tracks';
import img from './Amenity.jpg';


class Albums extends React.Component{
    state={
        albums: [],
        albumId: null,
        artistId: null
    }
    componentDidMount(){
        this.artistDetail(this.props.item, this.props.base)
    }
    artistDetail = async (item, base) => {
        const res = await base.get(`/artists/${item.id}/albums`);
        this.setState({
            albums: res.data.items,
            artistId: this.props.item.id,
            albumId: null
        })
    }
    componentDidUpdate(){
        if(this.state.artistId !== this.props.item.id){
             this.artistDetail(this.props.item, this.props.base);
        }
    }
    render(){
        let { albums, albumId } = this.state;
        let { item, base } = this.props;
        return(albums.length ?(
            <>
             <Col md={9} >
                <Row className="mx-1 albums-main">
                    <Col xs={12} className="artist-img">
                        <img src={(item.images && item.images.length) ? item.images[0].url : img} alt="artist" />
                        
                        <h6 className="mt-4 pt-4 ml-4">Artist</h6>
                        <h2 className="ml-4 pb-4">{item.name}</h2> 
                    </Col>
                    
                    <Col className={albumId ? "artist-albums mt-4 col-8" : "artist-albums mt-4 col-12"}>
                        <Row>
                            {albums.map(album => (
                                <Col xs={4} key={album.id} className="albums-cont mb-4">
                                    <div className="album-container" onClick={ () => this.setState({ albumId: album})}>
                                        <img src={album.images.length ? album.images[0].url : contact} alt="artist" />
                                        <div className="albums">
                                            <p className="mb-0 text-light">
                                                {album.artists.map( (obj) => <strong key={obj.id}>{obj.name}, </strong>)}                                                

                                            </p>
                                            <p className="mb-0 text-light">
                                                Album: {album.name}
                                            </p>
                                            <p className="mb-0 text-light">
                                                Songs: {album.total_tracks}
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                            
                        </Row>
                    </Col>
                    {albumId ? 
                        <Tracks 
                            albumId={albumId}
                            base={base}
                            token={this.props.token} 
                        /> : null
                    }
                </Row>            
            </Col>
            
            </>) : null
        )
    }
}

export default Albums;