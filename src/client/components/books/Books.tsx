import * as React from "react";
import {useEffect, useState} from "react";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import { RouteComponentProps } from "react-router-dom";
import {json} from "../../utils/api";
import BookMaker from "../book_maker/BookMaker";
import { bookType } from "../../App";

interface BooksProps extends RouteComponentProps<any> {}



const Books: React.FC<BooksProps> = (props) => {
  const [books, setBooks] = useState<bookType []>([]);

  useEffect(() => {
      (async () => {
          try{
              const bookArr: bookType [] = await json(`/api/books/${props.match.params.id ? `${props.match.params.id}/book` : 'all'}`,
                  'GET');
              console.log(bookArr);
              setBooks([...bookArr])
          }
          catch (e) {
              throw e;
          }
      })();
  }, []);

    return(
        <Row xs={1} sm={1} md={2} lg={3} xl={3} className={`w-100 p-0 align-items-center justify-content-${books.length > 1 ? 'center' : 'around'}`}>
            {books.map((book) =>(
                <Col key={book.id} className={`py-3 my-3 ${books.length > 1 ? 'px-3 px-md-0' : 'd-flex align-self-stretch'}`}>
                    <BookMaker key={book.id} book={book} history={props.history} location={props.location} match={props.match}/>
                </Col>
            ))}
        </Row>
    );
}

export default Books;
