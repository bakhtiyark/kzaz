//tealium universal tag - utag.loader ut4.0.202104201240, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var utag_condload = false;
window.__tealium_twc_switch = false;
try {
  try {
    utag_cfg_ovrd = window.utag_cfg_ovrd || {};
    utag_cfg_ovrd.user_agent_regex = new RegExp(
      "gomez|bot|aolbuild|baidu|bing|msn|duckduckgo|teoma|slurp|yandex",
      "i"
    );
    if (utag_cfg_ovrd.user_agent_regex.test(navigator.userAgent)) {
      utag_cfg_ovrd.noload = true;
    }
  } catch (e) {
    utag.DB(e);
  }
} catch (e) {}
if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id: "yara.international-site",
    o: {},
    sender: {},
    send: {},
    rpt: { ts: { a: new Date() } },
    dbi: [],
    db_log: [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      lq: [],
      bq: {},
      bk: {},
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      ready_q: [],
      sendq: { pending: 0 },
      run_ready_q: function () {
        for (var i = 0; i < utag.loader.ready_q.length; i++) {
          utag.DB("READY_Q:" + i);
          try {
            utag.loader.ready_q[i]();
          } catch (e) {
            utag.DB(e);
          }
        }
      },
      lh: function (a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = /\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\./.test(a) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      WQ: function (a, b, c, d, g) {
        utag.DB("WQ:" + utag.loader.wq.length);
        try {
          if (utag.udoname && utag.udoname.indexOf(".") < 0) {
            utag.ut.merge(utag.data, window[utag.udoname], 0);
          }
          if (utag.cfg.load_rules_at_wait) {
            utag.handler.LR(utag.data);
          }
        } catch (e) {
          utag.DB(e);
        }
        d = 0;
        g = [];
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
          b.load = utag.loader.cfg[b.id].load;
          if (b.load == 4) {
            this.f[b.id] = 0;
            utag.loader.LOAD(b.id);
          } else if (b.load > 0) {
            g.push(b);
            d++;
          } else {
            this.f[b.id] = 1;
          }
        }
        for (a = 0; a < g.length; a++) {
          utag.loader.AS(g[a]);
        }
        if (d == 0) {
          utag.loader.END();
        }
      },
      AS: function (a, b, c, d) {
        utag.send[a.id] = a;
        if (typeof a.src == "undefined") {
          a.src =
            utag.cfg.path +
            (typeof a.name != "undefined"
              ? a.name
              : "ut" + "ag." + a.id + ".js");
        }
        a.src +=
          (a.src.indexOf("?") > 0 ? "&" : "?") +
          "utv=" +
          (a.v ? utag.cfg.template + a.v : utag.cfg.v);
        utag.rpt["l_" + a.id] = a.src;
        b = document;
        this.f[a.id] = 0;
        if (a.load == 2) {
          utag.DB("Attach sync: " + a.src);
          a.uid = a.id;
          b.write(
            '<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + "ipt>"
          );
          if (typeof a.cb != "undefined") a.cb();
        } else if (a.load == 1 || a.load == 3) {
          if (b.createElement) {
            c = "utag_yara.international-site_" + a.id;
            if (!b.getElementById(c)) {
              d = { src: a.src, id: c, uid: a.id, loc: a.loc };
              if (a.load == 3) {
                d.type = "iframe";
              }
              if (typeof a.cb != "undefined") d.cb = a.cb;
              utag.ut.loader(d);
            }
          }
        }
      },
      GV: function (a, b, c) {
        b = {};
        for (c in a) {
          if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
        }
        return b;
      },
      OU: function (a, b, c, d, f) {
        try {
          if (typeof utag.data["cp.OPTOUTMULTI"] != "undefined") {
            c = utag.loader.cfg;
            a = utag.ut.decode(utag.data["cp.OPTOUTMULTI"]).split("|");
            for (d = 0; d < a.length; d++) {
              b = a[d].split(":");
              if (b[1] * 1 !== 0) {
                if (b[0].indexOf("c") == 0) {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tcat == b[0].substring(1)) c[f].load = 0;
                  }
                } else if (b[0] * 1 == 0) {
                  utag.cfg.nocookie = true;
                } else {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tid == b[0]) c[f].load = 0;
                  }
                }
              }
            }
          }
        } catch (e) {
          utag.DB(e);
        }
      },
      RDdom: function (o) {
        var d = document || {},
          l = location || {};
        o["dom.referrer"] = d.referrer;
        o["dom.title"] = "" + d.title;
        o["dom.domain"] = "" + l.hostname;
        o["dom.query_string"] = ("" + l.search).substring(1);
        o["dom.hash"] = ("" + l.hash).substring(1);
        o["dom.url"] = "" + d.URL;
        o["dom.pathname"] = "" + l.pathname;
        o["dom.viewport_height"] =
          window.innerHeight ||
          (d.documentElement ? d.documentElement.clientHeight : 960);
        o["dom.viewport_width"] =
          window.innerWidth ||
          (d.documentElement ? d.documentElement.clientWidth : 960);
      },
      RDcp: function (o, b, c, d) {
        b = utag.loader.RC();
        for (d in b) {
          if (d.match(/utag_(.*)/)) {
            for (c in utag.loader.GV(b[d])) {
              o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
            }
          }
        }
        for (c in utag.loader.GV(utag.cl && !utag.cl["_all_"] ? utag.cl : b)) {
          if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined")
            o["cp." + c] = b[c];
        }
      },
      RDqp: function (o, a, b, c) {
        a = location.search + (location.hash + "").replace("#", "&");
        if (utag.cfg.lowerqp) {
          a = a.toLowerCase();
        }
        if (a.length > 1) {
          b = a.substring(1).split("&");
          for (a = 0; a < b.length; a++) {
            c = b[a].split("=");
            if (c.length > 1) {
              o["qp." + c[0]] = utag.ut.decode(c[1]);
            }
          }
        }
      },
      RDmeta: function (o, a, b, h) {
        a = document.getElementsByTagName("meta");
        for (b = 0; b < a.length; b++) {
          try {
            h = a[b].name || a[b].getAttribute("property") || "";
          } catch (e) {
            h = "";
            utag.DB(e);
          }
          if (utag.cfg.lowermeta) {
            h = h.toLowerCase();
          }
          if (h != "") {
            o["meta." + h] = a[b].content;
          }
        }
      },
      RDva: function (o) {
        var readAttr = function (o, l) {
          var a = "",
            b;
          a = localStorage.getItem(l);
          if (!a || a == "{}") return;
          b = utag.ut.flatten({ va: JSON.parse(a) });
          utag.ut.merge(o, b, 1);
        };
        try {
          readAttr(o, "tealium_va");
          readAttr(o, "tealium_va_" + o["ut.account"] + "_" + o["ut.profile"]);
        } catch (e) {
          utag.DB(e);
        }
      },
      RDut: function (o, a) {
        var t = {};
        var d = new Date();
        var m = utag.ut.typeOf(d.toISOString) == "function";
        o["ut.domain"] = utag.cfg.domain;
        o["ut.version"] = utag.cfg.v;
        t["tealium_event"] = o["ut.event"] = a || "view";
        t["tealium_visitor_id"] = o["ut.visitor_id"] = o["cp.utag_main_v_id"];
        t["tealium_session_id"] = o["ut.session_id"] = o["cp.utag_main_ses_id"];
        try {
          t["tealium_datasource"] = "";
          t["tealium_account"] = o["ut.account"] = utag.cfg.utid.split("/")[0];
          t["tealium_profile"] = o["ut.profile"] = utag.cfg.utid.split("/")[1];
          t["tealium_environment"] = o["ut.env"] = utag.cfg.path.split("/")[6];
        } catch (e) {
          utag.DB(e);
        }
        t["tealium_random"] = Math.random().toFixed(16).substring(2);
        t["tealium_library_name"] = "ut" + "ag.js";
        t["tealium_library_version"] = (utag.cfg.template + "0").substring(2);
        t["tealium_timestamp_epoch"] = Math.floor(d.getTime() / 1000);
        t["tealium_timestamp_utc"] = m ? d.toISOString() : "";
        d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
        t["tealium_timestamp_local"] = m
          ? d.toISOString().replace("Z", "")
          : "";
        utag.ut.merge(o, t, 0);
      },
      RDses: function (o, a, c) {
        a = new Date().getTime();
        c = a + parseInt(utag.cfg.session_timeout) + "";
        if (!o["cp.utag_main_ses_id"]) {
          o["cp.utag_main_ses_id"] = a + "";
          o["cp.utag_main__ss"] = "1";
          o["cp.utag_main__sn"] = 1 + parseInt(o["cp.utag_main__sn"] || 0) + "";
        } else {
          o["cp.utag_main__ss"] = "0";
        }
        o["cp.utag_main__pn"] = o["cp.utag_main__pn"] || "1";
        o["cp.utag_main__st"] = c;
        utag.loader.SC("utag_main", {
          _sn: o["cp.utag_main__sn"] || 1,
          _ss: o["cp.utag_main__ss"],
          _st: c,
          ses_id: (o["cp.utag_main_ses_id"] || a) + ";exp-session",
          _pn: o["cp.utag_main__pn"] + ";exp-session",
        });
      },
      RDpv: function (o) {
        if (typeof utag.pagevars == "function") {
          utag.DB("Read page variables");
          utag.pagevars(o);
        }
      },
      RD: function (o, a) {
        utag.DB("utag.loader.RD");
        utag.DB(o);
        utag.loader.RDcp(o);
        if (!utag.loader.rd_flag) {
          utag.loader.rd_flag = 1;
          o["cp.utag_main_v_id"] =
            o["cp.utag_main_v_id"] || utag.ut.vi(new Date().getTime());
          o["cp.utag_main__pn"] = 1 + parseInt(o["cp.utag_main__pn"] || 0) + "";
          utag.loader.SC("utag_main", { v_id: o["cp.utag_main_v_id"] });
          utag.loader.RDses(o);
        }
        if (a && !utag.cfg.noview) utag.loader.RDses(o);
        utag.loader.RDqp(o);
        utag.loader.RDmeta(o);
        utag.loader.RDdom(o);
        utag.loader.RDut(o, a || "view");
        utag.loader.RDpv(o);
        utag.loader.RDva(o);
      },
      RC: function (
        a,
        x,
        b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        v,
        ck,
        cv,
        r,
        s,
        t
      ) {
        o = {};
        b = "" + document.cookie != "" ? document.cookie.split("; ") : [];
        r = /^(.*?)=(.*)$/;
        s = /^(.*);exp-(.*)$/;
        t = new Date().getTime();
        for (c = 0; c < b.length; c++) {
          if (b[c].match(r)) {
            ck = RegExp.$1;
            cv = RegExp.$2;
          }
          e = utag.ut.decode(cv);
          if (typeof ck != "undefined") {
            if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
              e = cv.split("$");
              g = [];
              j = {};
              for (f = 0; f < e.length; f++) {
                try {
                  g = e[f].split(":");
                  if (g.length > 2) {
                    g[1] = g.slice(1).join(":");
                  }
                  v = "";
                  if (("" + g[1]).indexOf("~") == 0) {
                    h = g[1].substring(1).split("|");
                    for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                    v = h;
                  } else v = utag.ut.decode(g[1]);
                  j[g[0]] = v;
                } catch (er) {
                  utag.DB(er);
                }
              }
              o[ck] = {};
              for (f in utag.loader.GV(j)) {
                if (j[f] instanceof Array) {
                  n = [];
                  for (m = 0; m < j[f].length; m++) {
                    if (j[f][m].match(s)) {
                      k =
                        RegExp.$2 == "session"
                          ? typeof j._st != "undefined"
                            ? j._st
                            : t - 1
                          : parseInt(RegExp.$2);
                      if (k > t) n[m] = x == 0 ? j[f][m] : RegExp.$1;
                    }
                  }
                  j[f] = n.join("|");
                } else {
                  j[f] = "" + j[f];
                  if (j[f].match(s)) {
                    k =
                      RegExp.$2 == "session"
                        ? typeof j._st != "undefined"
                          ? j._st
                          : t - 1
                        : parseInt(RegExp.$2);
                    j[f] = k < t ? null : x == 0 ? j[f] : RegExp.$1;
                  }
                }
                if (j[f]) o[ck][f] = j[f];
              }
            } else if (utag.cl[ck] || utag.cl["_all_"]) {
              o[ck] = e;
            }
          }
        }
        return a ? (o[a] ? o[a] : {}) : o;
      },
      SC: function (a, b, c, d, e, f, g, h, i, j, k, x, v) {
        if (!a) return 0;
        if (a == "utag_main" && utag.cfg.nocookie) return 0;
        v = "";
        var date = new Date();
        var exp = new Date();
        exp.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
        x = exp.toGMTString();
        if (c && c == "da") {
          x = "Thu, 31 Dec 2009 00:00:00 GMT";
        } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
          if (typeof b != "object") {
            v = b;
          }
        } else {
          d = utag.loader.RC(a, 0);
          for (e in utag.loader.GV(b)) {
            f = "" + b[e];
            if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
              g =
                date.getTime() +
                parseInt(RegExp.$2) * (RegExp.$3 == "h" ? 3600000 : 86400000);
              if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
              f = RegExp.$1 + ";exp-" + g;
            }
            if (c == "i") {
              if (d[e] == null) d[e] = f;
            } else if (c == "d") delete d[e];
            else if (c == "a") d[e] = d[e] != null ? f - 0 + (d[e] - 0) : f;
            else if (c == "ap" || c == "au") {
              if (d[e] == null) d[e] = f;
              else {
                if (d[e].indexOf("|") > 0) {
                  d[e] = d[e].split("|");
                }
                g = d[e] instanceof Array ? d[e] : [d[e]];
                g.push(f);
                if (c == "au") {
                  h = {};
                  k = {};
                  for (i = 0; i < g.length; i++) {
                    if (g[i].match(/^(.*);exp-(.*)$/)) {
                      j = RegExp.$1;
                    }
                    if (typeof k[j] == "undefined") {
                      k[j] = 1;
                      h[g[i]] = 1;
                    }
                  }
                  g = [];
                  for (i in utag.loader.GV(h)) {
                    g.push(i);
                  }
                }
                d[e] = g;
              }
            } else d[e] = f;
          }
          h = new Array();
          for (g in utag.loader.GV(d)) {
            if (d[g] instanceof Array) {
              for (c = 0; c < d[g].length; c++) {
                d[g][c] = encodeURIComponent(d[g][c]);
              }
              h.push(g + ":~" + d[g].join("|"));
            } else
              h.push(
                (g + ":").replace(/[\,\$\;\?]/g, "") + encodeURIComponent(d[g])
              );
          }
          if (h.length == 0) {
            h.push("");
            x = "";
          }
          v = h.join("$");
        }
        document.cookie =
          a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
        return 1;
      },
      LOAD: function (a, b, c, d) {
        if (!utag.loader.cfg) {
          return;
        }
        if (this.ol == 0) {
          if (utag.loader.cfg[a].block && utag.loader.cfg[a].cbf) {
            this.f[a] = 1;
            delete utag.loader.bq[a];
          }
          for (b in utag.loader.GV(utag.loader.bq)) {
            if (utag.loader.cfg[a].load == 4 && utag.loader.cfg[a].wait == 0) {
              utag.loader.bk[a] = 1;
              utag.DB("blocked: " + a);
            }
            utag.DB("blocking: " + b);
            return;
          }
          utag.loader.INIT();
          return;
        }
        utag.DB("utag.loader.LOAD:" + a);
        if (this.f[a] == 0) {
          this.f[a] = 1;
          if (utag.cfg.noview != true) {
            if (utag.loader.cfg[a].send) {
              utag.DB("SENDING: " + a);
              try {
                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                  utag.DB("utag.loader.LOAD:sendq: " + a);
                  while ((d = utag.loader.sendq[a].shift())) {
                    utag.DB(d);
                    utag.sender[a].send(d.event, utag.handler.C(d.data));
                    utag.loader.sendq.pending--;
                  }
                } else {
                  utag.sender[a].send("view", utag.handler.C(utag.data));
                }
                utag.rpt["s_" + a] = 0;
              } catch (e) {
                utag.DB(e);
                utag.rpt["s_" + a] = 1;
              }
            }
          }
          if (utag.loader.rf == 0) return;
          for (b in utag.loader.GV(this.f)) {
            if (this.f[b] == 0 || this.f[b] == 2) return;
          }
          utag.loader.END();
        }
      },
      EV: function (a, b, c, d) {
        if (b == "ready") {
          if (!utag.data) {
            try {
              utag.cl = { _all_: 1 };
              utag.loader.initdata();
              utag.loader.RD(utag.data);
            } catch (e) {
              utag.DB(e);
            }
          }
          if (
            document.attachEvent || utag.cfg.dom_complete
              ? document.readyState === "complete"
              : document.readyState !== "loading"
          )
            setTimeout(c, 1);
          else {
            utag.loader.ready_q.push(c);
            var RH;
            if (utag.loader.ready_q.length <= 1) {
              if (document.addEventListener) {
                RH = function () {
                  document.removeEventListener("DOMContentLoaded", RH, false);
                  utag.loader.run_ready_q();
                };
                if (!utag.cfg.dom_complete)
                  document.addEventListener("DOMContentLoaded", RH, false);
                window.addEventListener("load", utag.loader.run_ready_q, false);
              } else if (document.attachEvent) {
                RH = function () {
                  if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", RH);
                    utag.loader.run_ready_q();
                  }
                };
                document.attachEvent("onreadystatechange", RH);
                window.attachEvent("onload", utag.loader.run_ready_q);
              }
            }
          }
        } else {
          if (a.addEventListener) {
            a.addEventListener(b, c, false);
          } else if (a.attachEvent) {
            a.attachEvent((d == 1 ? "" : "on") + b, c);
          }
        }
      },
      END: function (b, c, d, e, v, w) {
        if (this.ended) {
          return;
        }
        this.ended = 1;
        utag.DB("loader.END");
        b = utag.data;
        if (utag.handler.base && utag.handler.base != "*") {
          e = utag.handler.base.split(",");
          for (d = 0; d < e.length; d++) {
            if (typeof b[e[d]] != "undefined") utag.handler.df[e[d]] = b[e[d]];
          }
        } else if (utag.handler.base == "*") {
          utag.ut.merge(utag.handler.df, b, 1);
        }
        utag.rpt["r_0"] = "t";
        for (var r in utag.loader.GV(utag.cond)) {
          utag.rpt["r_" + r] = utag.cond[r] ? "t" : "f";
        }
        utag.rpt.ts["s"] = new Date();
        v = ".tiqcdn.com";
        w = utag.cfg.path.indexOf(v);
        if (w > 0 && b["cp.utag_main__ss"] == 1 && !utag.cfg.no_session_count)
          utag.ut.loader({
            src:
              utag.cfg.path.substring(0, w) +
              v +
              "/ut" +
              "ag/tiqapp/ut" +
              "ag.v.js?a=" +
              utag.cfg.utid +
              (utag.cfg.nocookie
                ? "&nocookie=1"
                : "&cb=" + new Date().getTime()),
            id: "tiqapp",
          });
        if (utag.cfg.noview != true) utag.handler.RE("view", b, "end");
        utag.handler.INIT();
      },
    },
    DB: function (a, b) {
      if (utag.cfg.utagdb === false) {
        return;
      } else if (typeof utag.cfg.utagdb == "undefined") {
        b = document.cookie + "";
        utag.cfg.utagdb = b.indexOf("utagdb=true") >= 0 ? true : false;
      }
      if (utag.cfg.utagdb === true) {
        var t;
        if (utag.ut.typeOf(a) == "object") {
          t = utag.handler.C(a);
        } else {
          t = a;
        }
        utag.db_log.push(t);
        try {
          if (!utag.cfg.noconsole) console.log(t);
        } catch (e) {}
      }
    },
    RP: function (a, b, c) {
      if (
        typeof a != "undefined" &&
        typeof a.src != "undefined" &&
        a.src != ""
      ) {
        b = [];
        for (c in utag.loader.GV(a)) {
          if (c != "src") b.push(c + "=" + escape(a[c]));
        }
        this.dbi.push(
          (new Image().src =
            a.src +
            "?utv=" +
            utag.cfg.v +
            "&utid=" +
            utag.cfg.utid +
            "&" +
            b.join("&"))
        );
      }
    },
    view: function (a, c, d) {
      return this.track({ event: "view", data: a, cfg: { cb: c, uids: d } });
    },
    link: function (a, c, d) {
      return this.track({ event: "link", data: a, cfg: { cb: c, uids: d } });
    },
    track: function (a, b, c, d) {
      if (typeof a == "string") a = { event: a, data: b, cfg: { cb: c } };
      for (d in utag.loader.GV(utag.o)) {
        try {
          utag.o[d].handler.trigger(a.event || "view", a.data || a, a.cfg);
        } catch (e) {
          utag.DB(e);
        }
      }
      if (a.cfg && a.cfg.cb)
        try {
          a.cfg.cb();
        } catch (e) {
          utag.DB(e);
        }
      return true;
    },
    handler: {
      base: "",
      df: {},
      o: {},
      send: {},
      iflag: 0,
      INIT: function (a, b, c) {
        utag.DB("utag.handler.INIT");
        if (utag.initcatch) {
          utag.initcatch = 0;
          return;
        }
        this.iflag = 1;
        a = utag.loader.q.length;
        if (a > 0) {
          utag.DB("Loader queue");
          for (b = 0; b < a; b++) {
            c = utag.loader.q[b];
            utag.handler.trigger(c.a, c.b, c.c);
          }
        }
      },
      test: function () {
        return 1;
      },
      LR: function (b) {
        utag.DB("Load Rules");
        for (var d in utag.loader.GV(utag.cond)) {
          utag.cond[d] = false;
        }
        utag.DB(b);
        utag.loader.loadrules(b);
        utag.DB(utag.cond);
        utag.loader.initcfg();
        utag.loader.OU();
        for (var r in utag.loader.GV(utag.cond)) {
          utag.rpt["r_" + r] = utag.cond[r] ? "t" : "f";
        }
      },
      RE: function (a, b, c, d, e, f, g) {
        if (c != "alr" && !this.cfg_extend) {
          return 0;
        }
        utag.DB("RE: " + c);
        if (c == "alr") utag.DB("All Tags EXTENSIONS");
        utag.DB(b);
        if (typeof this.extend != "undefined") {
          g = 0;
          for (d = 0; d < this.extend.length; d++) {
            try {
              e = 0;
              if (typeof this.cfg_extend != "undefined") {
                f = this.cfg_extend[d];
                if (typeof f.count == "undefined") f.count = 0;
                if (f[a] == 0 || (f.once == 1 && f.count > 0) || f[c] == 0) {
                  e = 1;
                } else {
                  if (f[c] == 1) {
                    g = 1;
                  }
                  f.count++;
                }
              }
              if (e != 1) {
                this.extend[d](a, b);
                utag.rpt["ex_" + d] = 0;
              }
            } catch (er) {
              utag.DB(er);
              utag.rpt["ex_" + d] = 1;
              utag.ut.error({
                e: er.message,
                s: utag.cfg.path + "utag.js",
                l: d,
                t: "ge",
              });
            }
          }
          utag.DB(b);
          return g;
        }
      },
      trigger: function (a, b, c, d, e, f) {
        utag.DB("trigger:" + a + (c && c.uids ? ":" + c.uids.join(",") : ""));
        b = b || {};
        utag.DB(b);
        if (!this.iflag) {
          utag.DB("trigger:called before tags loaded");
          for (d in utag.loader.f) {
            if (!(utag.loader.f[d] === 1))
              utag.DB("Tag " + d + " did not LOAD");
          }
          utag.loader.q.push({ a: a, b: utag.handler.C(b), c: c });
          return;
        }
        utag.ut.merge(b, this.df, 0);
        utag.loader.RD(b, a);
        utag.cfg.noview = false;
        function sendTag(a, b, d) {
          try {
            if (typeof utag.sender[d] != "undefined") {
              utag.DB("SENDING: " + d);
              utag.sender[d].send(a, utag.handler.C(b));
              utag.rpt["s_" + d] = 0;
            } else if (
              utag.loader.cfg[d].load != 2 &&
              utag.loader.cfg[d].s2s != 1
            ) {
              utag.loader.sendq[d] = utag.loader.sendq[d] || [];
              utag.loader.sendq[d].push({ event: a, data: utag.handler.C(b) });
              utag.loader.sendq.pending++;
              utag.loader.AS({ id: d, load: 1 });
            }
          } catch (e) {
            utag.DB(e);
          }
        }
        if (c && c.uids) {
          this.RE(a, b, "alr");
          for (f = 0; f < c.uids.length; f++) {
            d = c.uids[f];
            sendTag(a, b, d);
          }
        } else if (utag.cfg.load_rules_ajax) {
          this.RE(a, b, "blr");
          this.LR(b);
          this.RE(a, b, "alr");
          for (f = 0; f < utag.loader.cfgsort.length; f++) {
            d = utag.loader.cfgsort[f];
            if (utag.loader.cfg[d].load && utag.loader.cfg[d].send) {
              sendTag(a, b, d);
            }
          }
        } else {
          this.RE(a, b, "alr");
          for (d in utag.loader.GV(utag.sender)) {
            sendTag(a, b, d);
          }
        }
        this.RE(a, b, "end");
      },
      C: function (a, b, c) {
        b = {};
        for (c in utag.loader.GV(a)) {
          if (a[c] instanceof Array) {
            b[c] = a[c].slice(0);
          } else {
            b[c] = a[c];
          }
        }
        return b;
      },
    },
    ut: {
      pad: function (a, b, c, d) {
        a = "" + (a - 0).toString(16);
        d = "";
        if (b > a.length) {
          for (c = 0; c < b - a.length; c++) {
            d += "0";
          }
        }
        return "" + d + a;
      },
      vi: function (t, a, b) {
        if (!utag.v_id) {
          a = this.pad(t, 12);
          b = "" + Math.random();
          a += this.pad(b.substring(2, b.length), 16);
          try {
            a += this.pad(
              navigator.plugins.length ? navigator.plugins.length : 0,
              2
            );
            a += this.pad(navigator.userAgent.length, 3);
            a += this.pad(document.URL.length, 4);
            a += this.pad(navigator.appVersion.length, 3);
            a += this.pad(
              screen.width +
                screen.height +
                parseInt(
                  screen.colorDepth ? screen.colorDepth : screen.pixelDepth
                ),
              5
            );
          } catch (e) {
            utag.DB(e);
            a += "12345";
          }
          utag.v_id = a;
        }
        return utag.v_id;
      },
      hasOwn: function (o, a) {
        return o != null && Object.prototype.hasOwnProperty.call(o, a);
      },
      isEmptyObject: function (o, a) {
        for (a in o) {
          if (utag.ut.hasOwn(o, a)) return false;
        }
        return true;
      },
      isEmpty: function (o) {
        var t = utag.ut.typeOf(o);
        if (t == "number") {
          return isNaN(o);
        } else if (t == "boolean") {
          return false;
        } else if (t == "string") {
          return o.length === 0;
        } else return utag.ut.isEmptyObject(o);
      },
      typeOf: function (e) {
        return {}.toString
          .call(e)
          .match(/\s([a-zA-Z]+)/)[1]
          .toLowerCase();
      },
      flatten: function (o) {
        var a = {};
        function r(c, p) {
          if (Object(c) !== c || c instanceof Array) {
            a[p] = c;
          } else {
            if (utag.ut.isEmptyObject(c)) {
            } else {
              for (var d in c) {
                r(c[d], p ? p + "." + d : d);
              }
            }
          }
        }
        r(o, "");
        return a;
      },
      merge: function (a, b, c, d) {
        if (c) {
          for (d in utag.loader.GV(b)) {
            a[d] = b[d];
          }
        } else {
          for (d in utag.loader.GV(b)) {
            if (typeof a[d] == "undefined") a[d] = b[d];
          }
        }
      },
      decode: function (a, b) {
        b = "";
        try {
          b = decodeURIComponent(a);
        } catch (e) {
          utag.DB(e);
        }
        if (b == "") {
          b = unescape(a);
        }
        return b;
      },
      encode: function (a, b) {
        b = "";
        try {
          b = encodeURIComponent(a);
        } catch (e) {
          utag.DB(e);
        }
        if (b == "") {
          b = escape(a);
        }
        return b;
      },
      error: function (a, b, c) {
        if (typeof utag_err != "undefined") {
          utag_err.push(a);
        }
      },
      loader: function (o, a, b, c, l, m) {
        utag.DB(o);
        a = document;
        if (o.type == "iframe") {
          m = a.getElementById(o.id);
          if (m && m.tagName == "IFRAME") {
            b = m;
          } else {
            b = a.createElement("iframe");
          }
          o.attrs = o.attrs || {};
          utag.ut.merge(
            o.attrs,
            { height: "1", width: "1", style: "display:none" },
            0
          );
        } else if (o.type == "img") {
          utag.DB("Attach img: " + o.src);
          b = new Image();
        } else {
          b = a.createElement("script");
          b.language = "javascript";
          b.type = "text/javascript";
          b.async = 1;
          b.charset = "utf-8";
        }
        if (o.id) {
          b.id = o.id;
        }
        for (l in utag.loader.GV(o.attrs)) {
          b.setAttribute(l, o.attrs[l]);
        }
        b.setAttribute("src", o.src);
        if (typeof o.cb == "function") {
          if (b.addEventListener) {
            b.addEventListener(
              "load",
              function () {
                o.cb();
              },
              false
            );
          } else {
            b.onreadystatechange = function () {
              if (
                this.readyState == "complete" ||
                this.readyState == "loaded"
              ) {
                this.onreadystatechange = null;
                o.cb();
              }
            };
          }
        }
        if (o.type != "img" && !m) {
          l = o.loc || "head";
          c = a.getElementsByTagName(l)[0];
          if (c) {
            utag.DB("Attach to " + l + ": " + o.src);
            if (l == "script") {
              c.parentNode.insertBefore(b, c);
            } else {
              c.appendChild(b);
            }
          }
        }
      },
    },
  };
  utag.o["yara.international-site"] = utag;
  utag.cfg = {
    template: "ut4.42.",
    load_rules_ajax: true,
    load_rules_at_wait: false,
    lowerqp: false,
    noconsole: false,
    session_timeout: 1800000,
    readywait: 0,
    noload: 0,
    domain: utag.loader.lh(),
    path: "//tags.tiqcdn.com/utag/yara/international-site/prod/",
    utid: "yara/international-site/202104201240",
  };
  utag.cfg.v = utag.cfg.template + "202104201240";
  utag.cond = { 12: 0, 2: 0, 5: 0, 6: 0, 9: 0 };
  utag.loader.initdata = function () {
    try {
      utag.data = typeof utag_data != "undefined" ? utag_data : {};
      utag.udoname = "utag_data";
    } catch (e) {
      utag.data = {};
      utag.DB("idf:" + e);
    }
  };
  utag.loader.loadrules = function (_pd, _pc) {
    var d = _pd || utag.data;
    var c = _pc || utag.cond;
    for (var l in utag.loader.GV(c)) {
      switch (l) {
        case "12":
          try {
            c[12] |=
              d["dom.pathname"].toString().indexOf("/yara-at-a-glance") > -1 &&
              d["dom.domain"] == "www.yara.com";
          } catch (e) {
            utag.DB(e);
          }
          break;
        case "2":
          try {
            c[2] |=
              /www\.yara\.com$/.test(d["dom.domain"]) &&
              d["dom.pathname"]
                .toString()
                .toLowerCase()
                .indexOf("/secret/".toLowerCase()) < 0 &&
              d["cookie_information_categories"]
                .toString()
                .indexOf("cookie_cat_statistic") > -1 &&
              d["ut.event"].toString().indexOf("view") > -1;
          } catch (e) {
            utag.DB(e);
          }
          break;
        case "5":
          try {
            c[5] |=
              d["evt"].toString().indexOf("video") > -1 &&
              d["ut.event"] == "link" &&
              d["cookie_cat_statistic"] == "true";
          } catch (e) {
            utag.DB(e);
          }
          break;
        case "6":
          try {
            c[6] |=
              d["cookie_information_categories"]
                .toString()
                .indexOf("cookie_cat_statistic") > -1;
          } catch (e) {
            utag.DB(e);
          }
          break;
        case "9":
          try {
            c[9] |=
              /www\.yara\.com$/.test(d["dom.domain"]) &&
              /yara\.com$/.test(d["dom.domain"]) &&
              d["dom.pathname"]
                .toString()
                .toLowerCase()
                .indexOf("/secret/".toLowerCase()) < 0 &&
              /.*approved.+cookie_cat_statistic.+denied.*/.test(
                d["cp.CookieInformationConsent"]
              ) &&
              d["ut.event"].toString().indexOf("link") > -1;
          } catch (e) {
            utag.DB(e);
          }
          break;
      }
    }
  };
  utag.pre = function () {
    utag.loader.initdata();
    try {
      utag.loader.RD(utag.data);
    } catch (e) {
      utag.DB(e);
    }
    utag.loader.loadrules();
  };
  utag.loader.GET = function () {
    utag.cl = { _all_: 1 };
    utag.pre();
    utag.handler.extend = [
      function (a, b, c, d, e, f, g) {
        if (1) {
          d = b["dom.url"];
          if (typeof d == "undefined") return;
          c = [
            { "news-and-media/media-contacts": "contact_form" },
            { "careers/jobs": "job_alert" },
            {
              "this-is-yara/innovation-and-rd/yaragerminate": "yara_germinate",
            },
            {
              "chemical-and-environmental-solutions/diesel-exhaust-fluid/air1-brand-diesel-exhaust-fluid":
                "contact_def",
            },
            {
              "this-is-yara/innovation-and-rd/incubator-program":
                "contact_incubator",
            },
          ];
          var m = false;
          for (e = 0; e < c.length; e++) {
            for (f in utag.loader.GV(c[e])) {
              if (d.toString().indexOf(f) > -1) {
                b["application_trigger"] = c[e][f];
                m = true;
              }
            }
            if (m) break;
          }
          if (!m) b["application_trigger"] = "";
        }
      },
      function (a, b) {
        try {
          if (b["dom.pathname"] == "/") {
            b["page_category"] = "Home Page";
          }
        } catch (e) {
          utag.DB(e);
        }
      },
      function (a, b) {
        try {
          if (1) {
            try {
              b["stripped_url"] = b["dom.url"]
                .replace(/semail=[^&]+&?/, "")
                .replace(/[&?]$/, "");
            } catch (e) {}
          }
        } catch (e) {
          utag.DB(e);
        }
      },
    ];
    utag.handler.cfg_extend = [
      { id: "29", alr: 1, bwq: 0, blr: 0, end: 0 },
      { blr: 0, bwq: 0, end: 0, alr: 1, id: "6" },
      { id: "36", alr: 1, end: 0, bwq: 0, blr: 0 },
    ];
    utag.loader.initcfg = function () {
      utag.loader.cfg = {
        4: {
          load: utag.cond[9] || utag.cond[2],
          send: 1,
          v: 202012151131,
          wait: 1,
          tid: 7110,
        },
        5: { load: utag.cond[6], send: 1, v: 202011261409, wait: 1, tid: 8009 },
        8: { load: utag.cond[5], send: 1, v: 202012021405, wait: 1, tid: 7110 },
        13: {
          load: utag.cond[12],
          send: 1,
          v: 202104201240,
          wait: 1,
          tid: 7110,
        },
      };
      utag.loader.cfgsort = ["4", "5", "8", "13"];
    };
    utag.loader.initcfg();
  };
  if (typeof utag_cfg_ovrd != "undefined") {
    for (var i in utag.loader.GV(utag_cfg_ovrd)) utag.cfg[i] = utag_cfg_ovrd[i];
  }
  utag.loader.PINIT = function (a, b, c) {
    utag.DB("Pre-INIT");
    if (utag.cfg.noload) {
      return;
    }
    try {
      this.GET();
      if (utag.handler.RE("view", utag.data, "blr")) {
        utag.handler.LR(utag.data);
      }
    } catch (e) {
      utag.DB(e);
    }
    a = this.cfg;
    c = 0;
    for (b in this.GV(a)) {
      if (
        a[b].block == 1 ||
        (a[b].load > 0 && typeof a[b].src != "undefined" && a[b].src != "")
      ) {
        a[b].block = 1;
        c = 1;
        this.bq[b] = 1;
      }
    }
    if (c == 1) {
      for (b in this.GV(a)) {
        if (a[b].block) {
          a[b].id = b;
          if (a[b].load == 4) a[b].load = 1;
          a[b].cb = function () {
            var d = this.uid;
            utag.loader.cfg[d].cbf = 1;
            utag.loader.LOAD(d);
          };
          this.AS(a[b]);
        }
      }
    }
    if (c == 0) this.INIT();
  };
  utag.loader.INIT = function (a, b, c, d, e) {
    utag.DB("utag.loader.INIT");
    if (this.ol == 1) return -1;
    else this.ol = 1;
    if (utag.cfg.noview != true) utag.handler.RE("view", utag.data, "alr");
    utag.rpt.ts["i"] = new Date();
    d = this.cfgsort;
    for (a = 0; a < d.length; a++) {
      e = d[a];
      b = this.cfg[e];
      b.id = e;
      if (b.block != 1 && b.s2s != 1) {
        if (
          utag.loader.bk[b.id] ||
          ((utag.cfg.readywait || utag.cfg.noview) && b.load == 4)
        ) {
          this.f[b.id] = 0;
          utag.loader.LOAD(b.id);
        } else if (b.wait == 1 && utag.loader.rf == 0) {
          utag.DB("utag.loader.INIT: waiting " + b.id);
          this.wq.push(b);
          this.f[b.id] = 2;
        } else if (b.load > 0) {
          utag.DB("utag.loader.INIT: loading " + b.id);
          this.lq.push(b);
          this.AS(b);
        }
      }
    }
    if (this.wq.length > 0)
      utag.loader.EV("", "ready", function (a) {
        if (utag.loader.rf == 0) {
          utag.DB("READY:utag.loader.wq");
          utag.loader.rf = 1;
          utag.loader.WQ();
        }
      });
    else if (this.lq.length > 0) utag.loader.rf = 1;
    else if (this.lq.length == 0) utag.loader.END();
    return 1;
  };
  utag.loader.EV("", "ready", function (a) {
    if (utag.loader.efr != 1) {
      utag.loader.efr = 1;
      try {
        try {
          if (1) {
            console.log("====== YouTube tracking ======");
            var youtube_iframes = jQuery('iframe[src*="youtube.com/embed"]');
            for (i = 0; i < youtube_iframes.length; i++) {
              var youtube_source = jQuery(youtube_iframes[i]).attr("src");
              console.log(youtube_source);
              if (youtube_source.indexOf("enablejsapi=1") === -1) {
                if (youtube_source.indexOf("?") > 0) {
                  jQuery(youtube_iframes[i]).attr(
                    "src",
                    youtube_source + "&enablejsapi=1"
                  );
                  console.log("1");
                } else {
                  jQuery(youtube_iframes[i]).attr(
                    "src",
                    youtube_source + "?enablejsapi=1"
                  );
                  console.log("2");
                }
              }
            }
            if (jQuery('iframe[src*="youtube.com"]').length > 0) {
              var i = 0,
                id;
              window.iframe_id = [];
              jQuery('iframe[src*="youtube.com"]').each(function () {
                if (jQuery(this).attr("id")) {
                  id = jQuery(this).attr("id");
                  window.iframe_id.push(id);
                } else {
                  id = "tealium_youtube" + i;
                  jQuery(this).attr("id", id);
                  window.iframe_id.push(id);
                  i++;
                }
              });
            }
            function setMileStones(i) {
              mileStones[i] = [10, 25, 50, 75, 90];
            }
            var mileStones = [];
            if (window.iframe_id) {
              for (i = 0; i < window.iframe_id.length; i++) {
                setMileStones(i);
              }
            }
            var ytapi = document.createElement("script");
            ytapi.src = "https://ww" + "w.youtube" + ".com/iframe_api";
            var scriptref = document.getElementsByTagName("script")[0];
            scriptref.parentNode.insertBefore(ytapi, scriptref);
            window.players = [];
            window.onYouTubeIframeAPIReady = function () {
              jQuery('iframe[src*="youtube.com"]').each(function () {
                var id = jQuery(this).attr("id");
                window.players[id] = new YT.Player(id, {
                  events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                  },
                });
              });
            };
            window.start = [];
            window.onPlayerReady = function (event) {
              var idx;
              for (i = 0; i < window.iframe_id.length; i++) {
                if (window.iframe_id[i] === event.target.getIframe().id) {
                  idx = i;
                }
                window.start.push(true);
              }
              if (event.target.getPlayerState() === YT.PlayerState.CUED) {
                var player = event.target;
                var player_data = player.getVideoData();
                console.log(
                  "====== tealium event " + player_data.video_id + " ======"
                );
                console.log("------ UTAG: " + utag.id + "------");
                var cookie_cat_statistic =
                  window.CookieInformation.getConsentGivenFor(
                    "cookie_cat_statistic"
                  );
                if (cookie_cat_statistic === undefined) {
                  cookie_cat_statistic = "false";
                } else {
                  cookie_cat_statistic = cookie_cat_statistic.toString();
                }
                console.log("------ COOKIE_CAT_STAT: " + cookie_cat_statistic);
                utag.link({
                  evt: "video_load",
                  cookie_cat_statistic: cookie_cat_statistic,
                  video_id: player_data.video_id,
                  video_length: Math.round(player.getDuration()).toString(),
                  video_name: player_data.title,
                  video_platform: "YouTube",
                  video_action: "video_load",
                });
              }
            };
            var playerCheckInterval, event;
            window.onPlayerStateChange = function (event) {
              player = event.target;
              var playhead, idx;
              for (i = 0; i < window.iframe_id.length; i++) {
                if (window.iframe_id[i] === event.target.getIframe().id) {
                  idx = i;
                }
              }
              tealium_event = "";
              if (event.data == YT.PlayerState.PLAYING) {
                if (start[idx]) {
                  if (mileStones[idx].length > 0) {
                    playerCheckInterval = setInterval(mileStoneCheck, 50);
                  }
                  tealium_event = "video_start";
                  playhead = 0;
                } else {
                  tealium_event = "video_play";
                  playhead = player.getCurrentTime().toString();
                }
                start[idx] = false;
              } else if (event.data == YT.PlayerState.PAUSED) {
                tealium_event = "video_pause";
                playhead = player.getCurrentTime().toString();
              } else if (event.data == YT.PlayerState.ENDED) {
                if (mileStones[idx].length > 0) {
                  clearInterval(playerCheckInterval);
                  playerCheckInterval = 0;
                  setMileStones(idx);
                }
                tealium_event = "video_complete";
                playhead = Math.round(player.getDuration()).toString();
              }
              if (tealium_event) {
                var player_data = player.getVideoData();
                console.log(
                  "====== tealium event " +
                    tealium_event +
                    ", " +
                    player_data.video_id +
                    " ======"
                );
                console.log("------ UTAG: " + utag.id + "------");
                var cookie_cat_statistic =
                  window.CookieInformation.getConsentGivenFor(
                    "cookie_cat_statistic"
                  );
                if (cookie_cat_statistic === undefined) {
                  cookie_cat_statistic = "false";
                } else {
                  cookie_cat_statistic = cookie_cat_statistic.toString();
                }
                console.log("------ COOKIE_CAT_STAT: " + cookie_cat_statistic);
                utag.link({
                  evt: tealium_event,
                  cookie_cat_statistic: cookie_cat_statistic,
                  video_playhead: parseInt(playhead).toString(),
                  video_id: player_data.video_id,
                  video_length: Math.round(player.getDuration()).toString(),
                  video_name: player_data.title,
                  video_platform: "YouTube",
                  video_action: tealium_event,
                });
              }
              function mileStoneCheck() {
                var idx;
                for (i = 0; i < window.iframe_id.length; i++) {
                  if (window.iframe_id[i] === player.getIframe().id) {
                    idx = i;
                  }
                }
                var duration = Math.round(player.getDuration());
                var playhead = parseInt(player.getCurrentTime());
                var percComplete = (playhead / duration) * 100;
                var ms_len = mileStones[idx].length;
                if (ms_len > 0) {
                  var next_ms = mileStones[idx][0];
                  if (next_ms <= percComplete) {
                    mileStones[idx].shift();
                    utag.DB(
                      "Video event: video_milestone, video ID: " +
                        window.iframe_id[idx] +
                        ", Milestone=" +
                        percComplete.toFixed()
                    );
                    var player_data = player.getVideoData();
                    console.log(
                      "====== tealium event " +
                        next_ms.toString() +
                        ", " +
                        player_data.video_id,
                      +" ======"
                    );
                    console.log("------ UTAG: " + utag.id + "------");
                    var cookie_cat_statistic =
                      window.CookieInformation.getConsentGivenFor(
                        "cookie_cat_statistic"
                      );
                    if (cookie_cat_statistic === undefined) {
                      cookie_cat_statistic = "false";
                    } else {
                      cookie_cat_statistic = cookie_cat_statistic.toString();
                    }
                    console.log(
                      "------ COOKIE_CAT_STAT: " + cookie_cat_statistic
                    );
                    utag.link({
                      evt: "video_milestone",
                      cookie_cat_statistic: cookie_cat_statistic,
                      video_playhead: parseInt(playhead).toString(),
                      video_id: player_data.video_id,
                      video_length: duration.toString(),
                      video_milestone: next_ms.toString(),
                      video_name: player_data.title,
                      video_platform: "YouTube",
                      video_action: next_ms.toString() + "%",
                    });
                  }
                }
              }
            };
          }
        } catch (e) {
          utag.DB(e);
        }
      } catch (e) {
        utag.DB(e);
      }
      try {
        try {
          if (utag.data["dom.pathname"].toString().indexOf("/privacy/") > -1) {
            try {
              jQuery("h2:contains('Your rights')")[0].setAttribute(
                "id",
                "privacy-manager"
              );
            } catch (err) {
              utag.DB("Error (UID 13): " + err);
            }
          }
        } catch (e) {
          utag.DB(e);
        }
      } catch (e) {
        utag.DB(e);
      }
      try {
        try {
          if (1) {
            let found = false,
              s = document.createElement("script");
            s.type = "text/javascript";
            s.textContent =
              "var utag_data = " + JSON.stringify(utag.data) + ";";
            [].forEach.call(
              document.querySelectorAll("script"),
              function (node) {
                if (
                  node.textContent &&
                  node.textContent.indexOf("utag_data") > -1
                )
                  found = true;
              }
            );
            if (!found) document.body.insertBefore(s, document.body.firstChild);
          }
        } catch (e) {
          utag.DB(e);
        }
      } catch (e) {
        utag.DB(e);
      }
      try {
        try {
          if (
            utag.data["application_trigger"]
              .toString()
              .toLowerCase()
              .indexOf("contact_form".toLowerCase()) > -1
          ) {
            let looking = true;
            const sendSuccess = function () {
              let successMessage = document.querySelector(
                ".Form__Status .Form__Success__Message"
              );
              if (successMessage) {
                utag.link({
                  event_category: "Communication",
                  event_action: "Form submitted",
                  event_label: "Contact Us",
                });
                looking = false;
              }
              if (looking) setTimeout(sendSuccess, 1000);
            };
            setTimeout(sendSuccess, 1000);
          }
        } catch (e) {
          utag.DB(e);
        }
      } catch (e) {
        utag.DB(e);
      }
      try {
        try {
          if (
            utag.data["application_trigger"]
              .toString()
              .toLowerCase()
              .indexOf("job_alert".toLowerCase()) > -1
          ) {
            let looking = true;
            let failure = false;
            const sendSuccess = function () {
              let feedback = document.querySelector(".alert");
              if (feedback) {
                switch (feedback.className) {
                  case "alert alert-success":
                    utag.link({
                      event_category: "Form",
                      event_action: "Form submitted",
                      event_label: "Get job alert",
                    });
                    looking = false;
                    break;
                  case "alert alert-danger":
                    if (!failure)
                      utag.link({
                        event_category: "Form",
                        event_action: "Form failure",
                        event_label: "Get job alert",
                      });
                    failure = true;
                    break;
                }
              }
              if (looking) setTimeout(sendSuccess, 1000);
            };
            setTimeout(sendSuccess, 1000);
          }
        } catch (e) {
          utag.DB(e);
        }
      } catch (e) {
        utag.DB(e);
      }
      try {
        try {
          if (
            utag.data["application_trigger"]
              .toString()
              .toLowerCase()
              .indexOf("yara_germinate".toLowerCase()) > -1
          ) {
            let looking = true;
            const sendSuccess = function () {
              let successMessage = document.querySelector(
                ".Form__Status .Form__Success__Message"
              );
              if (successMessage) {
                utag.link({
                  event_category: "Form",
                  event_action: "Form submitted",
                  event_label: "Yara Germinate",
                });
                looking = false;
              }
              if (looking) setTimeout(sendSuccess, 1000);
            };
            setTimeout(sendSuccess, 1000);
          }
        } catch (e) {
          utag.DB(e);
        }
      } catch (e) {
        utag.DB(e);
      }
      try {
        try {
          if (
            utag.data["application_trigger"]
              .toString()
              .toLowerCase()
              .indexOf("contact_def".toLowerCase()) > -1
          ) {
            let looking = true;
            const sendSuccess = function () {
              let successMessage = document.querySelector(
                ".Form__Status .Form__Success__Message"
              );
              if (successMessage) {
                utag.link({
                  event_category: "Communication",
                  event_action: "Form submitted",
                  event_label: "Contact us Diesel Exhaust Fluid",
                });
                looking = false;
              }
              if (looking) setTimeout(sendSuccess, 1000);
            };
            setTimeout(sendSuccess, 1000);
          }
        } catch (e) {
          utag.DB(e);
        }
      } catch (e) {
        utag.DB(e);
      }
      try {
        try {
          if (
            utag.data["application_trigger"]
              .toString()
              .toLowerCase()
              .indexOf("contact_incubator".toLowerCase()) > -1
          ) {
            let looking = true;
            const sendSuccess = function () {
              let successMessage = document.querySelector(
                ".Form__Status .Form__Success__Message"
              );
              if (successMessage) {
                utag.link({
                  event_category: "Communication",
                  event_action: "Form submitted",
                  event_label: "Contact us Yara Incubator Program",
                });
                looking = false;
              }
              if (looking) setTimeout(sendSuccess, 1000);
            };
            setTimeout(sendSuccess, 1000);
          }
        } catch (e) {
          utag.DB(e);
        }
      } catch (e) {
        utag.DB(e);
      }
      try {
        try {
          if (
            /.*([^(oppdag|oppdag\/)])$/.test(utag.data["dom.url"]) &&
            utag.data["dom.url"]
              .toString()
              .toLowerCase()
              .indexOf("oppdag".toLowerCase()) > -1
          ) {
            try {
              window.b = window.b || utag_data;
              const MILESTONES = { medium: 40, full: 70 };
              const ARTICLE_SELECTOR = ".p-feature-page div.row",
                HEADER_SELECTOR = ".a-outer-container",
                WORDS_PER_MINUTE = 250;
              window.mediumEngagement = false;
              window.fullEngagement = false;
              window.firstScroll = false;
              window.secondScroll = false;
              window.scrollTracker = {};
              window.scrollTracker[MILESTONES.medium] = 0;
              window.scrollTracker[MILESTONES.full] = 0;
              const ansiWordBound = function (c) {
                return " " === c || "\n" === c || "\r" === c || "\t" === c;
              };
              const readingTime = function (text, options) {
                let words = 0;
                let start = 0;
                let end = text.length - 1;
                let wordbound;
                let i;
                options = options || {};
                options.wordsPerMinute = options.wordsPerMinute || 200;
                wordBound = options.wordBound || ansiWordBound;
                while (wordBound(text[start])) start++;
                while (wordBound(text[end])) end--;
                for (i = start; i <= end; ) {
                  for (; i <= end && !wordBound(text[i]); i++);
                  words++;
                  for (; i <= end && wordBound(text[i]); i++);
                }
                let minutes = words / options.wordsPerMinute;
                let time = minutes * 60 * 1000;
                let displayed = Math.ceil(minutes.toFixed(2));
                return {
                  text: displayed + " min read",
                  minutes: minutes,
                  time: time,
                  words: words,
                };
              };
              const makeGlobalTimer = function (freq) {
                freq = freq || 1000;
                let callbacks = [];
                let id = setInterval(function () {
                  let idx;
                  for (idx in callbacks) {
                    if (Object.prototype.hasOwnProperty.call(callbacks, idx)) {
                      callbacks[idx]();
                    }
                  }
                }, freq);
                return {
                  id: function () {
                    return id;
                  },
                  registerCallback: function (cb) {
                    callbacks.push(cb);
                  },
                  cancel: function () {
                    if (id !== null) {
                      clearInterval(id);
                      id = null;
                    }
                  },
                };
              };
              const getDocumentLength = function () {
                let body = document.body,
                  html = document.documentElement;
                return Math.max(
                  body.scrollHeight,
                  body.offsetHeight,
                  html.clientHeight,
                  html.scrollHeight,
                  html.offsetHeight
                );
              };
              const getScrollTop = function () {
                let body = document.body,
                  html = document.documentElement,
                  supportPageOffset = window.pageXOffset !== undefined,
                  isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
                return supportPageOffset
                  ? window.pageYOffset
                  : isCSS1Compat
                  ? html.scrollTop
                  : body.scrollTop;
              };
              const getViewportHeight = function () {
                let w = window,
                  a = "inner";
                if (!("innerHeight" in w)) {
                  a = "client";
                  w = document.documentElement || document.body;
                }
                return w[a + "Height"];
              };
              const getTimeStamp = function (millis) {
                let min = Math.floor(millis / 60000),
                  sec = ((millis % 60000) / 1000).toFixed(0);
                return min + ":" + (sec < 10 ? "0" : "") + sec;
              };
              const article = document.querySelector(ARTICLE_SELECTOR);
              const header = document.querySelector(HEADER_SELECTOR);
              const children = article.children;
              let text;
              for (let i = 0; i < children.length; i++) {
                if (children[i].textContent)
                  text += children[i].textContent.replace(/\s+/g, " ");
              }
              const options = { wordsPerMinute: WORDS_PER_MINUTE };
              const readingTimeObj = readingTime(text, options);
              b["reading_time"] =
                Math.round(readingTimeObj.minutes).toString() + " min";
              utag.DB(readingTimeObj);
              const sendEvent = function () {
                if (mediumEngagement && firstScroll) {
                  utag.link({
                    event_action: "Medium engagement",
                    event_category: "Content engagement",
                    event_label:
                      "40% of page scrolled and 25% of an estimated " +
                      Math.round(readingTimeObj.minutes).toString() +
                      " min read",
                    medium_engagement_counter: "1",
                  });
                  window.mediumEngagement = false;
                }
                if (fullEngagement && secondScroll) {
                  utag.link({
                    event_action: "Full engagement",
                    event_category: "Content engagement",
                    event_label:
                      "70% of page scrolled and 50% of an estimated " +
                      Math.round(readingTimeObj.minutes).toString() +
                      " min read",
                    full_engagement_counter: "1",
                  });
                  window.fullEngagement = false;
                }
              };
              window.onscroll = function () {
                let articleHeight = article.scrollHeight + header.scrollHeight;
                let windowHeight = getDocumentLength();
                let currentPosition = getScrollTop();
                let windowViewingArea = getViewportHeight();
                let bottomScrollPosition = currentPosition + windowViewingArea;
                let percentScrolled = parseInt(
                  ((bottomScrollPosition / articleHeight) * 100).toFixed(0)
                );
                utag.DB("Percent: " + percentScrolled + " %");
                if (
                  percentScrolled >= MILESTONES.medium &&
                  percentScrolled < MILESTONES.full
                ) {
                  if (scrollTracker[MILESTONES.medium] === 0) {
                    scrollTracker[MILESTONES.medium] = 1;
                    scrollBucket = MILESTONES.medium.toString();
                    window.firstScroll = true;
                    sendEvent();
                    utag.DB("Scroll: " + MILESTONES.medium);
                  }
                } else if (percentScrolled >= MILESTONES.full) {
                  if (scrollTracker[MILESTONES.full] === 0) {
                    scrollTracker[MILESTONES.full] = 1;
                    scrollBucket = MILESTONES.full.toString();
                    window.secondScroll = true;
                    sendEvent();
                    utag.DB("Scroll: " + MILESTONES.full);
                  }
                }
              };
              const mediumEngagementTimer = makeGlobalTimer(
                readingTimeObj.time / 4
              );
              const fullEngagementTimer = makeGlobalTimer(
                readingTimeObj.time / 2
              );
              mediumEngagementTimer.registerCallback(function () {
                window.mediumEngagement = true;
                sendEvent();
                mediumEngagementTimer.cancel();
              });
              fullEngagementTimer.registerCallback(function () {
                window.fullEngagement = true;
                sendEvent();
                fullEngagementTimer.cancel();
              });
            } catch (e) {
              utag.DB(
                "Engagement measurement - UID 21 " +
                  "(" +
                  e.name +
                  ": " +
                  e.message +
                  ")"
              );
            }
          }
        } catch (e) {
          utag.DB(e);
        }
      } catch (e) {
        utag.DB(e);
      }
      try {
        try {
          if (1) {
            try {
              const removeParam = function (key, url) {
                let rtn = url.split("?")[0];
                let param;
                let paramsArr = [];
                let queryString =
                  url.indexOf("?") !== -1 ? url.split("?")[1] : "";
                if (queryString !== "") {
                  paramsArr = queryString.split("&");
                  for (let i = paramsArr.length - 1; i >= 0; i--) {
                    param = paramsArr[i].split("=")[0];
                    if (param === key) {
                      paramsArr.splice(i, 1);
                    }
                  }
                  rtn = rtn + "?" + paramsArr.join("&");
                }
                return rtn;
              };
              const setUp = function (event) {
                event = event || window.event;
                let target = event.target || event.srcElement;
                let tagName = target.tagName.toLowerCase();
                if (tagName !== "a") {
                  for (let i = 0; i < 5; i++) {
                    if (typeof target !== undefined && target.parentNode) {
                      target = target.parentNode;
                    }
                    tagName =
                      target !== null && target.tagName
                        ? target.tagName.toLowerCase()
                        : "";
                    if (tagName === "a") {
                      break;
                    }
                  }
                }
                let linkText = target.text
                  ? target.text
                  : target.innerText
                  ? target.innerText
                  : "";
                if (target.href && !new RegExp(".*-master").test(target.href)) {
                  let obj = {
                    link_obj: target,
                    link_text: linkText.trim(),
                    link_url: target.href,
                    link_title: target.getAttribute("title")
                      ? target.getAttribute("title")
                      : undefined,
                    link_type: "exit link",
                    event_name: "click",
                  };
                  obj.link_type = setLinkType(obj);
                  return obj;
                } else if (
                  target.className
                    ? target.className.indexOf("mail") > -1
                    : false
                ) {
                  let obj = {
                    link_obj: target,
                    link_text: linkText.trim(),
                    link_url: target.getAttribute("data-encoded"),
                    link_type: "mail link",
                    event_name: "click",
                  };
                  return obj;
                }
                return undefined;
              };
              const handleTms = function (linkUrl) {
                let customerSegment = b["cp.customer_segment"]
                  ? b["cp.customer_segment"]
                  : "no-value";
                return {
                  tms_click: linkUrl.match(/tms_click=([^&#]*)/)[1],
                  customer_segment: customerSegment,
                  tms_click_orig_page: window.location.href,
                  tms_click_dest_page: linkUrl.split("?")[0],
                };
              };
              const extractHostname = function (url) {
                let hostname;
                if (url.indexOf("//") > -1) {
                  hostname = url.split("/")[2];
                } else {
                  hostname = url.split("/")[0];
                }
                hostname = hostname.split(":")[0];
                hostname = hostname.split("?")[0];
                return hostname;
              };
              const extractRootDomain = function (url) {
                let domain = extractHostname(url),
                  splitArr = domain.split("."),
                  arrLen = splitArr.length;
                if (arrLen == 3)
                  domain = splitArr[arrLen - 2] + "." + splitArr[arrLen - 1];
                if (arrLen > 3)
                  domain = splitArr[1] + "." + splitArr[2] + "." + splitArr[3];
                return domain;
              };
              const setLinkType = function (linkObject) {
                let linkType = undefined;
                let domain =
                  typeof linkObject.link_url !== "undefined"
                    ? extractRootDomain(linkObject.link_url)
                    : "";
                let noProtTest = new RegExp("yara\\.");
                let downloadFilter =
                  "exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,docx,xlsx,ppt,pptx".split(
                    ","
                  );
                let socialFilter = "facebook,twitter,linkedin,youtube".split(
                  ","
                );
                let localFilter = "yaraagri,yarabrasil,yaracanada".split(",");
                let exceptionFilter = "chemmate3,brandlibrary,cms".split(",");
                if (linkObject.link_url.indexOf("mailto:") >= 0) {
                  linkType = "mail link";
                } else if (linkObject.link_url.indexOf("tel:") >= 0) {
                  linkType = "telephone link";
                } else if (
                  new RegExp(exceptionFilter.join("|")).test(
                    linkObject.link_url
                  )
                ) {
                  linkType = "exception";
                } else if (
                  linkObject.link_obj.className.indexOf("addthis") > -1
                ) {
                  linkType = "social link";
                } else if (
                  linkObject.link_url.indexOf("recruitmentplatform") > -1
                ) {
                  linkType = "recruitment site";
                } else if (
                  noProtTest.test(domain) ||
                  new RegExp(localFilter.join("|")).test(linkObject.link_url)
                ) {
                  linkType = "local site";
                } else if (linkObject.link_url.indexOf("yaraurl.com") > -1) {
                  linkType = "download brandlibrary";
                } else if (
                  new RegExp(socialFilter.join("|")).test(linkObject.link_url)
                ) {
                  linkType = "yara social";
                }
                for (let i = 0; i < downloadFilter.length; i++) {
                  let patt = new RegExp(downloadFilter[i] + "$");
                  if (patt.test(linkObject.link_url)) {
                    linkType = "download link";
                    break;
                  }
                }
                return linkType;
              };
              document.onclick = function (event) {
                let linkObject = setUp(event);
                let intUrl = new RegExp(window.location.host);
                let eventAction;
                let eventLabel;
                let eventCategory;
                let origPage;
                let destPage;
                let tmsClickId;
                let wtCustomTitle;
                let wtCustomDl;
                let tms = false;
                if (
                  linkObject &&
                  linkObject.link_url.indexOf("javascript:") < 0
                ) {
                  if (!intUrl.test(linkObject.link_url)) {
                    if (
                      linkObject.link_url.indexOf("WT.ac_id") >= 0 ||
                      linkObject.link_url.indexOf("WT.mc_id") >= 0
                    ) {
                      linkObject.link_url = removeParam(
                        "WT.mc_id",
                        linkObject.link_url
                      );
                    }
                    switch (linkObject.link_type) {
                      case "yara social":
                        eventAction = "Click on Yara social media channels";
                        eventCategory = "Outbound links";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle =
                          "Outbound links: " + linkObject.link_url;
                        wtCustomDl = "99";
                        break;
                      case "download brandlibrary":
                        eventAction = "Download brand library";
                        eventCategory = "Downloads";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle = "Downloads: " + linkObject.link_url;
                        wtCustomDl = "20";
                        break;
                      case "telephone link":
                        eventAction = "Click telephone number";
                        eventCategory = "Communication";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle =
                          "Click telephone number: " + linkObject.link_url;
                        wtCustomDl = "23";
                        break;
                      case "mail link":
                        eventAction = "Click on E-mail";
                        eventCategory = "Communication";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle = "E-mail click: " + linkObject.link_url;
                        wtCustomDl = "23";
                        break;
                      case "download link":
                        eventAction = linkObject.link_type;
                        eventCategory = "Downloads";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle = "Downloads: " + linkObject.link_url;
                        wtCustomDl = "20";
                        break;
                      case "local site":
                        eventAction = "Click on local site link";
                        eventCategory = "Outbound links";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle =
                          "Local site click: " + linkObject.link_url;
                        wtCustomDl = "24";
                        break;
                      case "recruitment site":
                        eventAction = "Click on recruitment link";
                        eventCategory = "Outbound links";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle =
                          "Recruitment form click: " + linkObject.link_url;
                        wtCustomDl = "24";
                        break;
                      default:
                        eventAction = "Click on link";
                        eventCategory = "Outbound links";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle =
                          "Outbound links: " + linkObject.link_url;
                        wtCustomDl = "24";
                        if (linkObject.link_url.indexOf("tms_click") >= 0) {
                          let tmsObj = handleTms(linkObject.link_url);
                          tmsClickId =
                            tmsObj.tms_click +
                            "|" +
                            tmsObj.customer_segment +
                            "|" +
                            tmsObj.tms_click_orig_page +
                            "|" +
                            tmsObj.tms_click_dest_page;
                          origPage = tmsObj.tms_click_orig_page;
                          destPage = tmsObj.tms_click_dest_page;
                          tms = true;
                        }
                    }
                    if (tms) {
                      utag.link({
                        event_action: eventAction,
                        event_category: eventCategory,
                        event_label: eventLabel,
                        tms_click_orig_page: origPage,
                        tms_click_dest_page: destPage,
                        tms_click_id: tmsClickId,
                        wt_custom_title: wtCustomTitle,
                        wt_custom_dl: wtCustomDl,
                      });
                    } else {
                      utag.link({
                        event_action: eventAction,
                        event_category: eventCategory,
                        event_label: eventLabel,
                        wt_custom_title: wtCustomTitle,
                        wt_custom_dl: wtCustomDl,
                      });
                    }
                  } else {
                    switch (linkObject.link_type) {
                      case "yara social":
                        eventAction = "Click on Yara social media channels";
                        eventCategory = "Outbound links";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle =
                          "Outbound links: " + linkObject.link_url;
                        wtCustomDl = "99";
                        break;
                      case "download link":
                        eventAction = linkObject.link_type;
                        eventCategory = "Downloads";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle = "Downloads: " + linkObject.link_url;
                        wtCustomDl = "20";
                        break;
                      case "social link":
                        eventAction = linkObject.link_type;
                        eventCategory = "Social";
                        eventLabel = linkObject.link_url;
                        wtCustomTitle = "Social link: " + linkObject.link_title;
                        wtCustomDl = "99";
                        break;
                      default:
                        break;
                    }
                    utag.link({
                      event_action: eventAction,
                      event_category: eventCategory,
                      event_label: eventLabel,
                      wt_custom_title: wtCustomTitle,
                      wt_custom_dl: wtCustomDl,
                    });
                  }
                }
              };
            } catch (e) {
              utag.DB(
                "Link link_tracker - UID 9 (" + e.name + ": " + e.message + ")"
              );
            }
          }
        } catch (e) {
          utag.DB(e);
        }
      } catch (e) {
        utag.DB(e);
      }
    }
  });
  if (utag.cfg.readywait || utag.cfg.waittimer) {
    utag.loader.EV("", "ready", function (a) {
      if (utag.loader.rf == 0) {
        utag.loader.rf = 1;
        utag.cfg.readywait = 1;
        utag.DB("READY:utag.cfg.readywait");
        setTimeout(function () {
          utag.loader.PINIT();
        }, utag.cfg.waittimer || 1);
      }
    });
  } else {
    utag.loader.PINIT();
  }
}
