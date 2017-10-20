/* app init */
function on_device_ready()
{
    /* ltalk layout var init */
	screen_width  = document.body.clientWidth;
    screen_height = document.body.clientHeight;

    font_size     = design_font_size     * (screen_height / design_height) + 'px';
    line_height   = design_inline_height * (screen_height / design_height) + 'px';
    border_radius = design_border_radius * (screen_width / design_width)   + 'px';

    monthly_font_size     = design_monthly_font_size     * (screen_height / design_height) + 'px';
    monthly_body_height   = design_monthly_body_height   * (screen_height / design_height) + 'px';
    monthly_body_space    = design_monthly_body_space    * (screen_height / design_height) + 'px';
    monthly_body_padding  = design_monthly_body_padding  * (screen_height / design_height) + 'px';
    monthly_inline_height = design_monthly_inline_height * (screen_height / design_height) + 'px';

    xhr = '';

    timeout = 10 * 1000;
    tip_window_exist_time = 6 * 1000;

    if ((storage_get('ltalk_language') == null) || (storage_get('ltalk_language') == ""))
    {
        build_init_language_screen();
        cur_screen = init_language_screen;
        $('body').prepend(cur_screen);
    }
    else
    {
        language = storage_get('ltalk_language');

        init_env();
        init_screen();

        if ((storage_get('ltalk_country_code') == null) || (storage_get('ltalk_country_code') == "") || (storage_get('ltalk_localphone') == null) || (storage_get('ltalk_localphone') == ""))
        {
            cur_screen = init_phone_screen;
        }
        else if ((storage_get('ltalk_cardno') == null) || (storage_get('ltalk_cardno') == "") || (storage_get('ltalk_password') == null) || (storage_get('ltalk_password') == ""))
        {
            cur_screen = init_card_screen;
        }
        else
        {
            cur_screen = main_screen;
        }

        $('body').prepend(cur_screen);
    }
}

function init_env()
{
    if ((storage_get('ltalk_country_code') == null) || (storage_get('ltalk_country_code') == ""))
    {
        country_code = '0086';
    }
    else
    {
        country_code = storage_get('ltalk_country_code');
    }

    if ((storage_get('ltalk_history') == null) || (storage_get('ltalk_history') == ""))
    {
        ltalk_history = new Array();
    }
    else
    {
        ltalk_history = eval(storage_get('ltalk_history'));
    }

    if ((storage_get('ltalk_ip') == null) || (storage_get('ltalk_ip') == ""))
    {
        service_addr = "http://ltalk.livecom.hk/phone/test/ltalkapp.yaws";
        storage_set('ltalk_ip',"ltalk.livecom.hk")
    }
    else
    {
      //  service_addr = "http://" + storage_get('ltalk_ip') + "/phone/test/ltalkapp.yaws";

        service_addr = "http://ltalk.livecom.hk/phone/test/ltalkapp.yaws";
    }

    main_select_name  = '';
    main_select_phone = '';
    rate_select_phone = '';

    init_seq_no();

    document.addEventListener("backbutton", on_back_key_down, false);
}

function init_screen()
{
    /* build screen */
    build_tip_window_screen();
    build_init_language_screen();
    build_init_phone_screen();
    build_init_card_screen();
    build_main_screen();
    build_setting_screen();
    build_phone_screen();
    build_monthly_screen();
    build_balance_screen();
    build_rate_screen();
    build_modify_password_screen();
    build_card_screen();
    build_select_language_screen();
}