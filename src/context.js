import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list: action.payload,
                heading: 'Search Results'
            }
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        track_list: [],
        heading: 'Top 10 Tracks',
        dispatch: action => this.setState(state => reducer(state, action))
    }

    componentDidMount() {
        const cors = 'https://cors-anywhere.herokuapp.com';
        const BASE_URL = 'https://api.musixmatch.com/ws/1.1';
        
        fetch(
            `${cors}/${BASE_URL}/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
                process.env.REACT_APP_MM_KEY
            }`
        )
        .then(res => res.json())
        .then(data => this.setState({ track_list: data.message.body.track_list }))
        .catch(err => console.log(err))
    }

    render() {
    return (
        <Context.Provider value={ this.state } >
            { this.props.children }
        </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
