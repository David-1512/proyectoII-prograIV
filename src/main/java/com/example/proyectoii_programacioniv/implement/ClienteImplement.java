package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.ClienteDao;
import com.example.proyectoii_programacioniv.dao.ClienteProveedorDao;
import com.example.proyectoii_programacioniv.dao.FacturaDao;
import com.example.proyectoii_programacioniv.dto.ClienteDto;
import com.example.proyectoii_programacioniv.entity.*;
import com.example.proyectoii_programacioniv.service.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClienteImplement implements IClienteService {

    @Autowired
    private ClienteDao clienteDao;

    @Autowired
    private ClienteProveedorDao clienteProveedorDao;

    @Transactional(readOnly = true)
    @Override
    public ClienteEntity findById(String id) {
        return clienteDao.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ClienteEntity> findAllByIdProveedor(String id) {
        List<ClienteEntity> clientesPorProveedor = new ArrayList<>();
        for (ClienteProveedorEntity clienteProveedor : clienteProveedorDao.findAll()) {
            if (clienteProveedor.getIdProveedor().equals(id)) {
                ClienteEntity cliente = findById(clienteProveedor.getIdCliente());
                clientesPorProveedor.add(cliente);
            }
        }
        return clientesPorProveedor;
    }

    @Override
    public List<ClienteDto> clientesDeProveedor(String id) {
        List<ClienteEntity> clientesPorProveedor = findAllByIdProveedor(id);

        List<ClienteDto> clientesDto = new ArrayList<>();
        for (ClienteEntity cliente : clientesPorProveedor) {
            clientesDto.add(ClienteDto.builder()
                    .id(cliente.getId())
                    .nombre(cliente.getNombre())
                    .correo(cliente.getCorreo())
                    .telefono(cliente.getTelefono())
                    .tipoId(cliente.getTipoId())
                    .build());
        }
        return clientesDto;
    }

    @Override
    public void save(ClienteEntity cliente) {
        clienteDao.save(cliente);
    }

    @Transactional
    @Override
    public void saveClienteProveedor(ClienteEntity cliente, ProveedorEntity proveedor) {
        ClienteProveedorEntity clienteProveedor = clienteProveedorDao.findById(new ClienteProveedorId( proveedor.getId(), cliente.getId())).orElse(null);
        System.out.println("ClienteProveedor: "+clienteProveedor);
        if(clienteProveedor == null){
            clienteProveedor = new ClienteProveedorEntity();
            clienteProveedor.setIdProveedor(proveedor.getId());
            clienteProveedor.setIdCliente(cliente.getId());
            clienteProveedorDao.save(clienteProveedor);
        }

    }

    @Override
    public void eliminarClienteProveedor(ClienteEntity cliente, ProveedorEntity proveedor) {
        ClienteProveedorEntity clienteProveedorEntity= new ClienteProveedorEntity();
        clienteProveedorEntity.setIdCliente(cliente.getId());
        clienteProveedorEntity.setIdProveedor(proveedor.getId());
        clienteProveedorDao.delete(clienteProveedorEntity);

    }


}
