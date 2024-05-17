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

@Service
public class ProductoImplement implements IProductoService {


    @Autowired
    private ProductoDao productoDao;

    @Transactional(readOnly = true)
    @Override
    public ProductoEntity findById(String id) {
        return productoDao.findById(id).orElse(null);
    }
}
