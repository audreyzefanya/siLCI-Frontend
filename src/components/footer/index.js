import React from 'react'
import OutlineButton from '../button/outlinebutton';
import PrimaryButton from '../button/primarybutton';
import DangerButton from '../button/dangerbutton';

const Footer = ({
    onClose = () => {},
    pageType,
    handleNavigate,
    deleteAction = onClose,
    editAction,
    submitAction,
    saveAction
}) => {

    return (
        <div className='mb-2 mt-4 mr-7 flex justify-end'>
            {pageType === 'add' && (
                <>
                    <div className='mr-4'>
                        <OutlineButton title='Cancel' size='large' onClick={handleNavigate} />
                    </div>
                    <PrimaryButton title='Submit' size='large' onClick={submitAction} />
                </>
            )}
            {pageType === 'detail' && (
                <>
                    <div className='mr-4'>
                        <DangerButton title='Delete' size='large' onClick={deleteAction} />
                    </div>
                    <OutlineButton title='Edit' size='large' onClick={editAction} />
                </>
            )}
            {pageType === 'edit' && (
                <>
                    <div className='mr-4'>
                        <OutlineButton title='Cancel' size='large' onClick={handleNavigate} />
                    </div>
                    <PrimaryButton title='Save' size='large' onClick={saveAction} />
                </>
            )}
        </div>
    )
}

export default Footer