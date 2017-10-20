function build_main_screen()
{
	var main_base = element('<div id="main_base"></div>','main_base');

	main_base(0,0,screen_width,screen_height);

    $("#main_base").attr({'onclick':'shrink_call_history()'});
    $('#main_base').addClass('main');

	/************************************************************************************************/
	
	var main_setting = center(element('<img id="main_setting"></img>','main_setting'),0.1667,0.0909);
	
	v_seq([beside(empty(),main_setting,0.7708),empty()],[0.08,0.92])(0,0,screen_width,screen_height);
	
	var main_setting_img = language + '/main_setting.png';
	
	$('#main_setting').css({'z-index':'1'});
	$('#main_setting').attr({'src':main_setting_img,'onclick':'enter_setting()'});
	$('#main_setting').addClass('main');

	/************************************************************************************************/
	
	var main_title    = element('<div id="main_title"></div>','main_title');
	var main_logo     = center(element('<img id="main_logo"></img>','main_logo'),0.25,0.0);
	var main_name     = element('<div id="main_name"></div>','main_name');
	var main_input    = element('<input type="tel" id="main_input"></input>','main_input');
	var main_contact  = element('<img id="main_contact"></img>','main_contact');
	var main_confirm  = center(element('<img id="main_confirm"></img>','main_confirm'),0.3333,0.34375);
	
	v_seq([main_title,main_logo,h_seq([empty(),main_name],[0.125,0.875]),h_seq([empty(),main_input,main_contact],[0.125,0.75,0.125]),main_confirm,empty()],[0.08,0.32,0.08,0.08,0.24,0.2])(0,0,screen_width,screen_height);
	
	var title_background_img = 'url(' + language + '/main_title_background.png' + ')';
	var logo_img             = language + '/main_logo.png';
	var contact_img          = language + '/main_contact.png';
	var confirm_img          = language + '/main_confirm.png';
	
	$('#main_title').css({'background-image':title_background_img,'color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#main_title').html(text[language]['main_title_text'] + storage_get('ltalk_localphone'));
	$('#main_title').addClass('main');
	$('#main_logo').attr({'src':logo_img});
	$('#main_logo').addClass('main');
	$('#main_name').css({'color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
    $('#main_name').html(main_select_name);
    $('#main_name').addClass('main');
    $('#main_input').css({'padding':'0px','border-radius':border_radius,'font-size':font_size});
    $('#main_input').val(main_select_phone);
    $('#main_input').addClass('main');
    $('#main_input').attr({'onclick':'main_input_clear()'});
    $('#main_contact').attr({'src':contact_img,'onclick':'shrink_call_history();enter_contact()'});
    $('#main_contact').addClass('main');
	$('#main_confirm').attr({'src':confirm_img,'onclick':'let_us_talk()'});
	$('#main_confirm').addClass('main');

	/************************************************************************************************/

    var main_history_up  = element('<img id="main_history_up"></img>','main_history_up');
    
    v_seq([empty(),main_history_up],[0.92,0.08])(0,0,screen_width,screen_height);
    
    var history_up_img = language + '/main_history_up.png';

    if (ltalk_history.length == 0)
    {
        $('#main_history_up').css({'z-index':'2','display':'none'});
    }
    else
    {
        $('#main_history_up').css({'z-index':'2'});
    }
    $('#main_history_up').attr({'src':history_up_img,'onclick':'expand_call_history()'});
	$('#main_history_up').addClass('main');

	/************************************************************************************************/

	build_main_history_down();

	/************************************************************************************************/

	$(".main").wrapAll('<div id="main"></div>');
    main_screen = $('#main').detach();
}

function expand_call_history()
{
	$('#main_history_up').fadeOut("fast");
    $(".main_history_down").slideToggle("fast");
}

function shrink_call_history()
{
	if (($('#main_history_up').css('display') == 'none') && (ltalk_history.length != 0))
    {
        $(".main_history_down").slideToggle("fast");
        $('#main_history_up').fadeIn("fast");
    }
}

function history_selected(name,phone)
{
	main_input_set(name,phone);
    shrink_call_history();
}

function build_main_history_down()
{
	if (ltalk_history.length != 0)
	{
        if($('#main_histroy').index() != -1)
        {
        	$('#main_histroy').detach();
        }
    	var rate = (ltalk_history.length + 1) * 0.08;
    	var main_middle = element('<div id="main_middle"></div>','main_middle');

		v_seq([empty(),main_middle],[1 - rate,rate])(0,0,screen_width,screen_height);

		$('#main_middle').css({'background-color':'white'});
		$('#main_middle').addClass('main_history_down');

        var history_list = new Array();
        for (var i = 1;i < ltalk_history.length + 1;i++)
        {
        	var history_item  = 'main_history_item'  + i;
        	var history_name  = 'main_history_name'  + i;
        	var history_phone = 'main_history_phone' + i;
        	var ele1 = element('<div id=' + '"' + history_name + '"' + ' class=' + '"' + history_item + '"' + '></div>',history_name);
        	var ele2 = element('<div id=' + '"' + history_phone + '"' + ' class=' + '"' + history_item + '"' + '></div>',history_phone);
        	history_list.push(beside(ele1,ele2,0.42));
        }

        var main_history_down = element('<img id="main_history_down"></img>','main_history_down');

	    v_seq([empty(),main_history_down].concat(history_list),[1 - rate].concat(init_array(0.08,ltalk_history.length + 1)))(0,0,screen_width,screen_height);

	    for (var i = ltalk_history.length - 1;i >= 0;i--)
        {
        	var history_item  = 'main_history_item'  + (ltalk_history.length - i);
        	var history_name  = 'main_history_name'  + (ltalk_history.length - i);
        	var history_phone = 'main_history_phone' + (ltalk_history.length - i);

        	$('.' + history_item).wrapAll('<div id="' + history_item + '"></div>');

        	$('#' + history_item).attr({'onclick':'history_selected("' + ltalk_history[i]['name'] + '","' + ltalk_history[i]['phone'] + '")'});
        	$('#' + history_item).addClass('main_history_down');

        	$('#' + history_name).html(ltalk_history[i]['show_name']);
        	$('#' + history_name).css({'z-index':'2'});
        	$('#' + history_phone).html(ltalk_history[i]['phone']);
        	$('#' + history_phone).css({'z-index':'2'});

        	if (i != 0)
        	{
        		$('#' + history_name).css({'text-align':'center','border-bottom':'solid thin','font-family':'arial','font-size':font_size,'line-height':line_height});
        	    $('#' + history_phone).css({'text-align':'center','border-bottom':'solid thin','font-family':'arial','font-size':font_size,'line-height':line_height});

        	}
        	else
        	{
        		$('#' + history_name).css({'text-align':'center','font-family':'arial','font-size':font_size,'line-height':line_height});
        	    $('#' + history_phone).css({'text-align':'center','font-family':'arial','font-size':font_size,'line-height':line_height});
        	}
        }

        var history_down_img = language + '/main_history_down.png';
	    $('#main_history_down').attr({'src':history_down_img,'onclick':'shrink_call_history()'});
	    $('#main_history_down').addClass('main_history_down');

	    $('.main_history_down').css({'display':'none','z-index':'2'});
	    $('.main_history_down').wrapAll('<div id="main_histroy" class="main"></div>');
	}
}

function let_us_talk()
{
	if (check_connection() == "no network connection")
	{
		show_tip_window_screen(user_tip[language]['no_network_error'],tip_window_exist_time);
	}
	else
	{
		var phone = cc_phone(format_phone($('#main_input').val()),country_code);
		if (check_phone(phone))
		{
			/* update history */
			var history_obj = {'show_name':hide_over_flow($('#main_name').html(),13),'name':$('#main_name').html(),'phone':phone,'time':parseInt((new Date()).getTime() / 1000)};
			history_updata(history_obj);
            main_screen.detach();
            build_main_screen();
            cur_screen = main_screen;
            $('body').prepend(cur_screen);
            $('#main_input').val(phone);
			/* start call */
			var confirm_img = language + '/main_confirm.png';
			var waiting_img = language + '/main_waiting.png';
			$('#main_confirm').attr({'src':waiting_img,'onclick':''});
			show_tip_window_screen(user_tip[language]['call_connect'],tip_window_exist_time);
			var success	= 	function(data,textStatus,jqXHR)
						{
							var rtn   = data.split("@")[1].split(",");
							var stat  = rtn[0];
							var ok    = function(){setTimeout(function(){$('#main_confirm').attr({'src':confirm_img,'onclick':'let_us_talk()'});},timeout);};
							var retry = function()
										{
											storage_set('ltalk_seqno',rtn[1]);
											xhr = $.ajax({type:'post',crossDomain:true,url:service_addr,data:build_command_talk(phone),dataType:"text",timeout:timeout,success:success,error:error});
										};
							var failed= function(){var info = rtn[1];$('#main_confirm').attr({'src':confirm_img,'onclick':'let_us_talk()'});show_tip_window_screen(user_tip[language][info],tip_window_exist_time);};
							process_service_respond(stat,ok,retry,failed);
						};
			var error   =   function(jqXHR, textStatus, errorThrown)
						{
							$('#main_confirm').attr({'src':confirm_img,'onclick':'let_us_talk()'});
							show_tip_window_screen(user_tip[language]['connect_failed'],tip_window_exist_time);
						}
			xhr = $.ajax({type:'post',crossDomain:true,url:service_addr,data:build_command_talk(phone),dataType:"text",timeout:timeout,success:success,error:error});
		}
		else
		{
			show_tip_window_screen(user_tip[language]['phone_error'],tip_window_exist_time);
		}
	}
}

function build_command_talk(phone)
{
	var seqno    = storage_get('ltalk_seqno');
	var cardno   = storage_get("ltalk_cardno");
	var phone1   = storage_get("ltalk_localphone");
	var phone2   = phone;
	var password = storage_get('ltalk_password');
	var command  = 'command=talk&';
	command     += 'seqno='  + seqno + '&';
	command     += 'cardno=' + cardno + '&';
	command     += 'phone1=' + phone1 + '&';
	command     += 'phone2=' + phone2 + '&';
	command     += 'digest=' + md5(seqno + cardno + phone1 + phone2 + password);
	updata_seq_no();
	return command;
}

function main_input_clear()
{
    $('#main_name').html('');
    $('#main_input').val('');
    main_select_name  = '';
    main_select_phone = '';
    shrink_call_history();
}

function main_input_set(name,phone)
{
    $('#main_name').html(name);
    $('#main_input').val(phone);
    main_select_name  = name;
    main_select_phone = phone;
}

function enter_main()
{
	enter_screen(main_screen);
}