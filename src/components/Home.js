import React, {useEffect, useState} from 'react';
import DialogListInformation from './dialog-list-information/DialogListInformation'
import InfoCard from './info-card/InfoCard'
import Footer from './footer/Footer'
import ButtonAppBar from './app-bar/AppBar'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Search from '@mui/icons-material/Search';








const Home = () => 
{   const [productos, setProductos] = useState([]);
    const [valorTotalInventario, setValorTotalInventario] = useState(0);
    const [producto, setProducto] = useState({});
    const [dato, setDato] = useState('');
    const [datosGatos, setDatosGatos] = useState([]);
    const [productoMayorP, setProductoMayorPrecio] = useState({});
    const [open, setOpen] = React.useState(false);
    const [openProductoD, setOpenProductoD] = React.useState(false);
    const handleClose = (value) => {
        setOpen(false);
    };
    const handleCloseProductoD = (value) => {
        setProducto(value);
        setOpenProductoD(false);
    };
    const buscarCombinaciones = (value) => {
        setProducto(value);
        setOpenProductoD(false);
    };
    const openEditarProducto = (value) => {
        setProducto(value);
        setOpenProductoD(true);
    };
    const editarProducto = async () => {
        try {
            const { data } = await axios.post('http://localhost:8081/inventario/productos', producto);
            setOpenProductoD(false);
            alert("Se ha editado el producto correctamente");
            await obtenerValores();
            return data;
        } catch (e) {
            throw new Error(e.response?.data?.message || e.message);
        }

    }
    const crearProducto = async () => {
        try {
            const { data } = await axios.put(`http://localhost:8081/inventario/productos/${producto.id}`, producto);
            setOpenProductoD(false);
            alert("Se ha creado el producto correctamente");
            await obtenerValores();
            return data;
        } catch (e) {
            throw new Error(e.response?.data?.message || e.message);
        }
    }
    const eliminarProducto = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:8081/inventario/productos/${id}`);
            setOpenProductoD(false);
            alert("Se ha eliminado el producto correctamente");
            await obtenerValores();
            return data;
        } catch (e) {
            throw new Error(e.response?.data?.message || e.message);
        }
    }
    const obtenerDato = async (url) => {
        try {
            const { data } = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
            setDato(data.text || 'Un Programador ..');
            return data;
        } catch (e) {
            throw new Error(e.response?.data?.message || e.message);
        }
    };
    const obtenerDatoGatos = async (url) => {
        try {
            const { data } = await axios.get('https://meowfacts.herokuapp.com/?count=2&lang=esp');
            if(data?.data?.length){
                setDatosGatos(data?.data);
                setOpen(true);
            }
                
        } catch (e) {
            throw new Error(e.response?.data?.message || e.message);
        }
    };
    const obtenerProductos = async (url) => {
        try {
            const { data } = await axios.get('http://localhost:8081/inventario/productos');
            setProductos(data);
            return data;
        } catch (e) {
            throw new Error(e.response?.data?.message || e.message);
        }
    };
    const obtenerInformacionInventario = async (url) => {
        try {
            const { data } = await axios.get('http://localhost:8081/inventario/info');
            setProductoMayorPrecio(data?.productoMayorPrecio || {})
            setValorTotalInventario(data?.valorTotalInventario || 0)
            return data;
        } catch (e) {
            throw new Error(e.response?.data?.message || e.message);
        }
    };
    const obtenerValores = () => {
        obtenerInformacionInventario();
        obtenerProductos()
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProducto({ ...producto, [name]: value });
    };
    useEffect(() => {
        obtenerValores();
        obtenerDato();
        obtenerDatoGatos();
        
    }, []);
    const columnas = [
        {
            name: 'id',
            selector: row => row.id,
            sortable: true,
            width: '5%',
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            sortable: true,
        },
        {
            name: 'Precio',
            selector: row => row.precio,
            sortable: true,
            width: '7%',
        },
        {
            name: 'Stock',
            selector: row => row.stock,
            sortable: true,
            width: '7%',
        },
        {
            name: 'Acciones',
            cell: row => (
              <div style={{ display: 'flex' }}>
                <Button onClick={() => openEditarProducto(row)}><FaEdit /></Button>
                <Button onClick={() => eliminarProducto(row.id)}><FaTrash /></Button>
              </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    const customHeader = (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <Button onClick={() => setOpenProductoD(true)}>Agregar</Button>
        </div>
      );
    return (
        <React.Fragment>
            <ButtonAppBar />
            <DialogListInformation
                open={open}
                onClose={handleClose} 
                text="Sabias que?"
                items={datosGatos}
            />
            <div style={{ display: 'flex' , gap: '10px' }}>
                <InfoCard title="Valor Total Inventario" value={valorTotalInventario} description="Precio total del del inventario actual del sistema" />
                <InfoCard title="Producto Mayor Precio" value={productoMayorP?.precio || '0'} description={productoMayorP?.nombre || '-'}/>
                <Card sx={{ minWidth: 275, maxWidth: 400 }}>
                <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Buscar Combinaciones
                </Typography>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Valor Total</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="serach"
                                    edge="end"
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Valor Total"
                    />
                </FormControl>
                </CardContent>
            </Card>
            </div>
            <br />
            <DataTable
                title="Listado Productos"
                columns={columnas}
                data={productos}
                actions={customHeader}
                pagination
            />
            <Footer text={dato} />
            <Dialog
                open={openProductoD}
                onClose={handleCloseProductoD}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {producto?.id ? 'Editar' : 'Crear'} Producto
                </DialogTitle>
                <DialogContent>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre"
                                name="nombre"
                                value={producto?.nombre}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descripción"
                                name="descripcion"
                                value={producto?.descripcion}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Precio"
                                name="precio"
                                type="number"
                                value={producto?.precio}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Stock"
                                name="stock"
                                type="number"
                                value={producto?.stock}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProductoD}>Cerrar</Button>
                    <Button onClick={producto?.id ? editarProducto : crearProducto}>OK</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
export default Home;