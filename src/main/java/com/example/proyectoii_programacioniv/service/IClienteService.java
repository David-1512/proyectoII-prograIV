package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.dto.ClienteDto;
import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;

import java.util.List;

public interface IClienteService {
    ClienteEntity findById(String id);

    List<ClienteEntity> findAllByIdProveedor(String id);

    List<ClienteDto> clientesDeProveedor(String id);

    void save(ClienteEntity cliente);

    void saveClienteProveedor(ClienteEntity cliente, ProveedorEntity proveedor);

    void eliminarClienteProveedor(ClienteEntity cliente, ProveedorEntity proveedor);
}
