package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.dto.OperacaoContaDTO;
import com.indracompany.treinamento.model.entity.OperacaoConta;
import com.indracompany.treinamento.model.service.OperacaoContaService;

@RestController
@RequestMapping("rest/operacoes")
public class OperacaoContaRest extends GenericCrudRest<OperacaoConta, Long, OperacaoContaService> {
	
	@Autowired
	private OperacaoContaService operacaoContaService;
	
	@GetMapping(value = "/buscarExtratoPorConta", produces = {MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<OperacaoContaDTO>> capOperacoes(
			@RequestParam String agencia,
			@RequestParam String numeroConta,
			@RequestParam String dataInicio, 
			@RequestParam String dataFinal){
		List<OperacaoContaDTO> dto = operacaoContaService.capOperacoes(
			agencia, 
			numeroConta,
			dataInicio, 
			dataFinal);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
}
