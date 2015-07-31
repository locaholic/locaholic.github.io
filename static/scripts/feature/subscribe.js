/**
 * Requirements:
 *      - JQuery <script src="static/vendor/jquery/dist/jquery.js"></script>
 *      - JQuery Validation <script src="static/vendor/jquery.validation/dist/jquery.validate.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - jquery
 *      - jquery.validation
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'jquery.validation'], factory);
    } else {
        factory(root.$);
    }
}(this, function ($) {
    $(function () {
        $.validator.addMethod('simple-email', function (value, $input) {
            var a = /^\S+@\S+$/.test(value);
            console.log(a, value);
            return a;
        }, 'Please enter a valid email address.');
        $.validator.addClassRules('js-check-email', {
            'simple-email': true
        });

        $('.js-feature-subscribe').validate({
            errorElement: 'span',
            errorClass: 'has-error',
            validClass: 'has-success',
            highlight: function (element, errorClass) {
                $(element).closest('.form-group').addClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).closest('.form-group').removeClass(errorClass);
            },
            errorPlacement: function (error, element) {
                error.addClass('help-block');
                element.after(error);
            },
            submitHandler: function (form) {
                var $form = $(form);
                $form.find('.success-message, .error-message').remove();
                $.ajax({
                    type: $form.attr('method') || 'post',
                    url: $form.attr('action'),
                    data: $form.serialize(),
                    dataType: 'json',
                    success: function (response) {
                        var result = '';
                        if (response && response.success === true) {
                            $form.addClass('subscribe-success');
                            result = '<span class="help-block success-message">Thanks for subscribing!</span>';
                            $form.find('input').val('');
                        } else {
                            result = '<span class="help-block error-message">' + (response.message || 'Subscribe action error!') + '</span>';
                        }
                        $form.prepend(result);
                    }
                });
                return false;
            }
        });
    });
}));
