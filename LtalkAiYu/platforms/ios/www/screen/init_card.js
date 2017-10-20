function build_init_card_screen()
{
    var init_card_logo     = center(element('<img id="init_card_logo"></img>','init_card_logo'),0.25,0.0);
    var init_card_notip    = center(element('<div id="init_card_notip"></div>','init_card_notip'),0.0,0.125);
    var init_card_noinput  = center(element('<input type="text" id="init_card_noinput"></input>','init_card_noinput'),0.0,0.125);
    var init_card_pwdtip   = center(element('<div id="init_card_pwdtip"></div>','init_card_pwdtip'),0.0,0.125);
    var init_card_pwdinput = center(element('<input type="password" id="init_card_pwdinput"></input>','init_card_pwdinput'),0.0,0.125);
    var init_card_confirm  = center(element('<img id="init_card_confirm"></img>','init_card_confirm'),0.25,0.34375);
	
	v_seq([init_card_logo,init_card_notip,init_card_noinput,init_card_pwdtip,init_card_pwdinput,init_card_confirm,empty()],[0.32,0.08,0.08,0.08,0.08,0.16,0.2])(0,0,screen_width,screen_height);
	
	var logo_img    = language + '/init_card_logo.png';
	var confirm_img = language + '/init_card_confirm.png';
	
	$('#init_card_logo').attr('src',logo_img);
	$('#init_card_logo').addClass('init_card');
	$('#init_card_notip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#init_card_notip').html(text[language]['init_card_no_tip']);
	$('#init_card_notip').addClass('init_card');
	$('#init_card_noinput').css({'padding':'0px','font-size':font_size,'border-radius':border_radius});
	$('#init_card_noinput').addClass('init_card');
	$('#init_card_pwdtip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#init_card_pwdtip').html(text[language]['init_card_pwd_tip']);
	$('#init_card_pwdtip').addClass('init_card');
	$('#init_card_pwdinput').css({'padding':'0px','font-size':font_size,'border-radius':border_radius});
	$('#init_card_pwdinput').addClass('init_card');
	$('#init_card_confirm').attr({'src':confirm_img,'onclick':'save_card_no_pwd()'});
	$('#init_card_confirm').addClass('init_card');

	$(".init_card").wrapAll('<div id="init_card"></div>');
    init_card_screen = $('#init_card').detach();
}

function enter_init_card()
{
	enter_screen(init_card_screen);
}

function save_card_no_pwd()
{
	var cardno    = $('#init_card_noinput').val();
	var password  = $('#init_card_pwdinput').val();

	var user_info = check_user_type(cardno);

	var succ_public = function()
	{
        storage_set("ltalk_cardno",cardno);
		storage_set("ltalk_password",password);
		enter_main();
		stack.pop();
	};
	var succ_company = function()
	{
        storage_set("ltalk_cardno",user_info.no+"@"+user_info.attr);
		enter_main();
		stack.pop();
	};
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

function check_user_type(cardno)
{
	var user_info = cardno.split("@");
	if (user_info.length == 1)
	{
		return {type:'public',no:cardno,attr:'card'};
	}
	else if ((user_info.length == 2) && (user_info[1] != ""))
	{
		return {type:'company',no:user_info[0],attr:user_info[1].toLocaleUpperCase()};
	}
	return {type:'unknown',no:'',attr:''};
}