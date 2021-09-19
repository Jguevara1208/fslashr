import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadForm from './UploadForm'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import nav from '../Navigation/Navigation.module.css';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            < AiOutlineCloudUpload onClick={() => setShowModal(true)} className={nav.upload}/>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UploadForm />
                </Modal>
            )}
        </>
    );
};

export default LoginFormModal;