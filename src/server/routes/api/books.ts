import * as express from 'express';
import {RequestHandler} from 'express';
import DB from '../../db/index';

const router = express.Router();

export default router;

const checkRole:RequestHandler = (req:any,res,next) => {
    if(!req.user && req.user.role !== 'admin')
        return res.sendStatus(401);
    else next();
}

router.get('/all', async (req, res) => {
    try{
    const books: any = await DB.Books.GetAllBooks();

    res.json(books);

    }
    catch (e) {
        res.sendStatus(500);
        throw e;
    }
});

router.get('/categories', checkRole, async (req, res) => {
    try{
        const categories: any = await DB.Books.GetAllCategories();

        res.json(categories);

    }
    catch (e) {
        res.sendStatus(500);
        throw e;
    }
});
router.get('/:id/book', async (req, res) => {
    try{
        const id: any = await req.params.id;
        const book: any = await DB.Books.GetBook(parseInt(id));

        res.json(book);

    }
    catch (e) {
        res.sendStatus(500);
        throw e;
    }
});

router.delete('/:id/book', checkRole, async (req, res) => {
    try{
        const id: any = await req.params.id;
        const book: any = await DB.Books.DeleteBook(parseInt(id));

        res.json(book);

    }
    catch (e) {
        res.sendStatus(500);
        throw e;
    }
});
router.put('/:id/book', checkRole, async (req, res) => {
    try{
        const bookDetails: any = await req.body;
        const book: any = await DB.Books.UpdateBook(bookDetails);

        res.json(book);

    }
    catch (e) {
        res.sendStatus(500);
        throw e;
    }
});

router.post('/post', checkRole, async (req, res) => {
    try{
        const bookDetails: any = await req.body;
        const book: any = await DB.Books.CreateBook(bookDetails);

        res.json(book);

    }
    catch (e) {
        res.sendStatus(500);
        throw e;
    }
});