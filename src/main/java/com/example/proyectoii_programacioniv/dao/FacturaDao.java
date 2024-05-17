package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import org.springframework.data.repository.CrudRepository;

public interface FacturaDao extends CrudRepository<FacturasEntity,String> {
}
