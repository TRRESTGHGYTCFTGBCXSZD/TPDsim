/*!
 * PuyoSim 4.3.0
 * https://github.com/puyonexus/puyosim/
 */

declare global {
  interface Window {
    jQuery: any;
  }
};

import "./common";
import $ from "jquery";
import Clipboard from "clipboard";
import { default as contentHtml } from "./data/content.html";
import { Utils } from "./utils";
import { Field } from "./field";
import { Simulation } from "./simulation";
import { Tabs } from "./tabs";
import { FieldDisplay } from "./fielddisplay";
import { PuyoDisplay } from "./puyodisplay";
import { ControlsDisplay } from "./controlsdisplay";
window.jQuery = $;
require("bootstrap/js/dropdown.js");

/*
 * Entrypoint
 *
 * Initalizes the simulator.
 */

$(document).ready(function () {
  Field.init(); // Initalize the Field
  FieldDisplay.init(); // Initalize the Field Display

  // Display the contents of the simulator
  $("#simulator").html(Utils.stringFormat(contentHtml, "/assets"));

  // Enable auto-copying to clipboard
  if (Clipboard.isSupported()) {
    new Clipboard(".clipboard-button");
  } else {
    $(".clipboard-button").hide();
  }

  // Handle resizing for #simulator
  $(window).resize(function () {
    Tabs.fieldWidthChanged();
  });

  // Show/hide elements depending on if we are viewing a shared chain
  if (window.chainData) {
    $(".show-on-shared-chain").show();
  } else {
    $(".hide-on-shared-chain").show();
  }

  FieldDisplay.display(); // Display the Field
  ControlsDisplay.display(); // Display the Controls Display
  PuyoDisplay.display(); // Display the Puyo Display
  Tabs.display(); // Display the tabs

  (function () {
    // Easter eggs :D
    function easteregg(keys, surprise) {
      // Set up the main easter egg function
      var key = 0;

      $(document).keydown(function (e) {
        if (e.which === keys[key]) {
          key++;
          if (key === keys.length) {
            surprise.call();
            key = 0;
          }
        } else {
          key = 0;
        }
      });
    }

    // Puyo Puyo~n 108 chain secret
    // It's simply the Konami code, silly!
    // Code: Up, Up, Down, Down, Left, Right, B, A, Enter
    easteregg([38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13], function () {
      Field.setChain(
        "421212224324123312131211442442211213431123321132142423" +
          "424324123341244343221344222431343211341112142312433213" +
          "342443412321234123124434123212341231334123212341231241" +
          "412321234123121234123412341244234123412341233412341234" +
          "123412311234123412341214434123412341234144341234123412" +
          "342341234123412341134123412341234121341234123412342134" +
          "123412341234134123412341231421341234123412312341234123" +
          "412341123412341234123412341234123412341234123412341234",
        16,
        26 // Set to the 108 chain from Puyo~n
      );
      Simulation.puyoToClear = 4;
      $("#puyo-to-clear").val(Simulation.puyoToClear);
    });
  })();
});