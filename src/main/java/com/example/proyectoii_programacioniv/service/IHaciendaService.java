package com.example.proyectoii_programacioniv.service;

import com.example.proyectoii_programacioniv.dto.ClienteStubDto;
import com.example.proyectoii_programacioniv.dto.ProveedorStubDto;
import com.example.proyectoii_programacioniv.entity.ClienteStubEntity;
import com.example.proyectoii_programacioniv.entity.ProveedorStubEntity;

public interface IHaciendaService {
    boolean existsClientById(String id);
    boolean existsProveedorById(String id);
    ClienteStubEntity saveClient(ClienteStubDto clienteStubDto);
    ProveedorStubEntity saveSupplier(ProveedorStubDto proveedorStubDto);
}
