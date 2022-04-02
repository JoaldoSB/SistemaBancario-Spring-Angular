package com.indracompany.treinamento.model.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.OperacaoContaDTO;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.OperacaoConta;
import com.indracompany.treinamento.model.repository.OperacaoContaRepository;

@Service
public class OperacaoContaService extends GenericCrudService<OperacaoConta, Long, OperacaoContaRepository>{

	@Autowired
	private ContaBancariaService contaBancariaService;
	
	@Autowired
	private OperacaoContaRepository operacaoContaRepository;
	
//capturando as operaçoes:
	public List<OperacaoContaDTO> capOperacoes(String agencia, String numeroConta, String dataInicio, String dataFinal) {
		
		ContaBancaria conta = contaBancariaService.consultarConta(agencia, numeroConta);

		DateTimeFormatter parser = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDateTime dateTimeInicio = LocalDate.parse(dataInicio, parser).atStartOfDay();
		LocalDateTime dateTimeFinal = LocalDate.parse(dataFinal, parser).atTime(23, 59, 59);	
		
		List<OperacaoConta> operacoes = operacaoContaRepository.findByContaAndDataHoraBetween(conta, dateTimeInicio, dateTimeFinal);
		if(operacoes == null || operacoes.isEmpty()) {
			throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
		}

//listando as operaçoes:
		List<OperacaoContaDTO> listarOperacoes = new ArrayList<>();
		
		for (OperacaoConta operacaoConta : operacoes) {
			OperacaoContaDTO dto = new OperacaoContaDTO();
			dto.setDataHora(operacaoConta.getDataHora());
			dto.setValor(operacaoConta.getValor());
			dto.setOperacaoTipo(operacaoConta.getOperacaoTipo());
			listarOperacoes.add(dto);
			}
		return listarOperacoes;
	}

//salvando as operacoes:
	public void salvarOperacao(ContaBancaria conta, double valor, String operacaoTipo) {
		
		LocalDateTime dataHora = LocalDateTime.now();
		OperacaoConta operacao = new OperacaoConta(null, dataHora, conta, valor, operacaoTipo);
		this.salvar(operacao);
		}
}
