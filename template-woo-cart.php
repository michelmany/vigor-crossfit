<?php
/*
Template Name: Vigor Cart
*/

$context = Timber::context();
$context['post'] = new Timber\Post();

Timber::render( 'page-cart.twig', $context );