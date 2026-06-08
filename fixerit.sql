-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2026 a las 17:47:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fixerit`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `id_empresa` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_alta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`id_empresa`, `nombre`, `descripcion`, `fecha_alta`) VALUES
(1, 'FixerIT Corp', 'Empresa de pruebas', '2026-06-08 15:04:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informatico`
--

CREATE TABLE `informatico` (
  `id_informatico` int(10) UNSIGNED NOT NULL,
  `id_empresa` int(10) UNSIGNED DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_alta` timestamp NOT NULL DEFAULT current_timestamp(),
  `disponible` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `informatico`
--

INSERT INTO `informatico` (`id_informatico`, `id_empresa`, `nombre`, `fecha_alta`, `disponible`) VALUES
(2, NULL, 'Juan Técnico', '2026-06-08 15:04:31', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id_login` int(10) UNSIGNED NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` enum('usuario','informatico','empresa') NOT NULL,
  `id_relacionado` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`id_login`, `email`, `password`, `tipo`, `id_relacionado`) VALUES
(4, 'carlos@gmail.com', '$2y$10$QtuZ02d1GISIrYd7gCupw.vE/pliWvqxL7RGunBbKYG4rDzQGd7Ne', 'usuario', 1),
(5, 'juan@fixerit.com', '$2y$10$QtuZ02d1GISIrYd7gCupw.vE/pliWvqxL7RGunBbKYG4rDzQGd7Ne', 'informatico', 1),
(6, 'empresa@fixerit.com', '$2y$10$QtuZ02d1GISIrYd7gCupw.vE/pliWvqxL7RGunBbKYG4rDzQGd7Ne', 'empresa', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `id_tarea` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `id_informatico` int(10) UNSIGNED DEFAULT NULL,
  `id_empresa` int(10) UNSIGNED DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `latitud` decimal(10,7) DEFAULT NULL,
  `longitud` decimal(10,7) DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'pendiente',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_asignacion` timestamp NULL DEFAULT NULL,
  `fecha_finalizacion` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`id_tarea`, `id_usuario`, `id_informatico`, `id_empresa`, `nombre`, `descripcion`, `latitud`, `longitud`, `estado`, `fecha_creacion`, `fecha_asignacion`, `fecha_finalizacion`) VALUES
(2, 1, NULL, NULL, 'virus', 'tengo un virus en el pc ayuda', 28.5223923, -16.3378716, 'pendiente', '2026-06-08 15:22:52', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_alta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `descripcion`, `fecha_alta`) VALUES
(1, 'Carlos', 'Usuario de prueba', '2026-06-08 15:04:01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `informatico`
--
ALTER TABLE `informatico`
  ADD PRIMARY KEY (`id_informatico`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_informatico` (`id_informatico`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id_empresa` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `informatico`
--
ALTER TABLE `informatico`
  MODIFY `id_informatico` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `id_tarea` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `informatico`
--
ALTER TABLE `informatico`
  ADD CONSTRAINT `informatico_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`);

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `tarea_ibfk_2` FOREIGN KEY (`id_informatico`) REFERENCES `informatico` (`id_informatico`),
  ADD CONSTRAINT `tarea_ibfk_3` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
