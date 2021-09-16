import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm'
import form from '../LoginFormModal/LoginForm.module.css'

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className={form.standardInput}>
                <button className={form.splashButton} onClick={() => setShowModal(true)}>Start for free</button>
                <span className={form.underline}></span>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
};

export default SignupFormModal;