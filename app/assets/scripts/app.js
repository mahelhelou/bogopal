jQuery(function ($) {
  // Login form
  $('#login-form-title').click(function () {
    $('#login-form').delay(100).fadeIn(100)
    $('#register-form').fadeOut(100)
    $('#login-form-title').addClass('active')
    $('#register-form-title').removeClass('active')
  })

  $('#register-form-title, #register-form-link').click(function () {
    $('#register-form').delay(100).fadeIn(100)
    $('#login-form').fadeOut(100)
    $('#register-form-title').addClass('active')
    $('#login-form-title').removeClass('active')
  })

  function openSearchOverlay() {
    $('.search-btn').click(function (e) {
      $('.search-overlay').addClass('search-overlay--active')
      $('body').addClass('body-no-scroll')
    })

    $(document).keyup(function (e) {
      if (e.keyCode == 83 && !$('input, textarea').is(':focus')) {
        $('.search-overlay').addClass('search-overlay--active')
        $('body').addClass('body-no-scroll')
      }
    })

    $('.search-input').focus()
  }

  function closeSearchOverlay() {
    $('.search-overlay__close').click(function () {
      $('.search-overlay').removeClass('search-overlay--active')
      $('body').removeClass('body-no-scroll')
    })

    $(document).keyup(function (e) {
      if (e.keyCode == 27) {
        $('body').removeClass('body-no-scroll')
        $('.search-overlay').removeClass('search-overlay--active')
        $('body').removeClass('body-no-scroll')
      }
    })
  }

  openSearchOverlay()
  closeSearchOverlay()
})
