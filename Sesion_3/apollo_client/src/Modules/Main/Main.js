import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import Book from "../../Components/Book/Book";

const GET_BOOKS = gql`
  {
    getBooks {
      title
      content
      author {
        name
      }
    }
  }
`;
const BOOK_SUBSCRIPTION = gql`
  subscription {
    subscribtionBooks {
      id
      title
      content
      author {
        name
      }
    }
  }
`;

const Main = () => {
  const { loading, data, error } = useQuery(GET_BOOKS);

  const {
    data: dataSub,
    loading: loadingSub,
    error: errorSub
  } = useSubscription(BOOK_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log(client, subscriptionData);
    }
  });

  console.log(loadingSub, dataSub, errorSub);
  // const [bookList, setBookList] = useState(data.getBooks);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {!loadingSub && <Book book={dataSub.subscribtionBooks} />}
      <div>
        {data.getBooks.map(book => (
          <Book book={book} />
        ))}
      </div>
    </>
  );
};

export default Main;
