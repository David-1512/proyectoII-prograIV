package com.example.proyectoii_programacioniv.implement;


import com.example.proyectoii_programacioniv.dao.ProductoCabysDao;
import com.example.proyectoii_programacioniv.dto.ProductoCabysDto;
import com.example.proyectoii_programacioniv.entity.ProductoCabysEntity;
import com.example.proyectoii_programacioniv.service.IProductoCabysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ProductoCabysImplement implements IProductoCabysService {
    @Autowired
    private ProductoCabysDao productoCabysDao;

    @Override
    public List<ProductoCabysDto> buscarProductosCabys(String nombre) {
        List<ProductoCabysEntity> productosCabys = productoCabysDao.findByIdProductoContainingOrNombreProductoContaining(nombre, nombre);
        List<ProductoCabysDto> productosCabysDto = new ArrayList<>();
        for (ProductoCabysEntity producto : productosCabys) {
            productosCabysDto.add(new ProductoCabysDto(producto));
        }
        return productosCabysDto;
    }
}
