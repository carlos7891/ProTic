import React, {useState, useEffect} from 'react'
import {Table, TableHead, TableData, TableRow} from 'elements/Listas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenAlt} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { Tooltip } from "@material-ui/core";
import * as server from './server';

const TablaGestionUsuarios = () => {

        const [usuarios, setUsuarios]= useState([]);

        const listUsuarios = async()=>{
            try{
                const res = await server.listUsuarios();
                const data = await res.json();
                setUsuarios(data)
                console.log(data);

            }catch(error){
                console.log(error)
            }
        }
        useEffect(()=>{
            listUsuarios();
        },[]);

        const history = useHistory();

        return (
            <main className="mainContainerTable">
              <h2 className="tituloGestionVentas">Gestion de Usuarios</h2>
              <Table>
                <TableHead>
                  <tr>
                    <TableData>Nombre</TableData>
                    <TableData>Documento</TableData>
                    <TableData>Estado</TableData>
                    <TableData>Editar</TableData>
                  </tr>
                </TableHead>
                <tbody>
                  {usuarios.map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableData>{usuario.name}</TableData>
                        <TableData>{usuario.username}</TableData>
                        <TableData>{usuario.email}</TableData>
                        <TableData>
                          <button className="iconSide"
                            onClick={() => {
                              history.push(`/editarUsuario/${usuario.id}`)}}
                            >
                            <FontAwesomeIcon  icon={faPenAlt}/>
                          </button>
                        </TableData>
                      </TableRow>
                  ))}
                </tbody>
              </Table>
            </main>
          );
    }

export default TablaGestionUsuarios

