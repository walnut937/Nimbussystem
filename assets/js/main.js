/**
* Template Name: Company
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/company-free-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   *  Book a meeting button - closed as always active
   */
  // let bookmeeting = select('.book-meeting');
  // if (bookmeeting) {
  //   const toggleBookMeeting = () => {
  //     if (window.scrollY > 100) {
  //       bookmeeting.classList.add('active')
  //     } else {
  //       bookmeeting.classList.remove('active')
  //     }
  //   }
  //   window.addEventListener('load', toggleBookMeeting)
  //   onscroll(document, toggleBookMeeting)
  // }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  //contact form
  
  document.addEventListener("DOMContentLoaded", function () {
    const contactBtn = document.getElementById("contactBtn");
    const scheduleBtn = document.getElementById("scheduleBtn");
    const contactForm = document.getElementById("contactForm");
    const scheduleForm = document.getElementById("scheduleForm");

    contactBtn.addEventListener("click", function () {
        contactForm.style.display = "block";
        scheduleForm.style.display = "none";
    });

    scheduleBtn.addEventListener("click", function () {
        contactForm.style.display = "none";
        scheduleForm.style.display = "block";
    });
});

//contact form validation




//scroll animation

function startCounterAnimation(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const counter = entry.target;
      let current = 0;
      const target = parseInt(counter.textContent, 10);
      const duration = 4000; // Animation duration in milliseconds
      const step = 50; // Interval between each step in milliseconds
      const increment = target / (duration / step);
      const updateCounter = function () {
        current += increment;
        counter.textContent = Math.ceil(current);

        if (current < target) {
          requestAnimationFrame(updateCounter);
        }
      };
      updateCounter();
      observer.unobserve(counter); // Stop observing once animated
    }
  });
}
const observer = new IntersectionObserver(startCounterAnimation, {
  root: null, // Use the viewport as the root
  threshold: 0.2, // Trigger when 20% of the element is visible
});
const counters = document.querySelectorAll('.counter');
counters.forEach(function (counter) {
  observer.observe(counter);
});


  



  // navlinks
  const currentUrl = window.location.href;

    // Find the <a> element with the matching href attribute and add 'active' class
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        }
    });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Multi card carousel
   */

  if(select("#multiCarousel .carousel-inner") != undefined){
    var multiCarouselWidth = select("#multiCarousel .carousel-inner").scrollWidth;
    var multiCardWidth = select("#multiCarousel .carousel-item").offsetWidth;
  
    let ScrollPosition = 0;
  
    window.addEventListener("resize", () => {
      let multiCarouselWidth_inner = select("#multiCarousel .carousel-inner").scrollWidth;
      let multiCardWidth_inner = select("#multiCarousel .carousel-item").offsetWidth;
      let scrollable = select("#multiCarousel .carousel-inner");
      ScrollPosition = 0;
      scrollable.scrollTo({
        left: ScrollPosition,
        behavior: "smooth"
      });
  
      multiCarouselWidth = multiCarouselWidth_inner;
      multiCardWidth = multiCardWidth_inner;
    });
  
    window.addEventListener('load', () => {
      on("click","#multiCarousel .carousel-control-next", () => {
        ScrollPosition = ScrollPosition + multiCardWidth;
        let displayItems = 3;
        console.log(window.innerWidth);
        if(window.innerWidth < 993){
          displayItems = 2;
        }
        if(window.innerWidth < 550){
          displayItems = 1;
        }
        if((ScrollPosition) > (multiCarouselWidth - (displayItems * multiCardWidth))){
          ScrollPosition = 0;
        }
        let scrollable = select("#multiCarousel .carousel-inner");
        scrollable.scrollTo({
          left: ScrollPosition,
          behavior: "smooth"
        });
      });
  
  
    on("click","#multiCarousel .carousel-control-prev", () => {
        ScrollPosition = ScrollPosition - multiCardWidth;
        if(ScrollPosition < 0){
          ScrollPosition = 0;
        }
        let scrollable = select("#multiCarousel .carousel-inner");
        scrollable.scrollTo({
          left: ScrollPosition,
          behavior: "smooth"
        });
      });
    });
  }

  /**
   * Message Helpers
   */
  const ToggleOffcanvas = (element, isForced = false, isAdd = false) => {
    if(isForced){
      if(isAdd){
        element.classList.toggle("show", true);
      }
      else{
        element.classList.toggle("show", false);
      }
    }
    else{
      element.classList.toggle("show");
    }
  }

  const OpenOffcanvas = (elementId) => {
    //data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
    var canvasTrigger = document.createElement("BUTTON");
    canvasTrigger.setAttribute("aria-controls", elementId);
    canvasTrigger.setAttribute("data-bs-target", "#" + elementId);
    canvasTrigger.setAttribute("data-bs-toggle", "offcanvas");
    canvasTrigger.setAttribute("style","background-color: red;");
    document.body.appendChild(canvasTrigger);
    canvasTrigger.click();
    document.body.removeChild(canvasTrigger);
  }

  const CloseOffcanvas = (elementId) => {
    var offcanvasCloseBtn = select("#" + elementId + " .offcanvas-header button");
    offcanvasCloseBtn.click();
  }

  const ShowMessage = (elementId, headText, message, footText = "For more information about this message contact HO!") => {
    var messageHead = select("#" + elementId + " #" + elementId + "Label");
    messageHead.innerHTML = headText;

    var messageBody = select("#" + elementId + " .offcanvas-body .offcanvas-body-message-body");
    messageBody.innerHTML = message;

    var messageFoot = select("#" + elementId + " .offcanvas-body .offcanvas-body-message-foot");
    messageFoot.innerHTML = footText;

    OpenOffcanvas(elementId);
  }

  /**
   * Book a meeting click handler
   */

  var alertPlaceholder = select('#liveAlertPlaceholder');

  var alertTrigger = select('#liveAlertBtn');

  function alert_custom(header, message, footer, type) {
     alertPlaceholder.innerHTML = '                                                                   \
      <div class="alert fade show" role="alert">                                                      \
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>  \
        <h4 class="alert-heading">' + header + '</h4>                                                 \
        <p>' + message + '</p>                                                                        \
        <hr>                                                                                          \
        <p class="mb-0">' + footer + '</p>                                                            \
      </div>'
  }

  if (alertTrigger) {
    alertTrigger.addEventListener('click', function () {
      alert("Clicked");
    })
  }

  let submitButton = select(".offcanvas .button-submit");

  if(submitButton){
    submitButton.addEventListener("click", () => {
      //alert("Submit clicked");
      //Post data by 'http://localhost:64274/api/request/postmethods'

      var xhttp = new XMLHttpRequest();

      var formData = { 
        Operation: "FORMDATASUBMIT",
        Payload: {
          FirstName: select("#inputFirstName").value, 
          LastName: select("#inputLastName").value, 
          Address: select("#inputAddress").value, 
          Email: select("#inputEmail").value, 
          Phone: select("#inputPhone").value, 
          City: select("#inputCity").value, 
          State: select("#inputState").value, 
          Zipcode: select("#inputZip").value, 
          Communication: (select("#inputGridCheck").checked == true) ? 1 : 0
        }
      }

      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          // alert_custom('Well done!',
          // xhttp.responseText,
          // 'Whenever you need to, be sure to use margin utilities to keep things nice and tidy.',
          // 'success');
          ShowMessage("offcanvasMessages", 
          "<i class=\"bx bx-check\"></i> Success",
          xhttp.responseText);
          console.warn(xhttp.responseText);
        }
        else{
          // alert_custom('Well done!',
          // xhttp.responseText, 
          // 'For furthur clarification, contact HO!',
          // 'warning');
          CloseOffcanvas("offcanvasExample");
          ShowMessage("offcanvasMessages", 
          "<i class=\"bx bx-error-circle\"></i> Warning",
          "Failed to submit data!");
        }
      };

      xhttp.open("POST", "http://localhost:64274/api/request/postmethods", false);
      xhttp.setRequestHeader('Content-type', 'application/json');

      xhttp.send(JSON.stringify(formData));

      alert("Data Submitted");

      //-- both serves same purpose
      //window.location.reload();
      //window.history.go(0);
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * 3D hover effect
   */
  function give3DEffect(className, rotationRatio){
    let el = select(className);

    /* Get the height and width of the element */
    const height = el.clientHeight;
    const width = el.clientWidth;
  
    /*
      * Add a listener for mousemove event
      * Which will trigger function 'handleMove'
      * On mousemove
      */
    el.addEventListener('mousemove', function(e){ handleMove( e, rotationRatio) });
  
    /* Define function a */
    function handleMove(e, ratio) {
      /*
        * Get position of mouse cursor
        * With respect to the element
        * On mouseover
        */
      /* Store the x position */
      const xVal = e.layerX
      /* Store the y position */
      const yVal = e.layerY
      
      /*
        * Calculate rotation valuee along the Y-axis
        * Here the multiplier 20 is to
        * Control the rotation
        * You can change the value and see the results
        */
      const yRotation = ratio * ((xVal - width / 2) / width)
      
      /* Calculate the rotation along the X-axis */
      const xRotation = -1 * ratio * ((yVal - height / 2) / height)
      
      /* Generate string for CSS transform property */
      const string = 'perspective(500px) scale(1.02) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
      
      /* Apply the calculated transformation */
      el.style.transform = string
    }
  
    /* Add listener for mouseout event, remove the rotation */
    el.addEventListener('mouseout', function() {
      el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    })
  
    /* Add listener for mousedown event, to simulate click */
    // el.addEventListener('mousedown', function() {
    //   el.style.transform = 'perspective(500px) scale(0.08) rotateX(0) rotateY(0)'
    // })
  
    /* Add listener for mouseup, simulate release of mouse click */
    // el.addEventListener('mouseup', function() {
    //   el.style.transform = 'perspective(500px) scale(1.02) rotateX(0) rotateY(0)'
    // })
  }

  if(select('#tilt1') != undefined){
    give3DEffect('#tilt1', 4);
  }
  if(select('#tilt2') != undefined){
    give3DEffect('#tilt2', 4);
  }
  if(select('#tilt3') != undefined){
    give3DEffect('#tilt3', 4);
  }
  if(select('#tilt4') != undefined){
    give3DEffect('#tilt4', 4);
  }

  if(select('#tilt-1') != undefined){
    give3DEffect('#tilt-1', 7);
  }
  if(select('#tilt-2') != undefined){
    give3DEffect('#tilt-2', 7);
  }
  if(select('#tilt-3') != undefined){
    give3DEffect('#tilt-3', 7);
  }
  if(select('#tilt-4') != undefined){
    give3DEffect('#tilt-4', 7);
  }
  if(select('#tilt-5') != undefined){
    give3DEffect('#tilt-5', 7);
  }
  if(select('#tilt-6') != undefined){
    give3DEffect('#tilt-6', 7);
  }

})()