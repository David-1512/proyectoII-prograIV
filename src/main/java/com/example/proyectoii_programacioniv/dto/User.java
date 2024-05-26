package com.example.proyectoii_programacioniv.dto;

import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class User implements Serializable {
    protected String id;
    protected String nombre;
    protected String password;
    protected String rol;
    protected char estado;
}
