import React, { Component } from 'react';
import { Consumer } from '../../context';

import { Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';

class Search extends Component {
  state = {
    track_title: ''
  }

  handelInputChange = e => {
      this.setState({ [e.target.name]: e.target.value })
  }

  handelFormSubmit = (dispatch, e) => {
    e.preventDefault();

    const cors = 'https://cors-anywhere.herokuapp.com';
    const BASE_URL = 'https://api.musixmatch.com/ws/1.1';
    
    fetch(
        `${cors}/${BASE_URL}/track.search?q_track=${ this.state.track_title }&page_size=10&page=1&s_track_rating=desc&apikey=${
            process.env.REACT_APP_MM_KEY
        }`
    )
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: 'SEARCH_TRACKS',
            payload: data.message.body.track_list
        });
        this.setState({ track_title: '' })
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
        <Consumer>
            {value => {
                const { dispatch } = value;
                return (
                    <Card className="mb-5">
                        <CardBody>
                            <h1 className="dispaly-4 text-center">
                                <i className="fas fa-music"></i> Search For A Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <Form onSubmit={ this.handelFormSubmit.bind(this, dispatch) }>
                                <FormGroup>
                                    <Input 
                                        type="search" 
                                        name="track_title" 
                                        placeholder="Song Title..." 
                                        className="form-control-lg"
                                        value={ this.state.track_title }
                                        onChange={ this.handelInputChange }
                                    />
                                </FormGroup>
                                <Button className="btn-block btn-lg btn-color">Get Track Lyrics</Button>
                            </Form>
                        </CardBody>
                    </Card>
                );
            }}
        </Consumer>
    )
  }
}

export default Search;
