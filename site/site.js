/* Stamina11 page script: the ribbon (signature move) and the hero's pointer
   response. The scroll-craft engine is untouched; this reads scroll and
   pointer state only. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- the ribbon ----- */

  var svg = document.querySelector(".ribbon");
  var path = document.getElementById("ribbonPath");
  var tip = document.getElementById("ribbonTip");

  if (svg && path) {
    // One continuous ribbon meandering down the column, resolving into "11".
    // One continuous stroke: the meander, then a curl that writes "11".
    path.setAttribute(
      "d",
      "M 150 -20" +
        " C 236 70, 62 132, 128 214" +
        " C 196 298, 46 336, 108 424" +
        " C 172 514, 66 552, 134 622" +
        " C 160 652, 150 650, 122 664" +
        " L 148 640 L 148 762" +
        " C 152 726, 168 700, 186 682" +
        " L 212 658 L 212 762"
    );

    var total = path.getTotalLength();
    path.style.strokeDasharray = String(total);

    var target = 0;
    var shown = reduced ? 1 : 0;
    var peakAct = null;
    var acts = document.querySelectorAll("[data-sc-act]");
    for (var i = 0; i < acts.length; i++) {
      if (acts[i].querySelector(".peak-stage")) peakAct = acts[i];
    }

    function pageProgress() {
      var doc = document.documentElement;
      var max = Math.max(1, doc.scrollHeight - window.innerHeight);
      return Math.min(1, Math.max(0, (window.scrollY || doc.scrollTop) / max));
    }

    function silenceDip() {
      // The ribbon breathes out during the dark before the peak (authored
      // silence), then returns as the subject appears.
      if (!peakAct) return 0;
      var r = peakAct.getBoundingClientRect();
      var vh = window.innerHeight;
      if (r.top > vh || r.bottom < 0) return 0;
      var travel = Math.max(1, r.height - vh);
      var p = Math.min(1, Math.max(0, -r.top / travel));
      if (p < 0.2) return p / 0.2; // fading down as the dark arrives
      if (p < 0.5) return 1; // held low through the silence
      if (p < 0.8) return 1 - (p - 0.5) / 0.3;
      return 0;
    }

    function paint(p) {
      path.style.strokeDashoffset = String(total * (1 - p));
      var dip = reduced ? 0 : silenceDip();
      path.style.opacity = String((reduced ? 0.3 : 0.85) - dip * 0.62);
      if (tip && !reduced) {
        var pt = path.getPointAtLength(total * p);
        tip.setAttribute("cx", pt.x);
        tip.setAttribute("cy", pt.y);
        tip.style.opacity = p > 0.01 && p < 0.996 ? String(0.9 - dip * 0.7) : "0";
      }
    }

    if (reduced) {
      paint(1);
    } else {
      var raf = null;
      function frame() {
        shown += (target - shown) * 0.14;
        if (Math.abs(target - shown) < 0.0004) shown = target;
        paint(shown);
        raf = shown === target ? null : requestAnimationFrame(frame);
      }
      function onScroll() {
        target = pageProgress();
        if (raf === null) raf = requestAnimationFrame(frame);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
      paint(0);
    }
  }

  /* ----- the hero leans with the pointer ----- */

  if (!reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var hero = document.querySelector(".hero-stage");
    if (hero) {
      var tx = 0, ty = 0, cx = 0, cy = 0, pending = null;
      function lean() {
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        hero.style.setProperty("--wx", cx.toFixed(4));
        hero.style.setProperty("--wy", cy.toFixed(4));
        pending =
          Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002
            ? requestAnimationFrame(lean)
            : null;
      }
      window.addEventListener(
        "pointermove",
        function (e) {
          tx = (e.clientX / window.innerWidth) * 2 - 1;
          ty = (e.clientY / window.innerHeight) * 2 - 1;
          if (pending === null) pending = requestAnimationFrame(lean);
        },
        { passive: true }
      );
    }
  }
})();
