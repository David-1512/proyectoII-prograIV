package com.example.proyectoii_programacioniv.service;


import com.example.proyectoii_programacioniv.dto.ActividadComercialDto;
import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("actividadService")
public interface IActividadService {

    List<ActividadComercialDto> buscar(String nombre);

    ActividadComercialDto buscarPorId(String id);
}
