package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.entity.ProductoProveedorEntity;

import java.util.List;

public interface IProductoService {

    ProductoProveedorEntity findById(String id);

    List<ProductoProveedorEntity> findAllByIdProveedor(String id);
}
