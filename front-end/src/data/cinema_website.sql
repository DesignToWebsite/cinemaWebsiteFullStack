-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 09 mars 2024 à 14:38
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cinema_website`
--

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2024_01_04_111120_create_movies_table', 1),
(5, '2024_01_04_111158_create_reservations_table', 1),
(6, '2024_01_04_113806_create_users_table', 1),
(7, '2024_01_08_230952_create_subscriptions_table', 1),
(8, '2024_01_08_230958_create_plans_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `movies`
--

CREATE TABLE `movies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `img` text NOT NULL,
  `video` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `day` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `salle` varchar(255) NOT NULL,
  `actors` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `star` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `price` double(8,2) NOT NULL,
  `placesRoom` int(11) NOT NULL,
  `top` tinyint(1) NOT NULL,
  `age` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `movies`
--

INSERT INTO `movies` (`id`, `name`, `img`, `video`, `description`, `day`, `time`, `salle`, `actors`, `category`, `star`, `year`, `price`, `placesRoom`, `top`, `age`, `created_at`, `updated_at`) VALUES
(1, 'Inception', 'https://www.themoviedb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg', 'YoHD9XEInc0', 'Dom Cobb is a skilled thief, but his rare ability to enter people\'s dreams and steal their deepest secrets has made him an international fugitive. Now, Cobb is offered a chance at redemption. One last job could give him his life back, but only if he can accomplish the impossible—inception.', 'Monday', '10:00', 's1', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page', 'Science Fiction, Thriller', 91, 2010, 140.00, 60, 0, '18+', '2024-03-09 11:36:06', '2024-03-09 11:36:06'),
(2, 'The Shawshank Redemption', 'https://imgs.search.brave.com/Hqeqn8SrGHh2zZl_e-nhTm5vN4ZkQGrAn_PJdI_lASk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk5ERTNPRGN4/WXpNdFkyWXpaQzAw/Tm1ObExXSmlORE10/WkRWaVpXTTJNekl4/WkRZd1hrRXlYa0Zx/Y0dkZVFYVnlOakF3/TkRVeE9ESUAuanBn', 'PLl99DlL6b4', 'Andy Dufresne, a banker, is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover. He befriends a fellow inmate, Red, and together they find hope and redemption in the most unlikely place.', 'Monday', '14:00', 's1', 'Tim Robbins, Morgan Freeman', 'Drama, Crime', 91, 1994, 140.00, 60, 0, '18+', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'The Dark Knight', 'https://imgs.search.brave.com/beIeLw_50EseU4QSucNR-b4j_FYHJtL9WczheAxPISU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5zZW5zY3JpdGlx/dWUuY29tL21lZGlh/LzAwMDAxODc2MjU1/Ny8zMDAvdGhlX2Rh/cmtfa25pZ2h0X2xl/X2NoZXZhbGllcl9u/b2lyLmpwZw', 'EXeTwQWrcwY', 'Batman faces his greatest challenge as the Joker wreaks havoc on Gotham City. With the help of allies like Commissioner Gordon and Harvey Dent, Batman must navigate a world of chaos and make personal sacrifices to save the city.', 'Monday', '14:00', 's1', 'Christian Bale, Heath Ledger, Aaron Eckhart', 'Action, Crime', 91, 2008, 140.00, 60, 0, '18+', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'The Godfather', 'https://imgs.search.brave.com/Np8xDwtX2JL3rDbRe4bPvFZn39vG-7z0UYMCeRQPCXQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk0yTXlOall4/Tm1VdFlUQXdOaTAw/TVRZeExXSm1OV1l0/WXpabE9EWTNaVGsz/T1RGbFhrRXlYa0Zx/Y0dkZVFYVnlOemt3/TWpRNU56TUAuanBn', 'UaVTIH8mujA', 'The patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. As power struggles ensue, Michael Corleone must confront his destiny as the new Godfather.', 'Monday', '14:00', 's1', 'Marlon Brando, Al Pacino, James Caan', 'Crime, Drama', 91, 1972, 140.00, 60, 0, '18+', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'The Matrix', 'https://imgs.search.brave.com/hsBTYPyG2YRJOBlrxRiXILc3-T_TnR-AsdRDc9qEjnU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pcnMu/d3d3Lndhcm5lcmJy/b3MuY29tL2tleWFy/dC1qcGVnL21vdmll/cy9tZWRpYS9icm93/c2VyL01hdHJpeF8y/MDAweDMwMDAuSlBF/Rw\n', 'vKQi3bBA1y8', 'Neo, a computer hacker, discovers the shocking truth about the reality he thought he knew. He joins a rebellion against the machines and learns to manipulate the Matrix, leading to an epic battle for humanity\'s survival.', 'Monday', '14:00', 's1', 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss', 'Action, Science Fiction', 91, 1999, 140.00, 60, 0, '18-', '2024-03-09 10:36:06', '2024-03-09 10:36:06'),
(6, 'Jurassic Park', 'https://imgs.search.brave.com/hK59s-zm791Ay-J6OBx_LrxLerRuKOk2-9AeLOhhtNc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpETXlaR0pq/T0dJdFlqSmtaQzAw/TURWbExXRTBZMll0/WkdJd01ERXhZV0Uz/TUdRM1hrRXlYa0Zx/Y0dkZVFYVnlORFl5/TURrNU1UVUAuanBn', 'UinsNBOTNyU', 'A billionaire invites a group of experts to experience the wonders of Jurassic Park, a theme park featuring genetically cloned dinosaurs. However, when the park\'s security systems fail, chaos ensues.', 'Monday', '14:00', 's1', 'Sam Neill, Laura Dern, Jeff Goldblum', 'Adventure, Science Fiction', 91, 1993, 140.00, 60, 0, '18-', '2024-03-09 10:36:06', '2024-03-09 10:36:06'),
(7, 'The Silence of the Lambs', 'https://imgs.search.brave.com/XUbQmzZ5KDvvr7fbbXfb3aDLV_A7kPZ-5BxXyIYE5ZI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/Lzcxd3l0b3BOaFBM/LmpwZw', '6iB21hsprAQ', 'FBI trainee Clarice Starling seeks the help of the brilliant but insane Dr. Hannibal Lecter to catch a serial killer. As she delves into the mind of a psychopath, she must confront her own demons.', 'Monday', '14:00', 's1', 'Jodie Foster, Anthony Hopkins', 'Crime/Drama', 91, 1991, 140.00, 60, 0, '18-', '2024-03-09 10:36:06', '2024-03-09 10:36:06'),
(9, 'The Lord of the Rings: The Fellowship of the Ring', 'https://imgs.search.brave.com/Uiz3YvnK5rt0iNHGjREZwUdEOsxCzc27L7AEwaGICDQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pcnMu/d3d3Lndhcm5lcmJy/b3MuY29tL2tleWFy/dC1qcGVnL21vdmll/cy9tZWRpYS9icm93/c2VyL2xvcmRfb2Zf/dGhlX3JpbmdzX2Zl/bGxvd3NoaXBfb2Zf/dGhlX3JpbmdfMjAw/MHgzMDAwLmpwZw', 'V75dMMIW2B4', 'Frodo Baggins embarks on a perilous journey to destroy a powerful ring and prevent the dark lord Sauron from conquering Middle-earth. He is joined by a diverse fellowship of creatures with their own motives.', 'Monday', '14:00', 's1', 'Elijah Wood, Ian McKellen, Viggo Mortensen', 'Adventure, Fantasy', 91, 2001, 140.00, 60, 1, '18+', '2024-03-09 10:36:06', '2024-03-09 10:36:06'),
(10, 'The Departed', 'https://imgs.search.brave.com/BQ_4L1syIGsLzjAHbpGdE3UvCV6sOcJ_cC0KB-HaFm0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pcnMu/d3d3Lndhcm5lcmJy/b3MuY29tL2tleWFy/dC1qcGVnL2RlcGFy/dGVkX2tleWFydC5q/cGc', 'iojhqm0JTW4', 'Infiltrating the Boston police force, mob mole Colin Sullivan and undercover cop Billy Costigan race to uncover each others identity. As tensions rise, both sides must navigate the dangerous world of crime and deception.', 'Monday', '14:00', 's1', 'Leonardo DiCaprio, Matt Damon, Jack Nicholson', 'Crime,Drama', 91, 2006, 140.00, 60, 1, '18+', NULL, NULL),
(11, 'Interstellar', 'https://imgs.search.brave.com/JDCnp7-TzWZtfvVZp0YUd6zJnun9sj46JV-XHSVd3cY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpqZGtPVFUz/TURrdE4ySXhPUzAw/T0dFeUxXRm1Namt0/WTJGaU1tWmtOV0l5/T0RaaVhrRXlYa0Zx/Y0dkZVFYVnlNVE14/T0RrMk9UVUAuanBn', 'zSWdZVtXT7E', 'Earth is dying, and a group of astronauts embarks on a journey through a wormhole in search of a new habitable planet. The film explores themes of love, time dilation, and the survival of humanity.', 'Monday', '14:00', 's1', 'Matthew McConaughey, Anne Hathaway, Jessica Chastain', 'Science Fiction, Drama', 91, 2014, 140.00, 60, 1, '18+', NULL, NULL),
(12, 'Fight Club', 'https://imgs.search.brave.com/VW48B9j8-JsH7NFcFmiYxLuxcuXJsPim1j1_dM52Cx8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk5XVTVaakEx/T1RRdE1HRTFNUzAw/TldVM0xUaG1ZVEV0/TVRJMlpqbGhOell4/WmpVNVhrRXlYa0Zx/Y0dkZVFYVnlPREU1/TnpFM09URUAuanBn', 'BdJKm16Co6M', 'An insomniac office worker and a soap salesman form an underground fight club as a form of male bonding and an escape from their mundane lives. However, the consequences spiral out of control.', 'Monday', '14:00', 's1', 'Brad Pitt, Edward Norton, Helena Bonham Carter', 'Drama, Thriller', 91, 1999, 140.00, 60, 1, '18+', NULL, NULL),
(13, 'Get Out', 'https://imgs.search.brave.com/tqFmjLoKeZpwfmhKsuBGQMcimVvqs32FLjuDZj-fIKk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2luZW1hdGhlcXVl/LnFjLmNhL3dvcmtz/cGFjZS91cGxvYWRz/L2ZpbG1zL3ZpZ25l/dHRlX2dldG91dC1m/ci0xNjIwNzY0Mzcz/LmpwZw', 'DzfpyUB60YY', 'Dom Cobb is a skilled thief who specializes in entering peoples dreams to steal their deepest secrets. He is offered a final job that could give him his life back if he can do the impossible - inception, planting an idea into someones mind.', 'Monday', '14:00', 's1', 'Daniel Kaluuya, Allison Williams, Bradley Whitford', 'Horror, Mystery', 91, 2010, 140.00, 60, 1, '18+', NULL, NULL),
(14, 'Mad Max: Fury Road', 'https://imgs.search.brave.com/QXl2Wla7hvpu_EKuoJrSpBzLZdXQbFZMWd6ZLh9BQKU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pcnMu/d3d3Lndhcm5lcmJy/b3MuY29tL2tleWFy/dC1qcGVnL21hZF9t/YXhfZnVyeV9yb2Fk/X3dodl9rZXlhcnQu/anBn', 'hEJnMQG9ev8', 'In a post-apocalyptic wasteland, Max teams up with Furiosa to escape a tyrannical warlord and his army who control the region\'s water supply.', 'Monday', '14:00', 's1', 'Tom Hardy, Charlize Theron, Nicholas Hoult', 'Action, Adventure', 91, 2015, 140.00, 60, 1, '18+', '2024-03-09 10:36:06', '2024-03-09 10:36:06'),
(15, 'The Social Network', 'https://imgs.search.brave.com/qAiQR6cakbQlsx6UKKrH-Dd16lio8wZ6kd1aEuc05Og/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kMzJx/eXM5YTZ3bTluby5j/bG91ZGZyb250Lm5l/dC9pbWFnZXMvbW92/aWVzL3Bvc3Rlci9m/OC9mODA0ZDIxMTQ1/NTk3ZTQyODUxZmE3/MzZlMjIxZGEzZl8z/MDB4NDQyLmpwZz90/PTE2MzYxMDIwOTU', 'lB95KLmpLR4', 'Mark Zuckerberg creates the social networking site Facebook but faces legal battles and betrayal as the platform gains immense success. The film explores themes of friendship, ambition, and morality.', 'Monday', '14:00', 's1', 'Jesse Eisenberg, Andrew Garfield, Justin Timberlake', 'Biography, Drama', 91, 2010, 140.00, 60, 1, '18+', '2024-03-09 10:36:06', '2024-03-09 10:36:06'),
(16, 'The Grand Budapest Hotel', 'https://imgs.search.brave.com/vYbYT-ZguNmYLNfyBIjXUAxkXBmYqDUiIEe9T7iwYVo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5zZW5zY3JpdGlx/dWUuY29tL21lZGlh/LzAwMDAwNjM1Mjc5/My8zMDAvdGhlX2dy/YW5kX2J1ZGFwZXN0/X2hvdGVsLmpwZw', '1Fg5iWmQjwk', 'In the 1930s, a concierge and his protegé become embroiled in a plot involving stolen art, a family fortune, and a rapidly changing political landscape. The film is a whimsical and visually stunning comedy.', 'Monday', '14:00', 's1', 'Ralph Fiennes, Tony Revolori, Adrien Brody', 'Comedy, Crime', 91, 2014, 140.00, 60, 1, '18+', '2024-03-09 10:36:06', '2024-03-09 10:36:06'),
(17, 'La La Land', 'https://imgs.search.brave.com/zoBdIKrLTG2fHbRwsOh1uFerE4eldTHavRVxMvy_O2w/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9XRXdaalF3/TURjdE9EWTFOaTAw/TWpZeExUbGhZell0/TWpGak56STVZV1Ew/WldObFhrRXlYa0Zx/Y0dkZVFXMXBZbko1/WVc1MC5fVjFfUUw3/NV9VWDUwMF9DUjAs/MCw1MDAsMjgxXy5q/cGc', 'vOBtJWG_KlI', 'Mia, an aspiring actress, and Sebastian, a jazz musician, fall in love in Los Angeles. The film pays homage to the golden age of Hollywood while exploring the challenges of pursuing dreams.', 'Monday', '14:00', 's1', 'Ryan Gosling, Emma Stone, John Legend', 'Comedy, Drama', 91, 2016, 140.00, 60, 1, '18+', '2024-03-09 10:36:06', '2024-03-09 10:36:06');

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `plans`
--

CREATE TABLE `plans` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `stripe_plan` varchar(255) NOT NULL,
  `cost` double(8,2) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `users_id` int(11) NOT NULL,
  `movies_id` int(11) NOT NULL,
  `placesReserved` int(11) NOT NULL,
  `seats` varchar(255) NOT NULL,
  `food` varchar(255) DEFAULT NULL,
  `price` double(8,2) NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT 0,
  `stripe_id` varchar(255) DEFAULT NULL,
  `stripe_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `stripe_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `stripe_plan` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `stripe_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `card_brand` varchar(255) DEFAULT NULL,
  `card_last_four` varchar(4) DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `phone`, `password`, `stripe_id`, `card_brand`, `card_last_four`, `trial_ends_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'essoussi', 'zineb', 'zineb@gmail.com', '0606060606', 'zineb', NULL, NULL, NULL, NULL, NULL, '2024-03-09 11:31:03', '2024-03-09 11:31:03'),
(2, 'admin', 'nimda', 'admin.nimda@gmail.com', '0606060606', 'admin', NULL, NULL, NULL, NULL, NULL, '2024-03-09 11:33:43', '2024-03-09 11:33:43');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plans_slug_unique` (`slug`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
