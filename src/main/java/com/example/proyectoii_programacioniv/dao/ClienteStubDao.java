package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.entity.ClienteProveedorEntity;
import com.example.proyectoii_programacioniv.entity.ClienteStubEntity;
import org.springframework.data.repository.CrudRepository;

public interface ClienteStubDao extends CrudRepository<ClienteStubEntity,String> {
}
