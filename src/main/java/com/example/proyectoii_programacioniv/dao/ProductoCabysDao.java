package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.entity.LineaServicioEntity;
import com.example.proyectoii_programacioniv.entity.ProductoCabysEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductoCabysDao extends CrudRepository<ProductoCabysEntity,String> {

    List<ProductoCabysEntity> findByIdProductoContainingOrNombreProductoContaining(String idProducto, String nombreProducto);



}
