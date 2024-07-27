-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2024 a las 05:41:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bitacora`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aplicacion`
--

CREATE TABLE `aplicacion` (
  `id_aplicacion` int(11) NOT NULL,
  `aplicacion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aplicacion`
--

INSERT INTO `aplicacion` (`id_aplicacion`, `aplicacion`) VALUES
(1, 'ac'),
(2, 'ad'),
(3, 'agendamiento'),
(4, 'aprovisionador sip centralizado'),
(5, 'ascard'),
(6, 'asistente virtual'),
(7, 'avanza tableau'),
(8, 'bases de datos'),
(9, 'bd'),
(10, 'callidus'),
(11, 'citrix'),
(12, 'clarity'),
(13, 'cmax'),
(14, 'cmc'),
(15, 'correo'),
(16, 'crm'),
(17, 'denother'),
(18, 'dime'),
(19, 'emanagement'),
(20, 'entrust'),
(21, 'facturador web'),
(22, 'ga no tiene alcance'),
(23, 'geoprobe'),
(24, 'gerencia'),
(25, 'gestor documental'),
(26, 'gevenue front'),
(27, 'gpon netnument'),
(28, 'gpon u2000 '),
(29, 'hendrix'),
(30, 'herramienta laboral fija'),
(31, 'herramienta laboral movil'),
(32, 'herramienta legal fija'),
(33, 'herramienta legal movil ws'),
(34, 'identidad'),
(35, 'imeicomcel'),
(36, 'ivalua'),
(37, 'ivr'),
(38, 'multiples aplicaciones'),
(39, 'myit'),
(40, 'netnument'),
(41, 'ngn'),
(42, 'ocsdm sbc'),
(43, 'office 365'),
(44, 'ota'),
(45, 'otros'),
(46, 'pbx administrada videoconferencia'),
(47, 'poliedro'),
(48, 'portafirmas'),
(49, 'reporte y liberacion'),
(50, 'rlm recepción y legalización'),
(51, 'rms'),
(52, 'rr'),
(53, 'rr agendamiento gerencia'),
(54, 'sac'),
(55, 'safari'),
(56, 'sap'),
(57, 'sap 6.0'),
(58, 'sga facturacion fija'),
(59, 'sicacom'),
(60, 'so'),
(61, 'softswitch ims huawei'),
(62, 'softswitch corporativo'),
(63, 'srt'),
(64, 'stf com037'),
(65, 'subex'),
(66, 'tacacs'),
(67, 'tms'),
(68, 'visor'),
(69, 'visor de factibilidad'),
(70, 'yellowbrick');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `cedula_cliente` int(11) DEFAULT NULL,
  `identidad_cliente` varchar(50) DEFAULT NULL,
  `nombres_cliente` varchar(50) DEFAULT NULL,
  `apellidos_cliente` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `cedula_cliente`, `identidad_cliente`, `nombres_cliente`, `apellidos_cliente`) VALUES
