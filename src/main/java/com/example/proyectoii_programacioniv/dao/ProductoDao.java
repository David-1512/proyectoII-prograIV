package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.entity.ProductoEntity;
import org.springframework.data.repository.CrudRepository;

public interface ProductoDao extends CrudRepository<ProductoEntity,String> {
}
