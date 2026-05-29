/*$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            $.ajax({
                url: "contact.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                },
                cache: false,
                success: function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-success')
                            .append("<strong>Su mensaje ha sido enviado. </strong>");
                    $('#success > .alert-success')
                            .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Lo siento " + name + ", el servidor no responde. Favor de intentarlo más tarde!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});*/

$(function () {
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) { },
        submitSuccess: function ($form, event) {
            // Detenemos el envío normal para manejarlo nosotros
            event.preventDefault(); 
            
            // 1. Capturamos los datos
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val(); // Asegúrate de tener este ID en tu HTML
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            var $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            // --- OPCIÓN WHATSAPP (Descomenta si quieres que se abra al enviar) ---
            /*
            var miNumero = "5215561851249";
            var textoWA = `*Web:* ${name}%0A*Asunto:* ${subject}%0A*Mensaje:* ${message}`;
            window.open(`https://wa.me/${miNumero}?text=${textoWA}`, '_blank');
            */

            // 2. Envío por AJAX (al correo via PHP)
            $.ajax({
                //url: "contact.php",
                url: "https://formsubmit.co/ajax/sic.cdbosco@gmail.com", // <--- CAMBIA ESTO
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message
                },
                dataType: "json", // Agregamos esto para que FormSubmit responda bien
                cache: false,
                success: function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-success')
                            .append("<strong>Su mensaje ha sido enviado correctamente. </strong>");
                    $('#success > .alert-success')
                            .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Lo siento " + name + ", parece que el servidor de correo no responde."));
                    $('#success > .alert-danger').append('</div>');
                    // No reseteamos para que el usuario pueda intentar por otro medio
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});
