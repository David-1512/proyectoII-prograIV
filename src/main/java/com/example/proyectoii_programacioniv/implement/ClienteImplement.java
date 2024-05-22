package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.ClienteDao;
import com.example.proyectoii_programacioniv.dao.ClienteProveedorDao;
import com.example.proyectoii_programacioniv.dao.FacturaDao;
import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.ClienteProveedorEntity;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;
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

}