(1, 13276551, '4684336', 'nena', 'nene'),
(2, 2147483647, 'f6d843', 'luisa', 'perez'),
(3, 2147483612, 'dfs464156', 'sopa', 'frijol'),
(4, 624462873, '3s4d65f', 'lele', 'lolo'),
(5, 2147435441, 'f846f64', 'anime', 'animado'),
(6, 8795641, '64d5d615', 'pepito', 'pepita'),
(7, 2147483647, '21368494985', 'miguel alberto', 'martinez franco'),
(8, 1968413514, '684351948', 'mario', 'bros'),
(9, 2147483647, '231654159', 'marco', 'fenix'),
(10, 234324516, '516654894', 'roger', 'monkey'),
(11, 2147483647, '1357968351', 'juanita', 'patito'),
(12, 2147483647, '25456842', 'lunes', 'viernes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_caso`
--

CREATE TABLE `estado_caso` (
  `id_estado_caso` int(11) NOT NULL,
  `estado_caso` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_caso`
--

INSERT INTO `estado_caso` (`id_estado_caso`, `estado_caso`) VALUES
(1, 'terminado'),
(2, 'devuelto'),
(3, 'escalado'),
(4, 'devuelto mesa filtros'),
(5, 'pendiente'),
(6, 'mal categorizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo_resolutor`
--

CREATE TABLE `grupo_resolutor` (
  `id_grupo_resolutor` int(11) NOT NULL,
  `grupo_resolutor` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `grupo_resolutor`
--

INSERT INTO `grupo_resolutor` (`id_grupo_resolutor`, `grupo_resolutor`) VALUES
(1, 'COL_NOIT_GSAD_ACCESOS'),
(2, 'COL_IT_OPERACION_CA_IDS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `herramienta`
--

CREATE TABLE `herramienta` (
  `id_herramienta` int(11) NOT NULL,
  `herramienta` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `herramienta`
--

INSERT INTO `herramienta` (`id_herramienta`, `herramienta`) VALUES
(1, 'postman'),
(2, 'masiva ca'),
(3, 'masiva legado'),
(4, 'legado'),
(5, 'ca'),
(6, 'freya'),
(7, 'masivo oim'),
(8, 'oim'),
(9, 'service manager'),
(10, 'no aplica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lider`
--

CREATE TABLE `lider` (
  `id_lider` int(11) NOT NULL,
  `lider` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lider`
--

INSERT INTO `lider` (`id_lider`, `lider`) VALUES
(1, 'Luis Felipe'),
(2, 'Gabriel'),
(3, 'Melissa'),
(4, 'Caterin'),
(5, 'CA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `numerador_usuario`
--

CREATE TABLE `numerador_usuario` (
  `TABLA` varchar(255) NOT NULL,
  `ULTIMO_NUMERO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `numerador_usuario`
--

INSERT INTO `numerador_usuario` (`TABLA`, `ULTIMO_NUMERO`) VALUES
('usuario', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_solicitud`
--

CREATE TABLE `registro_solicitud` (
  `id_registroSolicitud` int(11) NOT NULL,
  `no_caso` varchar(50) DEFAULT NULL,
  `fo_tipo_solicitud` int(11) DEFAULT NULL,
  `cantidad_usuarios` int(11) DEFAULT NULL,
  `fo_aplicacion` int(11) DEFAULT NULL,
  `fo_herramienta` int(11) DEFAULT NULL,
  `fo_estado_caso` int(11) DEFAULT NULL,
  `fo_turno` int(11) DEFAULT NULL,
  `cantidad_aplicaciones` int(11) DEFAULT NULL,
  `fo_lider` int(11) DEFAULT NULL,
  `fo_grupo_resolutor` int(11) DEFAULT NULL,
  `id_tarea` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `fo_usuario` int(11) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_solicitud`
--

INSERT INTO `registro_solicitud` (`id_registroSolicitud`, `no_caso`, `fo_tipo_solicitud`, `cantidad_usuarios`, `fo_aplicacion`, `fo_herramienta`, `fo_estado_caso`, `fo_turno`, `cantidad_aplicaciones`, `fo_lider`, `fo_grupo_resolutor`, `id_tarea`, `observaciones`, `fo_usuario`, `fecha_registro`) VALUES
(1, 'w0000012', 9, 1, 5, 2, 2, 2, 1, 3, 1, '564615-6156351-654168', 'datos de prueba', 2, '2024-07-02 20:19:02'),
(2, 'w0000015', 3, 2, 6, 1, 3, 3, 5, 4, 2, 'NA', 'datos de prueba', 3, '2024-07-02 21:33:29'),
(3, 'w000001256', 3, 1, 11, 3, 3, 2, 1, 3, 2, 'NA', 'datos de prueba', 4, '2024-07-02 21:36:16'),
(4, 'w65431', 6, 1, 5, 9, 2, 2, 1, 1, 2, 'NA', 'datos de prueba', 1, '2024-07-03 04:52:42'),
(5, 'w0000012566', 8, 1, 8, 4, 5, 3, 2, 5, 1, 'NA', 'prueba', 1, '2024-07-03 06:42:45'),
(6, 'waaaapo', 9, 1, 5, 3, 4, 3, 1, 2, 1, 'NA', 'prueba', 1, '2024-07-04 01:19:41'),
(7, 'w000001284', 10, 2, 8, 1, 4, 3, 1, 2, 1, '12319843519/849648', 'datos de prueba', 1, '2024-07-17 05:15:29'),
(8, 'w0000002154', 8, 2, 3, 1, 6, 1, 1, 4, 1, 'NA', 'datos de prueba', 8, '2024-07-17 06:26:54'),
(9, 'w56354631535', 5, 1, 31, 6, 5, 2, 1, 3, 1, 'NA', 'datos de prueba', 1, '2024-07-22 05:04:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_solicitud_cliente`
--

CREATE TABLE `registro_solicitud_cliente` (
  `id_registroSolicitud` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_solicitud_cliente`
--

INSERT INTO `registro_solicitud_cliente` (`id_registroSolicitud`, `id_cliente`) VALUES
(1, 3),
(2, 2),
(3, 4),
(4, 5),
(5, 6),
(6, 2),
(7, 7),
(7, 8),
(8, 9),
(8, 10),
(9, 11),
(9, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_solicitud`
--

CREATE TABLE `tipo_solicitud` (
  `id_tipoSolicitud` int(11) NOT NULL,
  `tipoSolicitud` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_solicitud`
--

INSERT INTO `tipo_solicitud` (`id_tipoSolicitud`, `tipoSolicitud`) VALUES
(1, 'Creación'),
(2, 'Modificación'),
(3, 'Eliminación'),
(4, 'Reactivación'),
(5, 'Restauración contraseña'),
(6, 'Sincronización'),
(7, 'Inhabilitación'),
(8, 'Controles GSI'),
(9, 'Desactivación Fraude'),
(10, 'Retiro RRHH'),
(11, 'Verificación');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int(11) NOT NULL,
  `tipo_usuario` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id_tipo_usuario`, `tipo_usuario`) VALUES
(1, 'analista'),
(2, 'lider'),
(3, 'gestor de servicio'),
(4, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno`
--

CREATE TABLE `turno` (
  `id_turno` int(11) NOT NULL,
  `turno` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turno`
--

INSERT INTO `turno` (`id_turno`, `turno`) VALUES
(1, 't1'),
(2, 't2'),
(3, 't3'),
(4, 't4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(50) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `tipo_documento` varchar(50) DEFAULT NULL,
  `no_identificacion` int(11) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `contraseña` varchar(250) DEFAULT NULL,
  `fo_tipo_usuario` int(11) DEFAULT NULL,
  `estado` enum('HABILITADO','DESHABILITADO') NOT NULL DEFAULT 'HABILITADO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombres`, `apellidos`, `tipo_documento`, `no_identificacion`, `correo`, `nombre_usuario`, `contraseña`, `fo_tipo_usuario`, `estado`) VALUES
(1, 'josuar habit', 'gil contreras', 'Cedula', 1002156334, 'josuar4gil@gmail.com', 'josuar1002156334', '$2a$10$UjSNyAdCwlGnrD5ijq7K5u5Ew0qqjxITUJ/yPcOE7NsdpTpi2AKWy', 4, 'HABILITADO'),
(2, 'Pedro Hernández', 'Gómez Martínez', 'Cedula', 321654987, 'pedro.hernandez@example.com', 'pedro321654987', '$2a$10$AZI8tOBjm.i/Z93ZI13QIOrJID89x3SMC9TuUiwCMDokRkzF2gspG', 3, 'HABILITADO'),
(3, 'Rafael Reyes', 'López Hernández', 'Cedula', 357156935, 'rafael.reyes@example.com', 'rafael357156935', '$2a$10$KFYL6n/IOu5xCDvPGzfXuOLimM/BsBGvM5c.cHYa293UVGXr9bKL.', 2, 'DESHABILITADO'),
(4, 'Francisco Lara', 'Gómez Pérez', 'Cedula', 654156657, 'francisco.lara@example.com', 'francisco654156657', '$2a$10$heya5OsVAXW5I/4D9utzOO9iUtp7i7CzEy.vsJyw3kVk8qeHqgg/i', 1, 'HABILITADO'),
(5, 'Marcela Muñoz', 'Sánchez Gutiérrez', 'Cedula', 357654159, 'marcela.munoz@example.com', 'marcela357654159', '$2a$10$gaz4RLGJP89KjaMZmtlFdOLkeSLRoaqxIp53.4eUMdirDe70JhV6S', 3, 'HABILITADO'),
(6, 'Ana Martínez', 'Hernández Rodríguez', 'RC', 2147483647, 'anais.martinez@gmail.com', 'ana2147483647', '$2a$10$jVkd/deS5Ku6Nmgji2uHsebEGOJ.j1VQL/32vQjpMKtoh9u6.QCCq', 1, 'HABILITADO'),
(7, 'luffy', 'D.', 'Cedula', 100000001, 'muguiwara@gmail.com', 'monkey100000001', '$2a$10$azwAqfEZI4B8j.oVwsrGj.notVY5BwwFEIptN6f479vr0/xDXpr.q', 4, 'HABILITADO'),
(8, 'tom', 'jerry', 'Pasaporte', 123123123, 'tomyjerry@gmail.com', 'tomas123123123', '$2a$10$rWESYF33XztaCFBtrqUcpeOaujXZa2QKELKwYjmcSNAvfBW50wQZm', 4, 'HABILITADO'),
(9, 'bomber', 'mario', 'Pasaporte', 312246514, 'mario@gmail.com', 'bomber312246514', '$2a$10$KrUM4S15o8N73GgXlTlA.ea3Esb3E0P3hK4SLBKQ/OH98pxlViuu6', 1, 'HABILITADO'),
(10, 'pepita', 'marttes', 'Pasaporte', 1987451321, 'marttes@gmail.com', 'pepita1987451321', '$2a$10$7.s1IJywqbbV8zF2nqmrFupZgh8DrvljsvssRqsDCDW9qCG/LaLUm', 1, 'HABILITADO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  ADD PRIMARY KEY (`id_aplicacion`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `estado_caso`
--
ALTER TABLE `estado_caso`
  ADD PRIMARY KEY (`id_estado_caso`);

--
-- Indices de la tabla `grupo_resolutor`
--
ALTER TABLE `grupo_resolutor`
  ADD PRIMARY KEY (`id_grupo_resolutor`);

--
-- Indices de la tabla `herramienta`
--
ALTER TABLE `herramienta`
  ADD PRIMARY KEY (`id_herramienta`);

--
-- Indices de la tabla `lider`
--
ALTER TABLE `lider`
  ADD PRIMARY KEY (`id_lider`);

--
-- Indices de la tabla `numerador_usuario`
--
ALTER TABLE `numerador_usuario`
  ADD PRIMARY KEY (`TABLA`);

--
-- Indices de la tabla `registro_solicitud`
--
ALTER TABLE `registro_solicitud`
  ADD PRIMARY KEY (`id_registroSolicitud`),
  ADD KEY `fo_tipo_solicitud` (`fo_tipo_solicitud`),
  ADD KEY `fo_aplicacion` (`fo_aplicacion`),
  ADD KEY `fo_herramienta` (`fo_herramienta`),
  ADD KEY `fo_estado_caso` (`fo_estado_caso`),
  ADD KEY `fo_turno` (`fo_turno`),
  ADD KEY `fo_grupo_resolutor` (`fo_grupo_resolutor`),
  ADD KEY `fo_lider` (`fo_lider`),
  ADD KEY `fo_usuario` (`fo_usuario`);

--
-- Indices de la tabla `registro_solicitud_cliente`
--
ALTER TABLE `registro_solicitud_cliente`
  ADD PRIMARY KEY (`id_registroSolicitud`,`id_cliente`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `tipo_solicitud`
--
ALTER TABLE `tipo_solicitud`
  ADD PRIMARY KEY (`id_tipoSolicitud`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id_tipo_usuario`);

--
-- Indices de la tabla `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`id_turno`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `no_identificacion` (`no_identificacion`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD KEY `fo_tipo_usuario` (`fo_tipo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  MODIFY `id_aplicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `estado_caso`
--
ALTER TABLE `estado_caso`
  MODIFY `id_estado_caso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `grupo_resolutor`
--
ALTER TABLE `grupo_resolutor`
  MODIFY `id_grupo_resolutor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `herramienta`
--
ALTER TABLE `herramienta`
  MODIFY `id_herramienta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `lider`
--
ALTER TABLE `lider`
  MODIFY `id_lider` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `registro_solicitud`
--
ALTER TABLE `registro_solicitud`
  MODIFY `id_registroSolicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tipo_solicitud`
--
ALTER TABLE `tipo_solicitud`
  MODIFY `id_tipoSolicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipo_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `id_turno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `registro_solicitud`
--
ALTER TABLE `registro_solicitud`
  ADD CONSTRAINT `registro_solicitud_ibfk_1` FOREIGN KEY (`fo_tipo_solicitud`) REFERENCES `tipo_solicitud` (`id_tipoSolicitud`),
  ADD CONSTRAINT `registro_solicitud_ibfk_2` FOREIGN KEY (`fo_aplicacion`) REFERENCES `aplicacion` (`id_aplicacion`),
  ADD CONSTRAINT `registro_solicitud_ibfk_3` FOREIGN KEY (`fo_herramienta`) REFERENCES `herramienta` (`id_herramienta`),
  ADD CONSTRAINT `registro_solicitud_ibfk_4` FOREIGN KEY (`fo_estado_caso`) REFERENCES `estado_caso` (`id_estado_caso`),
  ADD CONSTRAINT `registro_solicitud_ibfk_5` FOREIGN KEY (`fo_turno`) REFERENCES `turno` (`id_turno`),
  ADD CONSTRAINT `registro_solicitud_ibfk_6` FOREIGN KEY (`fo_grupo_resolutor`) REFERENCES `grupo_resolutor` (`id_grupo_resolutor`),
  ADD CONSTRAINT `registro_solicitud_ibfk_7` FOREIGN KEY (`fo_lider`) REFERENCES `lider` (`id_lider`),
  ADD CONSTRAINT `registro_solicitud_ibfk_8` FOREIGN KEY (`fo_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `registro_solicitud_cliente`
--
ALTER TABLE `registro_solicitud_cliente`
  ADD CONSTRAINT `registro_solicitud_cliente_ibfk_1` FOREIGN KEY (`id_registroSolicitud`) REFERENCES `registro_solicitud` (`id_registroSolicitud`),
  ADD CONSTRAINT `registro_solicitud_cliente_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`fo_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
