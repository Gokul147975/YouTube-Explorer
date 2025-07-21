import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoDetails } from '../api/Youtube';
import { Container, Button, Spinner } from 'react-bootstrap';

export default function VideoDetail() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchVideoDetails(id).then(data => setVideo(data));
        const savedItems = JSON.parse(localStorage.getItem('watchLater')) || [];
        setSaved(savedItems.includes(id));
    }, [id]);

    const handleWatchLater = () => {
        const savedItems = JSON.parse(localStorage.getItem('watchLater')) || [];
        if (!savedItems.includes(id)) {
            savedItems.push(id);
            localStorage.setItem('watchLater', JSON.stringify(savedItems));
            setSaved(true);
        }
    };

    if (!video) return <Spinner animation="border" />;

    return (
        <Container className="py-4">
            <h2 className="mb-3">{video.snippet.title}</h2>
            <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
            />
            <p>{video.snippet.description}</p>
            <p>Views: {video.statistics.viewCount}</p>
            <p>Likes: {video.statistics.likeCount}</p>

            <Button variant={saved ? "success" : "outline-primary"} onClick={handleWatchLater}>
                {saved ? "Saved to Watch Later" : "Add to Watch Later"}
            </Button>
        </Container>
    );
}
