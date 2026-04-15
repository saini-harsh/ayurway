<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

/**
 * send_email.php - Ayurway Lifecare Contact Form Handler
 * Handles: General Enquiry, Product Enquiry, and Callback Requests
 */

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

// Get the JSON payload from the request body
$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Empty or invalid data received."]);
    exit;
}

// ── CONFIGURATION ──
// Replace these with your actual SMTP or default mail settings
$to_email = "support@ayurwaylifecare.com";

$from_email = "no-reply@ayurwaylifecare.com"; // Recommended to be an email on your domain

// ── EXTRACT DATA ──
$form_type = isset($data['form_type']) ? $data['form_type'] : 'General Website Enquiry';
$name = isset($data['name']) ? strip_tags(trim($data['name'])) : 'N/A';
$email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : 'N/A';
$phone = isset($data['phone']) ? strip_tags(trim($data['phone'])) : 'N/A';
$subject = isset($data['subject']) ? strip_tags(trim($data['subject'])) : "New $form_type";
$message = isset($data['message']) ? strip_tags(trim($data['message'])) : 'No message provided.';

// ── CONSTRUCT EMAIL ──
$email_subject = "AYURWAY Enquiry: $subject";

$email_body = "You have received a new notification from the website.\n\n";
$email_body .= "--------------------------------------------------\n";
$email_body .= "Form Type: $form_type\n";
$email_body .= "Name:      $name\n";
$email_body .= "Email:     $email\n";
if ($phone !== 'N/A') {
    $email_body .= "Phone:     $phone\n";
}
$email_body .= "Subject:   $subject\n";
$email_body .= "--------------------------------------------------\n\n";
$email_body .= "Message:\n$message\n\n";
$email_body .= "--------------------------------------------------\n";
$email_body .= "Sent on: " . date("Y-m-d H:i:s") . "\n";

// ── HEADERS ──
$headers = "From: Ayurway Website <$from_email>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ── SENDING ──
// Use standard mail() - ensure your server is configured to send mail.
// For true SMTP (Gmail/Outlook), it is recommended to use PHPMailer.
if (mail($to_email, $email_subject, $email_body, $headers)) {
    echo json_encode([
        "success" => true,
        "message" => "Your message has been sent successfully. We will get back to you soon!"
    ]);
}
else {
    // If mail fails, provide a descriptive error if possible (check server logs)
    echo json_encode([
        "success" => false,
        "message" => "Our mail server is temporarily unavailable. Please try again later or email us directly at $to_email"
    ]);
}
?>
