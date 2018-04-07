$(document).ready(() => {
  var layouts = {};
  var keymap = [];
  var layer = 0;
  var job_id = '';
  var hex_stream = '';
  var hex_filename = '';
  var keyboards = [];
  var status = '';
  var keyboard = '';
  var layout = '';
  var backend_baseurl = 'https://compile.clueboard.co';
  var backend_keyboards_url = `${backend_baseurl}/v1/keyboards`;
  var backend_compile_url = `${backend_baseurl}/v1/compile`;
  var backend_readme_url_template = _.template(`${backend_keyboards_url}/<%= keyboard %>/readme`);
  var defaults = {
    MAX_X: 775,
    KEY_WIDTH: 40,
    KEY_HEIGHT: 40,
    SWAP_KEY_WIDTH: 30,
    SWAP_KEY_HEIGHT: 30,
    KEY_X_SPACING: 45,
    KEY_Y_SPACING: 45,
    SCALE: 1
  };

  var config = {};

  var $keyboard = $('#keyboard');
  var $layout = $('#layout');
  var $layer = $('.layer');
  var $compile = $('#compile');
  var $hex = $('#hex');
  var $source = $('#source');
  var $export = $('#export');
  var $import = $('#import');
  var $loadDefault = $('#load-default');
  var $fileImport = $('#fileImport');
  var $status = $('#status');
  var $visualKeymap = $('#visual-keymap');

  setSelectWidth($keyboard);
  setSelectWidth($layout);

  var lookupKeycode = _.memoize(lookupKeycode); // cache lookups
  var viewReadme = _.debounce(viewReadme, 500);

  var keycodes = getKeycodes();
  $(window).on('hashchange', urlRouteChanged);

  $.each(keycodes, createKeyCodeUI);

  var $keycodes = $('.keycode'); // wait until they are created
  $keycodes.each(makeDraggable);

  // click to assign keys to keymap
  $visualKeymap.click(selectKeymapKey);
  $('#keycodes').click(assignKeycodeToSelectedKey);

  var promise = $.get(backend_keyboards_url, createKeyboardDropdown);

  $keyboard.change(switchKeyboardLayout);

  $layout.change(changeLayout);

  $layer.click(changeLayer);

  $compile.click(compileLayout);

  $hex.click(downloadHexFile);

  $source.click(downloadSourceBundle);

  var offsetTop = $('.split-content').offset().top;
  var height = $('.split-content').height();

  $(document).on('scroll', scrollHandler);

  // Export function that outputs a JSON file with the API payload format
  $export.click(exportJSON);

  //Uses a button to activate the hidden file input
  $import.click(function() {
    $fileImport.click();
  });

  $loadDefault.click(loadDefault);

  //Import function that takes in a JSON file reads it and loads the keyboard, layout and keymap data
  $fileImport.change(importJSON);

  // explicitly export functions to global namespace
  window.setSelectWidth = setSelectWidth;

  promise.then(() => {
    // wait until keyboard list has loaded before checking url hash
    urlRouteChanged();
  });

  var keypressListener = new window.keypress.Listener();
  keypressListener.simple_combo('esc', function() {
    getSelectedKey().removeClass('keycode-select');
  });

  return;

  ////////////////////////////////////////
  //
  // Implementation goes here
  //
  ////////////////////////////////////////
  function viewReadme() {
    $.get(backend_readme_url_template({keyboard: keyboard})).then((result) => {
      $status.append(_.escape(result));
    });
  }

  function resetConfig(overrides) {
    return _.extend(config, defaults, overrides);
  }

  function assignKeycodeToSelectedKey(evt) {
    var _keycode = $(evt.target).data('code');
    if (_keycode === undefined) {
      return;
    }

    var meta = lookupKeycode(_keycode);
    if (meta === undefined) {
      return;
    }

    var $key = getSelectedKey();
    var _index = $key.data('index');
    if ($key === undefined || _index === undefined || !_.isNumber(_index)) {
      return; // not a key
    }

    if ($key.hasClass('key-contents')) {
      keymap[layer][_index].contents = newKey(meta, _keycode.data('code'));
    } else {
      var keycode = assign_key(layer, _index, meta.name, _keycode, meta.type);
      if (keycode.type === 'layer') {
        keymap[layer][_index].layer = 0;
      }
    }
    $key.removeClass('keycode-select'); // clear selection once assigned
    render_key(layer, _index);
  }

  function getSelectedKey() {
    return $visualKeymap.find('.key.keycode-select');
  }

  function selectKeymapKey(evt) {
    var $target = $(evt.target);
    getSelectedKey().removeClass('keycode-select');
    if ($target.hasClass('key')) {
      $target.addClass('keycode-select');
    }
  }

  function loadDefault() {
    // hard-coding planck as the only default right now
    if (keyboard.includes('planck')) {
      $.get('keymaps/planck_default.json', function(data) {
        console.log(data);
        reset_keymap();

        keyboard = data.keyboard;
        $keyboard.val(keyboard);
        setSelectWidth($keyboard);
        load_layouts($keyboard.val());

        layout = data.layout;
        $layout.val(layout);
        setSelectWidth($layout);

        $('#keymap-name').val(data.keymap);

        load_converted_keymap(data.layers);

        render_layout($layout.val());
      });
    } else {
      $status.append(
        `\n* Sorry there is no default for the ${$keyboard.val()} keyboard... yet!`
      );
    }
  }

  function importJSON() {
    var files = $fileImport[0].files;

    var reader = new FileReader();

    reader.onload = function layoutLoaded(/*e*/) {
      var jsonText = reader.result;

      var data = JSON.parse(jsonText);

      reset_keymap();

      keyboard = data.keyboard;
      $keyboard.val(keyboard);
      setSelectWidth($keyboard);
      load_layouts($keyboard.val());

      layout = data.layout;
      $('#layout').val(layout);
      setSelectWidth($('#layout'));

      $('#keymap-name').val(data.keymap);

      load_converted_keymap(data.layers);

      render_layout($('#layout').val());
    };

    reader.readAsText(files[0]);
  }

  function exportJSON() {
    //Squashes the keymaps to the api payload format, might look into making this a function
    var layers = [];
    $.each(keymap, function(k /*, d*/) {
      layers[k] = [];
      $.each(keymap[k], function(l, e) {
        var keycode = e.code;
        if (e.code.indexOf('(kc)') !== -1) {
          if (e.contents) {
            keycode = keycode.replace('kc', e.contents.code);
          } else {
            keycode = keycode.replace('kc', 'KC_NO');
          }
        }
        if (e.code.indexOf('(layer)') !== -1) {
          keycode = keycode.replace('layer', e.layer);
        }
        if (e.code.indexOf('text') !== -1) {
          keycode = e.text;
        }
        layers[k][l] = keycode;
      });
    });

    //API payload format
    var data = {
      keyboard: $keyboard.val(),
      keymap: $('#keymap-name').val(),
      layout: $layout.val(),
      layers: layers
    };

    download($('#keymap-name').val() + '.json', JSON.stringify(data));
  }
  function scrollHandler() {
    if (offsetTop < $(document).scrollTop()) {
      $('.split-content').addClass('fixed');
      $('#keycodes-section').css('margin-top', height + 'px');
    } else {
      $('#keycodes-section').css('margin-top', '0px');
      $('.split-content').removeClass('fixed');
    }
  }

  function downloadSourceBundle() {
    $.get(backend_compile_url + '/' + job_id + '/source', function(data) {
      console.log(data);
    });
  }
  function downloadHexFile() {
    // $.get(backend_compile_url + "/" + job_id + "/hex", function(data) {
    //   console.log(data);
    // });
    download(hex_filename, hex_stream);
  }

  function compileLayout() {
    $compile.attr('disabled', 'disabled');
    var layers = [];
    $.each(keymap, function(k /*, d*/) {
      layers[k] = [];
      $.each(keymap[k], function(l, e) {
        var keycode = e.code;
        if (e.code.indexOf('(kc)') !== -1) {
          if (e.contents) {
            keycode = keycode.replace('kc', e.contents.code);
          } else {
            keycode = keycode.replace('kc', 'KC_NO');
          }
        }
        if (e.code.indexOf('(layer)') !== -1) {
          keycode = keycode.replace('layer', e.layer);
        }
        if (e.code.indexOf('text') !== -1) {
          keycode = e.text;
        }
        layers[k][l] = keycode;
      });
    });
    var data = {
      keyboard: $keyboard.val(),
      keymap: $('#keymap-name').val(),
      layout: $layout.val(),
      layers: layers
    };
    console.log(JSON.stringify(data));
    if ($status.html() !== '') {
      $status.append('\n');
    }
    $status.append(
      '* Sending ' +
        $keyboard.val() +
        ':' +
        $('#keymap-name').val() +
        ' with ' +
        $layout.val()
    );
    $.ajax({
      type: 'POST',
      url: backend_compile_url,
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function(d) {
        if (d.enqueued) {
          $status.append('\n* Received job_id: ' + d.job_id);
          job_id = d.job_id;
          check_status();
        }
      }
    });
  }

  function changeLayer(e) {
    $('.layer.active').removeClass('active');
    $(e.target).addClass('active');
    layer = e.target.innerHTML;
    render_layout($('#layout').val());
  }

  function changeLayout() {
    if (
      confirm(
        'This will clear your keymap - are you sure you want to change your layout?'
      )
    ) {
      window.location.hash = '#/' + $keyboard.val() + '/' + $layout.val();
    } else {
      $layout.val(layout_from_hash());
    }
  }

  function switchKeyboardLayout() {
    // reset_keymap();
    window.location.hash = '#/' + $keyboard.val() + '/' + $layout.val();
    $status.html(''); // clear the DOM not the value otherwise weird things happen
    // load_layouts($keyboard).val());
  }

  function createKeyboardDropdown(data) {
    keyboards = data;
    $.each(data, function(k, d) {
      $keyboard.append(
        $('<option>', {
          value: d,
          text: d
        })
      );
    });
    if (keyboard_from_hash()) {
      $keyboard.val(keyboard_from_hash());
    }
    setSelectWidth($keyboard);
    load_layouts($keyboard.val());
  }

  function makeDraggable(k, d) {
    $(d).draggable({
      zIndex: 100,
      revert: true,
      revertDuration: 100,
      distance: 5,
      drag: function() {
        var $d = $(d);
        if ($d.hasClass('key')) {
          // reduce size of dragged key to indicate src
          var w = $d.data('w');
          var h = $d.data('h');
          $d.css({
            width: `${config.SWAP_KEY_WIDTH * w}px`,
            height: `${config.SWAP_KEY_HEIGHT * h}px`
          });
        }
        $d.draggable('option', 'revertDuration', 100);
      },
      start: function(event, ui) {
        // center the key under the cursor - stackoverflow
        $(this).draggable('instance').offset.click = {
          left: Math.floor(ui.helper.width() / 2),
          top: Math.floor(ui.helper.height() / 2)
        };
      },
      stop: function() {
        var $d = $(d);
        if ($d.hasClass('key')) {
          var w = $d.data('w');
          var h = $d.data('h');
          var dims = calcKeyKeymapDims(w, h);
          $d.css({
            width: `${dims.w}px`,
            height: `${dims.h}px`
          });
        }
      }
    });
  }

  function createKeyCodeUI(k, d) {
    if (d.code) {
      var keycode = $('<div>', {
        class: 'keycode keycode-' + d.width + ' keycode-' + d.type,
        'data-code': d.code,
        'data-type': d.type,
        html: d.name,
        title: d.title
      });
      $('#keycodes').append(keycode);
    } else {
      $('#keycodes').append(
        $('<div>', {
          class: 'space space-' + d.width,
          html: d.label
        })
      );
    }
  }

  function urlRouteChanged() {
    console.log(window.location.hash);

    // reset keyboard config
    config = resetConfig();

    if (keyboard_from_hash() && keyboard_from_hash() !== keyboard) {
      reset_keymap();
      keyboard = keyboard_from_hash();
      $keyboard.val(keyboard);
      setSelectWidth($keyboard);
      load_layouts($keyboard.val());
    } else if (layout_from_hash() && layout_from_hash() !== layout) {
      reset_keymap();
      layout = layout_from_hash();
      $layout.val(layout);
      setSelectWidth($layout);
      render_layout($layout.val());
    }
    viewReadme();
  }

  function load_layouts(_keyboard) {
    $.get(backend_keyboards_url + '/' + _keyboard, function(data) {
      if (data.keyboards[_keyboard]) {
        $layout.find('option').remove();
        layouts = {};
        $.each(data.keyboards[_keyboard].layouts, function(k, d) {
          $layout.append(
            $('<option>', {
              value: k,
              text: k
            })
          );
          if (d.layout) {
            layouts[k] = d.layout;
          } else {
            layouts[k] = d;
          }
        });

        if (layout_from_hash()) {
          $layout.val(layout_from_hash());
        }
        window.location.hash = '#/' + $keyboard.val() + '/' + $layout.val();
        setSelectWidth($('#layout'));
        render_layout($('#layout').val());
      }
    });
  }

  function calcKeyKeymapDims(w, h) {
    return {
      w: w * config.KEY_X_SPACING - (config.KEY_X_SPACING - config.KEY_WIDTH),
      h: h * config.KEY_Y_SPACING - (config.KEY_Y_SPACING - config.KEY_HEIGHT)
    };
  }

  function calcKeyKeymapPos(x, y) {
    return {
      x: x * config.KEY_X_SPACING,
      y: y * config.KEY_Y_SPACING
    };
  }

  function render_layout(_layout) {
    $visualKeymap.find('*').remove();
    if (!keymap[layer]) {
      keymap[layer] = {};
    }

    var max = { x: 0, y: 0 };

    $.each(layouts[_layout], function(k, d) {
      // pre-calc size
      if (!d.w) {
        d.w = 1;
      }
      if (!d.h) {
        d.h = 1;
      }
      var pos = calcKeyKeymapPos(d.x, d.y);
      var dims = calcKeyKeymapDims(d.w, d.h);
      max.x = Math.max(max.x, pos.x + dims.w);
      max.y = Math.max(max.y, pos.y + dims.h);
    });

    if (max.x > defaults.MAX_X) {
      config.SCALE = defaults.MAX_X / max.x;
      config.KEY_WIDTH *= config.SCALE;
      config.KEY_HEIGHT *= config.SCALE;
      config.SWAP_KEY_HEIGHT *= config.SCALE;
      config.SWAP_KEY_WIDTH *= config.SCALE;
      config.KEY_X_SPACING *= config.SCALE;
      config.KEY_Y_SPACING *= config.SCALE;
      max.x *= config.SCALE;
      max.y *= config.SCALE;
    }

    $.each(layouts[_layout], function(k, d) {
      if (!d.w) {
        d.w = 1;
      }
      if (!d.h) {
        d.h = 1;
      }
      var pos = calcKeyKeymapPos(d.x, d.y);
      var dims = calcKeyKeymapDims(d.w, d.h);
      var key = $('<div>', {
        class: 'key disabled',
        style: [
          'left: ',
          pos.x,
          'px; top: ',
          pos.y,
          'px; width: ',
          dims.w,
          'px; height: ',
          dims.h,
          'px'
        ].join(''),
        id: 'key-' + k,
        'data-index': k,
        'data-type': 'key',
        'data-w': d.w,
        'data-h': d.h
      });
      $(key).droppable(droppable_config(key, k));
      $visualKeymap.append(key);
      render_key(layer, k);
    });
    $visualKeymap.css({
      width: max.x + 'px',
      height: max.y + 'px'
    });

    $('.key').each(makeDraggable);
  }

  function check_status() {
    $.get(backend_compile_url + '/' + job_id, function(data) {
      console.log(data);
      if (data.status === 'finished') {
        $status.append(
          '\n* Finished:\n' + data.result.output.replace(/\[.*m/gi, '')
        );
        hex_stream = data.result.firmware;
        hex_filename = data.result.firmware_filename;
        $compile.removeAttr('disabled');
        $hex.removeAttr('disabled');
        $('#toolbox').removeAttr('disabled');
        $source.removeAttr('disabled');
      } else if (data.status === 'queued') {
        if (status !== 'queued') {
          $status.append('\n* Queueing');
        } else {
          $status.append(' .');
        }
        setTimeout(check_status, 500);
      } else if (data.status === 'running') {
        if (status !== 'running') {
          $status.append('\n* Running');
        } else {
          $status.append(' .');
        }
        setTimeout(check_status, 500);
      } else if (data.status === 'unknown') {
        $compile.removeAttr('disabled');
      } else if (data.status === 'failed') {
        $status.append('\n* Failed');
        if (data.result) {
          $status.append('\n* Error:\n' + data.result.output);
        }
        $compile.removeAttr('disabled');
      }
      $status.scrollTop($status[0].scrollHeight);
      status = data.status;
    });
  }

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function lookupKeycode(searchTerm) {
    var found = keycodes.find(({ code }) => code === searchTerm);
    return found;
  }

  function newAnyKey(keycode) {
    var anyKey = lookupKeycode('text');
    // make a copy otherwise it uses a reference
    return $.extend({}, anyKey, { text: keycode });
  }

  function newKey(metadata, keycode, obj) {
    var key = {
      name: metadata.name,
      code: keycode,
      type: metadata.type
    };

    if (obj !== undefined) {
      key = $.extend(key, obj);
    }

    return key;
  }

  function parseKeycode(keycode) {
    var metadata;

    // Check if the keycode is a complex/combo keycode ie. contains ()
    if (keycode.includes('(')) {
      // Pull the keycode and or layer from within the brackets
      var key, outerKeycode;
      var splitcode = keycode.split('(');
      var maincode = splitcode[0];
      var internal = splitcode[1];
      internal = internal.split(')')[0];

      //Check whether it is a layer switching code or combo keycode
      if (internal.includes('KC')) {
        // combo keycode
        metadata = lookupKeycode(internal);
        if (metadata === undefined) {
          return newAnyKey(keycode);
        }
        var internalkeycode = newKey(metadata, internal);

        outerKeycode = maincode + '(kc)';
        metadata = lookupKeycode(outerKeycode);
        if (metadata === undefined) {
          return newAnyKey(keycode);
        }

        key = newKey(metadata, keycode, { contents: internalkeycode });
        return key;
      }

      // layer switching
      outerKeycode = maincode + '(layer)';
      metadata = lookupKeycode(outerKeycode);
      if (metadata === undefined) {
        return newAnyKey(keycode);
      }
      var key = newKey(metadata, keycode, { layer: internal });
      return key;
    }

    // regular keycode
    metadata = lookupKeycode(keycode);
    if (metadata === undefined) {
      return newAnyKey(keycode);
    }
    return newKey(metadata, keycode);
  }

  //Function that takes in a keymap loops over it and fills populates the keymap variable
  function load_converted_keymap(converted_keymap) {
    //Empty the keymap variable
    keymap = [];

    //Loop over each layer from the keymap
    var stats = { count: 0, any: 0, layers: 0 };
    $.each(converted_keymap, function(_layer /*, keys*/) {
      //Add layer object for every layer that exists
      keymap[_layer] = {};
      //Loop over each keycode in the layer
      $.each(converted_keymap[_layer], function(key, keycode) {
        keymap[_layer][key] = parseKeycode(keycode, stats);
        stats.count += 1;

        if (keymap[_layer][key].name === 'Any') {
          stats.any += 1;
        }
      });
      if (_.size(keymap[_layer]) > 0) {
        $(`.layer.${_layer}`).addClass('non-empty');
      }
      stats.layers += 1;
    });

    var msg = `\nLoaded ${stats.layers} layers and ${
      stats.count
    } keycodes. Defined ${stats.any} Any key keycodes\n`;
    $status.append(msg);
  }

  function setSelectWidth(s) {
    var sel = $(s);
    $('#templateOption').text(sel.val());
    sel.width($('#template').width() * 1.03);
  }

  function reset_keymap() {
    keymap = [];
    layer = 0;
    $('.layer').removeClass('non-empty active');
    $('.layer.0').addClass('active');
  }

  function keyboard_from_hash() {
    if (keyboards.indexOf(window.location.hash.replace(/\#\//gi, '')) !== -1) {
      return window.location.hash.replace(/\#\//gi, '');
    } else if (
      keyboards.indexOf(
        window.location.hash.replace(/\#\//gi, '').replace(/\/[^\/]+$/gi, '')
      ) !== -1
    ) {
      return window.location.hash
        .replace(/\#\//gi, '')
        .replace(/\/[^\/]+$/gi, '');
    } else {
      return false;
    }
  }

  function layout_from_hash() {
    if (window.location.hash.replace(/^.+\//i, '') in layouts) {
      return window.location.hash.replace(/^.+\//i, '');
    } else {
      return false;
    }
  }

  function droppable_config(t, key) {
    return {
      over: function(/* event, ui*/) {
        $(t).addClass('active-key');
        if ($(t).hasClass('key-contents')) {
          $(t)
            .parent()
            .removeClass('active-key');
        }
      },
      out: function(/* event, ui */) {
        $(t).removeClass('active-key');
        if ($(t).hasClass('key-contents')) {
          $(t)
            .parent()
            .addClass('active-key');
        }
      },
      drop: function(event, ui) {
        if (!$(t).hasClass('active-key')) {
          return;
        }
        var srcKeycode = ui.helper[0];
        $(srcKeycode).draggable('option', 'revertDuration', 0);
        $(t).removeClass('active-key');
        $('.layer.active').addClass('non-empty');
        if ($(srcKeycode).hasClass('keycode')) {
          $(t).attr('data-code', srcKeycode.dataset.code);
          // $(t).draggable({revert: true, revertDuration: 100});
          if ($(t).hasClass('key-contents')) {
            keymap[layer][key].contents = {
              name: srcKeycode.innerHTML,
              code: srcKeycode.dataset.code,
              type: srcKeycode.dataset.type
            };
          } else {
            var keycode = assign_key(
              layer,
              key,
              srcKeycode.innerHTML,
              srcKeycode.dataset.code,
              srcKeycode.dataset.type
            );
            if (keycode.type === 'layer') {
              keymap[layer][key].layer = 0;
            }
          }
        } else {
          // handle swapping keys in keymap
          var $src = $(srcKeycode);
          var $dst = $(t);
          var srcIndex = $src.data('index');
          var dstIndex = $dst.data('index');

          // get src and dest positions for animation
          var srcPrevPos = ui.draggable.data().uiDraggable.originalPosition;
          var srcPos = {
            left: `${srcPrevPos.left}px`,
            top: `${srcPrevPos.top}px`
          };
          var dstPos = $dst.css(['left', 'top']);

          // use promises to wait until animation finished
          var deferSrc = $.Deferred();
          var deferDst = $.Deferred();

          // animate swapping
          $src.animate(
            { left: dstPos.left, top: dstPos.top },
            150,
            'linear',
            () => {
              deferSrc.resolve();
            }
          );
          $dst.animate(
            { left: srcPos.left, top: srcPos.top },
            150,
            'linear',
            () => {
              deferDst.resolve();
            }
          );

          function animationsFinished() {
            // restore original element positions just swap their data
            $src.css({ left: srcPos.left, top: srcPos.top });
            $dst.css({ left: dstPos.left, top: dstPos.top });

            var temp = keymap[layer][srcIndex];
            keymap[layer][srcIndex] = keymap[layer][dstIndex];
            keymap[layer][dstIndex] = temp;

            render_key(layer, srcIndex);
            render_key(layer, key);
          }

          // wait until both animations are complete
          $.when(deferSrc, deferDst).done(animationsFinished);
          return;
        }
        render_key(layer, key);
      }
    };
  }

  function render_key(_layer, k) {
    var key = $('#key-' + k);
    var keycode = keymap[_layer][k];
    if (!keycode) {
      keycode = assign_key(_layer, k, '', 'KC_NO', '');
    }
    $(key).html(keycode.name);
    if (keycode.type === 'container') {
      $(key).addClass('key-container');
      var container = $('<div>', {
        class: 'key-contents'
      });
      if (keycode.contents) {
        $(container).html(keycode.contents.name);
      }
      $(container).droppable(droppable_config(container, k));
      $(key).append(container);
    } else if (keycode.type === 'layer') {
      $(key).addClass('key-layer');
      var layer_input1 = $('<input>', {
        class: 'key-layer-input',
        type: 'number',
        val: keycode.layer
      }).on('input', function(/*e*/) {
        keymap[_layer][k].layer = $(this).val();
        if ($(this).val() !== layer) {
          if (keymap[$(this).val()] === undefined) {
            keymap[$(this).val()] = {};
          }
          keymap[$(this).val()][k] = { name: '▽', code: 'KC_TRNS' };
        }
      });
      $(key).append(layer_input1);
    } else if (keycode.type === 'text') {
      $(key).addClass('key-layer');
      var layer_input = $('<input>', {
        class: 'key-layer-input',
        val: keycode.text
      }).on('input', function(/*e*/) {
        keymap[layer][k].text = $(this).val();
      });
      $(key).append(layer_input);
    } else {
      $(key).removeClass('key-container');
      $(key).removeClass('key-layer');
    }
    if (keycode.code !== 'KC_NO') {
      var remove_keycode = $('<div>', {
        class: 'remove',
        html: '&#739;',
        click: function(evt) {
          evt.preventDefault();
          evt.stopPropagation();
          assign_key(layer, k, '', 'KC_NO', '');
          render_key(layer, k);
        }
      });
      $(key).append(remove_keycode);
    }
  }

  function assign_key(_layer, key, name, code, type) {
    keymap[_layer][key] = {
      name: name,
      code: code,
      type: type
    };
    return keymap[_layer][key];
  }

  function getKeycodes() {
    return [
      { name: 'Esc', code: 'KC_ESC' },
      { width: 1000 },
      { name: 'F1', code: 'KC_F1' },
      { name: 'F2', code: 'KC_F2' },
      { name: 'F3', code: 'KC_F3' },
      { name: 'F4', code: 'KC_F4' },
      { width: 500 },
      { name: 'F5', code: 'KC_F5' },
      { name: 'F6', code: 'KC_F6' },
      { name: 'F7', code: 'KC_F7' },
      { name: 'F8', code: 'KC_F8' },
      { width: 500 },
      { name: 'F9', code: 'KC_F9' },
      { name: 'F10', code: 'KC_F10' },
      { name: 'F11', code: 'KC_F11' },
      { name: 'F12', code: 'KC_F12' },
      { width: 250 },
      { name: 'Print Screen', code: 'KC_PSCR' },
      { name: 'Scroll Lock', code: 'KC_SLCK' },
      { name: 'Pause', code: 'KC_PAUS' },
      { width: 0 },

      { name: '~\n`', code: 'KC_GRV' },
      { name: '!\n1', code: 'KC_1' },
      { name: '@\n2', code: 'KC_2' },
      { name: '#\n3', code: 'KC_3' },
      { name: '$\n4', code: 'KC_4' },
      { name: '%\n5', code: 'KC_5' },
      { name: '^\n6', code: 'KC_6' },
      { name: '&\n7', code: 'KC_7' },
      { name: '*\n8', code: 'KC_8' },
      { name: '(\n9', code: 'KC_9' },
      { name: ')\n0', code: 'KC_0' },
      { name: '_\n-', code: 'KC_MINS' },
      { name: '+\n=', code: 'KC_EQL' },
      { name: 'Back Space', code: 'KC_BSPC', width: 2000 },
      { width: 250 },
      { name: 'Insert', code: 'KC_INS' },
      { name: 'Home', code: 'KC_HOME' },
      { name: 'Page Up', code: 'KC_PGUP' },
      { width: 250 },
      { name: 'Num Lock', code: 'KC_NLCK' },
      { name: '/', code: 'KC_PSLS' },
      { name: '*', code: 'KC_PAST' },
      { name: '-', code: 'KC_PMNS' },
      { width: 0 },

      { name: 'Tab', code: 'KC_TAB', width: 1500 },
      { name: 'q', code: 'KC_Q' },
      { name: 'w', code: 'KC_W' },
      { name: 'e', code: 'KC_E' },
      { name: 'r', code: 'KC_R' },
      { name: 't', code: 'KC_T' },
      { name: 'y', code: 'KC_Y' },
      { name: 'u', code: 'KC_U' },
      { name: 'i', code: 'KC_I' },
      { name: 'o', code: 'KC_O' },
      { name: 'p', code: 'KC_P' },
      { name: '{\n[', code: 'KC_LBRC' },
      { name: '}\n]', code: 'KC_RBRC' },
      { name: '|\n\\', code: 'KC_BSLS', width: 1500 },
      { width: 250 },
      { name: 'Del', code: 'KC_DEL' },
      { name: 'End', code: 'KC_END' },
      { name: 'Page Down', code: 'KC_PGDN' },
      { width: 250 },
      { name: '7', code: 'KC_P7' },
      { name: '8', code: 'KC_P8' },
      { name: '9', code: 'KC_P9' },
      { name: '+', code: 'KC_PPLS' },
      { width: 0 },

      { name: 'Caps Lock', code: 'KC_CAPS', width: 1750 },
      { name: 'a', code: 'KC_A' },
      { name: 's', code: 'KC_S' },
      { name: 'd', code: 'KC_D' },
      { name: 'f', code: 'KC_F' },
      { name: 'g', code: 'KC_G' },
      { name: 'h', code: 'KC_H' },
      { name: 'j', code: 'KC_J' },
      { name: 'k', code: 'KC_K' },
      { name: 'l', code: 'KC_L' },
      { name: ':\n;', code: 'KC_SCLN' },
      { name: '"\n\'', code: 'KC_QUOT' },
      { name: 'Enter', code: 'KC_ENT', width: 2250 },
      { width: 3500 },
      { name: '4', code: 'KC_P4' },
      { name: '5', code: 'KC_P5' },
      { name: '6', code: 'KC_P6' },
      { name: ',', code: 'KC_PCMM' },
      { width: 0 },

      { name: 'Left Shift', code: 'KC_LSFT', width: 2250 },
      { name: 'z', code: 'KC_Z' },
      { name: 'x', code: 'KC_X' },
      { name: 'c', code: 'KC_C' },
      { name: 'v', code: 'KC_V' },
      { name: 'b', code: 'KC_B' },
      { name: 'n', code: 'KC_N' },
      { name: 'm', code: 'KC_M' },
      { name: '<\n,', code: 'KC_COMM' },
      { name: '>\n.', code: 'KC_DOT' },
      { name: '?\n/', code: 'KC_SLSH' },
      { name: 'Right Shift', code: 'KC_RSFT', width: 2750 },
      { width: 1250 },
      { name: 'Up', code: 'KC_UP' },
      { width: 1250 },
      { name: '1', code: 'KC_P1' },
      { name: '2', code: 'KC_P2' },
      { name: '4', code: 'KC_P3' },
      { name: '=', code: 'KC_PEQL' },
      { width: 0 },

      { name: 'Left Ctrl', code: 'KC_LCTL', width: 1250 },
      { name: 'Left OS', code: 'KC_LGUI', width: 1250 },
      { name: 'Left Alt', code: 'KC_LALT', width: 1250 },
      { name: 'Space', code: 'KC_SPC', width: 6250 },
      { name: 'Right Alt', code: 'KC_RALT', width: 1250 },
      { name: 'Right OS', code: 'KC_RGUI', width: 1250 },
      { name: 'Menu', code: 'KC_APP', width: 1250 },
      { name: 'Right Ctrl', code: 'KC_RCTL', width: 1250 },
      { width: 250 },
      { name: 'Left', code: 'KC_LEFT' },
      { name: 'Down', code: 'KC_DOWN' },
      { name: 'Right', code: 'KC_RGHT' },
      { width: 250 },
      { name: '0', code: 'KC_P0', width: 2000 },
      { name: '.', code: 'KC_PDOT' },
      { name: 'Enter', code: 'KC_PENT' },

      { label: 'International', width: 'label' },

      { name: 'NUHS', code: 'KC_NUHS' },
      { name: 'NUBS', code: 'KC_NUBS' },

      { name: 'Ro', code: 'KC_RO', title: 'JIS \\ and |' },
      { name: '¥', code: 'KC_JYEN' },

      { name: '無変換', code: 'KC_MHEN' },
      { name: '漢字', code: 'KC_HANJ' },

      { name: '한영', code: 'KC_HAEN' },
      { name: '変換', code: 'KC_HENK' },
      { name: 'かな', code: 'KC_KANA' },

      { label: 'QMK specific', width: 'label' },

      { name: '', code: 'KC_NO', title: 'Nothing' },
      { name: '▽', code: 'KC_TRNS', title: 'Pass-through' },
      { name: 'Reset', code: 'RESET', title: 'Reset the keyboard' },
      { name: 'Debug', code: 'DEBUG', title: 'Toggle debug mode' },
      { width: 1000 },
      {
        name: 'Any',
        code: 'text',
        type: 'text',
        title: 'Manually enter any QMK keycode'
      },

      { label: 'Layer functions', width: 'label' },

      {
        name: 'MO',
        code: 'MO(layer)',
        type: 'layer',
        layer: 0,
        title: 'Momentary turn layer on'
      },
      {
        name: 'TG',
        code: 'TG(layer)',
        type: 'layer',
        layer: 0,
        title: 'Toggle layer on/off'
      },
      {
        name: 'DF',
        code: 'DF(layer)',
        type: 'layer',
        layer: 0,
        title: 'Sets the default layer'
      },
      {
        name: 'OSL',
        code: 'OSL(layer)',
        type: 'layer',
        layer: 0,
        title: 'Switch to layer for one keypress'
      },

      {
        label:
          'Mod key combinations (A = Alt, C = Control, G = Windows/Command, S = Shift)',
        width: 'label'
      },

      { name: 'LSft', code: 'LSFT(kc)', type: 'container' },
      { name: 'LCtl', code: 'LCTL(kc)', type: 'container' },
      { name: 'LAlt', code: 'LALT(kc)', type: 'container' },
      { name: 'LGui', code: 'LGUI(kc)', type: 'container' },
      { name: 'RSft', code: 'RSFT(kc)', type: 'container' },
      { name: 'RCtl', code: 'RCTL(kc)', type: 'container' },
      { name: 'RAlt', code: 'RALT(kc)', type: 'container' },
      { name: 'RGui', code: 'RGUI(kc)', type: 'container' },
      { width: 0 },
      {
        name: 'LSft_T',
        code: 'LSFT_T(kc)',
        type: 'container',
        title: 'Shift when held, kc when tapped'
      },
      {
        name: 'LCtl_T',
        code: 'LCtl_T(kc)',
        type: 'container',
        title: 'Control when held, kc when tapped'
      },
      {
        name: 'LAlt_T',
        code: 'LAlt_T(kc)',
        type: 'container',
        title: 'Alt when held, kc when tapped'
      },
      {
        name: 'LGui_T',
        code: 'LGui_T(kc)',
        type: 'container',
        title: 'Gui when held, kc when tapped'
      },
      {
        name: 'RSft_T',
        code: 'RSFT_T(kc)',
        type: 'container',
        title: 'Shift when held, kc when tapped'
      },
      {
        name: 'RCtl_T',
        code: 'RCtl_T(kc)',
        type: 'container',
        title: 'Control when held, kc when tapped'
      },
      {
        name: 'RAlt_T',
        code: 'RAlt_T(kc)',
        type: 'container',
        title: 'Alt when held, kc when tapped'
      },
      {
        name: 'RGui_T',
        code: 'RGui_T(kc)',
        type: 'container',
        title: 'Gui when held, kc when tapped'
      },
      {
        name: 'CS_T',
        code: 'C_S_T(kc)',
        type: 'container',
        title: 'Control + Shift when held, kc when tapped'
      },
      {
        name: 'All_T',
        code: 'ALL_T(kc)',
        type: 'container',
        title: 'LCTL + LSFT + LALT + LGUI when held, kc when tapped'
      },
      {
        name: 'Meh_T',
        code: 'MEH_T(kc)',
        type: 'container',
        title: 'LCTL + LSFT + LALT when held, kc when tapped'
      },
      {
        name: 'LCAG_T',
        code: 'LCAG_T(kc)',
        type: 'container',
        title: 'LCTL + LALT + LGUI when held, kc when tapped'
      },
      {
        name: 'RCAG_T',
        code: 'RCAG_T(kc)',
        type: 'container',
        title: 'RCTL + RALT + RGUI when held, kc when tapped'
      },
      {
        name: 'SGUI_T',
        code: 'SCMD_T(kc)',
        type: 'container',
        title: 'LGUI + LSFT when held, kc when tapped'
      },
      {
        name: 'LCA_T',
        code: 'LCA_T(kc)',
        type: 'container',
        title: 'LCTL + LALT when held, kc when tapped'
      },
      { width: 0 },
      {
        name: 'Hyper',
        code: 'HYPR(kc)',
        type: 'container',
        title: 'LCTL + LSFT + LALT + LGUI'
      },
      {
        name: 'Meh',
        code: 'MEH(kc)',
        type: 'container',
        title: 'LCTL + LSFT + LALT'
      },
      {
        name: 'LCAG',
        code: 'LCAG(kc)',
        type: 'container',
        title: 'LCTL + LALT + LGUI'
      },
      {
        name: 'ALTG',
        code: 'ALTG(kc)',
        type: 'container',
        title: 'RCTL + RALT'
      },
      {
        name: 'SGUI',
        code: 'SCMD(kc)',
        type: 'container',
        title: 'LGUI + LSFT'
      },
      { name: 'LCA', code: 'LCA(kc)', type: 'container', title: 'LCTL + LALT' },

      { label: 'Alphabet', width: 'label' },

      { name: 'a', code: 'KC_A' },
      { name: 'b', code: 'KC_B' },
      { name: 'c', code: 'KC_C' },
      { name: 'd', code: 'KC_D' },
      { name: 'e', code: 'KC_E' },
      { name: 'f', code: 'KC_F' },
      { name: 'g', code: 'KC_G' },
      { name: 'h', code: 'KC_H' },
      { name: 'i', code: 'KC_I' },
      { name: 'j', code: 'KC_J' },
      { name: 'k', code: 'KC_K' },
      { name: 'l', code: 'KC_L' },
      { name: 'm', code: 'KC_M' },
      { width: 0 },
      { name: 'n', code: 'KC_N' },
      { name: 'o', code: 'KC_O' },
      { name: 'p', code: 'KC_P' },
      { name: 'q', code: 'KC_Q' },
      { name: 'r', code: 'KC_R' },
      { name: 's', code: 'KC_S' },
      { name: 't', code: 'KC_T' },
      { name: 'u', code: 'KC_U' },
      { name: 'v', code: 'KC_V' },
      { name: 'w', code: 'KC_W' },
      { name: 'x', code: 'KC_X' },
      { name: 'y', code: 'KC_Y' },
      { name: 'z', code: 'KC_Z' },

      { label: 'Special action keys', width: 'label' },
      {
        name: 'Esc/~',
        code: 'KC_GESC',
        title: 'Esc normally, but ~ when shift/gui is pressed'
      },
      {
        name: 'LS/(',
        code: 'KC_LSPO',
        title: 'Left shift when held, ( when tapped'
      },
      {
        name: 'RS/)',
        code: 'KC_RSPC',
        title: 'Right shift when held, ) when tapped'
      },

      { label: 'Shifted symbols', width: 'label' },

      { name: '~', code: 'KC_TILD' },
      { name: '!', code: 'KC_EXLM' },
      { name: '@', code: 'KC_AT' },
      { name: '#', code: 'KC_HASH' },
      { name: '$', code: 'KC_DLR' },
      { name: '%', code: 'KC_PERC' },
      { name: '^', code: 'KC_CIRC' },
      { name: '&', code: 'KC_AMPR' },
      { name: '*', code: 'KC_ASTR' },
      { name: '(', code: 'KC_LPRN' },
      { name: ')', code: 'KC_RPRN' },
      { name: '_', code: 'KC_UNDS' },
      { name: '+', code: 'KC_PLUS' },
      { name: '{', code: 'KC_LCBR' },
      { name: '}', code: 'KC_RCBR' },
      { name: '<', code: 'KC_LT' },
      { name: '>', code: 'KC_GT' },
      { name: ':', code: 'KC_COLN' },
      { name: '|', code: 'KC_PIPE' },
      { name: '?', code: 'KC_QUES' },
      { name: '"', code: 'KC_DQT' },

      { label: 'Application', width: 'label' },

      { name: 'Vol Down', code: 'KC_VOLD' },
      { name: 'Vol Up', code: 'KC_VOLU' },
      { name: 'Mute', code: 'KC_MUTE' },
      { name: 'Power', code: 'KC_PWR' },
      { name: 'Help', code: 'KC_HELP' },
      { name: 'Stop', code: 'KC_STOP' },
      { name: 'Again', code: 'KC_AGIN' },
      { name: 'Menu', code: 'KC_MENU' },
      { name: 'Undo', code: 'KC_UNDO' },
      { name: 'Select', code: 'KC_SLCT' },
      { name: 'Copy', code: 'KC_COPY' },
      { name: 'Exec', code: 'KC_EXEC' },
      { name: 'Paste', code: 'KC_PSTE' },
      { name: 'Find', code: 'KC_FIND' },
      { name: 'Cut', code: 'KC_CUT' },

      { label: 'Keyboard settings (persistent)', width: 'label' },

      { name: 'Swap C/Caps', code: 'MAGIC_SWAP_CONTROL_CAPSLOCK' },
      { name: 'Caps>C', code: 'MAGIC_CAPSLOCK_TO_CONTROL' },
      { name: 'Swap LA/LO', code: 'MAGIC_SWAP_LALT_LGUI' },
      { name: 'Swap RA/RO', code: 'MAGIC_SWAP_RALT_RGUI' },
      { name: 'No O', code: 'MAGIC_NO_GUI' },
      { name: 'Swap `/Esc', code: 'MAGIC_SWAP_GRAVE_ESC' },
      { name: 'Swap \\/BS', code: 'MAGIC_SWAP_BACKSLASH_BACKSPACE' },
      { name: 'NKRO', code: 'MAGIC_HOST_NKRO' },
      { name: 'Swap A/O', code: 'MAGIC_SWAP_ALT_GUI' },
      { name: 'Rev C/Caps', code: 'MAGIC_UNSWAP_CONTROL_CAPSLOCK' },
      { name: 'Rev Caps>C', code: 'MAGIC_UNCAPSLOCK_TO_CONTROL' },
      { name: 'Rev LA/LO', code: 'MAGIC_UNSWAP_LALT_LGUI' },
      { name: 'Rev RA/RO', code: 'MAGIC_UNSWAP_RALT_RGUI' },
      { name: 'Rev No O', code: 'MAGIC_UNNO_GUI' },
      { name: 'Rev `/Esc', code: 'MAGIC_UNSWAP_GRAVE_ESC' },
      { name: 'Rev \\/BS', code: 'MAGIC_UNSWAP_BACKSLASH_BACKSPACE' },
      { name: 'Rev NKRO', code: 'MAGIC_UNHOST_NKRO' },
      { name: 'Rev A/O', code: 'MAGIC_UNSWAP_ALT_GUI' },
      { name: 'Togg NKRO', code: 'MAGIC_TOGGLE_NKRO' },

      { label: 'Backlight settings', width: 'label' },

      { name: 'BL Toggle', code: 'BL_TOGG' },
      { name: 'BL +', code: 'BL_INC' },
      { name: 'BL -', code: 'BL_DEC' },
      { name: 'BL Cycle', code: 'BL_STEP' },

      { label: 'RGB Lighting settings', width: 'label' },

      { name: 'RGB Toggle', code: 'RGB_TOG' },
      { name: 'RGB Mode +', code: 'RGB_MOD' },
      { name: 'RGB Mode -', code: 'RGB_RMOD' },
      { name: 'Hue +', code: 'RGB_HUI' },
      { name: 'Hue -', code: 'RGB_HUD' },
      { name: 'Sat +', code: 'RGB_SAI' },
      { name: 'Sat -', code: 'RGB_SAD' },
      { name: 'Bright +', code: 'RGB_VAI' },
      { name: 'Bright -', code: 'RGB_VAD' },
      { name: 'RGB Mode P', code: 'RGB_M_P', title: 'Plain' },
      { name: 'RGB Mode B', code: 'RGB_M_B', title: 'Breathe' },
      { name: 'RGB Mode R', code: 'RGB_M_R', title: 'Rainbow' },
      { name: 'RGB Mode SW', code: 'RGB_M_SW', title: 'Swirl' },
      { name: 'RGB Mode SN', code: 'RGB_M_SN', title: 'Snake' },
      { name: 'RGB Mode K', code: 'RGB_M_K', title: 'Knight' },
      { name: 'RGB Mode X', code: 'RGB_M_X', title: 'Xmas' },
      { name: 'RGB Mode G', code: 'RGB_M_G', title: 'Gradient' },

      { label: 'Multimedia Keys', width: 'label' },

      { name: 'Next', code: 'KC_MNXT', title: 'Media Next' },
      { name: 'Vol -', code: 'KC_VOLD', title: 'Volume Down' },
      { name: 'Vol +', code: 'KC_VOLU', title: 'Volume Up' },
      { name: 'Play', code: 'KC_MPLY', title: 'Play/Pause' }
    ];
  }
});
