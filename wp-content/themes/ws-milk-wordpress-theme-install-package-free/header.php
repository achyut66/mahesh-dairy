<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage WS_Theme
 * @since Wooskins 1.0
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php echo esc_url( get_bloginfo( 'pingback_url' ) ); ?>">
	<?php endif; ?>
	<?php wp_head(); 	?>

	<link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
	
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<!-- Top menu -->
	<?php
		 if ( is_active_sidebar( 'custom-header-widget' ) ) : ?>

		 <div id="header-widget-area" class="top-head chw-widget-area widget-area" role="complementary">

			 <div class="container">

			 	<?php dynamic_sidebar( 'custom-header-widget' ); ?>

			 </div>

		 </div>

	<?php endif; ?>
	<!-- End Top menu -->
	<header id="masthead" class="site-header" role="banner">



			<div class="site-header-main">
				<div class="site-branding">
					<?php ltheme_the_custom_logo(); ?>

					<?php if ( is_front_page() && is_home() ) : ?>
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
					<?php else : ?>
						<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
						<?php
					endif;
					 ?>
				
				</div><!-- .site-branding -->

				<?php if ( has_nav_menu( 'primary' ) || has_nav_menu( 'social' ) ) { ?>
					<button id="menu-toggle" class="menu-toggle"><?php _e( 'Menu', 'ltheme' ); ?></button>

					<div id="site-header-menu" class="site-header-menu">
						<?php if ( has_nav_menu( 'primary' ) ) : ?>
							<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'ltheme' ); ?>">
								<?php
									wp_nav_menu(
										array(
											'theme_location' => 'primary',
											'menu_class' => 'primary-menu',
										)
									);
								?>
							</nav><!-- .main-navigation -->
						<?php endif; ?>

						<?php if ( has_nav_menu( 'social' ) ) : ?>
							<nav id="social-navigation" class="social-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Social Links Menu', 'ltheme' ); ?>">
								<?php
									wp_nav_menu(
										array(
											'theme_location' => 'social',
											'menu_class'  => 'social-links-menu',
											'depth'       => 1,
											'link_before' => '<span class="screen-reader-text">',
											'link_after'  => '</span>',
										)
									);
								?>
							</nav><!-- .social-navigation -->
						<?php endif; ?>
					</div><!-- .site-header-menu -->
				<?php  }

 				else {
						wp_list_pages( array(
							'container' => '',
							'title_li' 	=> '',
						) );
					}

				?>
			</div><!-- .site-header-main -->
		</header><!-- .site-header -->
	<div class="site-inner">
		
		<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'ltheme' ); ?></a>
				
		<div id="content" class="site-content">
			
