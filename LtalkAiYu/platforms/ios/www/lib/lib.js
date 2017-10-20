var service_addr;
var connect_addr = "http://ltalk.livecom.hk/phone/test/ltalkapp.yaws";
var timeout;
var xhr;

/* lib for handle service respond */
function process_service_respond(stat,ok,retry,failed)
{
	switch(stat)
	{
		case "ok":
			ok();
			break;
		case "retry":
			retry();
			break;
		case "failed":
			failed();
			break;
		default:
			break;
	}
}

/* about phone number handle */
function cc_phone(phone,cc_code)
{
	/* cc means country code */
    if (phone.substring(0,2) == "00")
	{
	    return phone;
	}
	if (phone[0] == "0")
	{
	    return cc_code + phone.substring(1);
	}
	return cc_code + phone;
}

function format_phone(phone)
{
	phone = phone.replace(/-/g,"");
	phone = phone.replace(/ /g,"");
	phone = phone.replace(/\(/g,"");
	phone = phone.replace(/\)/g,"");
	phone = phone.replace('+',"00");
	return phone
}

function check_phone(phone)
{
	if ((phone.length >= 11) && (is_all_digital(phone) == true))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function is_all_digital(input)
{
	var restr = '[0-9]{' + input.length + '}';
	var re = new RegExp(restr);
	return re.test(input);
}

/* about card number&password handle */
function check_card_no(cardno)
{
	if ((cardno.length == 16) && (is_all_digital(cardno) == true))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function check_country_code(country_code)
{
	if ((country_code.length >= 3) && (is_all_digital(country_code) == true) && country_code.substring(0,2) == "00")
	{
		return true;
	}
	else
	{
		return false;
	}
}

function check_company_card_pwd(company,cardno,password,succ,fail)
{
	var addr = "http://ltalk.livecom.hk/phone/test/ltalk_company.yaws";

	var build_command_balance = function()
	{
		var command  = 'command=company_register&';
		command     += 'company=' + company + '&',
		command     += 'cardno=' + cardno + '&';
		command     += 'password=' + password;
		return command;
	};

	if (check_connection() == "no network connection")
	{
		show_tip_window_screen(user_tip[language]['no_network_error'],tip_window_exist_time);
	}
	else
	{
		var success	= 	function(data,textStatus,jqXHR)
		{
			var rtn   = data.split("@")[1].split(",");
			var stat  = rtn[0];
			switch (stat)
			{
				case 'ok':
					succ();
					storage_set("ltalk_password",rtn[1]);
					break;
				case 'failed':
				    var info = rtn[1];
					if (info == "service not available")
					{
						show_tip_window_screen(user_tip[language][info],tip_window_exist_time);
					}
					else
					{
						fail();
					}
					break;
				default:
					break;
			}
		}
		var error   =   function(jqXHR, textStatus, errorThrown)
		{
			if (textStatus != 'abort')
			{
                show_tip_window_screen(user_tip[language]['connect_failed'],tip_window_exist_time);
			}
		}
	}
    xhr = $.ajax({type:'post',crossDomain:true,url:addr,data:build_command_balance(),dataType:"text",timeout:6 * timeout,success:success,error:error});
}

function check_public_card_pwd(cardno,password,succ,fail)
{
	var build_command_balance = function()
	{
		var seqno    = storage_get('ltalk_seqno');
		var command  = 'command=balance&';
		command     += 'seqno='  + seqno + '&';
		command     += 'cardno=' + cardno + '&';
		command     += 'digest=' + md5(seqno + cardno + password);
		updata_seq_no();
		return command;
	};

	if (check_connection() == "no network connection")
	{
		show_tip_window_screen(user_tip[language]['no_network_error'],tip_window_exist_time);
	}
	else
	{
        var success	= 	function(data,textStatus,jqXHR)
					{
						var rtn   = data.split("@")[1].split(",");
						var stat  = rtn[0];
						var ok    = function()
						{
							storage_set('ltalk_ip',rtn[2]);
							service_addr = "http://ltalk.livecom.hk/phone/test/ltalkapp.yaws";
							succ();
						};
						var retry = function()
						{
							storage_set('ltalk_seqno',rtn[1]);
							xhr = $.ajax({type:'post',crossDomain:true,url:connect_addr,data:build_command_balance(),dataType:"text",timeout:6 * timeout,success:success,error:error});
						};
						var failed= function()
						{
							var info = rtn[1];
							if (info == "service not available")
							{
								show_tip_window_screen(user_tip[language][info],tip_window_exist_time);
							}
							else
							{
								fail();
							}
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

/* lib for phonegap local storage: get & set method */
function storage_get(key)
{
	var value = window.localStorage.getItem(key);
	return value;
}

function storage_set(key,value)
{
	window.localStorage.setItem(key, value);
}

/* lib for check connection */
function check_connection()
{

	return true;
    var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = "unknown connection";
    states[Connection.ETHERNET] = "ethernet connection";
    states[Connection.WIFI]     = "wifi connection";
    states[Connection.CELL_2G]  = "cell 2G connection";
    states[Connection.CELL_3G]  = "cell 3G connection";
    states[Connection.CELL_4G]  = "cell 4G connection";
    states[Connection.NONE]     = "no network connection";
	if (networkState == null)
	{
		return "no network connection";
	}
	else
	{
		return states[networkState];
	}


}

/* lib for seq no */
function init_seq_no()
{
	if ( (storage_get('ltalk_seqno') == null) || (storage_get('ltalk_seqno') == "") )
	{
		storage_set('ltalk_seqno','1');
	}
}

function updata_seq_no()
{
	var seqno    = parseInt(storage_get('ltalk_seqno')) + 1;
	var seqnoStr = seqno.toString();
	storage_set('ltalk_seqno',seqnoStr);
}

/* lib for ltalk_history */
function history_updata(new_history_obj)
{
	if (history_is_exist(new_history_obj) == true)
	{
		history_replace(new_history_obj);
	}
	else
	{
		if (ltalk_history.length < 5)
		{
			ltalk_history.push(new_history_obj);
		}
		else
		{
            history_replace_oldest(new_history_obj);
		}
	}
	storage_set('ltalk_history',JSON.stringify(ltalk_history));
}

function history_is_exist(new_history_obj)
{
	for (var i = 0;i < ltalk_history.length;i++) 
	{
		if ((ltalk_history[i]['phone'] == new_history_obj['phone']) && (ltalk_history[i]['name'] == new_history_obj['name']))
		{
			return true;
		}
	}
	return false;
}

function history_replace(new_history_obj)
{
	for (var i = 0;i < ltalk_history.length;i++) 
	{
		if ((ltalk_history[i]['phone'] == new_history_obj['phone']) && (ltalk_history[i]['name'] == new_history_obj['name']))
		{
			ltalk_history[i] = new_history_obj;
		}
	}
}

function history_replace_oldest(new_history_obj)
{
	var index = history_oldest_index();
	ltalk_history[index] = new_history_obj;
}

function history_oldest_index()
{
	var index  = 0;
	var oldest = 0;
	for (var i = 0;i < ltalk_history.length;i++) 
	{
		if (ltalk_history[i]['time'] > oldest)
		{
			index  = i;
			oldest = ltalk_history[i]['time'];
		}
	}
	return index;
}

function init_array(value,len)
{
	var array = new Array();
	for (var i = 0;i < len;i++)
	{
		array.push(value);
	}
	return array;
}

/* get switch function */
function get_switch_function(switch_screen)
{
	if (switch_screen == init_language_screen)
	{
		return function(){};
	}
	if (switch_screen == init_phone_screen)
	{
		return function(){$('#init_phone_ccinput').val(country_code);$('#init_phone_telinput').val('');};
	}
	if (switch_screen == init_card_screen)
	{
		return function(){};
	}
	if (switch_screen == main_screen)
	{
		return function(){$('#main_title').html(text[language]['main_title_text'] + storage_get('ltalk_localphone'));$('#main_name').html(main_select_name);$('#main_input').val(main_select_phone);};
	}
	if (switch_screen == contact_screen)
	{
		return function(){};
	}
	if (switch_screen == setting_screen)
	{
		return function(){$('#setting_localphone_value').html('<< ' + storage_get('ltalk_localphone'));};
	}
	if (switch_screen == phone_screen)
	{
		return function(){$('#phone_old_input').val(storage_get('ltalk_localphone'));$('#phone_new_ccinput').val(country_code);$('#phone_new_telinput').val('');};
	}
    if (switch_screen == monthly_screen)
	{
		return function(){$('#monthly_date_value').html('');$('#monthly_sum_value').html('');$('#monthly_balance_value').html('');$('#monthly_detail').html('');query_monthly();};
	}
	if (switch_screen == balance_screen)
	{
		return function(){$('#balance_no_value').html(show_cardno());$('#balance_value_value').html("");query_balance();};
	}
	if (switch_screen == rate_screen)
	{
		return function(){$('#rate_caller_input').val(storage_get('ltalk_localphone'));$('#rate_called_input').val(rate_select_phone);$('#rate_result_input').val('');};
	}
	if (switch_screen == modify_password_screen)
	{
		return function(){$('#modify_password_no_input').val(show_cardno());$('#modify_password_pwd_input').val('');$('#modify_password_new_pwd_input').val('');$('#modify_password_confirm_pwd_input').val('');
							var user_info = check_user_type(storage_get('ltalk_cardno'));
							if(user_info.type == 'company')
							{
								alert(user_tip[language]['forbidden']);
								exit_screen();
							}};
	}
	if (switch_screen == card_screen)
	{
		return function(){$('#card_no_input').val('');$('#card_pwd_input').val('');};
	}
	if (switch_screen == select_language_screen)
	{
		return function(){};
	}
}

/* rebuild all screen */
function rebuild_all_screen()
{
	var index;

	index = is_obj_in_stack(init_language_screen);
	build_init_language_screen();
	if (index != -1)
	{
		stack[index] = init_language_screen;
	}

	index = is_obj_in_stack(init_phone_screen);
	build_init_phone_screen();
	if (index != -1)
	{
		stack[index] = init_phone_screen;
	}

	index = is_obj_in_stack(init_card_screen);
	build_init_card_screen();
	if (index != -1)
	{
		stack[index] = init_card_screen;
	}

	index = is_obj_in_stack(main_screen);
	build_main_screen();
	if (index != -1)
	{
		stack[index] = main_screen;
	}

	index = is_obj_in_stack(setting_screen);
	build_setting_screen();
	if (index != -1)
	{
		stack[index] = setting_screen;
	}

	index = is_obj_in_stack(phone_screen);
	build_phone_screen();
	if (index != -1)
	{
		stack[index] = phone_screen;
	}

	index = is_obj_in_stack(monthly_screen);
	build_monthly_screen();
	if (index != -1)
	{
		stack[index] = monthly_screen;
	}

	index = is_obj_in_stack(balance_screen);
	build_balance_screen();
	if (index != -1)
	{
		stack[index] = balance_screen;
	}
	
	index = is_obj_in_stack(rate_screen);
	build_rate_screen();
	if (index != -1)
	{
		stack[index] = rate_screen;
	}

	index = is_obj_in_stack(modify_password_screen);
	build_modify_password_screen();
	if (index != -1)
	{
		stack[index] = modify_password_screen;
	}

	index = is_obj_in_stack(card_screen);
	build_card_screen();
	if (index != -1)
	{
		stack[index] = card_screen;
	}

	index = is_obj_in_stack(select_language_screen);
	build_select_language_screen();
	if (index != -1)
	{
		stack[index] = select_language_screen;
	}
}

function is_obj_in_stack(obj)
{
	for (var i = 0;i < stack.length;i++)
	{
        if (obj == stack[i])
        {
        	return i;
        }
	}
	return -1;
}