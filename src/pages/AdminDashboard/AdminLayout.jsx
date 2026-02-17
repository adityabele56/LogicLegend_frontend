import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import AdminTopbar from '../../components/AdminTopbar'

import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='flex'>
      <AdminSidebar/>
     <div className='w-full'>
      <AdminTopbar/>
     <Outlet/>
    </div> 


    </div>
  )
}

export default AdminLayout
