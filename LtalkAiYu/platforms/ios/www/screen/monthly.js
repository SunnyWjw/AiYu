function build_monthly_screen()
{
	/************************************************************************************************/

    var monthly_back = center(element('<img id="monthly_back"></img>','monthly_back'),0.1667,0.0909);
    
	v_seq([beside(empty(),monthly_back,0.7708),empty()],[0.08,0.92])(0,0,screen_width,screen_height);
	
	var monthly_back_img = language + '/monthly_back.png';
	
	$('#monthly_back').css({'z-index':'1'});
	$('#monthly_back').attr({'src':monthly_back_img,'onclick':'exit_screen()'});
	$('#monthly_back').addClass('monthly');

    /************************************************************************************************/

    var monthly_base = element('<div id="monthly_base"></div>','monthly_base');

    v_seq([empty(),monthly_base,empty()],[0.08,0.0533,0.8667])(0,0,screen_width,screen_height);

    var sum_background_img   = 'url(' + language + '/monthly_sum_background.png' + ')';

	$('#monthly_base').css({'background-image':sum_background_img,'z-index':'-1'});
	$('#monthly_base').addClass('monthly');


    /************************************************************************************************/

    var monthly_title   = element('<div id="monthly_title"></div>','monthly_title');

    var monthly_date    = beside(element('<div id="monthly_date_tip"></div>','monthly_date_tip'),element('<div id="monthly_date_value"></div>','monthly_date_value'),0.6);
    var monthly_sum     = beside(element('<div id="monthly_sum_tip"></div>','monthly_sum_tip'),element('<div id="monthly_sum_value"></div>','monthly_sum_value'),0.6);
    var monthly_balance = beside(element('<div id="monthly_balance_tip"></div>','monthly_balance_tip'),element('<div id="monthly_balance_value"></div>','monthly_balance_value'),0.6);

    var monthly_detail = element('<div id="monthly_detail"></div>','monthly_detail');

    v_seq([monthly_title,h_seq([monthly_date,monthly_sum,monthly_balance],[0.3333,0.3333,0.3333]),monthly_detail],[0.08,0.0533,0.8667])(0,0,screen_width,screen_height);

    var title_background_img = 'url(' + language + '/monthly_title_background.png' + ')';
	
	$('#monthly_title').css({'background-image':title_background_img,'text-align':'center','color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#monthly_title').html(text[language]['monthly_title_text']);
	$('#monthly_title').addClass('monthly');

	$('#monthly_date_tip').css({'text-align':'center','font-family':'arial','font-size':monthly_font_size,'line-height':monthly_inline_height});
	$('#monthly_date_tip').html(text[language]['monthly_date_tip_text']);
	$('#monthly_date_tip').addClass('monthly');

	$('#monthly_date_value').css({'text-align':'center','font-family':'arial','color':'red','font-size':monthly_font_size,'line-height':monthly_inline_height});
	$('#monthly_date_value').html('');
	$('#monthly_date_value').addClass('monthly');

	$('#monthly_sum_tip').css({'text-align':'center','font-family':'arial','font-size':monthly_font_size,'line-height':monthly_inline_height});
	$('#monthly_sum_tip').html(text[language]['monthly_sum_tip_text']);
	$('#monthly_sum_tip').addClass('monthly');

	$('#monthly_sum_value').css({'text-align':'center','font-family':'arial','color':'red','font-size':monthly_font_size,'line-height':monthly_inline_height});
	$('#monthly_sum_value').html('');
	$('#monthly_sum_value').addClass('monthly');

	$('#monthly_balance_tip').css({'text-align':'center','font-family':'arial','font-size':monthly_font_size,'line-height':monthly_inline_height});
	$('#monthly_balance_tip').html(text[language]['monthly_balance_tip_text']);
	$('#monthly_balance_tip').addClass('monthly');

	$('#monthly_balance_value').css({'text-align':'center','font-family':'arial','color':'red','font-size':monthly_font_size,'line-height':monthly_inline_height});
	$('#monthly_balance_value').html('');
	$('#monthly_balance_value').addClass('monthly');

	$('#monthly_detail').addClass('monthly');

	$(".monthly").wrapAll('<div id="monthly"></div>');
    monthly_screen = $('#monthly').detach();
}

function enter_setting_monthly()
{
	enter_screen(monthly_screen);
}

function query_monthly()
{
	if (check_connection() == "no network connection")
	{
		show_tip_window_screen(user_tip[language]['no_network_error'],tip_window_exist_time);
	}
	else
	{
		success	 = 	function(data,textStatus,jqXHR)
					{
						var rtn   = data.split("@")[1].split(",");
						var stat  = rtn[0];
						var ok    = function()
									{
										var date    = rtn[1];
										var number  = rtn[2];
										var money   = rtn[3];
										var details = rtn[4].split(";");
										var str = "";
										for (var i = 0; i < details.length - 1; i++)
										{
											var detail  = details[i];
											var content = detail.split("/");
											str += '<div><table border="0" style="position:relative;left:2%;right:2%;width:96%;';
											str += 'height:' + monthly_body_height + ';';
											str += 'margin-top:' + monthly_body_space + ';';
											str += 'padding-top:' + monthly_body_padding + ';';
											str += 'padding-bottom:' + monthly_body_padding + ';';
											str += 'background-color:#dedede;cellspacing:0px;cellpadding:0px;';
											str += 'border-top-left-radius:' + border_radius + ';';
											str += 'border-top-right-radius:' + border_radius + ';';
											str += 'border-bottom-left-radius:' + border_radius + ';';
											str += 'border-bottom-right-radius:' + border_radius + ';';
											str += 'font-size:' + monthly_font_size;
											str += '">';
											str += "<tr><td style='text-align:right'>" + text[language]['monthly_body_start_text'] + "</td><td style='text-align:left'>";
											str += content[0];
											str += "</td><td style='text-align:right'>" + text[language]['monthly_body_end_text'] + "</td><td style='text-align:left'>";
											str += content[1];
											str += "</td></tr><tr><td style='text-align:right'>" + text[language]['monthly_body_caller_text'] + "</td><td style='text-align:left'>";
											str += content[2];
											str += "</td><td style='text-align:right'>" + text[language]['monthly_body_called_text'] + "</td><td style='text-align:left'>";
											str += content[3];
											str += "</td></tr><tr><td style='text-align:right'>" + text[language]['monthly_body_rate_text'] + "</td><td style='text-align:left'>";
											str += content[4];
											str += "</td><td style='text-align:right'>" + text[language]['monthly_body_money_text'] + "</td><td style='color:red;text-align:left'>"
											str += content[5];
											str += "</td></tr></table></div>"
										}
										$('#monthly_date_value').html(date);
										$('#monthly_sum_value').html(number);
										$('#monthly_balance_value').html(money);
										$('#monthly_detail').html(str);
									};
						var retry = function()
									{
										storage_set('ltalk_seqno',rtn[1]);
										xhr = $.ajax({type:'post',crossDomain:true,url:service_addr,data:build_command_month_query(),dataType:"text",timeout:timeout,success:success,error:error});
									};
						var failed= function(){var info = rtn[1];show_tip_window_screen(user_tip[language][info],tip_window_exist_time);};
						process_service_respond(stat,ok,retry,failed);
					};
        var error   =   function(jqXHR, textStatus, errorThrown)
					{
						if (textStatus != 'abort')
						{
                            show_tip_window_screen(user_tip[language]['connect_failed'],tip_window_exist_time);
						}
					}
		xhr = $.ajax({type:'post',crossDomain:true,url:service_addr,data:build_command_month_query(),dataType:"text",timeout:timeout,success:success,error:error});

	}
}


function build_command_month_query()
{
	var d = new Date();
	var year     = d.getFullYear().toString();
	var month    = (d.getMonth() + 1).toString();
	var seqno    = storage_get('ltalk_seqno');
	var cardno   = storage_get('ltalk_cardno');
	var password = storage_get('ltalk_password');
	var command  = 'command=monthquery&';
	command     += 'seqno='  + seqno + '&';
	command     += 'cardno=' + cardno + '&';
	command     += 'year=' + year + '&';
	command     += 'month=' + month + '&';
	command     += 'digest=' + md5(seqno + cardno + year + month + password);
	updata_seq_no();
	return command;
}