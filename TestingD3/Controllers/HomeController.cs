using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestingD3.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ViewResult RawProjection()
        {
            return View();
        }

        public ViewResult MapOverlay()
        {
            return View();
        }
    }
}
