import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

function ShowToast({msg}) {

    const [show, setShow] = useState(true);
    
    return (
      <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', zIndex: 100}}>
        <div style={{position: 'fixed', top: '3%', right: '3%'}} className="shadow">
          <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide className="bg-danger rounded-lg">
            <Toast.Body className="text-light px-3 px-sm-4">
             <span>{msg}</span>
            </Toast.Body>
          </Toast>
        </div>
      </div>
    )
}

export default ShowToast
