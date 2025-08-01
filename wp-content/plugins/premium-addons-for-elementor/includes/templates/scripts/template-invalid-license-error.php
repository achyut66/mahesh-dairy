<?php
/**
 * Templates Loader Error
 */

use PremiumAddons\Includes\Templates;

?>
<div class="elementor-library-error">
	<div class="elementor-library-error-message">
	<?php
		echo wp_kses_post( __( 'It looks like you\'re using Premium Addons Pro, but it was not purchased from our official website. Get official version to receive updates, support and use Premium Templates!', 'premium-addons-for-elementor' ) );
	?>
	</div>
	<div class="elementor-library-error-link">
	<?php
		printf(
			'<a class="template-library-activate-license" href="%1$s" target="_blank">%2$s</a>',
			esc_url( 'https://premiumaddons.com/validate/papro' ),
			wp_kses_post( 'Get Premium Addons Pro' )
		);
		?>
	</div>
</div>
