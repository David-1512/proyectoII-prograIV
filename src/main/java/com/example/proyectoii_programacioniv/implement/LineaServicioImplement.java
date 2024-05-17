package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.LineaServicioDao;
import com.example.proyectoii_programacioniv.dto.LineaServicioDto;
import com.example.proyectoii_programacioniv.entity.LineaServicioEntity;
import com.example.proyectoii_programacioniv.service.ILineaServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class LineaServicioImplement implements ILineaServicioService {

    @Autowired
    private LineaServicioDao lineaServicioDao;

    @Transactional
    @Override
    public void saveAll(List<LineaServicioDto> lineasServicioDto){
        List<LineaServicioEntity> lineasServicio = new ArrayList<>();
        for (LineaServicioDto lineaServicioDto : lineasServicioDto) {
            LineaServicioEntity lineaServicio = LineaServicioEntity.builder()
                    .cod(lineaServicioDto.getCod())
                    .cantidad(lineaServicioDto.getCod())
                    .subtotal(lineaServicioDto.getSubtotal())
                    .idLinea(lineaServicioDto.getIdLinea())
                    .productoByCodProducto(lineaServicioDto.getProductoByCodProducto())
                    .facturasByNumFactura(lineaServicioDto.getFacturasByNumFactura())
                    .build();
            lineasServicio.add(lineaServicio);
        }
        lineaServicioDao.saveAll(lineasServicio);
    }


}
