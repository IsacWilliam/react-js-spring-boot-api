import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';
import logoImage from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function Books() {

    const [books, setBooks] = useState([]);
    const username = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');

    const history = useNavigate();

    async function logout() {
        localStorage.clear();
        history('/');
    }

    async function deleteBook(id) {
        try {
            await api.delete(`api/book/v1/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setBooks(books.filter(book => book.id !== id));
        } catch (err) {
            alert('Delete failed! try again!');
        }
    }

    useEffect(() => {
        api.get('api/book/v1', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                page: 1,
                limit: 3,
                direction: 'ASC'
            }
        }).then(response => {
            setBooks(response.data._embedded.bookVoes);
        });
    });

    return (
        <div className="book-container">
            <header>
                <img src={logoImage} alt="Isac" />
                <span>Welcome, <strong>{username.toUpperCase()}</strong>!</span>
                <Link className="button" to="/book/new">Add New Book</Link>
                <button onClick={logout} type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>Title:</strong>
                        <p>{book.title}</p>

                        <strong>Author:</strong>
                        <p>{book.author}</p>

                        <strong>Price:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>

                        <strong>Release Date:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>

                        <button type="button">
                            <FiEdit size={20} color="#251FC5" />
                        </button>
                        <button onClick={() => deleteBook(book.id)} type="button">
                            <FiTrash2 size={20} color="#251FC5" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
