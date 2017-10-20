function build_tip_window_screen()
{
	var tip_window = element('<div id="tip_window"></div>','tip_window');
	
	v_seq([empty(),h_seq([empty(),tip_window,empty()],[0.08,0.84,0.08]),empty()],[0.08,0.16,0.76])(0,0,screen_width,screen_height);
	
	$('#tip_window').css({'text-align':'center','background-color':'black','color':'white','font-family':'arial','font-size':font_size,'font-weight':'bold','line-height':line_height,'border-radius':border_radius,'border':'1px solid #fcd366','padding':'2px','z-index':'1000','display':'none'});
    
    tipwindow_screen = $('#tip_window').detach();
}

function show_tip_window_screen(text,time)
{
	$('body').prepend(tipwindow_screen);
	tipwindow_screen.html(text);
	tipwindow_screen.fadeIn();
	tipwindow_screen.fadeOut(time);
	setTimeout(function(){tipwindow_screen.detach()},time);
}