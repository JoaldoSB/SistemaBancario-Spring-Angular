package com.indracompany.treinamento.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ConsultaContaBancariaDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.repository.ContaBancariaRepository;


@Service
public class ContaBancariaService extends GenericCrudService<ContaBancaria, Long, ContaBancariaRepository>{
	
	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private OperacaoContaService operacaoContaService;
	
	public double consultarSaldo(String agencia, String numero) {
		ContaBancaria c = consultarConta(agencia, numero);
		return c.getSaldo();
	}

	public ContaBancaria consultarConta(String agencia, String numeroConta) {
		ContaBancaria c = repository.findByAgenciaAndNumero(agencia, numeroConta);
		
		if (c == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		
		return c;
	}
	
	
	public List<ConsultaContaBancariaDTO> obterContasPorCpf(String cpf){

		List<ConsultaContaBancariaDTO> listaContasRetorno = new ArrayList<>();
		Cliente cli = clienteService.buscarCliente(cpf);

		List<ContaBancaria> listaContasCliente = repository.findByCliente(cli);
		for (ContaBancaria conta : listaContasCliente) {
			ConsultaContaBancariaDTO dtoConta = new ConsultaContaBancariaDTO();
			BeanUtils.copyProperties(conta, dtoConta);
			dtoConta.setCpf(conta.getCliente().getCpf());
			dtoConta.setNomeTitular(conta.getCliente().getNome());
			listaContasRetorno.add(dtoConta);
		}

		return listaContasRetorno;
	}
	
	public void depositar(String nomeContaRecebimento,String agencia, String numeroConta, double valor, String operacaoTipo) {
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);
		conta.setSaldo(conta.getSaldo() + valor);
		super.salvar(conta);
		if(operacaoTipo.equals("DEPOSITAR")) {
			operacaoContaService.salvarOperacao(conta, valor, "Deposito recebido com sucesso!");
		} else if (operacaoTipo.equals("TRANSFERIR")) {
			operacaoContaService.salvarOperacao(conta, valor, "Transferencia de" 
			+" Ag.:"+conta.getAgencia()
			+" Conta: "+conta.getNumero() 
			+" recebida com sucesso!");
		}
	}
	
	public void sacar(String nomeContaDestino, String agencia, String numeroConta, double valor, String operacaoTipo) {
		ContaBancaria conta = this.consultarConta(agencia, numeroConta);
		
		if (conta.getSaldo()<valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INEXISTENTE);
		}
		
		conta.setSaldo(conta.getSaldo() - valor);
		super.salvar(conta);
		if(operacaoTipo.equals("SACAR")) {
			operacaoContaService.salvarOperacao(conta, valor, "Saque efetuado com sucesso!");
		} else if (operacaoTipo.equals("TRANSFERIR")) {
			operacaoContaService.salvarOperacao(conta, valor, "Transferencia enviada para" 
				+" Ag.:"+conta.getAgencia()
				+" Conta: "+conta.getNumero() 
				+" com sucesso!");
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		ContaBancaria contaOrigem = consultarConta(dto.getAgenciaOrigem(),dto.getNumeroContaOrigem());
		ContaBancaria contaDestino = consultarConta(dto.getAgenciaDestino(),dto.getNumeroContaDestino());
		String clienteOrigem = contaOrigem.getCliente().getNome();
		String clienteDestino = contaDestino.getCliente().getNome();
		if (dto.getAgenciaOrigem().equals(dto.getAgenciaDestino())
				&& dto.getNumeroContaOrigem().equals(dto.getAgenciaDestino())) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		this.sacar(clienteDestino,dto.getAgenciaOrigem(), dto.getNumeroContaOrigem(), dto.getValor(), "TRANSFERIR");
		this.depositar(clienteOrigem,dto.getAgenciaDestino(), dto.getNumeroContaDestino(), dto.getValor(), "TRANSFERIR");
	}
	
}