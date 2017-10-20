function build_setting_screen()
{
	var setting_background_color = element('<div id="setting_background_color"></div>','setting_background_color');

	setting_background_color(0,0,screen_width,screen_height);

    $("#setting_background_color").css({'background-color':'#dedede','z-index':'-2'});
    $('#setting_background_color').addClass('setting');

	/************************************************************************************************/

	var setting_back = center(element('<img id="setting_back"></img>','setting_back'),0.1667,0.0909);
    
	v_seq([beside(empty(),setting_back,0.7708),empty()],[0.08,0.92])(0,0,screen_width,screen_height);
	
	var setting_back_img = language + '/setting_back.png';
	

	$('#setting_back').css({'z-index':'1'});
	$('#setting_back').attr({'src':setting_back_img,'onclick':'exit_screen()'});
	$('#setting_back').addClass('setting');

	/************************************************************************************************/

    var setting_base1  = center(element('<div id="setting_base1"></div>','setting_base1'),0.0,0.03);	
	var setting_base2  = center(element('<div id="setting_base2"></div>','setting_base2'),0.0,0.03);
	var setting_base3  = center(element('<div id="setting_base3"></div>','setting_base3'),0.0,0.03);
	var setting_base4  = center(element('<div id="setting_base4"></div>','setting_base4'),0.0,0.03);
	var setting_base5  = center(element('<div id="setting_base5"></div>','setting_base5'),0.0,0.03);
	var setting_base6  = center(element('<div id="setting_base6"></div>','setting_base6'),0.0,0.03);
	var setting_base7  = center(element('<div id="setting_base7"></div>','setting_base7'),0.0,0.03);

	v_seq([empty(),setting_base1,empty(),setting_base2,setting_base3,setting_base4,empty(),setting_base5,setting_base6,setting_base7,empty()],[0.16,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.12])(0,0,screen_width,screen_height);

    $('#setting_base1').css({'border-radius':border_radius,'z-index':'-1','background-color':'white'});
    $('#setting_base1').addClass('setting');

    $('#setting_base2').css({'border-top-left-radius':border_radius,'border-top-right-radius':border_radius,'z-index':'-1','background-color':'white'});
    $('#setting_base2').addClass('setting');
    $('#setting_base3').css({'border-top':'solid thin','z-index':'-1','background-color':'white'});
    $('#setting_base3').addClass('setting');
    $('#setting_base4').css({'border-bottom-left-radius':border_radius,'border-bottom-right-radius':border_radius,'border-top':'solid thin','z-index':'-1','background-color':'white'});
    $('#setting_base4').addClass('setting');

    $('#setting_base5').css({'border-top-left-radius':border_radius,'border-top-right-radius':border_radius,'z-index':'-1','background-color':'white'});
    $('#setting_base5').addClass('setting');
    $('#setting_base6').css({'border-top':'solid thin','z-index':'-1','background-color':'white'});
    $('#setting_base6').addClass('setting');
    $('#setting_base7').css({'border-bottom-left-radius':border_radius,'border-bottom-right-radius':border_radius,'border-top':'solid thin','z-index':'-1','background-color':'white'});
    $('#setting_base7').addClass('setting');

	/************************************************************************************************/

	var setting_title       = element('<div id="setting_title"></div>','setting_title');
	var setting_localphone  = center(beside(element('<div id="setting_localphone_tip"></div>','setting_localphone_tip'),element('<div id="setting_localphone_value"></div>','setting_localphone_value'),0.3),0.3333,0.03);
	
	var setting_monthly     = center(beside(element('<div id="setting_monthly_tip"></div>','setting_monthly_tip'),element('<div id="setting_monthly_value"></div>','setting_monthly_value'),0.8),0,0.03);
	var setting_balance     = center(beside(element('<div id="setting_balance_tip"></div>','setting_balance_tip'),element('<div id="setting_balance_value"></div>','setting_balance_value'),0.8),0,0.03);
	var setting_rate        = center(beside(element('<div id="setting_rate_tip"></div>','setting_rate_tip'),element('<div id="setting_rate_value"></div>','setting_rate_value'),0.8),0,0.03);

	var setting_password    = center(beside(element('<div id="setting_password_tip"></div>','setting_password_tip'),element('<div id="setting_password_value"></div>','setting_password_value'),0.8),0,0.03);
	var setting_new_card    = center(beside(element('<div id="setting_new_card_tip"></div>','setting_new_card_tip'),element('<div id="setting_new_card_value"></div>','setting_new_card_value'),0.8),0,0.03);
	var setting_language    = center(beside(element('<div id="setting_language_tip"></div>','setting_language_tip'),element('<div id="setting_language_value"></div>','setting_language_value'),0.8),0,0.03);
	
	v_seq([setting_title,setting_localphone,setting_monthly,setting_balance,setting_rate,empty(),setting_password,setting_new_card,setting_language,empty()],[0.08,0.24,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.12])(0,0,screen_width,screen_height);

	var title_background_img = 'url(' + language + '/setting_title_background.png' + ')';
	
	$('#setting_title').css({'background-image':title_background_img,'text-align':'center','color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#setting_title').html(text[language]['setting_title_text']);
	$('#setting_title').addClass('setting');

    $('#setting_localphone_tip').css({'text-indent':border_radius,'border-top-left-radius':border_radius,'border-bottom-left-radius':border_radius,'text-align':'left','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_localphone_tip').html(text[language]['setting_localphone_tip_text']);
	$('#setting_localphone_tip').addClass('setting_localphone');
	$('#setting_localphone_value').css({'text-indent':border_radius,'direction':'rtl','border-top-right-radius':border_radius,'border-bottom-right-radius':border_radius,'text-align':'right','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_localphone_value').html("<< " + storage_get('ltalk_localphone'));
	$('#setting_localphone_value').addClass('setting_localphone');
	$(".setting_localphone").wrapAll('<div id="setting_localphone" class="setting"></div>');
	$("#setting_localphone").attr({'onclick':'enter_setting_phone()'});

    $('#setting_monthly_tip').css({'text-indent':border_radius,'border-top-left-radius':border_radius,'text-align':'left','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_monthly_tip').html(text[language]['setting_monthly_tip_text']);
	$('#setting_monthly_tip').addClass('setting_monthly');
	$('#setting_monthly_value').css({'text-indent':border_radius,'direction':'rtl','border-top-right-radius':border_radius,'text-align':'right','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_monthly_value').html("<< ");
	$('#setting_monthly_value').addClass('setting_monthly');
	$(".setting_monthly").wrapAll('<div id="setting_monthly" class="setting"></div>');
	$("#setting_monthly").attr({'onclick':'enter_setting_monthly()'});

    $('#setting_balance_tip').css({'text-indent':border_radius,'text-align':'left','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_balance_tip').html(text[language]['setting_balance_tip_text']);
	$('#setting_balance_tip').addClass('setting_balance');
	$('#setting_balance_value').css({'text-indent':border_radius,'direction':'rtl','text-align':'right','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_balance_value').html("<< ");
	$('#setting_balance_value').addClass('setting_balance');
	$(".setting_balance").wrapAll('<div id="setting_balance" class="setting"></div>');
	$("#setting_balance").attr({'onclick':'enter_setting_balance()'});

    $('#setting_rate_tip').css({'text-indent':border_radius,'border-bottom-left-radius':border_radius,'text-align':'left','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_rate_tip').html(text[language]['setting_rate_tip_text']);
	$('#setting_rate_tip').addClass('setting_rate');
	$('#setting_rate_value').css({'text-indent':border_radius,'border-bottom-right-radius':border_radius,'direction':'rtl','text-align':'right','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_rate_value').html("<< ");
	$('#setting_rate_value').addClass('setting_rate');
	$(".setting_rate").wrapAll('<div id="setting_rate" class="setting"></div>');
	$("#setting_rate").attr({'onclick':'enter_setting_rate()'});

    $('#setting_password_tip').css({'text-indent':border_radius,'border-top-left-radius':border_radius,'text-align':'left','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_password_tip').html(text[language]['setting_password_tip_text']);
	$('#setting_password_tip').addClass('setting_password');
	$('#setting_password_value').css({'text-indent':border_radius,'direction':'rtl','border-top-right-radius':border_radius,'text-align':'right','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_password_value').html("<< ");
	$('#setting_password_value').addClass('setting_password');
	$(".setting_password").wrapAll('<div id="setting_password" class="setting"></div>');
	$("#setting_password").attr({'onclick':'enter_setting_modify_card()'});

    $('#setting_new_card_tip').css({'text-indent':border_radius,'text-align':'left','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_new_card_tip').html(text[language]['setting_new_card_tip_text']);
	$('#setting_new_card_tip').addClass('setting_new_card');
	$('#setting_new_card_value').css({'text-indent':border_radius,'direction':'rtl','text-align':'right','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_new_card_value').html("<< ");
	$('#setting_new_card_value').addClass('setting_new_card');
	$(".setting_new_card").wrapAll('<div id="setting_new_card" class="setting"></div>');
	$("#setting_new_card").attr({'onclick':'enter_setting_card()'});

    $('#setting_language_tip').css({'text-indent':border_radius,'border-bottom-left-radius':border_radius,'text-align':'left','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_language_tip').html(text[language]['setting_language_tip_text']);
	$('#setting_language_tip').addClass('setting_language');
	$('#setting_language_value').css({'text-indent':border_radius,'border-bottom-right-radius':border_radius,'direction':'rtl','text-align':'right','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#setting_language_value').html("<< ");
	$('#setting_language_value').addClass('setting_language');
	$(".setting_language").wrapAll('<div id="setting_language" class="setting"></div>');
	$("#setting_language").attr({'onclick':'enter_setting_select_language()'});

    $(".setting").wrapAll('<div id="setting"></div>');
    setting_screen = $('#setting').detach();
}

function enter_setting()
{
	enter_screen(setting_screen);
}