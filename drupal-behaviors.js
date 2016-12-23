/**
 * Emulator Drupal.behaviors.
 *
 * Example:
 * Drupal.behaviors.example = {
 *   attach: function(context) {
 *     console.log(context);
 *   }
 * }
 */
;(function($) {
  'use strict';

  if (!$ || window['Drupal']) {
    return;
  }

  var $document = $(document),
      _Drupal = Object.create(null);

  _Drupal.settings = Object.create(null);
  _Drupal.behaviors = Object.create(null);

  var attach = function($context, settings) {
    for (var behavior_name in _Drupal.behaviors) {
      if (
        _Drupal.behaviors[behavior_name] &&
        _Drupal.behaviors[behavior_name]['attach']
      ) {
        try {
          _Drupal.behaviors[behavior_name]['attach'].call(_Drupal, $context, _Drupal.settings);
        }
        catch (e) {
          console.error(e);
        }
      }
    }
  }

  $(function() {
    attach($document);
  });

  $document.ajaxSuccess(function(event, request, settings) {
    attach($(request.responseText));
  });

  window['Drupal'] = _Drupal;
})(jQuery);
