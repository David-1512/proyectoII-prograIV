package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.entity.ProductoProveedorEntity;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductoProveedorDao extends CrudRepository<ProductoProveedorEntity,String> {
    List<ProductoProveedorEntity> findByIdProveedor(String idProveedor);
}
