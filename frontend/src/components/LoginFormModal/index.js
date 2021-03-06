import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import form from './LoginForm.module.css'
import { AiOutlineLogin } from 'react-icons/ai'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className={form.logIn} onClick={() => setShowModal(true)}>
                <AiOutlineLogin/>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
};

export default LoginFormModal;