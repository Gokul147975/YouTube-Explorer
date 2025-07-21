import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Form, Button } from 'react-bootstrap';

export default function Header() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        updateHistory(query);
        navigate(`/?q=${query}`);
    };

    const updateHistory = (term) => {
        let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        history = history.filter(item => item !== term);
        history.unshift(term);
        if (history.length > 5) history.pop();
        localStorage.setItem('searchHistory', JSON.stringify(history));
    };

    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">YouTube Search</Navbar.Brand>
                <Form className="d-flex" onSubmit={handleSubmit}>
                    <Form.Control
                        type="search"
                        placeholder="Search videos..."
                        className="me-2"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" variant="outline-light">Search</Button>
                </Form>
            </Container>

            <Container className="mt-2">
                <div className="d-flex gap-2">
                    {history.map((item, idx) => (
                        <Button
                            key={idx}
                            variant="outline-light"
                            size="sm"
                            onClick={() => {
                                setQuery(item);
                                navigate(`/?q=${item}`);
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                </div>
            </Container>
        </Navbar>
    );
}
