import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'
import AdminDashboard from './AdminDashboard'
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
