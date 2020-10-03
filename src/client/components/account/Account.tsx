import * as React from "react";
import {useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import { RouteComponentProps } from "react-router-dom";
import {json, SetAccessToken} from "../../utils/api";

interface AccountProps extends RouteComponentProps<any> {
    authType: boolean;
}




const Account: React.FC<AccountProps> = (props) => {
    const [accountData, setAccountData] = useState<{email: string; password: string; name: string;}>({email: '', password: '', name: ''});
    const [formValidations, setFormValidations] = useState<{email: boolean; password: boolean; name: boolean;}>({email: true, password: true, name: !props.authType});
    const [errMessages, setErrMessages] = useState<{email: string; password: string; name: string;}>({email: props.authType ? 'Enter your email' : 'Enter a valid email', password:  props.authType ? 'Enter your password' : 'Enter a valid password that is at least 6 characters long', name: 'Enter your full name'});
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try{
            if((!formValidations.email && !formValidations.password && !formValidations.name)||(props.authType && submitted && accountData.email.length > 0 && accountData.password.length > 0)) await handleAccountSubmission();

            else setSubmitted(true);

        }
        catch (e) {
            throw e;
        }
    }
    const  handleAccountSubmission = async () => {

        try{
           const result: any = await json(`/auth${props.location.pathname}`, 'POST',
               props.authType ? {email: accountData.email, password: accountData.password}: accountData);
           if(result){
               const {token, role, userid}: any = result;
               await SetAccessToken(token, {role, userid});
               props.history.replace('/books');
           }
           else{
               setSubmitted(true);
               setErrMessages(prevMessage => ({...prevMessage, email: 'Invalid email/password combo', password: 'Invalid email/password combo'}));
               setFormValidations(prevValidation => ({...prevValidation, email: true, password: true}));
           }

        }
        catch (e) {
            throw e;
        }
    }

    return(
        <Jumbotron fluid className={'p-1 bg-light text-center shadow rounded w-100'}>
            <Form noValidate  onSubmit={handleSubmit}>
                {!props.authType ?
                <Form.Row className={'justify-content-center mb-5'}>
                    <Form.Group as={Col} xs={10} >
                        <Form.Label><b>Full Name</b></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Full Name"
                            className={'shadow-sm'}
                            isInvalid={submitted ? formValidations.name : false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const validate: boolean = e.currentTarget.value.trim().length > 0;
                                setAccountData(prevData => ({...prevData, name: e.currentTarget.value.trim()}));
                                setFormValidations(prevValidation => ({...prevValidation, name: !validate}));

                            }}
                        />
                        <Form.Control.Feedback type={'invalid'} className={'text-left'}>{errMessages.name}</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                    :
                    null
                    }
                <Form.Row className={'justify-content-center mb-5'}>
                    <Form.Group as={Col} xs={10} >
                        <Form.Label><b>Email</b></Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            className={'shadow-sm'}
                            isInvalid={submitted ? formValidations.name : false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const validate: boolean = props.authType ? e.currentTarget.value.trim().length > 0 : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.currentTarget.value.trim());
                                setAccountData(prevData => ({...prevData, email: e.currentTarget.value.trim()}));
                                setErrMessages(prevMessage => ({...prevMessage, email: props.authType ? 'Enter your email' : 'Enter a valid email'}));
                                setFormValidations(prevValidation => ({...prevValidation, email: !validate}));

                            }}
                        />
                        <Form.Control.Feedback type={'invalid'} className={'text-left'}>{errMessages.email}</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row className={'justify-content-center mb-5'}>
                    <Form.Group as={Col} xs={10} >
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            className={'shadow-sm'}
                            isInvalid={submitted ? formValidations.name : false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const validate: boolean = props.authType ? e.currentTarget.value.length > 0 : e.currentTarget.value.length >= 6;
                                setAccountData(prevData => ({...prevData, password: e.currentTarget.value}));
                                setErrMessages(prevMessage => ({...prevMessage, password:  props.authType ? 'Enter your password' : 'Enter a valid password that is at least 6 characters long'}));
                                setFormValidations(prevValidation => ({...prevValidation, password: !validate}));

                            }}
                        />
                        <Form.Control.Feedback type={'invalid'} className={'text-left'}>{errMessages.email}</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                    />
                </Form.Group>
                <Button type="submit">Submit form</Button>
            </Form>
        </Jumbotron>
    );
};

export default Account;