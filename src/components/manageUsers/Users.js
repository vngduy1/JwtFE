import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'

import { deleteUser, fetchAllUser } from '../../services/userService'
import ModalDelete from './modalDelete'
import ModalUser from './modalUser'
const Users = () => {
  const [listUser, setListUser] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line
  const [currentLimit, setCurrentLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)

  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [dataModal, setDataModal] = useState({})

  const [showAddUser, setShowAddUser] = useState(false)
  const handleCloseAddUser = async () => {
    setShowAddUser(false)
    setDataModalUser({})
    await fetchUsers()
  }
  const handleShowAddUser = () => {
    setShowAddUser(true)
  }

  // eslint-disable-next-line
  const [actionModalUser, setActionModalUser] = useState('CREATE')
  const [dataModalUser, setDataModalUser] = useState({})

  useEffect(() => {
    fetchUsers()

    //get all get all the cookies from the browser
    // let c = document.cookie
    //   .split(';')
    //   .reduce(
    //     (ac, cv, i) =>
    //       Object.assign(ac, { [cv.split('=')[0]]: cv.split('=')[1] }),
    //     {},
    //   )
    // console.log(c)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const fetchUsers = async (page) => {
    let response = await fetchAllUser(currentPage, currentLimit)
    if (response && response.EC === 0) {
      setTotalPages(response.DT.totalPages)
      setListUser(response.DT.users)
    }
  }

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1)
    await fetchUsers()
  }

  const handleDeleteUser = async (user) => {
    setDataModal(user)
    setIsShowModalDelete(true)
  }

  const handleClose = () => {
    setIsShowModalDelete(false)
    setDataModal({})
  }

  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModal)
    if (response && +response.EC === 0) {
      toast.success(response.EM)
      await fetchUsers()
      setIsShowModalDelete(false)
    } else {
      toast.error(response.EM)
    }
  }

  const handleCreateUser = () => {
    setActionModalUser('CREATE')
    handleShowAddUser(true)
  }

  const handleEditUser = (user) => {
    setActionModalUser('UPDATE')
    setDataModalUser(user)
    handleShowAddUser(true)
  }

  const handleRefresh = async () => {
    await fetchUsers()
  }
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>管理アカウント</h3>
            </div>
            <div className="actions my-3" onClick={() => handleRefresh()}>
              <button className="btn btn-success refresh">
                Refresh <i className="fa fa-refresh"></i>
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleCreateUser()}
              >
                Add new user
                <i className="fa fa-plus-circle"></i>
              </button>
            </div>
          </div>
          <div className="user-body">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Group</th>
                </tr>
              </thead>
              <tbody>
                {listUser && listUser.length > 0 ? (
                  <>
                    {listUser.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {' '}
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ''}</td>
                          <td>
                            <button
                              className="btn btn-warning mx-2"
                              onClick={() => handleEditUser(item)}
                            >
                              Edit
                              <i className="fa fa-pencil-square-o"></i>
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                handleDeleteUser(item)
                              }}
                            >
                              Delete
                              <i className="fa fa-minus-square-o"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not found</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>

      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />
      <ModalUser
        show={showAddUser}
        handleClose={handleCloseAddUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      />
    </>
  )
}

export default Users
