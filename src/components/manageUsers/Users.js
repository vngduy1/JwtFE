import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'

import { deleteUser, fetchAllUser } from '../../services/userService'
import ModalDelete from './modalDelete'
const Users = () => {
  const [listUser, setListUser] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const currentLimit = 2
  const [totalPages, setTotalPages] = useState(0)

  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [dataModal, setDataModal] = useState({})

  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  const fetchUsers = async (page) => {
    let response = await fetchAllUser(currentPage, currentLimit)
    if (response && response.data && +response.data.EC === 0) {
      setTotalPages(response.data.DT.totalPages)
      setListUser(response.data.DT.users)
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
    if (response && +response.data.EC === 0) {
      toast.success(response.data.EM)
      await fetchUsers()
      setIsShowModalDelete(false)
    } else {
      toast.error(response.data.EM)
    }
  }
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title">
              <h3>Table Users</h3>
            </div>
            <div className="actions">
              <button className="btn btn-success">Refresh</button>
              <button className="btn btn-primary">Add new user</button>
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
                          <td> {index + 1}</td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ''}</td>
                          <td>
                            <button className="btn btn-warning mx-2">
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                handleDeleteUser(item)
                              }}
                            >
                              Delete
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
          {totalPages > 0 && (
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
    </>
  )
}

export default Users
