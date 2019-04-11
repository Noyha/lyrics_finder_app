import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Track from '../tracks/Track';
import { Row } from 'reactstrap';

class Tracks extends Component {
  render() {
    return (
        <Consumer>
            {value => {
                const { track_list, heading } = value;
                if(!track_list || track_list.length === 0) {
                    return <Spinner />;
                } else {
                    return (
                        <React.Fragment>
                            <h3 className="text-center mb-5">{ heading }</h3>
                            <Row className="justify-content-center">
                                {track_list.map(item => (
                                    <Track key={item.track.track_id} track={ item.track }/>
                                ))}
                            </Row>
                        </React.Fragment>
                    )
                }
            }}
        </Consumer>
    );
  }
}

export default Tracks;
