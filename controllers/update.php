<?php
$repository = 'bb829/myplugin';
$token = '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'; // Replace with your personal access token

$args = [
    'headers' => [
        'Authorization' => "token $token",
    ],
];

$response = wp_remote_get("https://api.github.com/repos/$repository/releases/latest", $args);

if (is_wp_error($response)) {
    // Handle the error
    return;
}

$release = json_decode(wp_remote_retrieve_body($response));

if (!isset($release->tag_name)) {
    // Handle the error
    return;
}

$current_version = '0.2.9'; // Update accordingly

if (version_compare($release->tag_name, $current_version, '>')) {
    set_transient('myplugin_update', $release, DAY_IN_SECONDS);
}

add_filter('pre_set_site_transient_update_plugins', function ($transient) {
    $release = get_transient('myplugin_update');

    if ($release && isset($release->tag_name)) {
        $plugin_data = get_plugin_data(__FILE__);
        $plugin_slug = plugin_basename(__FILE__);

        $transient->response[$plugin_slug] = (object) [
            'new_version' => $release->tag_name,
            'package' => $release->zipball_url,
            'url' => $plugin_data['PluginURI'],
            'slug' => $plugin_slug,
        ];
    }

    return $transient;
});