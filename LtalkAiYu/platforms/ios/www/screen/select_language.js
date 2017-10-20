function build_select_language_screen()
{
	var select_language_background_color = element('<div id="select_language_background_color"></div>','select_language_background_color');

	select_language_background_color(0,0,screen_width,screen_height);

    $("#select_language_background_color").css({'background-color':'#dedede','z-index':'-2'});
    $('#select_language_background_color').addClass('select_language');
    /************************************************************************************************/
    
    var select_language_simplified_chinese = center(element('<div id="select_language_simplified_chinese"></div>','select_language_simplified_chinese'),0,0.1);
    var select_language_english = center(element('<div id="select_language_english"></div>','select_language_english'),0,0.1);

    v_seq([empty(),select_language_simplified_chinese,empty(),select_language_english,empty()],[0.38,0.08,0.08,0.08,0.38])(0,0,screen_width,screen_height);

	$('#select_language_simplified_chinese').css({'background-color':'white','border-radius':border_radius,'text-align':'center','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#select_language_simplified_chinese').html(text[language]['select_language_simplified_chinese_text']);
	$('#select_language_simplified_chinese').attr({'onclick':'select_setting_simplified_chinese()'});
	$('#select_language_simplified_chinese').addClass('select_language');

	$('#select_language_english').css({'background-color':'white','border-radius':border_radius,'text-align':'center','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#select_language_english').html(text[language]['select_language_english_text']);
	$('#select_language_english').attr({'onclick':'select_setting_english()'});
	$('#select_language_english').addClass('select_language');


	$(".select_language").wrapAll('<div id="select_language"></div>');
    select_language_screen = $('#select_language').detach();
}

function enter_setting_select_language()
{
	enter_screen(select_language_screen);
}

function select_setting_simplified_chinese()
{
	if (language != 'simplified_chinese')
	{
		language = 'simplified_chinese';
		storage_set('ltalk_language','simplified_chinese');
        rebuild_all_screen();
	}
	exit_screen();
}

function select_setting_english()
{
	if (language != 'english')
	{
		language = 'english';
		storage_set('ltalk_language','english');
        rebuild_all_screen();
	}
	exit_screen();
}