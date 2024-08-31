import React from 'react'
import { UserAuth } from '../components/AuthContext'
import { Container } from 'reactstrap';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';

const Account = () => {
    const { editEmail, editPassword, editUsername, verifyEmail } = UserAuth();
    const [user] = useAuthState(auth);

    const handleEdit = () => {
        document.getElementById('email').removeAttribute('readonly')
        document.getElementById('username').removeAttribute('readonly')
        document.getElementById('password').removeAttribute('readonly')
        document.getElementById('submit').style.visibility = 'visible';
        document.getElementById('edit').style.visibility = 'hidden';
        document.getElementById('email').insertAdjacentHTML('afterend', '<h5>You should re-login after editing.</h5>')
        document.getElementById('password').insertAdjacentHTML('afterend', '<h5>You should re-login after editing.</h5>')
    }

    const submitEdit = () => {
        try {
            editEmail(document.getElementById('email').value);
            editPassword(document.getElementById('password').value);
            editUsername(document.getElementById('username').value);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const verifyMail = (e)=>{
        e.preventDefault();
        verifyEmail()
    }

    const cancelEdit = (e) => {
        e.preventDefault();
        document.getElementById('email').value = ''
        document.getElementById('username').value = ''
        document.getElementById('password').value = ''
        document.getElementById('submit').style.visibility = 'hidden';
        document.getElementById('edit').style.visibility = 'visible';
        document.getElementById('email').setAttribute('readonly', true);
        document.getElementById('username').setAttribute('readonly', true);
        document.getElementById('password').setAttribute('readonly', true);
        document.getElementById('email').nextSibling.remove();
        document.getElementById('password').nextSibling.remove();
    }

    return (
        <Container>
            <div className='account'>
                {user === null ?
                    <h1>Loading</h1>
                    : (
                        <div>
                            <p>Registration Time :{user.metadata.creationTime}</p>
                            <p>Last Login :{user.metadata.lastSignInTime}</p>
                            <br />
                            <form className='account-form'>
                                <label> Email:
                                    <input type='email' id='email' placeholder={user.email} readOnly />
                                </label>
                                <label> Username:
                                    <input type='text' id='username' placeholder={user.displayName} readOnly />
                                </label>
                                <label>Password:
                                    <input type='password' id='password' placeholder='******' readOnly />
                                </label>
                                <label>Email Verification:
                                    <input placeholder={user.emailVerified ? 'true' : 'false'} readOnly />
                                    <button className='button' onClick={verifyMail}>Verify</button>
                                </label>

                                <div id='submit' style={{ visibility: 'hidden' }}>
                                    <button className='add-button' onClick={submitEdit} >Submit</button>
                                    <button className='add-button' onClick={cancelEdit}>Cancel</button>
                                </div>
                            </form>

                            <div id='edit'>
                                <p>Do you want to change your informations?
                                    <button className='button' onClick={handleEdit} >Edit Infos</button>
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>

        </Container>
    )
}
export default Account