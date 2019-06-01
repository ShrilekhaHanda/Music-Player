
import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import MusicPlayer from "./MusicPlayer";
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

let base= null;

class App extends Component {
  state = {
      token: null,
      items: [],
      artistInfo: [],
      is_playing: "Paused",
      progress_ms: 0
    };
  
  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }
  }

  getCurrentlyPlaying = async (token) => {
    base = axios.create({
      baseURL: 'https://api.spotify.com/v1',
      headers: {'Authorization': `Bearer ${token}`}
    });
    const res = await base.get('/search?q=justin%20bieber&type=artist');
    this.setState({
       items: res.data.artists.items
    })   
  }
 
  render() {

    return (
      <div className="container-fluid pb-4">
        <Row className="h-100 justify-content-center">
            {!this.state.token && (
              <Col md={6} className="text-center mt-4 pt-4">
                  <a
                    className="btn btn-primary"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                      "%20"
                    )}&response_type=token&show_dialog=true`}
                  >
                  Login to Spotify
                </a>  
              </Col>
                      
            )}
            {this.state.token && (
              <MusicPlayer
                items={this.state.items}
                is_playing={this.state.is_playing}
                progress_ms={this.progress_ms}
                token={this.state.token}
                artistInfo={this.state.artistInfo}
                base={base}
              />
            )}
        </Row>
      </div>
    );
  }
}

export default App;