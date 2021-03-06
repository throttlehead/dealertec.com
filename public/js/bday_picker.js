/*
 * jQuery Birthday Picker: v1.2 - 3/21/2011
 * http://abecoffman.com/stuff/birthdaypicker
 * 
 * Copyright (c) 2010 Abe Coffman
 * Dual licensed under the MIT and GPL licenses.
 * 
 */
(function (d) {
    var a = {
        "short": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "long": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
        b = new Date(),
        c = b.getFullYear(),
        f = b.getMonth() + 1,
        e = b.getDate();
    d.fn.birthdaypicker = function (g) {
        var h = {
            maxAge: 120,
            futureDates: false,
            maxYear: c,
            dateFormat: "middleEndian",
            monthFormat: "short",
            placeholder: true,
            legend: "",
            defaultDate: false,
            hiddenDate: true
        };
        return this.each(function () {
            if (g) {
                d.extend(h, g)
            }
            var r = d("<fieldset id='bdayset' class='birthday-picker'></fieldset>"),
                q = d("<select id='BirthYear' name='BirthYear'></select>"),
                p = d("<select id='BirthMonth' name='BirthMonth'></select>"),
                m = d("<select id='BirthDay' name='BirthDay'></select>");
            if (h.legend) {
                d("<legend>" + h.legend + "</legend>").appendTo(r)
            }
            var n;
            if (h.dateFormat == "bigEndian") {
                n = c + "-" + f + "-" + e;
                r.append(q).append(p).append(m)
            } else {
                if (h.dateFormat == "littleEndian") {
                    n = e + "-" + f + "-" + c;
                    r.append(m).append(p).append(q)
                } else {
                    r.append(p).append(m).append(q);
                    n = f + "-" + e + "-" + c
                }
            }
            if (h.placeholder) {
                d("<option value=''>Year:</option>").appendTo(q);
                d("<option value=''>Month:</option>").appendTo(p);
                d("<option value=''>Day:</option>").appendTo(m);
                n = null
            }
            if (h.defaultDate) {
                n = h.defaultDate
            }
            if (h.hiddenDate) {
                d("<input type='hidden' name='birthdate' />").val(n).appendTo(r)
            }
            var s = c;
            var t = c - h.maxAge;
            if (h.futureDates && h.maxYear != c) {
                if (h.maxYear > 1000) {
                    s = h.maxYear
                } else {
                    s = c + h.maxYear
                }
            }
            while (s >= t) {
                d("<option></option>").attr("value", s).text(s).appendTo(q);
                s--
            }
            for (var o = 0; o < 12; o++) {
                d("<option></option>").attr("value", o + 1).text(a[h.monthFormat][o]).appendTo(p)
            }
            for (var l = 1; l < 32; l++) {
                d("<option></option>").attr("value", l).text(l).appendTo(m)
            }
            d(this).append(r);
            if (h.defaultDate) {
                var i = new Date(h.defaultDate);
                q.val(i.getFullYear());
                p.val(i.getMonth() + 1);
                m.val(i.getDate())
            }
            r.change(function () {
                var k = parseInt(p.children(":last").val()),
                    y = parseInt(m.children(":last").val()),
                    j = new Date(q.val(), p.val(), 0),
                    w = j.getDate();
                if (y > w) {
                    while (y > w) {
                        m.children(":last").remove();
                        y--
                    }
                } else {
                    if (y < w) {
                        while (y < w) {
                            d("<option></option>").attr("value", y + 1).text(y + 1).appendTo(m);
                            y++
                        }
                    }
                }
                if (!h.futureDates && q.val() == u) {
                    if (k > x) {
                        while (k > x) {
                            p.children(":last").remove();
                            k--
                        }
                    }
                    if (p.val() == x) {
                        if (y > v) {
                            while (y > v) {
                                m.children(":last").remove();
                                y--
                            }
                        }
                    }
                }
                if (q.val() != u && k != 12) {
                    while (k < 12) {
                        d("<option></option>").attr("value", k + 1).text(a[h.monthFormat][k]).appendTo(p);
                        k++
                    }
                }
                var u = q.val(),
                    x = p.val(),
                    v = m.val();
                if ((u * x * v) != 0) {
                    if (h.dateFormat == "bigEndian") {
                        n = u + "-" + x + "-" + v
                    } else {
                        if (h.dateFormat == "littleEndian") {
                            n = v + "-" + x + "-" + u
                        } else {
                            n = x + "-" + v + "-" + u
                        }
                    }
                    d(this).children('input[type="hidden"]').val(n)
                }
            })
        })
    }
})(jQuery);