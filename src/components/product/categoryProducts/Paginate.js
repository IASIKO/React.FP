import { Pagination } from '@mui/material'
import React from 'react'

export const Paginate = ({totalPages, currentPage, changePage, queryKey}) => {
  return (
    <Pagination  shape="rounded" 
    count={totalPages}
    page={+currentPage}
    onChange={(_, value)=>{
        changePage(queryKey, value)
    }}
    />
  )
}
