<div class="templately-builder-nav">
	<ul class="nav-tab-wrapper">
		<?php
			/**
			 * @var array $template_types
			 */
			$__type = isset($_GET['type']) ? $_GET['type'] : 'all';
			foreach ( $template_types as $typename => $type ) {
				$classes = esc_attr( $typename );
				$classes .= $__type === $typename ? ' active' : '';
				echo wp_kses( sprintf( '<li class="nav-tab %1$s"><a href="%2$s">%3$s</a></li>', $classes, esc_url( $type['url'] ), $type['label'] ), 'post' );
			}
		?>
	</ul>
	<ul class="subsubsub">
		<?php
			/**
			 * @var array $tabs
			 */
			if(!empty($tabs)){
				foreach ( $tabs as $class => $tab ) {
					echo sprintf( '<li class="%1$s">%2$s</li>', esc_attr( $class ), wp_kses( $tab, 'post' ) );
				}
			}
		?>
	</ul>
</div>
