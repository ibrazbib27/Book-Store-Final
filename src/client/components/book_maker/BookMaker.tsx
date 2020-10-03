import * as React from "react";
import Card from "react-bootstrap/Card";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Link, RouteComponentProps } from "react-router-dom";
import {json} from "../../utils/api";
import { bookType } from "../../App";

interface BookMakerProps extends RouteComponentProps<any> {
    book: bookType;
}



const BooksMaker: React.FC<BookMakerProps> = (props) => {
    const deleteBook = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        try{
           const result: any = await json(`/api/books/${props.book.id}/book`, 'DELETE');
           if(result){
               props.history.replace('/books');
           }
        }
        catch (e) {
            throw e;
        }
    }
return(
    <Card className={'bg-primary border border-dark shadow rounded mx-auto width text-white'} id={`${props.book.id}`} key={props.book.id}>
    <Card.Img variant="top" src='http://www.pngmart.com/files/1/Civil-Engineering-Book-PNG.png' />
    <Card.Body className={'text-center my-1'}>
        <Card.Title className={'text-monospace mb-1'}>{props.book.title}</Card.Title>
        <Card.Text className={'small mb-1'}><em>By: {props.book.author}</em></Card.Text>
        <Badge pill variant="dark" className={'mb-1 shadow-sm'}>{props.book.name}</Badge>
        <Card.Text className={'small'}><b>${props.book.price.toFixed(2)}</b></Card.Text>
    </Card.Body>
    <Card.Footer className={`d-flex w-100 ${props.location.pathname === '/books' ? 'justify-content-center': 'justify-content-between'}`}>
        {
            props.location.pathname === '/books' ? 
                <>
                    <Link className={'btn btn-success shadow-sm'} to={`/books/${props.book.id}`} >View Book</Link>
                </> 
            : 
            <>
                <Button variant={'danger'} className={'shadow-sm'} onClick={deleteBook} >Delete Book</Button>
                <Link className={'btn btn-secondary shadow-sm'} to={`/books/${props.book.id}/update`} >Update Book</Link>
            </>
        }
    </Card.Footer>
</Card>)
}

export default BooksMaker;