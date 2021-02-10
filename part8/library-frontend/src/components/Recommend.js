import React from 'react'

const Recommend = (props) => {
    if (!props.show || !props.books) {
        return null
    }

    /*const books = props.books && props.currentUser?
        props.books.filter(book => book.genres.includes(props.currentUser.favoriteGenre)):
        []*/
    return(
        <div>
            <h2>recommendations</h2>
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
                    {props.books.map(b =>
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

export default Recommend