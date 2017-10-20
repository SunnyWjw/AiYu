/* screen adjust */
var design_width         = 480;
var design_height        = 750;
var design_font_size     = 28;
var design_inline_height = 60;
var design_border_radius = 15;

var design_monthly_body_height   = 120;
var design_monthly_inline_height = 40;
var design_monthly_font_size     = 16;
var design_monthly_body_space    = 30;
var design_monthly_body_padding  = 10;

var screen_width;
var screen_height;
var font_size;
var line_height;
var border_radius;

var monthly_inline_height;
var monthly_body_height;
var monthly_font_size;
var monthly_body_space;
var monthly_body_padding;

/* screen val */
var tipwindow_screen;
var init_language_screen;
var init_phone_screen;
var init_card_screen;
var main_screen;
var contact_screen;
var setting_screen;
var phone_screen;
var monthly_screen;
var balance_screen;
var rate_screen;
var modify_password_screen;
var card_screen;
var select_language_screen;

/* cur screen */
var cur_screen;
var main_select_name;
var main_select_phone;

var rate_select_phone;

/* tip windows time */
var tip_window_exist_time;

/* language */
var language;
var country_code;
var ltalk_history;
/* screen switch */
var stack = new Array();

/* enter screen */
function enter_screen(new_screen)
{
	stack.push(cur_screen);
	change_screen(new_screen,get_switch_function(new_screen));
}

/* exit screen */
function exit_screen()
{
	if (xhr != '')
	{
		xhr.abort();
	}
	
	if (stack.length == 0)
	{
		navigator.app.exitApp();
	}
	else
	{
		var prev_screen = stack.pop();
		change_screen(prev_screen,get_switch_function(prev_screen));
	}
}

/* on back key down */
function on_back_key_down()
{
	is_enter_contact_screen = false;
	exit_screen();
}

/* show screen */
function change_screen(new_screen,callback) 
{
	$('body').fadeOut('fast',function(){cur_screen.detach();$('body').prepend(new_screen);cur_screen=new_screen;callback();$('body').fadeIn('fast');});
}

/* center */
function center(element,v,h)
{
    return hcenter(vcenter(element,v),h);
}

function hcenter(element,h)
{
    return beside(empty(), beside(element, empty(), (1.0-2*h)/(1.0-h)),h);
}

function vcenter(element,v)
{
    return above(empty(), above(element, empty(), (1.0-2*v)/(1.0-v)),v);
}
/* v seq */
function v_seq(elements,rates)
{
	return in_v_seq(elements,abs2rel(rates));
}

function in_v_seq(elements,rates)
{
    if (elements.length == 1)
    {
        return elements[0];
    }
    return above(elements[0],in_v_seq(elements.slice(1),rates.slice(1)),rates[0]);
}

function above(element1,element2,rate)
{
    var a = function(top,left,width,height)
	{
	    element1(top,left,width,height*rate);
		element2(top + height*rate,left,width,height*(1-rate));
	}
	return a;
}
/* h seq */
function h_seq(elements,rates)
{
    return in_h_seq(elements,abs2rel(rates));
}
function in_h_seq(elements,rates)
{
	if (elements.length == 1)
	{
		return elements[0];
	}
	return beside(elements[0],in_h_seq(elements.slice(1),rates.slice(1)),rates[0]);
}

function beside(element1,element2,rate)
{
	var a = function(top,left,width,height)
	{
		element1(top,left,width*rate,height);
		element2(top,left + width*rate,width*(1-rate),height);
	}
	return a;
}
/* empty */
function empty()
{
    var a = function(top,left,width,height)
    {
    }
    return a;
}
/* element */
function element(descript,id)
{
	var a = function(top,left,width,height)
	{
        var selector = '#' + id;
        $('body').append(descript);
        $(selector).css({position:"absolute",top:top+'px',left:left+'px'});
        $(selector).width(width   + 'px');
        $(selector).height(height + 'px');
	}
	return a;
}

/* trans rates */
function abs2rel(rates)
{
    var sum = 0;
	var new_rates = new Array();
    for (var i = 0;i < rates.length;i++)
	{
	    sum += rates[i];
	}
	for (var i = 0;i < rates.length;i++)
	{
	    new_rates.push(rates[i]/sum);
		sum -= rates[i];
	}
	return new_rates;
}

/* hide over flow */
function hide_over_flow(str,num)
{
	var calc_ascii_len = function(str)
	{
		var len = 0;
		for (var i = 0;i < str.length;i++)
		{
			if (str.charCodeAt(i) > 127)
			{
				len += 2;
			}
			else
			{
				len += 1;
			}
		}
		return len;

	}

	var back_one_char = function(str)
	{
		if (str.charCodeAt(str.length - 1) > 127)
		{
			return [str.substr(0,str.length - 1),2];
		}
		else
		{
			return [str.substr(0,str.length - 1),1];
		}
	}

	var back_chars = function(str,num)
	{
		var rtn = back_one_char(str);
		if (rtn[1] > num)
		{
			return rtn[0];
		}
		else
		{
			return back_chars(rtn[0],num - rtn[1]);
		}
	}

	var ascii_len = calc_ascii_len(str);

	if (ascii_len > num)
	{
		return back_chars(str,ascii_len - num) + '...';
	}
	else
	{
		return str;
	}
}