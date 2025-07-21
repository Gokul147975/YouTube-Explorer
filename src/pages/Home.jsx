import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchVideos } from '../api/Youtube';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';

export default function Home() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const query = params.get('q') || 'React Tutorials';

    useEffect(() => {
        setLoading(true);
        fetchVideos(query).then(data => {
            setVideos(data);
            setLoading(false);
        });
    }, [query]);

    const handleWatchLater = (video) => {
        const existing = JSON.parse(localStorage.getItem('watchLater')) || [];
        const isExist = existing.find(item => item.id.videoId === video.id.videoId);
        if (!isExist) {
            existing.push(video);
            localStorage.setItem('watchLater', JSON.stringify(existing));
            alert('Added to Watch Later');
        } else {
            alert('Already in Watch Later');
        }
    };

    return (
        <Container className="py-4">
            <h2 className="text-center mb-4">Results for: {query}</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
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
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => handleWatchLater(video)}
                                    >
                                        + Watch Later
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}
