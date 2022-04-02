package com.indracompany.treinamento.model.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class DepositoDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private String agencia;
	private String numeroConta;
	private double valor;
	
}
