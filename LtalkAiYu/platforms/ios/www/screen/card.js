function build_card_screen()
{
	var card_background_color = element('<div id="card_background_color"></div>','card_background_color');

	card_background_color(0,0,screen_width,screen_height);

    $("#card_background_color").css({'background-color':'#dedede','z-index':'-2'});
    $('#card_background_color').addClass('card');

    /************************************************************************************************/

    var card_save = center(element('<img id="card_save"></img>','card_save'),0.1667,0.0909);
    var card_back = center(element('<img id="card_back"></img>','card_back'),0.1667,0.0909);
    
	v_seq([h_seq([card_save,empty(),card_back],[0.2292,0.5416,0.2292]),empty()],[0.08,0.92])(0,0,screen_width,screen_height);
	
	var card_save_img = language + '/card_save.png';
	var card_back_img = language + '/card_back.png';

	$('#card_save').css({'z-index':'1'});
	$('#card_save').attr({'src':card_save_img,'onclick':'save_setting_card()'});
	$('#card_save').addClass('card');	

	$('#card_back').css({'z-index':'1'});
	$('#card_back').attr({'src':card_back_img,'onclick':'exit_screen()'});
	$('#card_back').addClass('card');

    /************************************************************************************************/

    var card_title     = element('<div id="card_title"></div>','card_title');
    var card_no_tip    = center(element('<div id="card_no_tip"></div>','card_no_tip'),0.0,0.125);
    var card_no_input  = center(element('<input type="text" id="card_no_input"></input>','card_no_input'),0.0,0.125);
    var card_pwd_tip   = center(element('<div id="card_pwd_tip"></div>','card_pwd_tip'),0.0,0.125);
    var card_pwd_input = center(element('<input type="password" id="card_pwd_input"></input>','card_pwd_input'),0.0,0.125);

    v_seq([card_title,empty(),card_no_tip,card_no_input,empty(),card_pwd_tip,card_pwd_input,empty()],[0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.44])(0,0,screen_width,screen_height);

    var title_background_img = 'url(' + language + '/card_title_background.png' + ')';

	$('#card_title').css({'background-image':title_background_img,'text-align':'center','color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#card_title').html(text[language]['card_title_text']);
	$('#card_title').addClass('card');

	$('#card_no_tip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#card_no_tip').html(text[language]['card_no_tip_text']);
	$('#card_no_tip').addClass('card');
	$('#card_no_input').css({'padding':'0px','font-size':font_size,'border-radius':border_radius});
	$('#card_no_input').val('');
	$('#card_no_input').addClass('card');

	$('#card_pwd_tip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#card_pwd_tip').html(text[language]['card_pwd_tip_text']);
	$('#card_pwd_tip').addClass('card');
	$('#card_pwd_input').css({'padding':'0px','font-size':font_size,'border-radius':border_radius});
	$('#card_pwd_input').val('');
	$('#card_pwd_input').addClass('card');

	$(".card").wrapAll('<div id="card"></div>');
    card_screen = $('#card').detach();
}

function enter_setting_card()
{
	enter_screen(card_screen);
}

function save_setting_card()
{
	var cardno    = $('#card_no_input').val();
	var password  = $('#card_pwd_input').val();

	var user_info = check_user_type(cardno);

	var succ_public = function()
	{
		storage_set("ltalk_cardno",cardno);
		storage_set("ltalk_password",password);
		exit_screen();
	};
	var succ_company = function()
	{
		storage_set("ltalk_cardno",user_info.no+"@"+user_info.attr);
		exit_screen();
	}
	var fail = function()
	{
		show_tip_window_screen(user_tip[language]['digest_wrong'],tip_window_exist_time);
	};

	switch(user_info.type)
    {
    	case 'unknown':
    		fail();
    		break;
    	case 'public':
    		check_public_card_pwd(user_info.no, password, succ_public, fail);
    		break;
    	case 'company':
    		check_company_card_pwd(user_info.attr, user_info.no, password, succ_company, fail);
    		break;
    	default:
    		break
    }
}