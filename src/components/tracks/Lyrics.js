import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Spinner from '../layout/Spinner'

import { Card, CardBody, CardText, CardHeader, ListGroup, ListGroupItem } from 'reactstrap'

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }

  componentDidMount() {
    const cors = 'https://cors-anywhere.herokuapp.com';
    const BASE_URL = 'https://api.musixmatch.com/ws/1.1';
    
    fetch(
        `${cors}/${BASE_URL}/track.lyrics.get?track_id=${ this.props.match.params.id }&apikey=${
            process.env.REACT_APP_MM_KEY
        }`
    )
    .then(res => res.json())
    .then(data => {
      this.setState({ lyrics: data.message.body.lyrics.lyrics_body })

      return fetch(
              `${cors}/${BASE_URL}/track.get?track_id=${ this.props.match.params.id }&apikey=${
                  process.env.REACT_APP_MM_KEY
              }`
            );
    })
    .then(res => res.json())
    .then(data => this.setState({ track: data.message.body.track }))
    .catch(err => console.log(err))
  }

  render() {
    const { track, lyrics } = this.state;
    if(
      !track || 
      !lyrics || 
      Object.keys(track).length === 0 || 
      Object.keys(lyrics).length === 0
      ) {
        return <Spinner />;
      } else {
        return (
          <React.Fragment>
              <Link to="/" className="btn btn-color btn-back mb-4">Go Back</Link>
              <Card>
                <CardHeader tag="h5">
                  { track.track_name } by {' '}
                  <span className="text-muted">{ track.artist_name }</span>
                </CardHeader>
                <CardBody>
                  <CardText>
                    { lyrics }
                  </CardText>
                </CardBody>
            </Card>
            <ListGroup className="mt-3">
              <ListGroupItem>
                <strong>Track Rating</strong>: { track.track_rating }%
              </ListGroupItem>
              <ListGroupItem>
                <strong>Song Genre</strong>: {' '}
                { 
                  track.primary_genres.music_genre_list.length === 0 ? 'N/A' :
                  track.primary_genres.music_genre_list[0].music_genre.music_genre_name 
                }
              </ListGroupItem>
              <ListGroupItem>
                <strong>Explicit Words</strong>: { track.explicit === 0 ? 'No' : 'Yes' }
              </ListGroupItem>
              <ListGroupItem>
                <strong>Release Date</strong>: <Moment format="DD/MM/YYYY">{ track.updated_time }</Moment>
              </ListGroupItem>
            </ListGroup>
          </React.Fragment>
        );
      }
  }
}

export default Lyrics;
