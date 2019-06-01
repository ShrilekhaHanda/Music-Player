import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import contact from './img/contact.JPG';
import search from './img/search.png';
import './index.css';
import Albums from './Albums';

class MusicPlayer extends Component {
    state= {
        inputValue: "",
        searchOutput: [],
        activeArtist: null
    }
   
    componentDidUpdate(){
        if(!this.state.searchOutput.length){
            this.setState({
                searchOutput: this.props.items,
                activeArtist: this.props.items[0]
            })
           
        }
    }
    changeHandler = async (e) => {
        let val = e.target.value.replace(" ", "+");
        this.setState({
            inputValue: e.target.value
        })
        
        const res = await this.props.base.get(`/search?q=${val}&type=artist`);
        this.setState({
            searchOutput: res.data.artists.items
        })
    }
    
  render(){
      let {activeArtist, searchOutput} = this.state;
      let { base } = this.props;
     return (searchOutput.length ? (
        <>
        <Col sm={12} className="artist-search my-4">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <img src={search} alt="seacrh" />
                    </span>
                </div>            
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search.." 
                    value={this.state.inputValue} 
                    onChange={this.changeHandler}
                />
            </div>
        </Col>

        <Col md={3} className="artist-cont py-4">
            <Row className="search-result">
                {searchOutput.map( (item, i) => {
                    if(i < 5){
                        return <Col sm={11} key={i} className="search-result-item mb-4 mx-auto p-2">
                            <div className="media" onClick={() => this.setState({ activeArtist: item })}>
                                <img src={item.images.length ? item.images[item.images.length -1].url : contact} alt="" className="mr-3"/>
                                <div className="media-body">
                                    <p className="mb-0"><strong>{item.name}</strong></p>
                                    <p className="mb-0">
                                        Genre: 
                                        {item.genres.map( genre => <span key={genre}>{genre}, </span>)}
                                    </p>
                                    <p className="mb-0">Popularity: {item.popularity}%</p>
                                    <p className="mb-0">Followers: {item.followers.total}</p>
                                </div>
                            </div>
                        </Col>
                    }
                    return true;                    
                })}
                
                
            </Row>
        </Col>        
        
        <Albums 
            item={activeArtist}
            base={base} 
            token={this.props.token}
        />
      
        <Col>
            {/* <Player /> */}
        </Col>
      </>
      ) : null)
    
  }
}

export default MusicPlayer;
