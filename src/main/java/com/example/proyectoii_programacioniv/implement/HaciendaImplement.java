package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.ClienteStubDao;
import com.example.proyectoii_programacioniv.dao.ProveedorStubDao;
import com.example.proyectoii_programacioniv.dto.ClienteStubDto;
import com.example.proyectoii_programacioniv.dto.ProveedorStubDto;
import com.example.proyectoii_programacioniv.entity.ClienteStubEntity;
import com.example.proyectoii_programacioniv.entity.ProveedorStubEntity;
import com.example.proyectoii_programacioniv.service.IHaciendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class HaciendaImplement implements IHaciendaService {

    @Autowired
    private ClienteStubDao clienteStubDao;

    @Autowired
    private ProveedorStubDao proveedorStubDao;

    @Transactional(readOnly = true)
    @Override
    public boolean existsClientById(String id) {
        return clienteStubDao.existsById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public boolean existsProveedorById(String id) {
        return proveedorStubDao.existsById(id);
    }

    @Transactional
    @Override
   public ClienteStubEntity saveClient(ClienteStubDto clienteStubDto){
        ClienteStubEntity clienteStub = ClienteStubEntity.builder()
                .idCliente(clienteStubDto.getIdCliente())
                .nombreCliente(clienteStubDto.getNombreCliente())
                .build();
        return clienteStubDao.save(clienteStub);
    }
    @Transactional
    @Override
    public ProveedorStubEntity saveSupplier(ProveedorStubDto proveedorStubDto){
        ProveedorStubEntity proveedorStub = ProveedorStubEntity.builder()
                .idProveedor(proveedorStubDto.getIdProveedor())
                .nombreProveedor(proveedorStubDto.getNombreProveedor())
                .build();
        return proveedorStubDao.save(proveedorStub);
    }
}
