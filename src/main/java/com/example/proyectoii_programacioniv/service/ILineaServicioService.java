package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.dto.LineaServicioDto;
import com.example.proyectoii_programacioniv.entity.LineaServicioEntity;

import java.util.List;

public interface ILineaServicioService {
    void saveAll(List<LineaServicioDto> lineasServicioDto);

    List<LineaServicioEntity> findAllByIdFactura(String id);

    void deleteById(String numFactura);
}
