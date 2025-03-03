import React from "react";
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import logoImage from '../../assets/logo.svg';
import './styles.css';

export default function Book() {
    return (
        <div className="book-container">
            <header>
                <img src={logoImage} alt="Isac" />
                <span>Welcome, <strong>Isac</strong>!</span>
                <Link className="button" to="book/new">Add New Book</Link>
                <button type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>
        </div>
    );
}
