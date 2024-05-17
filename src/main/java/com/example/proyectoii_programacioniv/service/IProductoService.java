package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import com.example.proyectoii_programacioniv.entity.ProductoEntity;

public interface IProductoService {

    ProductoEntity findById(String id);
}
