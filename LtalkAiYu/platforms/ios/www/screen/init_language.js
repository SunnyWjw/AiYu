function build_init_language_screen()
{
	var init_language_background_color = element('<div id="init_language_background_color"></div>','init_language_background_color');

	init_language_background_color(0,0,screen_width,screen_height);

    $("#init_language_background_color").css({'background-color':'#dedede','z-index':'-2'});
    $('#init_language_background_color').addClass('init_language');

    /************************************************************************************************/
    
    var init_language_simplified_chinese = center(element('<div id="init_language_simplified_chinese"></div>','init_language_simplified_chinese'),0,0.1);
    var init_language_english = center(element('<div id="init_language_english"></div>','init_language_english'),0,0.1);

    v_seq([empty(),init_language_simplified_chinese,empty(),init_language_english,empty()],[0.38,0.08,0.08,0.08,0.38])(0,0,screen_width,screen_height);

	$('#init_language_simplified_chinese').css({'background-color':'white','border-radius':border_radius,'text-align':'center','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#init_language_simplified_chinese').html('简体中文');
	$('#init_language_simplified_chinese').attr({'onclick':'select_simplified_chinese()'});
	$('#init_language_simplified_chinese').addClass('init_language');

	$('#init_language_english').css({'background-color':'white','border-radius':border_radius,'text-align':'center','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#init_language_english').html('English');
	$('#init_language_english').attr({'onclick':'select_english()'});
	$('#init_language_english').addClass('init_language');

	$(".init_language").wrapAll('<div id="init_language"></div>');
    init_language_screen = $('#init_language').detach();
}

function select_simplified_chinese()
{
	language = 'simplified_chinese';
	storage_set('ltalk_language','simplified_chinese');
	init_env();
	init_screen();
	enter_init_phone();
	stack.pop();
}

function select_english()
{
	language = 'english';
	storage_set('ltalk_language','english');
	init_env();
	init_screen();
	enter_init_phone();
	stack.pop();
}