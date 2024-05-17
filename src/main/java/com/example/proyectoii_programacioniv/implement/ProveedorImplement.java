package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.ProveedorDao;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import com.example.proyectoii_programacioniv.service.IProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;

@Service
public class ProveedorImplement implements IProveedorService {
    @Autowired
    private ProveedorDao proveedorDao;

    @Transactional(readOnly = true)
    @Override
    public ProveedorEntity findById(String id) {
        return proveedorDao.findById(id).orElse(null);
    }
}
