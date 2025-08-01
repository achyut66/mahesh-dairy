<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'md' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'VSlRDUDsZ@b;Wit,)30s[GL.J1N^Hkohw9vK?NuP*W$P_S[r^MD.Y< HToL)rnI#' );
define( 'SECURE_AUTH_KEY',  'at`r_npR~=^4MyzL*+Gco6A1Qv^G{B2=}zteT@=Qp-@Yq.QAyHT(ciAa/P;G^JX*' );
define( 'LOGGED_IN_KEY',    'Jw(($1;yr|M&Y=Y>@6fD5GGA;u2L>d=q Fkss1L4[<r)KT^DT!$800r.{2 WVuf/' );
define( 'NONCE_KEY',        'LF.V{g?`&!eaS)VfYK}Jh}|f?1IBy9=o[rM7w-d^/GZ|QucK|Y~>)TWL]-Who3lr' );
define( 'AUTH_SALT',        'Q:E[^W2F)JaOV~d9_9eB2Pky|RW12k@Gkv5$GT-BogY*~Jp 4n&DU|ysdQFNTIgC' );
define( 'SECURE_AUTH_SALT', 'cA=&Qe=d^#i#v401na_qRho<=9y)[y[%4v*_:- d?<6+]~aN0sdb:.88AZ2lM?!7' );
define( 'LOGGED_IN_SALT',   '8_DVkS%a3pG IAlIlYyt.875ebY/sr/5`f%@8R9|U7d7-L-!jt4?Bf(P+`fHj9u|' );
define( 'NONCE_SALT',       '@;/5[`L3?Sr6.D~0[e&B!Rr!b;=^/-F=$ePRC&]~Hi)q#GTn]zE!@.](A~seo$6S' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



define( 'SURECART_ENCRYPTION_KEY', 'Jw(($1;yr|M&Y=Y>@6fD5GGA;u2L>d=q Fkss1L4[<r)KT^DT!$800r.{2 WVuf/' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
