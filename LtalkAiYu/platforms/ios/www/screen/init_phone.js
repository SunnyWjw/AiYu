function build_init_phone_screen()
{
    var init_phone_title    = element('<div id="init_phone_title"></div>','init_phone_title');
	var init_phone_welcome  = element('<img id="init_phone_welcome"></img>','init_phone_welcome');
    var init_phone_cctip    = center(element('<div id="init_phone_cctip"></div>','init_phone_cctip'),0.0,0.125);
    var init_phone_ccinput  = center(element('<input type="tel" id="init_phone_ccinput"></input>','init_phone_ccinput'),0.0,0.125);
    var init_phone_teltip   = center(element('<div id="init_phone_teltip"></div>','init_phone_teltip'),0.0,0.125);
    var init_phone_telinput = center(element('<input type="tel" id="init_phone_telinput"></input>','init_phone_telinput'),0.0,0.125);
	var init_phone_confirm  = center(element('<img id="init_phone_confirm"></img>','init_phone_confirm'),0.25,0.34375);
	
	v_seq([init_phone_title,init_phone_welcome,init_phone_cctip,init_phone_ccinput,init_phone_teltip,init_phone_telinput,init_phone_confirm,empty()],[0.08,0.4266,0.08,0.08,0.08,0.08,0.16,0.0134])(0,0,screen_width,screen_height);
    
	var title_background_img = 'url(' + language + '/init_phone_title_background.png' + ')';
	var welcome_img          = language + '/init_phone_welcome.png';
	var confirm_img          = language + '/init_phone_confirm.png';
	
	$('#init_phone_title').css({'background-image':title_background_img,'text-align':'center','color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#init_phone_title').html(text[language]['init_phone_title_text']);
	$('#init_phone_title').addClass('init_phone');
	
	$('#init_phone_welcome').attr({'src':welcome_img});
	$('#init_phone_welcome').addClass('init_phone');
	
	$('#init_phone_cctip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#init_phone_cctip').html(text[language]['init_phone_cc_tip']);
	$('#init_phone_cctip').addClass('init_phone');	
    $('#init_phone_ccinput').css({'padding':'0px','border-radius':border_radius,'font-size':font_size});
    $('#init_phone_ccinput').val(country_code);
    $('#init_phone_ccinput').addClass('init_phone');

	$('#init_phone_teltip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#init_phone_teltip').html(text[language]['init_phone_tel_tip']);
	$('#init_phone_teltip').addClass('init_phone');	
    $('#init_phone_telinput').css({'padding':'0px','border-radius':border_radius,'font-size':font_size});
    $('#init_phone_telinput').val('');
    $('#init_phone_telinput').addClass('init_phone');

	$('#init_phone_confirm').attr({'src':confirm_img,'onclick':'save_local_phone()'});
	$('#init_phone_confirm').addClass('init_phone');

	$(".init_phone").wrapAll('<div id="init_phone"></div>');
    init_phone_screen = $('#init_phone').detach();	
}

function enter_init_phone()
{
	enter_screen(init_phone_screen);
}

function save_local_phone()
{
	var set_country_code = $('#init_phone_ccinput').val();
	if (check_country_code(set_country_code) == false)
	{
		show_tip_window_screen(user_tip[language]['country_code_error'],tip_window_exist_time);
		return;
	}
	var localphone = cc_phone(format_phone($('#init_phone_telinput').val()),set_country_code);
	if (check_phone(localphone) == false)
	{
		show_tip_window_screen(user_tip[language]['phone_error'],tip_window_exist_time);
		return;
	}
	country_code = set_country_code;
	storage_set('ltalk_country_code',set_country_code);
	storage_set('ltalk_localphone',localphone);
	enter_init_card();
	stack.pop();
}