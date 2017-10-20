function build_phone_screen()
{
	var phone_background_color = element('<div id="phone_background_color"></div>','phone_background_color');

	phone_background_color(0,0,screen_width,screen_height);

    $("#phone_background_color").css({'background-color':'#dedede','z-index':'-2'});
    $('#phone_background_color').addClass('phone');

    /************************************************************************************************/

    var phone_save = center(element('<img id="phone_save"></img>','phone_save'),0.1667,0.0909);
    var phone_back = center(element('<img id="phone_back"></img>','phone_back'),0.1667,0.0909);
    
	v_seq([h_seq([phone_save,empty(),phone_back],[0.2292,0.5416,0.2292]),empty()],[0.08,0.92])(0,0,screen_width,screen_height);
	
	var phone_save_img = language + '/phone_save.png';
	var phone_back_img = language + '/phone_back.png';

	$('#phone_save').css({'z-index':'1'});
	$('#phone_save').attr({'src':phone_save_img,'onclick':'save_setting_phone()'});
	$('#phone_save').addClass('phone');	

	$('#phone_back').css({'z-index':'1'});
	$('#phone_back').attr({'src':phone_back_img,'onclick':'exit_screen()'});
	$('#phone_back').addClass('phone');

    /************************************************************************************************/

    var phone_title        = element('<div id="phone_title"></div>','phone_title');

    var phone_old_tip    = center(element('<div id="phone_old_tip"></div>','phone_old_tip'),0.0,0.125);
    var phone_old_input  = center(element('<input type="tel" id="phone_old_input"></input>','phone_old_input'),0.0,0.125);
    
    var phone_new_cctip    = center(element('<div id="phone_new_cctip"></div>','phone_new_cctip'),0.0,0.125);
    var phone_new_ccinput  = center(element('<input type="tel" id="phone_new_ccinput"></input>','phone_new_ccinput'),0.0,0.125);
    var phone_new_teltip   = center(element('<div id="phone_new_teltip"></div>','phone_new_teltip'),0.0,0.125);
    var phone_new_telinput = center(element('<input type="tel" id="phone_new_telinput"></input>','phone_new_telinput'),0.0,0.125);

    v_seq([phone_title,empty(),phone_old_tip,phone_old_input,phone_new_cctip,phone_new_ccinput,phone_new_teltip,phone_new_telinput,empty()],[0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.36])(0,0,screen_width,screen_height);

    var title_background_img = 'url(' + language + '/phone_title_background.png' + ')';

	$('#phone_title').css({'background-image':title_background_img,'text-align':'center','color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#phone_title').html(text[language]['phone_title_text']);
	$('#phone_title').addClass('phone');

	$('#phone_old_tip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#phone_old_tip').html(text[language]['phone_old_tip_text']);
	$('#phone_old_tip').addClass('phone');
	$('#phone_old_input').css({'padding':'0px','font-size':font_size,'border-radius':border_radius,'background-color':'#dedede'});
	$('#phone_old_input').attr({'readonly':'readonly'});
	$('#phone_old_input').val(storage_get('ltalk_localphone'));
	$('#phone_old_input').addClass('phone');

	$('#phone_new_cctip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#phone_new_cctip').html(text[language]['phone_new_cctip_text']);
	$('#phone_new_cctip').addClass('phone');
	$('#phone_new_ccinput').css({'padding':'0px','font-size':font_size,'border-radius':border_radius});
	$('#phone_new_ccinput').val(country_code);
	$('#phone_new_ccinput').addClass('phone');

	$('#phone_new_teltip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#phone_new_teltip').html(text[language]['phone_new_teltip_text']);
	$('#phone_new_teltip').addClass('phone');
	$('#phone_new_telinput').css({'padding':'0px','font-size':font_size,'border-radius':border_radius});
	$('#phone_new_telinput').val('');
	$('#phone_new_telinput').addClass('phone');

	$(".phone").wrapAll('<div id="phone"></div>');
    phone_screen = $('#phone').detach();
}

function enter_setting_phone()
{
	enter_screen(phone_screen);
}

function save_setting_phone()
{

	var set_country_code = $('#phone_new_ccinput').val();
	if (check_country_code(set_country_code) == false)
	{
		show_tip_window_screen(user_tip[language]['country_code_error'],tip_window_exist_time);
		return;
	}
	var localphone = cc_phone(format_phone($('#phone_new_telinput').val()),set_country_code);
	if (check_phone(localphone) == false)
	{
		show_tip_window_screen(user_tip[language]['phone_error'],tip_window_exist_time);
		return;
	}
	country_code = set_country_code;
	storage_set('ltalk_country_code',set_country_code);
	storage_set('ltalk_localphone',localphone);
	exit_screen();
}