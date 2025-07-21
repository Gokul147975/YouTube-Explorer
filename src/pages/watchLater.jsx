import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function WatchLater() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('watchLater')) || [];
        setVideos(stored);
    }, []);

    const handleRemove = (id) => {
        const updated = videos.filter(item => item.id.videoId !== id);
        localStorage.setItem('watchLater', JSON.stringify(updated));
        setVideos(updated);
    };

    return (
        <Container className="py-4">
            <h2>Your Watch Later List</h2>
            <Row>
                {videos.map(video => (
                    <Col md={4} key={video.id.videoId} className="mb-4">
                        <Card>
                            <Link to={`/video/${video.id.videoId}`}>
                                <Card.Img variant="top" src={video.snippet.thumbnails.medium.url} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{video.snippet.title}</Card.Title>
                                <Card.Text>{video.snippet.channelTitle}</Card.Text>
                                <Button
                                    variant="danger"
                                    onClick={() => handleRemove(video.id.videoId)}
                                >
                                    Remove
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
