// initialize slick

    $(document).ready(function(){
      $('.slick-container').slick({
        autoplay: true,
        //centerMode: true,
        centerPadding: '20px',
        infinite: true,
        slidesToShow: 3,
        
        arrows: false,
          responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
        }
        }
      ]
      });
    });