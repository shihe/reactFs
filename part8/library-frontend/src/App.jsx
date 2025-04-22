import { useState } from "react";
import { useQuery } from '@apollo/client'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { QUERIES } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");

  const queries = useQuery(QUERIES, {
    pollInterval: 2000
  })

  if (queries.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={queries.data.allAuthors} />

      <Books show={page === "books"} books={queries.data.allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
