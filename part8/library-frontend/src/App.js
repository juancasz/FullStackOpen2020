
import React, { useState,useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient,useQuery,useLazyQuery,useSubscription } from '@apollo/client'
import { ALL_AUTHORS,ALL_BOOKS,CURRENT_USER,BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const[token,setToken] = useState(null)
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const currentUser = useQuery(CURRENT_USER)
  const [filterBooks, booksFilter] = useLazyQuery(ALL_BOOKS) 

  const client = useApolloClient();

  useEffect(() => {
    if(currentUser.data && currentUser.data.me){
      filterBooks({variables:{genre:currentUser.data.me.favoriteGenre}})
    }
  },[currentUser,filterBooks,page])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }  
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook)
      window.alert(`${addedBook.title} added`);
    },
  });

  const handleLogout = () => {
    localStorage.clear()
    setToken(null)
    setPage("login")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && 
          <React.Fragment>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => {
              setPage('recommend')
              filterBooks({variables:{genre:currentUser.data.me.favoriteGenre}})
            }}>recommend</button>
          </React.Fragment>
        } 
        {token?
          <button onClick={() => handleLogout()}>logout</button>:
          <button onClick={() => setPage('login')}>login</button>  
        }
      </div>

      <Login show={page === 'login'} setToken={setToken}/>

      <Authors
        show={page === 'authors'} authors={resultAuthors.data?resultAuthors.data.allAuthors:[]}
        token = {token}
      />

      <Books
        show={page === 'books'} books={resultBooks.data?resultBooks.data.allBooks:[]}
      />

      <NewBook
        show={page === 'add'} updateCacheWith={updateCacheWith}
      />

      <Recommend
        show={page === 'recommend'} books={booksFilter.data?booksFilter.data.allBooks:[]}
      />

    </div>
  )
}

export default App