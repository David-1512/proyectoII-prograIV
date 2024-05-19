package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.ClienteDao;
import com.example.proyectoii_programacioniv.dao.ProductoDao;
import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.ProductoEntity;
import com.example.proyectoii_programacioniv.service.IFacturaService;
import com.example.proyectoii_programacioniv.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductoImplement implements IProductoService {


    @Autowired
    private ProductoDao productoDao;

    @Transactional(readOnly = true)
    @Override
    public ProductoEntity findById(String id) {
        return productoDao.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ProductoEntity> findAllByIdProveedor(String id) {
        List<ProductoEntity> productosPorProveedor = new ArrayList<>();
        for (ProductoEntity producto : productoDao.findAll()) {
            if (producto.getIdProveedor().equals(id)) {
                productosPorProveedor.add(producto);
            }
        }
        return productosPorProveedor;
    }



}
