import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModalDelete = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>消す</Modal.Title>
        </Modal.Header>
        <Modal.Body> {props.dataModal.email} 消しますか</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            消す
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDelete
