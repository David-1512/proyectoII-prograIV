package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.dto.ProductoProveedorDto;
import com.example.proyectoii_programacioniv.entity.ProductoProveedorEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductoProveedorDao extends CrudRepository<ProductoProveedorEntity,Integer> {
    List<ProductoProveedorEntity> findAllByIdProveedor(String id);

    List<ProductoProveedorEntity> findAllByIdProveedorAndProductoCabys_IdProductoContaining(String id, String nombreBusqueda);
    List<ProductoProveedorEntity> findAllByIdProveedorAndProductoCabys_NombreProductoContaining(String id, String nombreBusqueda);

            ;


}
