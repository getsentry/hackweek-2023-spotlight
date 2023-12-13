<?php

namespace Spotlight\Laravel;

use Spotlight\Laravel\Renderers;
use Illuminate\Support\ServiceProvider;

class SpotlightServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            'Illuminate\Contracts\Foundation\ExceptionRenderer',
            fn (Application $app) => $app->make(SpotlightExceptionRenderer::class)
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
