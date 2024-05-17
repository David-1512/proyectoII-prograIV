package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import org.springframework.data.repository.CrudRepository;

public interface ClienteDao extends CrudRepository<ClienteEntity,String> {
}
