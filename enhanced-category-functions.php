<?php
// Enhanced WordPress functions for category handling
// Add this to your functions.php

add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/category/(?P<slug>[a-zA-Z0-9-_]+)', [
        'methods' => 'GET',
        'callback' => 'store1920_get_category_by_slug_enhanced',
        'permission_callback' => '__return_true',
    ]);
});

function store1920_get_category_by_slug_enhanced($data) {
    $slug = sanitize_text_field($data['slug']);
    
    // Log the request for debugging
    error_log("Category API request for slug: " . $slug);
    
    // First try exact match
    $term = get_term_by('slug', $slug, 'product_cat');
    
    // If no exact match, try slug mappings
    if (!$term) {
        $slug_mappings = array(
            'kitchen-appliances' => 'home-appliances',
            'bedroom-furniture' => 'furniture-home-living',
            'living-room-furniture' => 'furniture-home-living',
            'office-furniture' => 'furniture-home-living',
            'dining-room-furniture' => 'furniture-home-living',
            'outdoor-furniture' => 'furniture-home-living',
            'kitchen' => 'home-appliances',
            'appliances' => 'home-appliances',
            'furniture' => 'furniture-home-living',
            'electronics' => 'electronics-smart-devices',
            'smart-devices' => 'electronics-smart-devices',
            'beauty' => 'beauty-personal-care',
            'personal-care' => 'beauty-personal-care',
            'kids' => 'baby-kids-maternity',
            'baby' => 'baby-kids-maternity',
            'maternity' => 'baby-kids-maternity',
            'shoes' => 'shoes-footwear',
            'footwear' => 'shoes-footwear',
            'sports' => 'sports-outdoors-hobbies',
            'outdoors' => 'sports-outdoors-hobbies',
            'hobbies' => 'sports-outdoors-hobbies',
            'toys' => 'toys-games-entertainment',
            'games' => 'toys-games-entertainment',
            'entertainment' => 'toys-games-entertainment',
            'security' => 'security-safety',
            'safety' => 'security-safety',
            'pets' => 'pet-supplies',
            'pet' => 'pet-supplies',
            'tools' => 'home-improvement-tools',
            'improvement' => 'home-improvement-tools',
            'lingerie' => 'lingerie-loungewear',
            'loungewear' => 'lingerie-loungewear',
            'costumes' => 'special-occasion-costumes',
            'special-occasion' => 'special-occasion-costumes',
            // Accessories subcategories
            'bracelets-bangles' => 'accessories',
            'bags' => 'accessories',
            'belts' => 'accessories',
            'body-jewelry' => 'accessories',
            'earrings' => 'accessories',
            'jewelry-watches' => 'accessories',
            'necklaces' => 'accessories',
            'sunglasses-eyewear' => 'accessories',
            'womens-watches' => 'accessories',
        );
        
        if (isset($slug_mappings[$slug])) {
            $mapped_slug = $slug_mappings[$slug];
            error_log("Trying mapped slug: " . $mapped_slug);
            $term = get_term_by('slug', $mapped_slug, 'product_cat');
        }
    }
    
    if (!$term) {
        error_log("No category found for slug: " . $slug);
        return new WP_Error('category_not_found', 'No category found for this slug: ' . $slug, ['status' => 404]);
    }

    $image_id = get_term_meta($term->term_id, 'thumbnail_id', true);
    $image_url = $image_id ? wp_get_attachment_url($image_id) : null;

    $result = [
        'id' => $term->term_id,
        'name' => $term->name,
        'slug' => $term->slug,
        'description' => $term->description,
        'image' => $image_url,
        'count' => $term->count,
        'parent' => $term->parent,
        'requested_slug' => $slug, // For debugging
        'found_via_mapping' => $term->slug !== $slug
    ];
    
    error_log("Category found: " . json_encode($result));
    return $result;
}

// Add debug endpoint to list all categories
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/categories/debug', [
        'methods' => 'GET',
        'callback' => 'store1920_debug_categories',
        'permission_callback' => '__return_true',
    ]);
});

function store1920_debug_categories() {
    $categories = get_terms([
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
        'number' => 50
    ]);
    
    if (is_wp_error($categories)) {
        return $categories;
    }
    
    $result = [];
    foreach ($categories as $category) {
        $result[] = [
            'id' => $category->term_id,
            'name' => $category->name,
            'slug' => $category->slug,
            'count' => $category->count,
            'parent' => $category->parent
        ];
    }
    
    return $result;
}

// Enable WordPress debug logging (add to wp-config.php if not already there)
if (!defined('WP_DEBUG_LOG')) {
    ini_set('log_errors', 1);
    ini_set('error_log', WP_CONTENT_DIR . '/debug.log');
}
?>