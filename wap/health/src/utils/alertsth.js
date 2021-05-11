! function (t, e) {
    var i = 0,
        s = e,
        a = e.document;

    function r(t) {
        if (!(this instanceof r)) return new r(t).init();
        this.opts = t || {}, this.uuid = i, this.type = this.opts.type || "doubleBtn", this.alertType = this.opts.alertType ||
            "", this.alertCls = this.opts.alertCls || "", this.title = this.opts.title || "", this.msg = this.opts.msg ||
            "", this.cancelText = this.opts.cancelText || "取消", this.confirmText = this.opts.confirmText || "确定", this.cancel =
            this.opts.cancel || "", this.confirm = this.opts.confirm || "", this.callback = this.opts.callback || "",
            this.delay = this.opts.delay || 2e3
    }
    r.prototype = {
        constructor: r,
        getEl: function (t, e) {
            return t.querySelector(e)
        },
        init: function () {
            return i++, document.querySelector("#_alert-box_") || this.setStyle(), this.addAlertBox(), "mini" ==
                this.type ? this.minEvent() : this.alertEvent(), this
        },
        addAlertBox: function () {
            var t = this.getPos();
            "fixed" == this.alertType ? this.getFixedMask() : this.getMask(), "fixed" == this.alertType ? this.getEl(
                    a, "#alertMask_" + this.uuid).insertAdjacentHTML("beforeend", this.getHtml()) : this.getEl(
                    a, "body").insertAdjacentHTML("beforeend", this.getHtml()), this.alertBox = this.getEl(a,
                    "#alertBox_" + this.uuid), "fixed" == this.alertType ? this.alertBox.style.cssText =
                "width:" + parseInt(t.width - 50) +
                "px;left:25px;top:50%;-webkit-transform:translate3d(0,-50%,0);" : this.alertBox.style.cssText =
                "width:" + parseInt(t.width - 50) + "px;left:25px;top:" + parseInt(t.sTop + s.innerHeight / 2 -
                    this.alertBox.offsetHeight / 2) + "px;", this.callback && "function" == typeof this.callback &&
                "mini" != this.type && this.callback()
        },
        setStyle: function () {
            var t = a.createElement("style");
            t.type = "text/css", t.id = "_alert-box_", t.innerText =
                ".alert-box{position:absolute;left:0;top:0;border-radius:0.2rem;background:#FFF;-webkit-box-sizing:border-box;z-index:100;font-size:0.6rem;}.alert-msg{padding:0.4rem 0.6rem 0.6rem;text-align:center;line-height:1.8;word-break:break-all;}.alert-title{padding:0.6rem 0.6rem 0;text-align:center;}.alert-btn{display:-webkit-flex !important;display:-webkit-box;border-top:1px solid #DCDCDC;}.alert-btn a{display:block;-webkit-flex:1 !important;-webkit-box-flex:1;height:1.68rem;line-height:1.68rem;text-align:center;color:#333;text-decoration:none;}.alert-btn a.alert-confirm{border-left:1px solid #DCDCDC;color:#EDA200;}.alert-btn a.alert-confirm.single{border-left:none;}.alert-mini-box{border-radius:0.2rem;background:rgba(0,0,0,.7);color:#fff;}",
                this.getEl(a, "head").appendChild(t)
        },
        getPos: function () {
            var t = a.documentElement.offsetWidth || a.body.offsetWidth,
                e = a.documentElement.offsetHeight || a.body.offsetHeight,
                i = a.documentElement.scrollTop || a.body.scrollTop;
            return s.innerHeight > e && (e = s.innerHeight), {
                width: t,
                height: e,
                sTop: i
            }
        },
        getHtml: function () {
            var t = "";
            if ("mini" != this.type) {
                switch (t += '<div class="alert-box ' + this.alertCls + '" id="alertBox_' + this.uuid +
                    '"><div class="alert-title">' + this.title + '</div><div class="alert-msg">' + this.msg +
                    '</div><div class="alert-btn">', this.type) {
                    case "doubleBtn":
                        t += '<a href="javascript:;" class="alert-cancel mr10">' + this.cancelText +
                            '</a><a href="javascript:;" class="alert-confirm">' + this.confirmText + "</a>";
                        break;
                    case "onceCancel":
                        t += '<a href="javascript:;" class="alert-cancel">' + this.cancelText + "</a>";
                        break;
                    case "onceConfirm":
                        t += '<a href="javascript:;" class="alert-confirm single">' + this.confirmText + "</a>"
                }
                t += "</div></div>"
            } else t += '<div class="alert-box alert-mini-box ' + this.alertCls + '"  id="alertBox_' + this.uuid +
                '"><div class="alert-msg">' + this.msg + "</div></div>";
            return t
        },
        getMask: function () {
            var t = this.getPos(),
                e = a.createElement("div");
            e.id = "alertMask_" + this.uuid, this.getEl(a, "body").appendChild(e), e.style.cssText =
                "position:absolute;left:0;top:0;width:" + t.width + "px;height:" + t.height +
                "px;background:rgba(0,0,0,0.3);z-index:99", "mini" == this.type && (e.style.backgroundColor =
                    "rgba(255, 255, 255, 0)")
        },
        getFixedMask: function () {
            var t = a.createElement("div");
            t.id = "alertMask_" + this.uuid, this.getEl(a, "body").appendChild(t), t.style.cssText =
                "position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.3);z-index:99;"
        },
        minEvent: function () {
            var t = this;
            setTimeout(function () {
                navigator.userAgent.match(/iPhone/i) && "undefined" != typeof Zepto ? $(t.alertBox).fadeOut(
                        500,
                        function () {
                            t.getEl(a, "body").removeChild(t.alertBox), t.callback && "function" ==
                                typeof t.callback && t.callback()
                        }) : (t.remove(t.alertBox), t.callback && "function" == typeof t.callback && t.callback()),
                    t.remove(t.getEl(a, "#alertMask_" + t.uuid))
            }, t.delay)
        },
        alertEvent: function () {
            if (this.alertBox) {
                var t = this.getEl(this.alertBox, ".alert-cancel"),
                    e = this.getEl(this.alertBox, ".alert-confirm");
                t && this.reset(t, this.cancel), e && this.reset(e, this.confirm)
            }
        },
        reset: function (t, e) {
            var i = this;
            t.onclick = function () {
                !1 !== (e && "function" == typeof e && e(this)) && ("fixed" != i.alertType && i.remove(i.alertBox),
                    i.remove(i.getEl(a, "#alertMask_" + i.uuid)))
            }
        },
        remove: function (t) {
            try {
                this.getEl(a, "body").removeChild(t)
            } catch (t) {}
        },
        destroy: function () {
            this.alertBox && this.alertBox.parentNode.removeChild(this.alertBox), this.remove(this.getEl(a,
                "#alertMask_" + this.uuid))
        }
    }, t.AlertBox = function (t) {
        return r(t)
    }
}(window.Wap = window.Wap || {}, window);