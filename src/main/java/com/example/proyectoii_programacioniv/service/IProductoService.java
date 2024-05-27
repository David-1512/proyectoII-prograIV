package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.dto.ProductoProveedorDto;
import com.example.proyectoii_programacioniv.dto.UnidadMedidaDto;
import com.example.proyectoii_programacioniv.entity.ProductoProveedorEntity;

import java.util.List;

public interface IProductoService {

    ProductoProveedorEntity findById(String id);

    List<ProductoProveedorEntity> findAllByIdProveedor(String id);

    List<ProductoProveedorDto> productoProveedor(String id);

    List<ProductoProveedorDto> buscarProductosProveedor(String id, String nombreBusqueda);

    void delete(int cod);

    List<UnidadMedidaDto> unidadesMedida();

    void save(ProductoProveedorEntity productoProveedorEntity);
}
