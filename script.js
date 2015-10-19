// Numeric entry & formatting 
$(function(){
	$(".currency,.percentage").keypress(function (e) {
		/* Allow certain keypresses to delete, enter and backspace */
		var key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8, 190, 110];

        if (!($.inArray(e.which, key_codes) >= 0)) {
          e.preventDefault();
        }
	});
	$(".currency").blur(function () {
	    if ($(this).val().length > 0)
	    $(this).val(parseFloat($(this).val()).toFixed(2));

	});
	$(".percentage").blur(function () {
	    if ($(this).val().length > 0)
	    $(this).val(parseFloat($(this).val()).toFixed(1));
	});
});

// Tab on Enter
$(document).keydown(function(e) {

  // Set self as the current item in focus
  var self = $(':focus'),
      // Set the form by the current item in focus
      form = self.parents('form:eq(0)'),
      focusable;

  // Array of Indexable/Tab-able items
  focusable = form.find('input,a,select,button,textarea,div[contenteditable=true]').filter(':visible');

  function enterKey(){
    if (e.which === 13 && !self.is('textarea,div[contenteditable=true]')) { // [Enter] key

      // If not a regular hyperlink/button/textarea
      if ($.inArray(self, focusable) && (!self.is('a,button'))){
        // Then prevent the default [Enter] key behaviour from submitting the form
        e.preventDefault();
      } // Otherwise follow the link/button as by design, or put new line in textarea

      // Focus on the next item (either previous or next depending on shift)
      focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).focus();

      return false;
    }
  }
  // We need to capture the [Shift] key and check the [Enter] key either way.
  if (e.shiftKey) { enterKey() } else { enterKey() }
});

// Calculate values 
function doCalculate(){
	var monthCharges = document.getElementById('monthCharges').value;
	var interestRate = document.getElementById('interestRate').value;
	var SpendingCategoryAmount = document.getElementById('spendingCategoryAmount').value;
	var SpendingCategoryPercentCashBack = document.getElementById('spendingCategoryPercentCashBack').value;
    document.getElementById('monthBalanceCalc').value = '$' + monthCharges;
    var interestCalc = parseFloat(monthCharges * (interestRate / 100) / 12).toFixed(2);
	document.getElementById('interestCalc').value = '$' + interestCalc;
	var cashBackCalc = parseFloat(SpendingCategoryAmount * (SpendingCategoryPercentCashBack / 100)).toFixed(2);
    document.getElementById('cashBackCalc').value = '$' + cashBackCalc;
    document.getElementById('gainLoseCalc').value = '$' + parseFloat(interestCalc - cashBackCalc).toFixed(2);
    document.getElementById('rewardsPaid').value = 'Yes';
}
