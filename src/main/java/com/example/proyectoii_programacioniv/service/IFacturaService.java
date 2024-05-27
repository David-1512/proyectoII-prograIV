package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.dto.FacturasDto;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;

import java.util.List;

public interface IFacturaService {
    FacturasEntity save(FacturasDto facturaDto);

    FacturasEntity findById(String id);

    void deleteById(String id);

    //boolean existsById(String id);

    List<FacturasEntity> findAllByIdProveedor(String id);

    int countByIdProveedor(String id);

}
