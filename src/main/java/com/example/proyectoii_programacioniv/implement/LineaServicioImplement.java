package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.FacturaDao;
import com.example.proyectoii_programacioniv.dao.LineaServicioDao;
import com.example.proyectoii_programacioniv.dto.LineaServicioDto;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;
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

    @Autowired
    private FacturaDao facturaDao;

    @Transactional
    @Override
    public void saveAll(List<LineaServicioDto> lineasServicioDto){
        List<LineaServicioEntity> lineasServicio = new ArrayList<>();
        for (LineaServicioDto lineaServicioDto : lineasServicioDto) {
            LineaServicioEntity lineaServicio = LineaServicioEntity.builder()
                    .id((int) (lineaServicioDao.count() + 1))
                    .idLinea(lineaServicioDto.getIdLinea())
                    .cantidad(lineaServicioDto.getCantidad())
                    .subtotal(lineaServicioDto.getSubtotal())
                    .idLinea(lineaServicioDto.getIdLinea())
                    .codProducto(lineaServicioDto.getCodProducto())
                    .numFactura(String.format("%010d", facturaDao.count()))
                    .impuesto(lineaServicioDto.getImpuesto())
                    .build();
            lineasServicio.add(lineaServicio);
        }
        lineaServicioDao.saveAll(lineasServicio);
    }


    @Transactional(readOnly = true)
    @Override
    public List<LineaServicioEntity> findAllByIdFactura(String numFactura) {
        List<LineaServicioEntity> lineasServicioPorProveedor = new ArrayList<>();
        for (LineaServicioEntity lineaServicio : lineaServicioDao.findAll()) {
            if (lineaServicio.getNumFactura().equals(numFactura)) {
                lineasServicioPorProveedor.add(lineaServicio);
            }
        }
        return lineasServicioPorProveedor;
    }

    @Transactional
    @Override
    public void deleteById(String numFactura) {
        for (LineaServicioEntity lineaServicio : lineaServicioDao.findAll()) {
            if (lineaServicio.getNumFactura().equals(numFactura)) {
              lineaServicioDao.deleteById(lineaServicio.getId());
            }
        }
    }

}
