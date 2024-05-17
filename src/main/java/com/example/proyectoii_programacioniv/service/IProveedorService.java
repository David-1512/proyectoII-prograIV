package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.entity.ProductoEntity;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;

public interface IProveedorService {
    ProveedorEntity findById(String id);
}
