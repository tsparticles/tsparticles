<?php
/**
 * Plugin Name:       Wordpress Particles
 * Description:       Official tsParticles WordPress Plugin - Easily create highly customizable particle, confetti and fireworks animations and use them as animated backgrounds for your website.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Matteo Bruni
 * License:           MIT
 * License URI:       https://mit-license.org
 * Text Domain:       wordpress-particles
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_wordpress_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_wordpress_block_init' );
