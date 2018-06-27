jQuery( document ).ready(function($){
    "use strict";
  
	$(document).on('change', '.proitem_qty', function (e) {
      var valuesSelected = [];
      
      var submitButton = $("#AddToCart--product-pack-template");
      var productTable = $(this).attr("data-rel");
      var currentTable = $(".packcolrow."+productTable);
      var total = parseInt(currentTable.attr("data-total"));
      
      $("select","."+productTable).each(function(){
        var valueSelected = parseInt(this.value);
        valuesSelected.push(valueSelected);
                
        var item_title = $(this).parent().parent('.grid__item').find('.show-preview-product').text();
        var item_id = $(this).parent().parent('.grid__item').find('.show-preview-product').attr('data-product_id');
        var item_collection = $(this).parent().parent('.grid__item').attr('data-colid');
        var item_collectionUp = item_collection.toUpperCase();
        
        if($("#pack-item-" + item_id).length == 0) {
        	$( "#AddToCartForm--product-pack-template .line-item-property-"+item_collection ).append( '<input id="pack-item-'+item_id+'" type="hidden" name="properties['+item_title+']" value="'+valueSelected+'">' );
        }else{
        	$("#pack-item-" + item_id).val(valueSelected);
        }
        
      });
      
      var current_total = 0;
      $.each(valuesSelected,function() {
        current_total += this;
      });
      
      currentTable.find(".totalAlertCurrent p").text(current_total);
      if(current_total > total && current_total !== total){
        currentTable.find(".totalAlertCurrent, .totalAlertMax").removeClass("ok");
        currentTable.find(".totalAlertCurrent, .totalAlertMax").addClass("err");
        currentTable.attr("data-status","0");
      }else{
        currentTable.find(".totalAlertCurrent, .totalAlertMax").removeClass("ok err");
        currentTable.attr("data-status","0");
      }
      if(current_total === total){
        currentTable.find(".totalAlertCurrent").addClass("ok");
        currentTable.attr("data-status","1");
      }
      
      submitButton.prop("disabled",false);
      $(".pack-item-table").each(function(){
        var stat = $(this).attr("data-status");
        if(stat == "0"){
          submitButton.prop("disabled",true);
        }
      });
      
	});
  
});