<?php 

$context = Timber::context();
$context['post'] = new Timber\Post();
$context['products'] = wc_get_products(array(
  'limit' => 2,
  'orderby' => 'date',
  'order' => 'ASC',
));

Timber::render( 'home.twig', $context );