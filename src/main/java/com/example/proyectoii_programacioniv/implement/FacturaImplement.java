package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.FacturaDao;
import com.example.proyectoii_programacioniv.dto.FacturasDto;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import com.example.proyectoii_programacioniv.service.IFacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

//Esto es service
@Service
public class FacturaImplement implements IFacturaService {

    @Autowired
    private FacturaDao facturaDao;

    @Transactional
    @Override
    public FacturasEntity save(FacturasDto facturaDto) {
        FacturasEntity factura = FacturasEntity.builder()
                .numFactura(facturaDto.getNumFactura())
                .consecutivo(facturaDto.getConsecutivo())
                .fechEmision(facturaDto.getFechEmision())
                .total(facturaDto.getTotal())
                .idProveedor(facturaDto.getIdProveedor())
                .idCliente(facturaDto.getIdCliente())
                .medioPago(facturaDto.getMedioPago())
                .build();
        return facturaDao.save(factura);
    }

    @Transactional(readOnly = true)
    @Override
    public FacturasEntity findById(String id) {
        return facturaDao.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public void deleteById(String id) {
        facturaDao.deleteById(id);
    }

    /*@Transactional(readOnly = true)
    @Override
    public boolean existsById(String id) {
        return facturaDao.existsById(id);
    }*/

    @Transactional(readOnly = true)
    @Override
    public List<FacturasEntity> findAllByIdProveedor(String id) {
        List<FacturasEntity> facturasPorProveedor = new ArrayList<>();
        for (FacturasEntity factura : facturaDao.findAll()) {
            if (factura.getIdProveedor().equals(id)) {
                facturasPorProveedor.add(factura);
            }
        }
        return facturasPorProveedor;
    }
}