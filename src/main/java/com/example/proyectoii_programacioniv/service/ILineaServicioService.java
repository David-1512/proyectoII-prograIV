package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.dto.LineaServicioDto;

import java.util.List;

public interface ILineaServicioService {
    void saveAll(List<LineaServicioDto> lineasServicioDto);
}
