import { MenuItem, Select } from '@mui/material'
import React from 'react'

export const Sort = ({sort, changeSort}) => {
  return (
    <Select value={sort} onChange={(event)=>{
        changeSort("sort", event.target.value)
    }}>
        <MenuItem value="price,desc">ფასის კლებადობით</MenuItem>
        <MenuItem value="price,asc">ფასის ზრდადობით</MenuItem>
        <MenuItem value="name,desc">სახელი კლებადობით</MenuItem>
        <MenuItem value="name,asc">სახელი ზრდადობით</MenuItem>
    </Select>
  )
}
