import React from "react";
import { BookContainer, Title, Author } from "./Styles";

const Book = ({ book }) => {
  return (
    <BookContainer>
      <Title>{book.title}</Title>
      <Author>{book.author.name}</Author>
    </BookContainer>
  );
};

export default Book;
