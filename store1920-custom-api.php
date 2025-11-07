<?php
/**
 * Store1920 Custom Category API Endpoint
 * Add this code to your WordPress theme's functions.php file
 * or create this as a separate plugin file
 */

// --- Store1920 Custom Category API ---
add_action('rest_api_init', function () {
    register_rest_route('store1920/v1', '/category/(?P<slug>[a-zA-Z0-9-_]+)', [
        'methods' => 'GET',
        'callback' => 'store1920_get_category_by_slug',
        'permission_callback' => '__return_true',
    ]);
});

function store1920_get_category_by_slug($data) {
    $slug = sanitize_text_field($data['slug']);
    
    // First try to get the category by slug
    $term = get_term_by('slug', $slug, 'product_cat');

    if (!$term) {
        // Log the error for debugging
        error_log("Store1920 API: No category found for slug: " . $slug);
        return new WP_Error('category_not_found', 'No category found for this slug', ['status' => 404]);
    }

    // Get category image
    $image_id = get_term_meta($term->term_id, 'thumbnail_id', true);
    $image_url = null;
    if ($image_id) {
        $image_url = wp_get_attachment_url($image_id);
    }

    // Get category data
    $category_data = [
        'id'          => $term->term_id,
        'name'        => $term->name,
        'slug'        => $term->slug,
        'description' => $term->description,
        'image'       => $image_url,
        'count'       => $term->count,
        'parent'      => $term->parent,
        'link'        => get_term_link($term),
    ];

    // Log successful response for debugging
    error_log("Store1920 API: Found category for slug " . $slug . " with ID " . $term->term_id);

    // Return properly as WP_REST_Response
    return rest_ensure_response($category_data);
}

// Add debug endpoint to check all categories
add_action('rest_api_init', function () {
    register_rest_route('store1920/v1', '/categories/debug', [
        'methods' => 'GET',
        'callback' => 'store1920_debug_categories',
        'permission_callback' => '__return_true',
    ]);
});

function store1920_debug_categories() {
    $categories = get_terms([
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
        'number' => 50,
    ]);

    $debug_data = [];
    foreach ($categories as $category) {
        $debug_data[] = [
            'id' => $category->term_id,
            'name' => $category->name,
            'slug' => $category->slug,
            'count' => $category->count,
            'parent' => $category->parent,
        ];
    }

    return rest_ensure_response($debug_data);
}