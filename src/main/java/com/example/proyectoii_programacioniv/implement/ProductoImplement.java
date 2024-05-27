package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.ProductoProveedorDao;
import com.example.proyectoii_programacioniv.dto.ProductoProveedorDto;
import com.example.proyectoii_programacioniv.entity.ProductoProveedorEntity;
import com.example.proyectoii_programacioniv.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductoImplement implements IProductoService {


    @Autowired
    private ProductoProveedorDao productoDao;

    @Transactional(readOnly = true)
    @Override
    public ProductoProveedorEntity findById(String id) {
        return productoDao.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ProductoProveedorEntity> findAllByIdProveedor(String id) {
        List<ProductoProveedorEntity> productosPorProveedor = new ArrayList<>();
        for (ProductoProveedorEntity producto : productoDao.findAll()) {
            if (producto.getIdProveedor().equals(id)) {
                productosPorProveedor.add(producto);
            }
        }
        return productosPorProveedor;
    }

    @Override
    public List<ProductoProveedorDto> productosProveedor(String id) {
        List<ProductoProveedorEntity> productosPorProveedor = productoDao.findByIdProveedor(id);
        List<ProductoProveedorDto> productos = new ArrayList<>();

        for(ProductoProveedorEntity producto : productosPorProveedor){
            productos.add(ProductoProveedorDto.builder()
                    .cod(producto.getCod())
                    .descripcion(producto.getDescripcion())
                    .precio(producto.getPrecio())
                    .idProveedor(producto.getIdProveedor())
                    .idProducto(producto.getIdProducto())
                    .idUnidadMedida(producto.getIdUnidadMedida())
                    .build());
        }

        return productos;
    }


}
