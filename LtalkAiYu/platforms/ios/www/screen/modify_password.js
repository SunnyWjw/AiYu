function build_modify_password_screen()
{
	var modify_password_background_color = element('<div id="modify_password_background_color"></div>','modify_password_background_color');

	modify_password_background_color(0,0,screen_width,screen_height);

    $("#modify_password_background_color").css({'background-color':'#dedede','z-index':'-2'});
    $('#modify_password_background_color').addClass('modify_password');

    /************************************************************************************************/

    var modify_password_save = center(element('<img id="modify_password_save"></img>','modify_password_save'),0.1667,0.0909);
    var modify_password_back = center(element('<img id="modify_password_back"></img>','modify_password_back'),0.1667,0.0909);
    
	v_seq([h_seq([modify_password_save,empty(),modify_password_back],[0.2292,0.5416,0.2292]),empty()],[0.08,0.92])(0,0,screen_width,screen_height);
	
	var modify_password_save_img = language + '/modify_password_save.png';
	var modify_password_back_img = language + '/modify_password_back.png';

	$('#modify_password_save').css({'z-index':'1'});
	$('#modify_password_save').attr({'src':modify_password_save_img,'onclick':'save_setting_password()'});
	$('#modify_password_save').addClass('modify_password');	

	$('#modify_password_back').css({'z-index':'1'});
	$('#modify_password_back').attr({'src':modify_password_back_img,'onclick':'exit_screen()'});
	$('#modify_password_back').addClass('modify_password');

    /************************************************************************************************/

    var modify_password_title             = element('<div id="phone_title"></div>','phone_title');
    var modify_password_no_tip            = center(element('<div id="modify_password_no_tip"></div>','modify_password_no_tip'),0.0,0.125);
    var modify_password_no_input          = center(element('<input type="text" id="modify_password_no_input"></input>','modify_password_no_input'),0.0,0.125);
    var modify_password_pwd_tip           = center(element('<div id="modify_password_pwd_tip"></div>','modify_password_pwd_tip'),0.0,0.125);
    var modify_password_pwd_input         = center(element('<input type="password" id="modify_password_pwd_input"></input>','modify_password_pwd_input'),0.0,0.125);
    var modify_password_new_pwd_tip       = center(element('<div id="modify_password_new_pwd_tip"></div>','modify_password_new_pwd_tip'),0.0,0.125);
    var modify_password_new_pwd_input     = center(element('<input type="password" id="modify_password_new_pwd_input"></input>','modify_password_new_pwd_input'),0.0,0.125);
    var modify_password_confirm_pwd_tip   = center(element('<div id="modify_password_confirm_pwd_tip"></div>','modify_password_confirm_pwd_tip'),0.0,0.125);
    var modify_password_confirm_pwd_input = center(element('<input type="password" id="modify_password_confirm_pwd_input"></input>','modify_password_confirm_pwd_input'),0.0,0.125);

    v_seq([modify_password_title,empty(),modify_password_no_tip,modify_password_no_input,modify_password_pwd_tip,modify_password_pwd_input,modify_password_new_pwd_tip,modify_password_new_pwd_input,modify_password_confirm_pwd_tip,modify_password_confirm_pwd_input,empty()],[0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.2])(0,0,screen_width,screen_height);

    var title_background_img = 'url(' + language + '/modify_password_title_background.png' + ')';

	$('#phone_title').css({'background-image':title_background_img,'text-align':'center','color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#phone_title').html(text[language]['modify_password_title_text']);
	$('#phone_title').addClass('modify_password');

	$('#modify_password_no_tip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#modify_password_no_tip').html(text[language]['modify_password_no_tip_text']);
	$('#modify_password_no_tip').addClass('modify_password');
	$('#modify_password_no_input').css({'padding':'0px','font-size':font_size,'border-radius':border_radius,'background-color':'#dedede'});
	$('#modify_password_no_input').attr({'readonly':'readonly'});
	$('#modify_password_no_input').val(show_cardno());
	$('#modify_password_no_input').addClass('modify_password');

	$('#modify_password_pwd_tip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#modify_password_pwd_tip').html(text[language]['modify_password_pwd_tip_text']);
	$('#modify_password_pwd_tip').addClass('modify_password');
	$('#modify_password_pwd_input').css({'padding':'0px','font-size':font_size,'border-radius':border_radius});
	$('#modify_password_pwd_input').val("");
	$('#modify_password_pwd_input').addClass('modify_password');

	$('#modify_password_new_pwd_tip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#modify_password_new_pwd_tip').html(text[language]['modify_password_new_pwd_tip_text']);
	$('#modify_password_new_pwd_tip').addClass('modify_password');
	$('#modify_password_new_pwd_input').css({'padding':'0px','font-size':font_size,'border-radius':border_radius});
	$('#modify_password_new_pwd_input').val("");
	$('#modify_password_new_pwd_input').addClass('modify_password');

	$('#modify_password_confirm_pwd_tip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#modify_password_confirm_pwd_tip').html(text[language]['modify_password_confirm_pwd_tip_text']);
	$('#modify_password_confirm_pwd_tip').addClass('modify_password');
	$('#modify_password_confirm_pwd_input').css({'padding':'0px','font-size':font_size,'border-radius':border_radius});
	$('#modify_password_confirm_pwd_input').val("");
	$('#modify_password_confirm_pwd_input').addClass('modify_password');

	$(".modify_password").wrapAll('<div id="modify_password"></div>');
    modify_password_screen = $('#modify_password').detach();
}

function enter_setting_modify_card()
{
	enter_screen(modify_password_screen);
}

function save_setting_password()
{
	if ( check_connection() == "no network connection")
	{
		show_tip_window_screen(user_tip[language]['no_network_error'],tip_window_exist_time);
	}
	else
	{
		var old_password     = $('#modify_password_pwd_input').val();
		var new_password     = $('#modify_password_new_pwd_input').val();
		var confirm_password = $('#modify_password_confirm_pwd_input').val();
		var check_result     = check_modify_password(old_password,new_password,confirm_password);
		if (check_result == 'ok')
		{
			show_tip_window_screen(user_tip[language]['password_change'],tip_window_exist_time);

            var success	= 	function(data,textStatus,jqXHR)
						{
							var rtn   = data.split("@")[1].split(",");
							var stat  = rtn[0];
							var ok    = function()
							{
								show_tip_window_screen(user_tip[language]['password_change_ok'],tip_window_exist_time);
								storage_set('ltalk_password',new_password);
								exit_screen();
							};
							var retry = function()
							{
								storage_set('ltalk_seqno',rtn[1]);
								xhr = $.ajax({type:'post',crossDomain:true,url:service_addr,data:build_command_modify_password(),dataType:"text",timeout:timeout,success:success,error:error});
							};
							var failed= function()
							{
								var info = rtn[1];
								show_tip_window_screen(user_tip[language][info],tip_window_exist_time);
							};
							process_service_respond(stat,ok,retry,failed);
						};
			var error   =   function(jqXHR, textStatus, errorThrown)
						{
							show_tip_window_screen(user_tip[language]['connect_failed'],tip_window_exist_time);
						}
			xhr = $.ajax({type:'post',crossDomain:true,url:service_addr,data:build_command_modify_password(),dataType:"text",timeout:timeout,success:success,error:error});
        }
		else
		{
			show_tip_window_screen(user_tip[language][check_result],tip_window_exist_time);
		}
	}
}

function build_command_modify_password()
{
	var seqno    	 = storage_get('ltalk_seqno');
	var cardno   	 = storage_get('ltalk_cardno');
	var old_password = storage_get('ltalk_password');
	var new_password = $('#modify_password_new_pwd_input').val();
	var new_password_digest = stringToHex(des(old_password + "  ", new_password + "  ",1,0));
	var command  = 'command=modifypassword&';
	command     += 'seqno='       + seqno + '&';
	command     += 'cardno='      + cardno + '&';
	command     += 'newPassword=' + new_password_digest + '&';
	command     += 'digest=' + md5(seqno + cardno + new_password_digest + old_password);
	updata_seq_no();
	return command;
}

function check_modify_password(old_password,new_password,confirm_password)
{
	if (old_password != storage_get('ltalk_password'))
	{
		return 'password_change_old_pwd_error';
	}
	if (new_password != confirm_password)
	{
		return 'password_change_two_new_pwd_error';
	}
	return 'ok';
}