/* 福州易趣网络科技有限公司 官网脚本 */
(function () {
  "use strict";

  /* 滚动进度条 + 导航效果 */
  var header = document.querySelector(".site-header");
  var backTop = document.querySelector(".back-top");
  var progress = document.querySelector(".scroll-progress");
  function onScroll() {
    var y = window.scrollY;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (backTop) backTop.classList.toggle("show", y > 500);
    if (progress && docH > 0) progress.style.width = (y / docH * 100) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Hero 光斑视差（鼠标移动） */
  var orbs = document.querySelectorAll(".hero .orb");
  var hero = document.querySelector(".hero");
  if (hero && orbs.length && window.matchMedia("(pointer: fine)").matches) {
    var mx = 0, my = 0, cx = 0, cy = 0, raf = null;
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) {
        raf = requestAnimationFrame(function tick() {
          cx += (mx - cx) * 0.06;
          cy += (my - cy) * 0.06;
          orbs.forEach(function (o, i) {
            var depth = (i + 1) * 22;
            o.style.translate = (cx * depth) + "px " + (cy * depth) + "px";
          });
          raf = requestAnimationFrame(tick);
        });
      }
    });
  }

  /* 移动端菜单 */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  /* 滚动显现动画 */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* 仪表盘柱状图 / 能力条动画 */
  var dashEls = document.querySelectorAll(".dash, .team-card");
  if ("IntersectionObserver" in window && dashEls.length) {
    var dio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll(".dm-bars .bar").forEach(function (bar) {
          bar.style.height = bar.getAttribute("data-h") + "%";
        });
        e.target.querySelectorAll(".tb-fill").forEach(function (fill) {
          fill.style.width = fill.getAttribute("data-w") + "%";
        });
        dio.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    dashEls.forEach(function (el) { dio.observe(el); });
  } else {
    document.querySelectorAll(".dm-bars .bar").forEach(function (b) {
      b.style.height = b.getAttribute("data-h") + "%";
    });
    document.querySelectorAll(".tb-fill").forEach(function (f) {
      f.style.width = f.getAttribute("data-w") + "%";
    });
  }

  /* 数字滚动动画 */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var decimals = (el.getAttribute("data-count").split(".")[1] || "").length;
    var duration = 1500;
    var start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString("zh-CN");
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString("zh-CN");
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* 证书灯箱 */
  var certItems = document.querySelectorAll("[data-lightbox]");
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  function openLb(src, title) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLb() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  certItems.forEach(function (item) {
    item.addEventListener("click", function () {
      openLb(item.getAttribute("data-lightbox"), item.getAttribute("data-title"));
    });
  });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lb-close")) closeLb();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLb();
  });
})();
