import React, { useState, useEffect } from 'react'
import { Typography, Paper, Table, Avatar, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import axios from 'axios'
import { EditOutlined, DeleteForeverOutlined } from '@material-ui/icons'

const Dashboard = () => {
    const [userList, setUserList] = useState([])

    const getUsers = async () => {
        const { data } = await axios.get('http://localhost:4000/api/usuarios')
        setUserList(data)
    }

    useEffect(getUsers, [])

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Planeta</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell><Avatar src={user.avatar} /></TableCell>
                            <TableCell>{user.nombre}</TableCell>
                            <TableCell>{user.planeta}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => alert(`Editar ${user.id}`)} size='small' color='primary'>
                                    <EditOutlined />
                                </IconButton>
                                <IconButton onClick={() => alert(`Eliminar ${user.id}`)} size='small' color='secondary'>
                                    <DeleteForeverOutlined />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default Dashboard
