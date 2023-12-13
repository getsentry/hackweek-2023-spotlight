<?php

namespace Spotlight\Laravel\Renderers;

use Illuminate\Contracts\Foundation\ExceptionRenderer;

class SpotlightExceptionRenderer implements ExceptionRenderer
{
    public function render($throwable)
    {
        return "do some stuff";
    }
}
