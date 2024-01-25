import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { toast } from 'react-toastify'

import { fetchAllRoles, deleteRole } from '../../services/roleService'

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([])

  useEffect(() => {
    getAllRoles()
  }, [])

  useImperativeHandle(ref, () => ({
    fetListRolesAgain() {
      getAllRoles()
    },
  }))
  const getAllRoles = async () => {
    let data = await fetchAllRoles()
    if (data && +data.EC === 0) {
      setListRoles(data.DT)
    }
  }

  const handleDeleteRole = async (role) => {
    let data = await deleteRole(role)
    if (data && +data.EC === 0) {
      toast.success(data.EM)
      await getAllRoles()
    }
  }
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">URL</th>
            <th scope="col">Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            <>
              {listRoles.map((item, index) => {
                return (
                  <tr key={`row-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.url}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeleteRole(item)
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
                <td colSpan={4}>Not found Role</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  )
})

export default TableRole
