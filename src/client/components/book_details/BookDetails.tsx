import * as React from "react";
import { useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import NumberFormat from 'react-number-format';
import { RouteComponentProps } from "react-router-dom";
import {json} from "../../utils/api";
import { bookType } from "../../App";

interface BookDetailsProps extends RouteComponentProps<any> {}




const BookDetails: React.FC<BookDetailsProps> = (props) => {
    const [bookData, setBookData] = useState<bookType>({id: 0, title: '', author: '', price:0.00, name: '', categoryid: 0});
    const [categories, setCategories] = useState<{id: number; name: string;} []>([]);

    const [formValidations, setFormValidations] = useState<{author: boolean; category: boolean; price: boolean; title: boolean;}>({author: !props.match.params.id, category: !props.match.params.id, price: false, title: !props.match.params.id,});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try{
                const allCategories: {id: number; name: string;} [] = await json('/api/books/categories', 'GET');
                setCategories(allCategories);

                if(props.match.params.id) {
                    const bookDetails: bookType [] = await json(`/api/books/${props.match.params.id}/book`,'GET');
                    setBookData(bookDetails[0]);
                }
                setLoaded(true);
            }
            catch (e) {
                throw e;
            }
        })();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try{
            if(!formValidations.author && !formValidations.category && !formValidations.price && !formValidations.title) await handleBookDataSubmission();

            else setSubmitted(true);

        }
        catch (e) {
            throw e;
        }
    }
    const  handleBookDataSubmission = async () => {

        try{
            const result: any = await json(`/api/books/${props.match.params.id ? `${bookData.id}/book` : 'post'}`, props.match.params.id ? 'PUT' : 'POST', bookData);

            if(result) props.history.replace(props.match.params.id ? `/books/${bookData.id}` : '/books');

        }
        catch (e) {
            throw e;
        }
    }

    return(
        <Jumbotron fluid className={'p-1 bg-light text-center shadow rounded w-100'}>
            <Form noValidate  onSubmit={handleSubmit} className={'pt-4'}>
                {loaded ?
                    <>
                    <Form.Row className={'justify-content-center mb-5'}>
                        <Form.Group as={Col} xs={10} >
                            <Form.Label><b>Title</b></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                maxLength={60}
                                defaultValue={bookData.title}
                                className={'shadow-sm'}
                                isInvalid={submitted ? formValidations.title : false}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    e.persist();
                                    const validate: boolean = e.target.value.trim().length > 0;
                                    setBookData(prevData => ({...prevData, title: e.target.value.trim()}));
                                    setFormValidations(prevValidation => ({...prevValidation, title: !validate}));

                                }}
                            />
                            <Form.Control.Feedback type={'invalid'} className={'text-left'}>Enter the title of the book</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                <Form.Row className={'justify-content-center mb-5'}>
                    <Form.Group as={Col} xs={10} >
                        <Form.Label><b>Author</b></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Author"
                            maxLength={60}
                            defaultValue={bookData.author}
                            className={'shadow-sm'}
                            isInvalid={submitted ? formValidations.author : false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.persist();
                                const validate: boolean = e.target.value.trim().length > 0;
                                setBookData(prevData => ({...prevData, author: e.target.value.trim()}));
                                setFormValidations(prevValidation => ({...prevValidation, author: !validate}));

                            }}
                        />
                        <Form.Control.Feedback type={'invalid'} className={'text-left'}>Enter the author of the book</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row className={'justify-content-center mb-5 mx-0 mt-0 p-0'}>
                    <Form.Group  as={Col} xs={10} >
                        <Form.Row className={'justify-content-lg-between justify-content-center mb-2'}>
                            <Form.Group as={Col} xs={12} md={4} >
                                <Form.Label><b>Price</b></Form.Label>
                                <NumberFormat
                                    prefix={'$'}
                                    decimalScale={2}
                                    defaultValue={bookData.price}
                                    fixedDecimalScale={true}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    className={`shadow-sm form-control ${submitted ? (formValidations.price ? 'is-invalid' : '') : ''}`}
                                    onValueChange={(values) => {
                                        const validate: boolean = isNaN(parseFloat(values.value));
                                        setBookData(prevData => ({...prevData, price: validate ? 0.00 : parseFloat(values.value)}));
                                        setFormValidations(prevValidation => ({...prevValidation, price: validate}));
                                    }}
                                />
                                <Form.Control.Feedback type={'invalid'} className={'text-left'}>Enter the price value of the book</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} xs={12} md={7} >
                                <Form.Label><b>Author</b></Form.Label>
                                <Form.Control
                                    as={'select'}
                                    defaultValue={bookData.categoryid}
                                    className={'shadow-sm'}
                                    isInvalid={submitted ? formValidations.category : false}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        e.persist();
                                        const validate: boolean = parseInt(e.target.value) > 0;
                                        setBookData(prevData => ({...prevData, categoryid: parseInt(e.target.value)}));
                                        setFormValidations(prevValidation => ({...prevValidation, category: !validate}));

                                    }}
                                >
                                    <option key={0} value={0} disabled>Select a Category</option>
                                    {categories.map((category)=>(
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type={'invalid'} className={'text-left'}>Select a category</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                    </Form.Group>
                </Form.Row>
                <Form.Row className={'justify-content-center'}>
                    <Form.Group as={Col} xs={10} >
                        <Button type="submit" variant={'success'} className={'shadow-sm'}>{props.match.params.id ? 'Save Changes': 'Create Book'}</Button>
                    </Form.Group>
                </Form.Row>
                    </>
                    :
                    null
                }
            </Form>
        </Jumbotron>
    );
};

export default BookDetails;