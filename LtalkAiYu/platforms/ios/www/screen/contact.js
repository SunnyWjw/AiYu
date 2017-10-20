var is_enter_contact_screen = false;

var get_contact_name = 
{
	"simplified_chinese":function(contact_name)
	{
		var name = "";
	    if (("familyName" in contact_name) && (contact_name.familyName != null) && (contact_name.familyName != ""))
		{
			name += contact_name.familyName + " ";
		}
		if (("middleName" in contact_name) && (contact_name.middleName != null) && (contact_name.middleName != ""))
		{
			name += contact_name.middleName;
		}
		if (("givenName" in contact_name) && (contact_name.givenName != null) && (contact_name.givenName != ""))
		{
			name += contact_name.givenName;
		}
		if (name != "")
		{
			return name;
		}
		else
		{
			return contact_name.formatted;
		}
	},
	"english":function(contact_name)
	{
		var name = "";
		if (("middleName" in contact_name) && (contact_name.middleName != null) && (contact_name.middleName != ""))
		{
			name += contact_name.middleName;
		}
		if (("givenName" in contact_name) && (contact_name.givenName != null) && (contact_name.givenName != ""))
		{
			name += contact_name.givenName  + " ";
		}
	    if (("familyName" in contact_name) && (contact_name.familyName != null) && (contact_name.familyName != ""))
		{
			name += contact_name.familyName;
		}
		if (name != "")
		{
			return name;
		}
		else
		{
			return contact_name.formatted;
		}
	}
}

/* init contact book */
function init_contact_book()
{
	var fields       = ["name", "phoneNumbers"];
	var options      = new ContactFindOptions();
	options.filter   = "";
	options.multiple = true;
	navigator.contacts.find(fields, on_success, on_error, options);
}

function on_success(contacts) 
{
	var contactbook = get_contact_book(contacts);
	var dict = build_contact_dict(contactbook);
	build_contact_frame(dict);
	build_contact_base();
	$(".contact").wrapAll('<div id="contact"></div>');
	contact_screen = $('#contact').detach();
	enter_screen(contact_screen);
}

function on_error(contactError) 
{
	show_tip_window_screen(user_tip[language]['contact_load_error'],tip_window_exist_time);
}

/* about getContactBookContent */
function hanzi_to_pinyin(name)
{
	var namepinyin = "";
	for (var i = 0; i < name.length; i++) 
	{
		if (name[i] in pinyinlib)
		{
			namepinyin += pinyinlib[name[i]];
		}
		else
		{
			namepinyin += "u";
		}
	}
	return namepinyin;
}

function sort_contact_book(obj1,obj2)
{
	var name1 = obj1["namepinyin"];
	var name2 = obj2["namepinyin"];
	if (name1 < name2)
	{
		return -1;
	}
	else if (name1 == name2)
	{
		return 0;
	}
	else
	{
		return 1;
	}
}

function get_contact_book(contacts)
{
	var name = "";
	var contactbook = new Array();
	try
	{
		for (var i = 0; i < contacts.length; i++) 
		{
			var contact = contacts[i];

			if ((contact.name == null) ||        /* for android */
				(contact.name.formatted == null) /* for ios */)
			{
				continue;
			}

			name = get_contact_name[language](contact.name);

			if (contact.phoneNumbers == null)
			{
				continue;
			}

			for (var j = 0; j < contact.phoneNumbers.length; j++) 
			{
				if (contact.phoneNumbers[j] != null)
				{
					var namepinyin = hanzi_to_pinyin(name);
					var phone  = contact.phoneNumbers[j].value;
					var obj    = {"name":name,"namepinyin":namepinyin,"phone":phone};
					contactbook.push(obj);
				}
			}
		}
	}
	catch(err)
	{
		alert(err);
	}
	contactbook.sort(sort_contact_book);
	return contactbook;
}

function build_contact_dict(contactbook)
{
	var dict = {};
	for (var i = 0; i < contactbook.length; i++)
	{
		var first_letter = contactbook[i]["namepinyin"][0];

        if ((('a' <= first_letter) && (first_letter <= 'z')) || (('A' <= first_letter) && (first_letter <= 'Z')))
        {
        	if (undefined == dict[first_letter])
			{
				var array = new Array();
				array[0]  = contactbook[i];
				dict[first_letter] = array;
			}
			else
			{
				dict[first_letter].push(contactbook[i]);
			}
        }
	}
	return dict;
}

function build_contact_screen()
{
	init_contact_book();
	/*
	var dict = {"d":[{"name":"denghuidenghuidenghuidenghui","phone":"123456123456123456123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"}],"e":[{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"}]};
	build_contact_frame(dict);
	build_contact_base();
	$(".contact").wrapAll('<div id="contact"></div>');
	contact_screen = $('#contact').detach();
	enter_screen(contact_screen);*/
}

