<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?>
<?php astra_content_bottom(); ?>
	</div> <!-- ast-container -->
	</div><!-- #content -->
<?php
	astra_content_after();

	astra_footer_before();

	astra_footer();

	astra_footer_after();
?>
	</div><!-- #page -->
<?php
	astra_body_bottom();
	wp_footer();
?>
<script>
document.addEventListener("DOMContentLoaded", function() {
  const header = document.getElementById('masthead');

  function updateBackground() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      header.style.background = 'rgba(26, 27, 57, 0.3)'; // force transparent on top
    }
  }

  window.addEventListener('scroll', updateBackground);
  updateBackground(); // initial call
});
</script>



	</body>
</html>
