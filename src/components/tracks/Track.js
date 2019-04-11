import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardText, Col } from 'reactstrap';

const Track = props => {
  const { track } = props;
  return (
    <Col md={{ size: 5 }}>
        <Card body className="mb-5 shadow-sm text-center">
            <h5>{ track.artist_name }</h5>
            <CardText>
                <strong><i className="fas fa-play"></i> Track</strong>
                : { track.track_name }
                <br/>
                <strong><i className="fas fa-compact-disc"></i> Album</strong>
                : { track.album_name }
            </CardText>
            <Link 
                to={`lyrics/track/${ track.track_id }`} 
                className="btn btn-block btn-color"
            >
                <i className="fas fa-angle-right"></i> View Lyrics
            </Link>
        </Card>
    </Col>
  )
}

export default Track;