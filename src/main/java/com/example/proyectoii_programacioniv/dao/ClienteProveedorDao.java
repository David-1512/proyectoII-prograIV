package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.ClienteProveedorEntity;
import org.springframework.data.repository.CrudRepository;

public interface ClienteProveedorDao extends CrudRepository<ClienteProveedorEntity,String> {
}
