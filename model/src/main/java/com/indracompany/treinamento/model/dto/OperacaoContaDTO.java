package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class OperacaoContaDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime dataHora;
	private double valor;
	private String operacaoTipo;

}
