var customSearch;
! function (t) {
    "use strict";
    var a = 80;
    const o = t(".l_header", ".cover-wrapper");

    function n(e, o) {
        o = o || a;
        const n = e.href ? t(e.getAttribute("href")) : t(e);
        t("html, body").animate({
            scrollTop: n.offset().top - o
        }, 400)
    }
    o[0] && (a = o[0].clientHeight + 16), t(function () {
        var c;
        ! function () {
            if (!window.subData) return;
            const e = t("header .wrapper"),
                a = t(".s-comment", e),
                o = t(".s-toc", e);
            e.find(".nav-sub .logo").text(window.subData.title);
            let c = document.body.scrollTop;
            t(document, window).scroll(() => {
                const a = t(window).scrollTop(),
                    o = a - c;
                o >= 50 && a > 100 ? (c = a, e.addClass("sub")) : o <= -50 && (c = a, e.removeClass(
                    "sub"))
            });
            const r = t("#comments");
            r.length ? a.click(e => {
                e.preventDefault(), e.stopPropagation(), n(r)
            }) : a.remove();
            const s = t(".toc-wrapper");
            s.length && s.children().length ? o.click(e => {
                e.stopPropagation(), s.toggleClass("active")
            }) : o.remove()
        }(),
        function () {
            var e = t("body .navgation");
            e.find("li a.active").removeClass("active");
            var a = null,
                o = location.pathname.replace(/\/|%/g, "");
            0 == o.length && (o = "home");
            var n = o.match(/page\d{0,}$/g);
            n && (n = n[0], o = o.split(n)[0]);
            var c, r = o.match(/index.html/);
            r && (r = r[0], o = o.split(r)[0]), o && e && (a = t("#" + o, e), (c = a) && c.length && c.addClass(
                "active").siblings().removeClass("active"))
        }(), (c = t(".l_header .switcher .s-menu")).click(function (e) {
                e.stopPropagation(), t("body").toggleClass("z_menu-open"), c.toggleClass("active")
            }), t(document).click(function (e) {
                t("body").removeClass("z_menu-open"), c.removeClass("active")
            }),
            function () {
                var a = t(".l_header .switcher .s-search"),
                    o = t(".l_header"),
                    n = t(".l_header .m_search");
                0 !== a.length && (a.click(function (e) {
                    e.stopPropagation(), o.toggleClass("z_search-open"), n.find("input").focus()
                }), t(document).click(function (e) {
                    o.removeClass("z_search-open")
                }), n.click(function (e) {
                    e.stopPropagation()
                }), o.ready(function () {
                    o.bind("keydown", function (t) {
                        if (9 == t.keyCode) return !1;
                        var a, o, n = !!document.all;
                        n ? (a = window.event.keyCode, o = window.event) : (a = e.which, o =
                            e), 9 == a && (n ? (o.keyCode = 0, o.returnValue = !1) : (o
                            .which = 0, o.preventDefault()))
                    })
                }))
            }(),
            function () {
                const e = t(".toc-wrapper");
                if (0 === e.length) return;
                t(document).click(() => e.removeClass("active")), e.on("click", "a", t => {
                    t.preventDefault(), t.stopPropagation(), "A" === t.target.tagName ? n(t.target) :
                        "SPAN" === t.target.tagName && n(t.target.parentElement), e.removeClass(
                            "active")
                });
                const o = Array.from(e.find("li a")),
                    c = () => o.map(e => Math.floor(t(e.getAttribute("href")).offset().top - a));
                let r = c();
                const s = () => {
                    const e = t("html").scrollTop() || t("body").scrollTop();
                    if (!r) return;
                    let a, n = 0,
                        c = r.length - 1;
                    for (; n < c;) r[a = n + c + 1 >> 1] === e ? n = c = a : r[a] < e ? n = a : c = a - 1;
                    t(o).removeClass("active").eq(n).addClass("active")
                };
                t(window).resize(() => {
                    r = c(), s()
                }).scroll(() => {
                    s()
                }), s()
            }(),
            function () {
                const e = t(".menu .active"),
                    a = t(".s-top"),
                    c = t("h1.title", "#header-meta"),
                    r = t(".l_body");
                e.length && r && e.click(e => {
                    e.preventDefault(), e.stopPropagation(), n(r)
                }), c.length && r && c.click(e => {
                    e.preventDefault(), e.stopPropagation(), n(r)
                }), a.length && r && a.click(e => {
                    e.preventDefault(), e.stopPropagation(), n(r)
                });
                const s = t(".cover-wrapper");
                var l = 0;
                s[0] && (l = s[0].clientHeight - 164);
                var i = document.body.scrollTop;
                t(document, window).scroll(() => {
                    const e = t(window).scrollTop(),
                        n = e - i;
                    i = e, e > 150 ? (a.addClass("show"), n > 0 ? a.removeClass("hl") : a.addClass("hl")) :
                        a.removeClass("show").removeClass("hl"), e > l ? o.addClass("show") : o.removeClass(
                            "show")
                })
            }(), setTimeout(function () {
                t("#loading-bar-wrapper").fadeOut(500)
            }, 300), "google" === SEARCH_SERVICE ? customSearch = new GoogleCustomSearch({
                apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
                engineId: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
                imagePath: "/images/"
            }) : "algolia" === SEARCH_SERVICE ? customSearch = new AlgoliaSearch({
                apiKey: ALGOLIA_API_KEY,
                appId: ALGOLIA_APP_ID,
                indexName: ALGOLIA_INDEX_NAME,
                imagePath: "/images/"
            }) : "hexo" === SEARCH_SERVICE ? customSearch = new HexoSearch({
                imagePath: "/images/"
            }) : "azure" === SEARCH_SERVICE ? customSearch = new AzureSearch({
                serviceName: AZURE_SERVICE_NAME,
                indexName: AZURE_INDEX_NAME,
                queryKey: AZURE_QUERY_KEY,
                imagePath: "/images/"
            }) : "baidu" === SEARCH_SERVICE && (customSearch = new BaiduSearch({
                apiId: BAIDU_API_ID,
                imagePath: "/images/"
            }))
    })
}(jQuery);