function build_contact_base()
{
	var contact_back = center(element('<img id="contact_back"></img>','contact_back'),0.1667,0.0909);
    
	v_seq([beside(empty(),contact_back,0.7708),empty()],[0.08,0.92])(0,0,screen_width,screen_height);
	
	var contact_back_img = language + '/contact_back.png';
	

	$('#contact_back').css({'z-index':'1'});
	$('#contact_back').attr({'src':contact_back_img,'onclick':'is_enter_contact_screen=false;exit_screen();'});
	$('#contact_back').addClass('contact');

	/************************************************************************************************/

	var contact_title = element('<div id="contact_title"></div>','contact_title');

    v_seq([contact_title,empty()],[0.08,0.92])(0,0,screen_width,screen_height);

    var title_background_img = 'url(' + language + '/contact_title_background.png' + ')';

	$('#contact_title').css({'background-image':title_background_img,'color':'gray','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height});
	$('#contact_title').html(text[language]['contact_title_text']);
	$('#contact_title').addClass('contact');
}

/* build contact frame  */
function build_contact_frame(dict)
{
	var key;
	var str = "";

	for (key in dict)
	{
		str += '<div ';
		str += 'id="' + key.toUpperCase() + '" ';
		str += 'onclick="show_char(' + "'" + key + "')" + '" ';
		str += 'style="margin:0px;padding:0px;width:100%;height:' + line_height + ';';
		str += 'line-height:' + line_height + ';'
		str += 'background-image:url(' + language + "/contact_char_backgroud.png" + ')">';
		str += '<div style="width:5%;height:' + line_height + ';';
		str += 'float:left;margin:0px;padding:0px"></div>';
		str += '<div style="font-size:' + font_size;
		str += ';font-weight:bold;width:95%;height:' + line_height + ';';
		str += 'line-height:' + line_height + ';';
		str += 'float:left;text-align:left;margin:0px;padding:0px;font-family:arial">';
		str += key.toUpperCase() + ' (' + dict[key].length + ')';
		str += '</div>';
		str += '</div>';
		str += '<div id="' + key + '" style="margin:0px;padding:0px;width:100%;display:none">';
		for (var i = 0; i < dict[key].length; i++)
		{
			if (i != dict[key].length - 1)
			{
				str += '<div style="border-bottom:solid thin;width:100%;height:' + line_height + ';';
				str += 'line-height:' + line_height + '" ';
				str += 'onclick="contact_selected(' + "'" + dict[key][i]["name"] + "','" + cc_phone(format_phone(dict[key][i]["phone"]),country_code) + "'" + ')">';
				str += '<div style="width:6%;height:' + line_height + ';';
				str += 'float:left"></div>';
				str += '<div style="font-family:arial;font-size:' + font_size;
				str += ';width:40%;height:' + line_height + ';';
				str += 'float:left;';
				str += 'text-align:left">' + hide_over_flow(dict[key][i]["name"],13) + '</div>';
				str += '<div style="font-family:arial;word-break: break-all;line-height: 28px;font-size:' + font_size;
				str += ';width:50%;height:' + line_height + ';';
				str += 'text-align: right;display: table-cell; vertical-align: middle;'
				str += 'padding-right:12px;">' + dict[key][i]["phone"] + '</div>';
				str += '</div>';
			}
			else
			{
				str += '<div style="width:100%;height:' + line_height + ';';
				str += 'line-height:' + line_height + '" ';
				str += 'onclick="contact_selected(' + "'" + dict[key][i]["name"] + "','" + cc_phone(format_phone(dict[key][i]["phone"]),country_code) + "'" + ')">';
				str += '<div style="width:6%;height:' + line_height + ';';
				str += 'float:left"></div>';
				str += '<div style="font-family:arial;font-size:' + font_size;
				str += ';width:40%;height:' + line_height + ';';
				str += 'float:left;';
				str += 'text-align:left">' + hide_over_flow(dict[key][i]["name"],13) + '</div>';
				str += '<div style="font-family:arial;font-size:' + font_size;
				str += ';width:50%;height:' + line_height + ';';
				str += 'text-align: right;display: table-cell; vertical-align: middle;'
				str += 'padding-right:12px;">' + dict[key][i]["phone"] + '</div>';
				str += '</div>';
			}
		}
		str += '</div>';
	}

	str = '<div id="contact_content">' + str + '</div>';

	var contact_content = element(str,'contact_content');

    v_seq([empty(),contact_content],[0.08,0.92])(0,0,screen_width,screen_height);

    $('#contact_content').addClass('contact');
	
	/* show first contact */
	for (key in dict)
	{
		show_char(key);
		break;
	}
}

function enter_contact()
{
	if (is_enter_contact_screen  == false)
	{
		is_enter_contact_screen = true;
        build_contact_screen();
	} 
}

function contact_selected(name,phone)
{
	var prev_screen = stack.pop();

    if (main_screen == prev_screen)
    {
        main_select_name   = name;
        main_select_phone  = phone;
    }
    if (rate_screen == prev_screen)
    {
        rate_select_phone = phone;
    }

    is_enter_contact_screen = false;
    stack.push(prev_screen);
	exit_screen();
}

function show_char(id)
{
	var fun = 'hide_char(' + "'" + id + "'" + ')';
	var background_img = 'url(' + language + '/contact_char_selected.png' + ')';
    $('#' + id.toUpperCase()).css({'background-image':background_img});
    $('#' + id.toUpperCase()).attr('onclick',fun);
    $('#' + id).slideToggle('fast');
}

function hide_char(id)
{
	var fun = 'show_char(' + "'" + id + "'" + ')';
	var background_img = 'url(' + language + '/contact_char_backgroud.png' + ')';
	$('#' + id.toUpperCase()).css({'background-image':background_img});
    $('#' + id.toUpperCase()).attr('onclick',fun);
	$('#' + id).slideToggle('fast');
}

function test()
{
	var dict = {"d":[{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456123456123456123456123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"}],"e":[{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"},{"name":"denghui","phone":"123456"}]};
	build_contact_frame(dict);
}