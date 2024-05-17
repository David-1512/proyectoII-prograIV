package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;

import java.util.List;

public interface IClienteService {
    ClienteEntity findById(String id);

    List<ClienteEntity> findAllByIdProveedor(String id);
}
