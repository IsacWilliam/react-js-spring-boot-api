package br.com.isac.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.isac.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {}