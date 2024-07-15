<?php
/*
Plugin Name: Form builder
Plugin URI: https://bartbos.com/
Description: An user-friendly straightforward form builder plugin.
Version: 0.3.86
Author: Bart Bos
License: GPL2
*/

include plugin_dir_path(__FILE__) . 'controllers/update.php';

function adminAssets()
{
    wp_enqueue_script('forms-backend', plugins_url('assets/js/backend.bundle.js', __FILE__), array('jquery'), '1.0', 'defer');
    wp_enqueue_style('forms-style', plugins_url('assets/css/admin.css', __FILE__), array(), '1.0');
    wp_enqueue_style('forms-bootstrap', plugins_url('assets/css/bootstrap.min.css', __FILE__), array(), '1.0');
    wp_enqueue_style('forms-fontAwesome', plugins_url('assets/css/font-awesome/css/font-awesome.min.css', __FILE__), array(), '1.0');

}

add_action('admin_enqueue_scripts', 'adminAssets');

function assets()
{
    wp_enqueue_script('forms-main', plugins_url('assets/js/main.bundle.js', __FILE__), false, false, 'defer');
    wp_enqueue_script('forms-frontendJS', plugins_url('assets/js/frontend.bundle.js', __FILE__), false, false, 'defer');
    wp_enqueue_style('forms-frontend', plugins_url('assets/css/frontend.css', __FILE__), array(), '1.0');

}
add_action('wp_enqueue_scripts', 'assets');

function forms_add_admin_menu()
{
    add_menu_page(
        'Forms Page', 
        'Forms', 
        'manage_options', 
        'forms', 
        'forms_admin_page', 
        'dashicons-admin-plugins', 
        20 
    );

    add_submenu_page(
        'forms', 
        'Form Entries Page', 
        'Form Entries', 
        'manage_options', 
        'form_entries', 
        'form_entries_admin_page' 
    );
}
add_action('admin_menu', 'forms_add_admin_menu');


add_action('rest_api_init', function () {
    register_rest_route(
        'forms/v1',
        '/payment-webhook',
        array(
            'methods' => 'POST',
            'callback' => 'forms_handle_webhook',
        )
    );
});

function forms_handle_webhook(WP_REST_Request $request)
{
    $paymentId = $request->get_param('id');


    return new WP_REST_Response(null, 200);
}

function forms_admin_page()
{    echo '<div class="wrap">';
    echo '<h1>Create a form</h1>';

    $forms = forms_get_forms();

    ?>

    <div class="container">

        <div class="row bosWrapper">

            <div class="listWrapper">

                <button class="createForm">Add form</button>

                <div class="d-flex flex-column">

                    <?php if ($forms) { ?>

                        <div class="formList d-flex flex-column row-gap-3 mt-4">

                            <?php foreach ($forms as $form): ?>

                                <div id="<?php echo $form->id; ?>" class="formItem d-flex justify-content-between p-3">

                                    <div class="formListTitle">

                                        <span><?php echo esc_html($form->form_title); ?></span>

                                    </div>

                                    <div class="formShortcode"><span>[forms_form id="<?php echo $form->id; ?>"]</span></div>

                                    <div class="formButtonWrapper">

                                        <button class="editFormButton">Edit</button>

                                        <button class="deleteForm" onclick="deleteForm('<?php echo $form->id; ?>')">Delete</button>

                                    </div>

                                </div>

                            <?php endforeach; ?>

                        </div>

                    <?php } else { ?>

                        <span class="mt-4">No forms have been added yet</span>

                    <?php } ?>

                </div>

            </div>

            <div class="formNewWrapper formWrapper d-none flex-column row-gap-3 mt-4">

                <div class="col-6 formTitle">
                    <form action="">

                        <h3>Form title</h3>

                        <input class="formTitleInput w-100" type="text" id="formTitle" name="formTitle"
                            placeholder="Form name" />

                    </form>

                </div>

                <div class="d-flex column-gap-3 formContainer">

                    <div class="col-8 newFormData formData d-flex flex-column row-gap-3"></div>

                    <div class="col-4 inputElements d-flex flex-column position-relative">

                        <h3>Form elements</h3>

                        <div data-edit-input
                            class="inputOptions w-100 h-100 flex-column row-gap-3 position-absolute start-0 end-0 top-0 bottom-0 d-none"
                            style="background: #fff;">
                            <form action="">

                            </form>

                        </div>

                        <div class="d-grid row-gap-3 column-gap-3">

                            <button data-type="text" class="addInput"><i class="fa fa-font"></i></button>
                            <button data-type="price" class="addInput"><i class="fa fa-tag"></i></button>
                            <button data-type="email" class="addInput"><i class="fa fa-envelope"></i></button>
                            <button data-type="phone" class="addInput"><i class="fa fa-phone"></i></button>

                        </div>

                        <button class="inputSaveOptions">Save input options</button>

                    </div>

                </div>

                <div class="col-4 formButtonWrapper">

                    <button class="saveFormButton">Save form</button>

                    <button class="cancel" onclick="clearForm();">Cancel</button>

                </div>

            </div>

        </div>

    </div>

    <?php
}

function form_entries_admin_page()
{
    $forms = forms_get_forms();

    echo '<div class="wrap">';
    echo '<h1>Form Entries</h1>';
?>

<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="form-control d-flex flex-column">
                <label for="form">Select a form</label>
                <select name="form" id="form" class="select-form" onchange="showFormEntries(this);">
                    <option value="0">Select a form</option>
                    <?php
                        if ($forms) {
                            foreach ($forms as $form) {
                                echo '<option name="form" value="' . $form->id . '">' . $form->form_title . '</option>';
                            }
                        }
                    ?>

                </select>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="formEntries d-flex flex-column row-gap-2 mt-2"></div>
        </div>
    </div>
</div>

<?php
    echo '</div>';
}

function forms_activate()
{
    global $wpdb;

    $table_name = $wpdb->prefix . 'bos_forms';
    $entries_table_name = $wpdb->prefix . 'bos_forms_entries';

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        form_title text NOT NULL,
        form_data text NOT NULL,
        form_price mediumint(9) NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;

    CREATE TABLE $entries_table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        form_id mediumint(9) NOT NULL,
        entry_data text NOT NULL,
        FOREIGN KEY (form_id) REFERENCES $table_name(id),
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once (ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

register_activation_hook(__FILE__, 'forms_activate');

function add_ajaxurl_cdata_to_front()
{
    ?>

    <script type="text/javascript">ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';</script>

    <?php
}
add_action('wp_head', 'add_ajaxurl_cdata_to_front', 1);

function forms_save_data()
{
    global $wpdb;

    $table_name = $wpdb->prefix . 'bos_forms';

    $form_id = intval($_POST['formID']);
    $form_title = sanitize_text_field($_POST['formTitle']);
    $form_data = stripslashes($_POST['formData']);
    $form_price = floatval($_POST['formPrice']);

    $data = array(
        'form_title' => $form_title,
        'form_data' => $form_data,
        'form_price' => $form_price
    );

    $format = array('%s', '%s', '%f');

    if ($form_id) {
        $where = array('ID' => $form_id);
        $wpdb->update($table_name, $data, $where);
    } else {
        $wpdb->insert($table_name, $data, $format);
    }

    wp_die();
}
add_action('wp_ajax_forms_save_data', 'forms_save_data');

function forms_get_forms()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'bos_forms';
    $forms = $wpdb->get_results("SELECT * FROM $table_name");

    return $forms;
}
add_action('wp_ajax_forms_get_forms', 'forms_get_forms');

function forms_form_entries() {
    global $wpdb;
    $form_entries_table_name = $wpdb->prefix . 'bos_forms_entries';
    $form_id = $_POST['formID'];
    $form_entries = $wpdb->get_results("SELECT entry_data FROM $form_entries_table_name WHERE form_id = $form_id");
    
    if(!$form_entries) {
        wp_send_json(['error' => 'No entries found']);
    } else {
        wp_send_json($form_entries);     
    }
}
add_action('wp_ajax_forms_form_entries', 'forms_form_entries');

function forms_refresh_forms()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'bos_forms';
    $forms = $wpdb->get_results("SELECT * FROM $table_name");
    $output = '';

    if ($forms) {

        foreach ($forms as $form):

            $output .= '<div id="' . $form->id . '" class="formItem d-flex justify-content-between p-3">

            <div class="formListTitle">
                <span>' . esc_html($form->form_title) . '</span>
            </div>

            <div class="formShortcode"><span>[forms_form id="' . $form->id . '"]</span></div>

            <div class="formButtonWrapper">
                <button class="editFormButton">Edit</button>
                <button class="deleteForm" onclick="deleteForm(' . $form->id . ')">Delete</button>
            </div>
        </div>';

        endforeach;

    } else {

        $output = '<span class="mt-4">No forms have been added yet</span>';

    }

    echo $output;

    wp_die();

}
add_action('wp_ajax_forms_refresh_forms', 'forms_refresh_forms');


function forms_edit_form()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'bos_forms';
    $formID = $_POST['formID'];

    $form = $wpdb->get_row("SELECT * FROM $table_name WHERE id = $formID");

    $output = '
    <div id="' . $form->id . '" class="formEditWrapper formWrapper d-flex flex-column row-gap-3 mt-4">

    <div class="col-6 formTitle">
        <h3>Form title</h3>

        <input class="formTitleInput w-100" type="text" name="formTitle" placeholder="Form name" value="' . $form->form_title . '" />

    </div>

    <div class="d-flex column-gap-3 formContainer">

        <div class="col-8 editFormData formData d-flex flex-column row-gap-3">' . $form->form_data . '</div>

        <div class="col-4 inputElements d-flex flex-column position-relative">
        <h3>Form elements</h3>

        <div data-edit-input class="inputOptions w-100 h-100 flex-column row-gap-3 position-absolute start-0 end-0 top-0 bottom-0 d-none" style="background: #fff;">
        <form action="">
        </form>

        <button class="inputSaveOptions">Save input options</button>

    </div>


    <div class="d-grid row-gap-3 column-gap-3">

    <button data-type="text" class="addInput"><i class="fa fa-font"></i></button>
    <button data-type="price" class="addInput"><i class="fa fa-tag"></i></button>
    <button data-type="email" class="addInput"><i class="fa fa-envelope"></i></button>
    <button data-type="phone" class="addInput"><i class="fa fa-phone"></i></button>

