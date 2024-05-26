package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component("proveedorDao")
public interface ProveedorDao extends CrudRepository<ProveedorEntity,String> {
    List<ProveedorEntity> findByEstado(Character estado);
    List<ProveedorEntity> findByEstadoIn(List<Character> estados);

    List<ProveedorEntity> findByNombreContaining(String nombre);

    List<ProveedorEntity> findByIdContaining(String nombre);
    List<ProveedorEntity> findByIdContainingAndEstadoIn(String idText, List<Character> estados);
    List<ProveedorEntity> findByNombreContainingAndEstadoIn(String nombreText, List<Character> estados);

    List<ProveedorEntity> findByIdContainingAndEstado(String nombre, Character e);

    List<ProveedorEntity> findByNombreContainingAndEstado(String nombre, Character  e);
}
