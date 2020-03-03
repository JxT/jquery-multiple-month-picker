$(function() {
  $.widget("widget.mmp", {
    options: {
      text: "Multiple Month Picker",
      theme: "a",
      id: "mmp",
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      value: []
    },
    value: function(value) {
      if (value === undefined) {
        return this.options.value;
      }

      this.options.value = value;
      this._values = "," + value.join(",") + ",";
      this._check();
    },
    _currentYear: new Date().getFullYear(),
    _values: ",",
    _check: function() {
      var that = this;
      this.element.find("input").each(function() {
        if (that._values.indexOf("," + $(this).val() + ",") >= 0) {
          $(this)
            .prop("checked", true)
            .checkboxradio({
              icon: false
            });
        } else {
          $(this)
            .prop("checked", false)
            .checkboxradio({
              icon: false
            });
        }
      });
    },
    _create: function() {
      this.element.css("text-align", "center");

      this.element.append(
        '<div id="mmp-header" data-role="controlgroup" data-type="horizontal"></div>'
      );
      this.element
        .children("div")
        .append(
          '<button class="ui-button ui-corner-all ui-widget" id="btnPreviousYear" data-iconpos="notext" data-icon="arrow-l">Previous year</button>'
        );
      this.element
        .children("div")
        .append(
          '<span id="yearLabel" style="padding: 0 5px">' +
            this._currentYear +
            "</span>"
        );
      this.element
        .children("div")
        .append(
          '<button class="ui-button ui-corner-all ui-widget" id="btnNextYear" data-iconpos="notext" data-icon="arrow-r">Next year</button>'
        );

      for (var i = 0; i < 4; i++) {
        this.element.append(
          '<div id="mmp-months-row-' +
            i +
            '" data-role="controlgroup" data-type="horizontal" style="padding: 5px 0"></div>'
        );
        for (var j = 0; j < 3; j++) {
          var month = this._currentYear + "-" + this._zeros(1 + j + 3 * i, 2);
          this.element
            .find("#mmp-months-row-" + i)
            .append(
              '<input type="checkbox" name="' +
                month +
                '" id="' +
                month +
                '" value="' +
                month +
                '" data-wrapper-class="mmp-month" />'
            );
          this.element
            .find("#mmp-months-row-" + i)
            .append(
              '<label for="' +
                month +
                '" style="width: text-align: center;">' +
                this.options.months[j + 3 * i] +
                "</label>"
            );
        }
      }

      $("<style>.mmp-month { width: 100px; }</style>").appendTo("head");
      $("<style>.mmp-month > label { text-align: center; }</style>").appendTo(
        "head"
      );

      $("body").trigger("create");

      var that = this;

      this.element.find("#btnPreviousYear").click(function() {
        that._currentYear--;
        that.element.html("");
        that._create();
      });

      this.element.find("#btnNextYear").click(function() {
        that._currentYear++;
        that.element.html("");
        that._create();
      });

      this.element
        .children("div")
        .find("label")
        .css("text-align", "center");
      this.element
        .children("div")
        .find("input")
        .click(function() {
          var value = $(this).val();
          if ($(this).is(":checked")) {
            if (that._values.indexOf("," + value + ",") < 0) {
              that._values += value + ",";
            }
          } else {
            if (that._values.indexOf("," + value + ",") >= 0) {
              that._values = that._values.replace("," + value + ",", ",");
            }
          }
          if (that._values === ",") {
            that.options.value = [];
          } else {
            that.options.value = that._values
              .substring(1, that._values.length - 1)
              .split(",");
            that.options.value.sort();
          }
        });

      this._check();
    },
    _zeros: function(text, size) {
      var temp = text + "";
      while (temp.length < size) {
        temp = "0" + temp;
      }
      return temp;
    }
  });
});
