<?php
$settings = [
    'settings' => [
        // Site settings
        'site' => [
            'name' => 'PuyoSim',
            'description' => 'Create and share Puyo Puyo chains.',
            'titledChainDescription' => 'Create and share Puyo Puyo chains with the Puyo Simulator.',
            'twitter' => '@EngPuyoDiscord',
        ],

        // View settings for PhpRenderer
        'views' => [
            'path' => __DIR__ . '/../views/',
        ],

        // Router cache
        'routerCacheFile' => __DIR__ . '/../temp/cache/routes.php',

        // Database settings
        'database' => [
            'dsn' => '',
            'username' => '',
            'password' => '',
            'tablePrefix' => '',
        ],
    ]
];

// Load local settings and merge them into $settings
if (file_exists(__DIR__ . '/localsettings.php'))
{
    $localSettings = require __DIR__ . '/localsettings.php';
    $settings = array_replace_recursive($settings, $localSettings);
}

return $settings;