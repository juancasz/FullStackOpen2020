import React,{useState,useEffect} from 'react'

const Books = (props) => {
  const [books,setBooks] = useState([])

  useEffect(() => {
    setBooks(props.books)
  },[props])

  if (!props.show || !props.books) {
    return null
  }

  let genres = props.books.map(book => book.genres)
  genres = [].concat.apply([], genres)
  genres = [...new Set(genres)]

  const filterGenres = (genre) => {
    const newBooks = props.books.filter(book => book.genres.includes(genre))
    setBooks(newBooks)
  }

  const buttonsGenres = genres.map((genre,index) => {
    return <button key={index} onClick={() =>filterGenres(genre)}>{genre}</button>
  })

  return (
    <div>
      <h2>books</h2>
      {buttonsGenres}
      <button onClick={() => setBooks(props.books)}>All books</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books