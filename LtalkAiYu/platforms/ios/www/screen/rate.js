function build_rate_screen()
{
	var rate_background_color = element('<div id="rate_background_color"></div>','rate_background_color');

	rate_background_color(0,0,screen_width,screen_height);

    $("#rate_background_color").css({'background-color':'#dedede','z-index':'-2'});
    $('#rate_background_color').addClass('rate');

    /************************************************************************************************/

    var rate_query = center(element('<img id="rate_query"></img>','rate_query'),0.1667,0.0909);
    var rate_back  = center(element('<img id="rate_back"></img>','rate_back'),0.1667,0.0909);
    
	v_seq([h_seq([rate_query,empty(),rate_back],[0.2292,0.5416,0.2292]),empty()],[0.08,0.92])(0,0,screen_width,screen_height);
	
	var rate_query_img = language + '/rate_query.png';
	var rate_back_img  = language + '/rate_back.png';

	$('#rate_query').css({'z-index':'1'});
	$('#rate_query').attr({'src':rate_query_img,'onclick':'query_rate()'});
	$('#rate_query').addClass('rate');	

	$('#rate_back').css({'z-index':'1'});
	$('#rate_back').attr({'src':rate_back_img,'onclick':'rate_select_phone="";exit_screen()'});
	$('#rate_back').addClass('rate');

    /************************************************************************************************/

    var rate_title = element('<div id="rate_title"></div>','rate_title');
    var rate_caller_tip   = center(element('<div id="rate_caller_tip"></div>','rate_caller_tip'),0.0,0.125);
    var rate_caller_input = center(element('<input type="tel" id="rate_caller_input"></input>','rate_caller_input'),0.0,0.125);
    var rate_called_tip   = center(element('<div id="rate_called_tip"></div>','rate_called_tip'),0.0,0.125);
	var rate_called_input = element('<input type="tel" id="rate_called_input"></input>','rate_called_input');
	var rate_contact      = element('<img id="rate_contact"></img>','rate_contact');
    var rate_result_tip   = center(element('<div id="rate_result_tip"></div>','rate_result_tip'),0.0,0.125);
    var rate_result_input = center(element('<input type="tel" id="rate_result_input"></input>','rate_result_input'),0.0,0.125);

    v_seq([rate_title,empty(),rate_caller_tip,rate_caller_input,rate_called_tip,h_seq([empty(),rate_called_input,rate_contact],[0.125,0.75,0.125]),rate_result_tip,rate_result_input,empty()],[0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.36])(0,0,screen_width,screen_height);

    var title_background_img = 'url(' + language + '/rate_title_background.png' + ')';
    var contact_img          = language + '/rate_contact.png';

	$('#rate_title').css({'background-image':title_background_img,'text-align':'center','color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#rate_title').html(text[language]['rate_title_text']);
	$('#rate_title').addClass('rate');

	$('#rate_caller_tip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#rate_caller_tip').html(text[language]['rate_caller_tip_text']);
	$('#rate_caller_tip').addClass('rate');
	$('#rate_caller_input').css({'padding':'0px','font-size':font_size,'border-radius':border_radius,'background-color':'#dedede'});
	$('#rate_caller_input').attr({'readonly':'readonly'});
	$('#rate_caller_input').val(storage_get('ltalk_localphone'));
	$('#rate_caller_input').addClass('rate');

	$('#rate_called_tip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#rate_called_tip').html(text[language]['rate_called_tip_text']);
	$('#rate_called_tip').addClass('rate');
    $('#rate_called_input').css({'padding':'0px','border-radius':border_radius,'font-size':font_size});
    $('#rate_called_input').val(rate_select_phone);
    $('#rate_called_input').addClass('rate');
    $('#rate_contact').attr({'src':contact_img,'onclick':'enter_contact()'});
    $('#rate_contact').addClass('rate');

	$('#rate_result_tip').css({'font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#rate_result_tip').html(text[language]['rate_result_tip_text']);
	$('#rate_result_tip').addClass('rate');
	$('#rate_result_input').css({'padding':'0px','font-size':font_size,'border-radius':border_radius,'background-color':'#dedede'});
	$('#rate_result_input').attr({'readonly':'readonly'});
	$('#rate_result_input').val('');
	$('#rate_result_input').addClass('rate');

	$(".rate").wrapAll('<div id="rate"></div>');
    rate_screen = $('#rate').detach();
}

function enter_setting_rate()
{
    enter_screen(rate_screen);
}

function query_rate()
{
	if ( check_connection() == "no network connection")
	{
		show_tip_window_screen(user_tip[language]['no_network_error'],tip_window_exist_time);
	}
	else
	{
		var peer_phone =  cc_phone(format_phone($('#rate_called_input').val()),country_code);
		if (check_phone(peer_phone))
		{
			$('#rate_called_input').val(peer_phone);
			show_tip_window_screen(user_tip[language]['rate_search'],tip_window_exist_time);

	        var success	= 	function(data,textStatus,jqXHR)
							{
								var rtn   = data.split("@")[1].split(",");
								var stat  = rtn[0];
								var ok    = function(){$('#rate_result_input').val(rtn[1]);};
								var retry = function()
											{
												storage_set('ltalk_seqno',rtn[1]);
												xhr = $.ajax({type:'post',crossDomain:true,url:service_addr,data:build_command_rate_query(peer_phone),dataType:"text",timeout:timeout,success:success,error:error});
											};
								var failed= function(){var info = rtn[1];show_tip_window_screen(user_tip[language][info],tip_window_exist_time);};
								process_service_respond(stat,ok,retry,failed);
							};
		    var error   =   function(jqXHR, textStatus, errorThrown)
							{
								show_tip_window_screen(user_tip[language]['connect_failed'],tip_window_exist_time);
							}
			xhr = $.ajax({type:'post',crossDomain:true,url:service_addr,data:build_command_rate_query(peer_phone),dataType:"text",timeout:timeout,success:success,error:error});
		}
		else
		{
			show_tip_window_screen(user_tip[language]['phone_error'],tip_window_exist_time);
		}
	}
}

function build_command_rate_query(phone)
{
	var seqno    = storage_get('ltalk_seqno');
	var cardno   = storage_get('ltalk_cardno');
	var phone1   = storage_get('ltalk_localphone');
	var phone2   = phone;
	var password = storage_get('ltalk_password');
	var command  = 'command=fatequery&';
	command     += 'seqno='  + seqno + '&';
	command     += 'cardno=' + cardno + '&';
	command     += 'phone1=' + phone1 + '&';
	command     += 'phone2=' + phone2 + '&';
	command     += 'digest=' + md5(seqno + cardno + phone1 + phone2 + password);
	updata_seq_no();
	return command;
}