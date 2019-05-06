-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Tempo de geração: 06/05/2019 às 13:59
-- Versão do servidor: 5.6.35
-- Versão do PHP: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Banco de dados: `PGmais`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `district` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `idClient` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `address`
--

INSERT INTO `address` (`id`, `district`, `street`, `state`, `idClient`) VALUES
(6, 'Centro', 'Rua Desembargador Motta', 'Curitiba', 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `clients`
--

CREATE TABLE `clients` (
  `_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cep` int(8) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `date_sent` datetime NOT NULL,
  `idUser` varchar(144) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `clients`
--

INSERT INTO `clients` (`_id`, `name`, `cep`, `cpf`, `date_sent`, `idUser`) VALUES
(7, 'xuxa', 80420190, '06509861882', '2019-05-06 08:17:04', 'xpto123');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `_id` varchar(144) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_sent` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `users`
--

INSERT INTO `users` (`_id`, `name`, `date_sent`) VALUES
('xpto123', 'Lucas Pires', '0000-00-00 00:00:00');

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address_client_id_foreign` (`idClient`);

--
-- Índices de tabela `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `client_user_id_foreign` (`idUser`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`_id`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de tabela `clients`
--
ALTER TABLE `clients`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_client_id_foreign` FOREIGN KEY (`idClient`) REFERENCES `clients` (`_id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `client_user_id_foreign` FOREIGN KEY (`idUser`) REFERENCES `users` (`_id`) ON DELETE CASCADE;

