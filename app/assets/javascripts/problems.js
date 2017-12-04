var AdditionalHidden = {

  setup: function() {
    $('.additional').each(function() {
      var problem = $(this);
      
      function toggle_behavior(button_name, trigger){
        var button_id = trigger.currentTarget.getAttribute('id')
        var question_num = button_id.charAt(button_id.length - 1)
	    $.ajax({
  				type: "GET",
  				async: false,
  				context: this,
  				dataType: 'json',
  				url: '/problems/'+ question_num + '/minorupdate',
  				success: function (source) {
  	        problem.find("textarea").val(source['ruql_source']);
				  }
			  });
        problem.find(button_name).toggle();
      }

      function hide_behavior(button_name){
        problem.find(button_name).hide();
      }

      function show_behavior(button_name){
        problem.find(button_name).show();
      }

      function event_handling(select_button, hide_button_one, hide_button_two, toggle_button){
        problem.find(select_button).click(function(trigger) {
        toggle_behavior(toggle_button, trigger);
        hide_behavior(hide_button_one);
        hide_behavior(hide_button_two);
        return false;
      });}

      function toggle_checkbox(toggle_button, arg1, arg2){
      problem.find(toggle_button).click(function() {
        if (toggle_button === '.hide_checkbox'){
          show_behavior(arg1);
        }
        else if (toggle_button === '.show_checkbox'){
          hide_behavior(arg1);
        } 
        show_behavior(arg2);
        $(this).hide();
        return false;
        });
      }

      function toggle_collection(click_toggle, operate_toggle, show_toggle){

          problem.find(click_toggle).click(function(){
          problem.find(operate_toggle).each(function(){
            if (operate_toggle === '.collection-button'){
              $(this).show();
            }
            else if(click_toggle === '.collection-button.btn-default'){
              $(this).hide();
            }
          })
          $(this).hide();
          show_behavior(show_toggle);
          return false;
        })
      }

     problem.find('.btn-update').click(function() {
          console.log("Received");
          var pop = problem.find('.confirm-edit');
          pop.toggle();
          pop.find(".no-edit").on('click', function() {
              pop.hide();
          });
          return false;
      });


      event_handling('.supersede_button', '.history_list', '.minor_form', '.supersede_form');
      event_handling('.history_list', '.supersede_form', '.minor_form', '.history_list');
      event_handling('.minorupdate_button', '.supersede_form', '.history_list', '.minor_form');
      toggle_checkbox('.hide_checkbox', '.edit-Collections', '.show_checkbox')
      toggle_checkbox('.show_checkbox', '.edit-Collections', '.hide_checkbox')
      toggle_collection('button.collections-more-toggle', '.collection-button', '.collections-less-toggle')
      toggle_collection('button.collections-less-toggle', '.collection-button.btn-default', '.collections-more-toggle')


      var hide_collections_button = problem.find('button.collections-less-toggle')
      hide_collections_button.click(function(){
        toggle_behavior('.collections-button btn');
        return false;
      })

    });
  }
};
$(AdditionalHidden.setup);

var Supersession = {
    setup: function() {
        $('.supersede_form form').submit(problemUpdateAjax);
    }
};
$(Supersession.setup);

var MinorUpdate = {
    setup: function() {
        $('.minor_form form').submit(problemUpdateAjax);
    }
};
$(MinorUpdate.setup);

function problemUpdateAjax(e) {
    $.ajax({
        context: this,
        url: $(this).attr('action'),
        type: 'POST',
        data: $(this).serialize(),
        success: function(data, textStatus, jqXHR) {
            if (data.error === null)
                window.location.reload();
            else
                $(this).find('.message').text(data.error);
        }
    });
    return false;
}
