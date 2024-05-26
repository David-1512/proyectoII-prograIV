package com.example.proyectoii_programacioniv.security;

import com.example.proyectoii_programacioniv.dao.AdministradorDao;
import com.example.proyectoii_programacioniv.dao.ProveedorDao;
import com.example.proyectoii_programacioniv.dto.User;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;

import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
     AdministradorDao administradorDao;

    @Autowired
    ProveedorDao proveedorDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = null;
            user = administradorDao.findById(username);
            if (user != null) {
                return new UserDetailsImp(user);
            }
            ProveedorEntity proveedor = proveedorDao.findById(username).get();

            user = new ProveedorDto(proveedor);
            return new UserDetailsImp(user);
        } catch (Exception e) {
            throw new UsernameNotFoundException("Username " + username + " not found");
        }
    }
}
