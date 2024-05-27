package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.entity.ActividadComercialEntity;

import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component("actividadComercialDao")
public interface ActividadComercialDao extends CrudRepository<ActividadComercialEntity, String>{
    List<ActividadComercialEntity> findByNombreContaining(String nombre);
    List<ActividadComercialEntity> findByIdActComercialContaining(String id);

}
