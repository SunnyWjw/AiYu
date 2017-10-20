function build_balance_screen()
{
	var balance_background_color = element('<div id="balance_background_color"></div>','balance_background_color');

	balance_background_color(0,0,screen_width,screen_height);

    $("#balance_background_color").css({'background-color':'#dedede','z-index':'-2'});
    $('#balance_background_color').addClass('balance');

    /************************************************************************************************/

    var balance_back = center(element('<img id="balance_back"></img>','balance_back'),0.1667,0.0909);
    
	v_seq([beside(empty(),balance_back,0.7708),empty()],[0.08,0.92])(0,0,screen_width,screen_height);
	
	var balance_back_img = language + '/balance_back.png';
	
	$('#balance_back').css({'z-index':'1'});
	$('#balance_back').attr({'src':balance_back_img,'onclick':'exit_screen()'});
	$('#balance_back').addClass('balance');

    /************************************************************************************************/

    var balance_base1  = center(element('<div id="balance_base1"></div>','balance_base1'),0.0,0.05);	
	var balance_base2  = center(element('<div id="balance_base2"></div>','balance_base2'),0.0,0.05);

	v_seq([empty(),balance_base1,balance_base2,empty()],[0.16,0.08,0.08,0.68])(0,0,screen_width,screen_height);

    $('#balance_base1').css({'border-top-left-radius':border_radius,'border-top-right-radius':border_radius,'z-index':'-1','background-color':'white'});
    $('#balance_base1').addClass('balance');
    $('#balance_base2').css({'border-bottom-left-radius':border_radius,'border-bottom-right-radius':border_radius,'border-top':'solid thin','z-index':'-1','background-color':'white'});
    $('#balance_base2').addClass('balance');

    /************************************************************************************************/

    var balance_title = element('<div id="balance_title"></div>','balance_title');

    var balance_no    = center(beside(element('<div id="balance_no_tip"></div>','balance_no_tip'),element('<div id="balance_no_value"></div>','balance_no_value'),0.4),0,0.05);
	var balance_value = center(beside(element('<div id="balance_value_tip"></div>','balance_value_tip'),element('<div id="balance_value_value"></div>','balance_value_value'),0.4),0,0.05);

    v_seq([balance_title,empty(),balance_no,balance_value],[0.08,0.08,0.08,0.08,0.68])(0,0,screen_width,screen_height);

	var title_background_img = 'url(' + language + '/balance_title_background.png' + ')';
	
	$('#balance_title').css({'background-image':title_background_img,'text-align':'center','color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#balance_title').html(text[language]['balance_title_text']);
	$('#balance_title').addClass('balance');

	$('#balance_no_tip').css({'text-indent':border_radius,'border-top-left-radius':border_radius,'text-align':'left','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#balance_no_tip').html(text[language]['balance_no_tip_text']);
	$('#balance_no_tip').addClass('balance_no');
	$('#balance_no_value').css({'text-indent':border_radius,'direction':'rtl','border-top-right-radius':border_radius,'text-align':'right','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#balance_no_value').html(show_cardno());
	$('#balance_no_value').addClass('balance_no');
	$(".balance_no").wrapAll('<div id="balance_no" class="balance"></div>');

    $('#balance_value_tip').css({'text-indent':border_radius,'border-bottom-left-radius':border_radius,'text-align':'left','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#balance_value_tip').html(text[language]['balance_value_tip_text']);
	$('#balance_value_tip').addClass('balance');
	$('#balance_value_value').css({'text-indent':border_radius,'border-bottom-right-radius':border_radius,'direction':'rtl','text-align':'right','font-family':'arial','font-size':font_size,'line-height':line_height});
	$('#balance_value_value').html("");
	$('#balance_value_value').addClass('balance');
	$(".balance_value").wrapAll('<div id="balance_value" class="balance"></div>');

	$(".balance").wrapAll('<div id="balance"></div>');
    balance_screen = $('#balance').detach();
}

function enter_setting_balance()
{
	enter_screen(balance_screen);
}

function show_cardno()
{
	var Cardno = storage_get('ltalk_cardno');
	if  ((Cardno == '') || (Cardno == null))
	{
		return '';
	}
	else
	{
		var Info = check_user_type(Cardno);
	    return Info.no;
	}
}

function query_balance()
{
	var user_info = check_user_type(storage_get('ltalk_cardno'));

	if (check_connection() == "no network connection")
	{
		show_tip_window_screen(user_tip[language]['no_network_error'],tip_window_exist_time);
	}
	else if(user_info.type == 'company')
	{
		alert(user_tip[language]['forbidden']);
		exit_screen();
	}
	else
	{
        var success	= 	function(data,textStatus,jqXHR)
					{
						var rtn   = data.split("@")[1].split(",");
						var stat  = rtn[0];
						var ok    = function()
						{
							$('#balance_value_value').html(rtn[1]);
							storage_set('ltalk_ip',rtn[2]);
							service_addr = "http://" + storage_get('ltalk_ip') + "/phone/test/ltalkapp.yaws";
						};
						var retry = function()
						{
							storage_set('ltalk_seqno',rtn[1]);
							xhr = $.ajax({type:'post',crossDomain:true,url:connect_addr,data:build_command_balance(),dataType:"text",timeout:6 * timeout,success:success,error:error});
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
						if (textStatus != 'abort')
						{
                            show_tip_window_screen(user_tip[language]['connect_failed'],tip_window_exist_time);
						}
					}
		xhr = $.ajax({type:'post',crossDomain:true,url:connect_addr,data:build_command_balance(),dataType:"text",timeout:6 * timeout,success:success,error:error});
	}
}

function build_command_balance()
{
	var seqno    = storage_get('ltalk_seqno');
	var cardno   = storage_get('ltalk_cardno');
	var password = storage_get('ltalk_password');
	var command  = 'command=balance&';
	command     += 'seqno='  + seqno + '&';
	command     += 'cardno=' + cardno + '&';
	command     += 'digest=' + md5(seqno + cardno + password);
	updata_seq_no();
	return command;
}