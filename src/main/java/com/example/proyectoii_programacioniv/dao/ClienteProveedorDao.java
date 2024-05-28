package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.ClienteProveedorEntity;
import com.example.proyectoii_programacioniv.entity.ClienteProveedorId;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClienteProveedorDao extends CrudRepository<ClienteProveedorEntity, ClienteProveedorId> {


}
