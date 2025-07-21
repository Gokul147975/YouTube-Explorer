import { Container } from 'react-bootstrap';

export default function NotFound() {
    return (
        <Container className="py-4 text-center">
            <h1 className="display-4">404 - Page Not Found</h1>
            <p>Looks like you're lost. <a href="/">Go Home</a></p>
        </Container>
    );
}
