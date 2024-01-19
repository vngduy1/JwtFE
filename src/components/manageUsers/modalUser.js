import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { fetchGroup, createNewUser } from '../../services/userService'
import './Users.scss'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import _ from 'lodash'
const ModalUser = (props) => {
  const defaultUserData = {
    email: '',
    phone: '',
    username: '',
    password: '',
    address: '',
    sex: '',
    group: '',
  }

  const validInputDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  }
  const [userData, setUserData] = useState(defaultUserData)
  const [validInput, setValidInput] = useState(validInputDefault)
  const [userGroup, setUserGroup] = useState([])

  useEffect(() => {
    getGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getGroups = async () => {
    let response = await fetchGroup()
    if (response && response.data && response.data.EC === 0) {
      setUserGroup(response.data.DT)
      if (response.data.DT && response.data.DT.length > 0) {
        let groups = response.data.DT
        setUserData({ ...userData, group: groups[0].id })
      }
    } else {
      toast.error(response.data.EM)
    }
  }

  const handleOnchangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData)
    _userData[name] = value
    setUserData(_userData)
  }

  const checkValidateInput = () => {
    //create user
    setValidInput(validInputDefault)
    console.log(userData)
    let arr = ['email', 'phone', 'password', 'group']
    let check = true
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        toast.error(`Empty input ${arr[i]}`)
        let _validInput = _.cloneDeep(validInputDefault)
        _validInput[arr[i]] = false
        setValidInput(_validInput)
        check = false
        break
      }
    }
    return check
  }

  const handleConfirmUser = async () => {
    let check = checkValidateInput()
    if (check === true) {
      let res = await createNewUser({ ...userData, groupId: userData['group'] })
      if (res.data && res.data.EC === 0) {
        props.handleClose()
        setUserData({ ...defaultUserData, group: userGroup[0].id })
      } else {
        toast.error('Error handleConfirmUser...')
      }
    }
  }
  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.handleClose}
      className="modal-user"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span>{props.title} </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-body row">
          <div className="col-12 col-sm-6 mt-3 form-group">
            <label>
              メールアドレス (<span className="red">*</span>) :
            </label>
            <input
              className={
                validInput.email ? 'form-control' : 'form-control is-invalid'
              }
              type="email"
              value={userData.email}
              onChange={(event) =>
                handleOnchangeInput(event.target.value, 'email')
              }
            />
          </div>
          <div className="col-12 col-sm-6 mt-3 form-group">
            <label>
              電話番号: (<span className="red">*</span>) :{' '}
            </label>
            <input
              className={
                validInput.phone ? 'form-control' : 'form-control is-invalid'
              }
              type="text"
              value={userData.phone}
              onChange={(event) =>
                handleOnchangeInput(event.target.value, 'phone')
              }
            />
          </div>
          <div className="col-12 col-sm-6 mt-3 form-group">
            <label>
              名前: (<span className="red">*</span>) :{' '}
            </label>
            <input
              className={
                validInput.username ? 'form-control' : 'form-control is-invalid'
              }
              type="text"
              value={userData.username}
              onChange={(event) =>
                handleOnchangeInput(event.target.value, 'username')
              }
            />
          </div>
          <div className="col-12 col-sm-6 mt-3 form-group">
            <label>
              パスワード: (<span className="red">*</span>) :{' '}
            </label>
            <input
              className={
                validInput.password ? 'form-control' : 'form-control is-invalid'
              }
              type="text"
              value={userData.password}
              onChange={(event) =>
                handleOnchangeInput(event.target.value, 'password')
              }
            />
          </div>
          <div className="col-12 mt-3 form-group">
            <label>
              住所: (<span className="red">*</span>) :{' '}
            </label>
            <input
              className={
                validInput.address ? 'form-control' : 'form-control is-invalid'
              }
              type="type"
              value={userData.address}
              onChange={(event) =>
                handleOnchangeInput(event.target.value, 'address')
              }
            />
          </div>
          <div className="col-12 col-sm-6 mt-3 form-group">
            <label>
              性別: (<span className="red">*</span>) :{' '}
            </label>
            <select
              className={
                validInput.sex ? 'form-select' : 'form-select is-invalid'
              }
              onChange={(event) =>
                handleOnchangeInput(event.target.value, 'sex')
              }
            >
              <option defaultValue="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 mt-3 form-group">
            <label>
              グループ: (<span className="red">*</span>) :{' '}
            </label>
            <select
              className={
                validInput.group ? 'form-select' : 'form-select is-invalid'
              }
              onChange={(event) =>
                handleOnchangeInput(event.target.value, 'group')
              }
            >
              {userGroup.length > 0 &&
                userGroup.map((item, index) => {
                  return (
                    <option key={`group-${index}`} value={item.id}>
                      {item.name}
                    </option>
                  )
                })}
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleConfirmUser()}>
          保存
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalUser
