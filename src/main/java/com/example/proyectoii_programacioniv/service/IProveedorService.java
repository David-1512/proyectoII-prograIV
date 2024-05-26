package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import com.example.proyectoii_programacioniv.dto.User;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("proveedorService")
public interface IProveedorService {
    ProveedorEntity findById(String id);
    List<ProveedorEntity> findByEstado(char estado);

    List<ProveedorEntity> findByEstadoIn(List<Character> estados);

    void save(ProveedorDto proveedorDto);

    User getProveedorSinContrasenia(String id);

    ProveedorDto invertirEstado(ProveedorEntity proveedor);

    List<ProveedorDto> buscar(String nombre);

    List<ProveedorDto> buscarSolicitudes(String nombre);

    void actualizarActivo(String id);

    void delete(ProveedorEntity proveedor);
}