</div>

        </div>

    </div>

    <div class="col-4 formButtonWrapper">

        <button class="saveFormButton">Save form</button>

        <button class="cancel" onclick="clearForm();">Cancel</button>


    </div>

</div>
    ';

    echo $output;

    wp_die();
}
add_action('wp_ajax_forms_edit_form', 'forms_edit_form');

function forms_delete_form()
{
    global $wpdb;

    $table_name = $wpdb->prefix . 'bos_forms';

    $form_id = $_POST['formID'];

    $wpdb->delete($table_name, array('id' => $form_id));

    wp_die();
}
add_action('wp_ajax_forms_delete_form', 'forms_delete_form');

function forms_form_shortcode($atts)
{
    global $wpdb;

    $atts = shortcode_atts(
        array(
            'id' => '',
            'title' => ''
        ),
        $atts,
        'forms_form'
    );

    $table_name = $wpdb->prefix . 'bos_forms';

    $form_data = '<form name="form-' . $atts['id'] . '"  method="post" action="" class="bosForm d-flex flex-column row-gap-3">';

    if ($atts['title']) {
        $form_data .= '<h2 class="mb-0">' . $wpdb->get_var($wpdb->prepare("SELECT form_title FROM $table_name WHERE id = %d", $atts['id'])) . '</h2>';
    }

    $form_data .= $wpdb->get_var($wpdb->prepare("SELECT form_data FROM $table_name WHERE id = %d", $atts['id']));

    $form_data .= '<button role="submit" onclick="submitForm(event, ' . $atts['id'] . ')" class="submitForm d-flex align-self-start">Submit</button>';

    $form_data .= '</form>';

    return $form_data;
}

add_shortcode('forms_form', 'forms_form_shortcode');

add_action('phpmailer_init', 'my_phpmailer_init');
function my_phpmailer_init($phpmailer)
{
    $phpmailer->Sender = 'noreply@companyname.nl';
}

function forms_send_form()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'bos_forms';
    $entries_table_name = $wpdb->prefix . 'bos_forms_entries';
    $form_id = $_POST['formID'];
    $price = $wpdb->get_var($wpdb->prepare("SELECT form_price FROM $table_name WHERE id = %d", $form_id));
    $form_title = $wpdb->get_var($wpdb->prepare("SELECT form_title FROM $table_name WHERE id = %d", $form_id));

    if ($price > 0) {

        $url = 'https://api.mollie.com/v2/payments';

        $args = [
            'body' => json_encode([
                'amount' => [
                    'currency' => 'EUR',
                    'value' => number_format($price, 2, '.', '')
                ],
                'description' => 'Test payment',
                'redirectUrl' => 'https://example.nl',
                'webhookUrl' => 'https://example.nl/payment',
                'method' => 'ideal'
            ]),
            'headers' => [
                'Authorization' => 'Bearer test_HUfyQVmjjAyEs6VcUPhrasVzWsDHKx',
                'Content-Type' => 'application/json'
            ],
            'method' => 'POST',
            'data_format' => 'body',
        ];

        $response = wp_remote_post($url, $args);

        if (is_wp_error($response)) {
            echo new WP_Error('mollie_request_failed', 'Request to Mollie API failed.');
        }

        $payment = json_decode(wp_remote_retrieve_body($response), true);

        if ($payment['status'] === 'open') {
            wp_send_json(['redirectUrl' => $payment['_links']['checkout']['href']]);
        } else {
            wp_send_json(['error' => 'Payment failed']);
        }
    }

    if ($price == 0) {
        $admin_email = 'bartb346@gmail.com';

        $subject = "{$form_title} has been submitted.";
        $message .= "<br><br>";
        $message .= '<pre>';
        foreach ($_POST as $key => $value) {
            $message .= "Key: $key; Value: $value\n";
            $form_entries[$key] = $value;
        }
        $message .= '</pre>';

        $headers[] = 'From: Company Name <noreply@example.nl>';
        $headers[] = 'Reply-To: Company Name <noreply@example.nl>';
        $headers[] = 'Content-Type: text/html; charset=UTF-8';

        wp_mail($admin_email, $subject, $message, $headers);

        $wpdb->insert(
            $entries_table_name,
            [
                'form_id' => $form_id,
                'entry_data' => json_encode($form_entries)
            ]
        );

        wp_send_json($form_entries);

    }

    wp_die();
}
add_action('wp_ajax_forms_send_form', 'forms_send_form');


// function forms_get_price() {

//     global $wpdb;
//     $table_name = $wpdb->prefix . 'bos_forms';
//     $form_id = $_POST['formID'];
//     $price = $wpdb->get_var($wpdb->prepare("SELECT form_price FROM $table_name WHERE id = %d", $form_id));

//     echo $price;

//     wp_die();
// }
// add_action('wp_ajax_forms_get_price', 'forms_get_price');