import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import SuggestedUser from '../User/SuggestedUser'
import ModalHeader from './ModalHeader';

function Users(props) {

    const { show, onHide, propsUsers , isAdmin, errorText } = props;
    const { users } = useSelector(state => state.user)

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [options, setOptions] = useState(false);

    useEffect(() => {

      if(isAdmin){
        setOptions(true)
      }

      if(propsUsers){
        setSelectedUsers([])
        for(let u of users){
          for(let l of propsUsers){
            if(u._id === l){
              setSelectedUsers(prev => [...prev, u])
            }
          }
        }
      }

    }, [propsUsers, users, isAdmin])

    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter-2"
        scrollable
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="h6" id="contained-modal-title-vcenter">
            <ModalHeader />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-1 post-likes">
          <div className="search-and-suggested-users">
            {
              selectedUsers.length > 0 ?
              selectedUsers.map(u => {
                return <SuggestedUser key={u._id} usr={u} showOption={options} />
              })
              : 
              <p className="text-center text-muted py-3">
                <span>{errorText}</span>
              </p>
            }
          </div>
        </Modal.Body>
      </Modal>
    )
}

export default Users
