$(".sum").on("change", function (event) {
  //console.log('Hello')
  $(event.target).closest(".sum").find("select").change(sum);
  $(event.target).closest(".sum").find("input").change(sum);

  function sum() {
    
    let result = 0;
    //data
    let pass = $(event.target).closest(".sum").find("#passengers").find(":selected").data("pass");
    let val = document.querySelector('input[name="rate"]:checked').value;
    let from = $(event.target).closest(".sum").find("#from").find(":selected").data("from");
    let to = $(event.target).closest(".sum").find("#to").find(":selected").data("to");
    let date_one_way = document.getElementById("one_way_calendar_from").value;
    let date_return_way = document.getElementById("two_ways_calendar_from").value;
   // console.log(from, to)
    
    $(event.target) .closest(".sum").find("select").each(function () {
        let value = 0;
        if (typeof $(this).val() == "object") {
          $.each($(this).val(), function (index, val) {
            value += val * 1;
          });
        } else {
          value = $(this).val();
        }
        result += value * 1;
        result1 = result * pass * val;
      });
    // console.log(result1)
    $(event.target).closest(".sum").find(".itog").val("£" + result1);

    
   

    

    //атрибуты

    $(event.target).closest(".sum").find(".add_item").attr("data-price", result1); //setter
    $(event.target).closest(".sum").find(".add_item").attr("data-pass", pass);
    $(event.target).closest(".sum").find(".add_item").attr("data-from", from);
    $(event.target).closest(".sum").find(".add_item").attr("data-to", to);
    $(event.target).closest(".sum").find(".add_item").attr("data-date-one-way", date_one_way);
    $(event.target).closest(".sum").find(".add_item").attr("data-date-return-way", date_return_way);
    $(event.target).closest(".sum").find(".add_item").attr("data-return", val);
  


    
    /* var id = $(event.target).closest(".sum").find(".add_item").data("id");
      console.log(id)*/
    // var idoption = $(event.target).closest(".sum").find(':selected').data('id');
    //console.log(idoption)
    //  var idtotal = `${result}` + `${idoption}`;
    //console.log(idtotal)
    //  $(event.target).closest(".sum").find(".add_item").attr("data-id", (idtotal));

    /*function item() {
    for (key in getItem) {
  if (getItem.hasOwnProperty(key)) {
  
   //getItem[key].id += 100;
   localStorage.setItem('jqcart', JSON.stringify(getItem));
  }}
  }*/
  }
});


