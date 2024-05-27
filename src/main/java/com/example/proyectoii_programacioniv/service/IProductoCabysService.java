package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.dto.ProductoCabysDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("productoCabysService")
public interface IProductoCabysService {
    List<ProductoCabysDto> buscarProductosCabys(String nombre);
}
