<?php
namespace Wiki\Controllers;

use Wiki\Helpers\NavRenderer;
use Nacho\Nacho;
use Nacho\Controllers\AbstractController;

class HomeController extends AbstractController
{
    private $navRenderer;

    public function __construct(Nacho $wiki)
    {
        parent::__construct($wiki);
        $this->navRenderer = new NavRenderer($wiki);
    }

    public function index($request)
    {
        return $this->render('wiki.twig', [
        ]);
    }

    public function loadNav($request)
    {
        return $this->navRenderer->output();
    }
}
