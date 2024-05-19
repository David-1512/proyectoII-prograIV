package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import com.example.proyectoii_programacioniv.entity.ProductoEntity;

import java.util.List;

public interface IProductoService {

    ProductoEntity findById(String id);

    List<ProductoEntity> findAllByIdProveedor(String id);
}
