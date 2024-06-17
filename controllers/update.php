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
    error_log($response->get_error_message());
    return;
}

$body = wp_remote_retrieve_body($response);
$release = json_decode($body);

if (!isset($release->tag_name)) {
    error_log("Unexpected API response: $body");
    return;
}

$current_version = '0.3.84'; // Update accordingly

if (version_compare($release->tag_name, $current_version, '>')) {
    set_transient('myplugin_update', $release, DAY_IN_SECONDS);
    error_log(print_r($release, true)); // Add this line
}

add_filter('http_request_args', function($args, $url) use ($release) {
    if (strpos($url, $release->zipball_url) !== false) {
        $args['headers']['Authorization'] = 'token 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';
    }
    return $args;
}, 10, 2);

add_filter('pre_set_site_transient_update_plugins', function ($transient) {
    $plugin_main_file_path = WP_PLUGIN_DIR . '/myplugin/myplugin.php';
    $release = get_transient('myplugin_update');
    error_log(print_r($release, true)); // Add this line

    if ($release && isset($release->tag_name)) {
        $plugin_slug = 'myplugin/myplugin.php';
        $plugin_data = get_plugin_data($plugin_main_file_path);

        $transient->response[$plugin_slug] = (object) [
            'new_version' => $release->tag_name,
            'package' => $release->zipball_url,
            'url' => $plugin_data['PluginURI'],
            'slug' => $plugin_slug,
            'plugin_data' => $plugin_data,
        ];
        error_log(print_r($transient, true));
    }

    return $transient;
});

add_action('upgrader_process_complete', function ($upgrader_object, $options) {
    if ($options['action'] == 'update' && $options['type'] == 'plugin' ) {
        delete_transient('myplugin_update');
        delete_transient('update_plugins'); // Add this line
    }
}, 10, 2);

add_filter('upgrader_source_selection', function($source, $remote_source, $upgrader) {
    global $wp_filesystem;

    // Check if the plugin being updated is your plugin
    if (isset($upgrader->skin->plugin_info) && $upgrader->skin->plugin_info['Name'] === 'myplugin') {
        $corrected_source = trailingslashit($remote_source) . 'myplugin';

        // Check if the source starts with the expected string
        if (strpos($source, trailingslashit($remote_source) . 'bb829-myplugin-') === 0) {
            $wp_filesystem->move($source, $corrected_source);
            return $corrected_source;
        }
    }

    return $source;
}, 10, 3);

add_filter('upgrader_package_options', function($options) {
    $package = $options['package'];
    $tmpfname = wp_tempnam($package);
    $response = wp_remote_get($package, array('timeout' => 300, 'stream' => true, 'filename' => $tmpfname));

    if (is_wp_error($response)) {
        unlink($tmpfname);
        return new WP_Error('http_request_failed', __('Failed to download package.'));
    }

    if (200 != wp_remote_retrieve_response_code($response)) {
        unlink($tmpfname);
        return new WP_Error('http_request_failed', __('Failed to download package.'));
    }

    $zip = new ZipArchive;
    if ($zip->open($tmpfname) === TRUE) {
        for($i = 0; $i < $zip->numFiles; $i++) {
            $filename = $zip->getNameIndex($i);
            $fileinfo = pathinfo($filename);
            if (strpos($fileinfo['dirname'], 'bb829-myplugin-') === 0) {
                $newname = str_replace('bb829-myplugin-', 'myplugin/', $filename);
                $zip->renameIndex($i, $newname);
            }
        }
        $zip->close();
    }

    $options['package'] = $tmpfname;
    return $options;
});
