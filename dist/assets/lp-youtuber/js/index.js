/* ################## FUNCTION-MENU ########## */
((d) => {
    const $btnMenu = d.querySelector(".menu-btn");
    const $menu = d.querySelector(".Menu");

    $btnMenu.addEventListener("click", (e) => {
        e.preventDefault();
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active");
    });
    $menu.addEventListener("click", (e) => {
        if (!e.target.matches(".Menu a")) return false;
        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove("is-active");
    });
})(document);

/** ################## formulario channel ######################################## */
/** ################## formulario channel RESET FORM WHEN CLOSE MODAL*/
((d) => {
    const $btn_close = d.querySelector("#close-form-channel");
    const $form_channel = d.querySelector("#form_channel");
    const $submit = d.querySelector("#channel-form-submit");
    $submit.disabled = true;

    $btn_close.addEventListener("click", (e) => {
        $submit.disabled = true;
        $form_channel.reset();
    });

    /** ################## formulario channel VALIDACIÓN*/
    const $controls = d.querySelectorAll("#form_channel [required]"); // input, select, etc
    var form_valid = false;
    const regEmail =
        /^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,50}$/;
    const regChannelName = /^[a-zA-Z0-9\.\-_$#@%&ñáéíóúÑÁÉÍÓÚ]{3,50}$/;
    const regChannelLanguage = /ES|EN|FR|PT|OTHER/;
    const arrChannelCategory = [
        "autos-vehicles",
        "comedy",
        "education",
        "entertainment",
        "film-animation",
        "gaming",
        "nonprofits-activism",
        "howto-style",
        "music",
        "news-politics",
        "people-blogs",
        "pets-animals",
        "science-technology",
        "sports",
        "travel-events",
    ];

    $controls.forEach(($control) => {
        $span = d.createElement("span");
        $span.id = $control.name;
        $span.textContent = $control.title;
        $span.classList.add("pannel-error", "none");
        $control.insertAdjacentElement("afterEnd", $span);
    });

    // detectando cambios en el formulario
    d.addEventListener("change", (e) => {
        if (e.target.matches("#form_channel [required]")) {
            var clientEmail =
                document.getElementsByName("clientEmail")[0].value;
            console.log("clientEmail -->", clientEmail);
            var channelName =
                document.getElementsByName("channelName")[0].value;
            console.log("channelName -->", channelName);
            var channelLanguage =
                document.getElementsByName("channelLanguage")[0].value;
            console.log("channelLanguage -->", channelLanguage);
            var channelCategory =
                document.getElementsByName("channelCategory")[0].value;
            console.log("channelCategory -->", channelCategory);
            // console.log(clientEmail);// console.log(channelLanguage);
            console.log(
                "channelCategory: ",
                channelCategory,
                "channelCategory.indexOf(channelCategory -->",
                arrChannelCategory.indexOf(channelCategory)
            );
            if (!regEmail.test(clientEmail)) {
                form_valid = false;
                d.querySelector("span#clientEmail").classList.remove("none");
                console.log("VALID: null . INVALID: email", clientEmail);
            } else {
                if (!regChannelName.test(channelName)) {
                    form_valid = false;
                    d.querySelector("span#channelName").classList.remove(
                        "none"
                    );
                    console.log("VALID: email . INVALID: name");
                } else {
                    if (!regChannelLanguage.test(channelLanguage)) {
                        form_valid = false;
                        d.querySelector(
                            "span#channelLanguage"
                        ).classList.remove("none");
                        console.log("VALID: email|name . INVALID: language");
                    } else {
                        if (arrChannelCategory.indexOf(channelCategory) == -1) {
                            form_valid = false;
                            $submit.disabled = true;
                            d.querySelector(
                                "span#channelCategory"
                            ).classList.remove("none");
                            console.log(
                                "VALID: email|name|language . INVALID: category"
                            );
                        } else {
                            form_valid = true;
                            console.log("!!!! VALID ¡¡¡");
                            $submit.disabled = false;
                        }
                    }
                }
            }
        } // changes in key form
    });
    /** ################## formulario channel VALIDACIÓN*/
    /** ################## formulario channel ENVÍO*/
    const $zone_response_text = d.querySelector("#zone_response_text");
    const $loader = d.querySelector(".channel-form-loader");
    const url_form =
        "https://formsubmit.co/ajax/9fa64cbc853657c2e0b040d5f45ada8a";

    // cuando el formulario sea enviado
    $form_channel.addEventListener("submit", (e) => {
        e.preventDefault();
        if ($submit.disabled == false) {
            $loader.classList.remove("none");

            const data = new FormData(e.target);
            // data.append('id-process', 'process-001-landingpage'); // añadimos cierta seguridad para comprobar en el servdior quien envía el formulario y rechazar los que no tienen dicho id
            // for (var value of data.values()) {
            // 	console.log(value);
            // }
            fetch(url_form, {
                method: "POST",
                body: data,
                // mode: 'no-cors',
            })
                .then((response) => {
                    if (!response.ok) {
                        Promise.reject(response);
                    }
                    return response.json();
                })
                .then((json) => {
                    console.log(json);
                    $loader.classList.add("none");
                    $zone_response_text.classList.remove("none");
                    $zone_response_text.innerHTML = `<p>  ${json.message} </p> <p>¡Gracias por confiar en Captions Connection. Cuando la app esté operativa se lo haremos saber!</p>`;
                    closeFormAndReset();
                })
                .catch((error) => {
                    console.log("Looks like there was a problem: \n", error);
                    $loader.classList.add("none");
                    $zone_response_text.classList.remove("none");
                    $zone_response_text.innerHTML = `<p>ERROR: server donts function well </p> 
				<p>¡Hay problemas con el servidor, ajenos a Captions Connection.
				Inténtelo más tarde. Gracias!</p>`;
                    closeFormAndReset();
                });
        }
    });

    function closeFormAndReset() {
        setTimeout(() => {
            $zone_response_text.classList.add("none");
            $form_channel.reset();
            window.location.href = "#close";
            $submit.disabled = true;
        }, 5000);
    }
    /** ################## formulario channel ENVÍO*/
    // }
})(document);
/** ################## formulario channel ######################################## */
