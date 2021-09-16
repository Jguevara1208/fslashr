import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm'
import signup from './SignupForm.module.css'

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className={signup.button} onClick={() => setShowModal(true)}>Start for free</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
};

export default SignupFormModal;