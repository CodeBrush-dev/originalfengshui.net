// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.originalfengshui.net",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.originalfengshui.net/","title_tag":"Feng Shui Consultations & Store | Original Feng Shui","meta_description":"Canada Feng Shui expert offering Feng Shui consultations, audits and remedies plus Feng Shui products in Canada’s oldest Feng Shui Store in Toronto, Ontario."},{"page_url":"https://www.originalfengshui.net/on-line-store","title_tag":"Feng Shui Store & Products | Original Feng Shui","meta_description":"Shop Canada’s oldest Feng Shui Store for authentic Feng Shui products, remedies and cures to support prosperity stars, health, harmony and positive Chi at home."},{"page_url":"https://www.originalfengshui.net/feng-shui-calendar","title_tag":"Flying Stars Update & Feng Shui Calendar | Original","meta_description":"Follow Flying Stars update and Feng Shui calendar monthly energies. Learn how shifting stars affect your home and apply Feng Shui remedies to enhance prosperity."},{"page_url":"https://www.originalfengshui.net/about","title_tag":"Canada Feng Shui Consultations | Original Feng Shui","meta_description":"Canada Feng Shui master offering traditional Feng Shui consultations in Toronto and beyond, integrating psychic energy work, meditation and classical training."},{"page_url":"https://www.originalfengshui.net/connect","title_tag":"Canada Feng Shui Consultations Contact | Original","meta_description":"Contact Original Feng Shui in Toronto, Ontario for Canada Feng Shui consultations, audits and remedies for homes and businesses. Call, email or visit our store."},{"page_url":"https://www.originalfengshui.net/fs-audit","title_tag":"Feng Shui Audits & Remedies | Original Feng Shui","meta_description":"Traditional Feng Shui audits for homes and businesses in Canada. Expert analysis of Chi flow, dates for moves and renovations, and tailored Feng Shui remedies."},{"page_url":"https://www.originalfengshui.net/blog","title_tag":"Feng Shui Blog & Updates | Original Feng Shui","meta_description":"Read the Original Feng Shui blog for insights on traditional Feng Shui, masters, practice in Canada and links to Flying Stars update and monthly energies guidance."}],"keywords":["feng shui consultations","flying stars update","feng shui calendar","feng shui store","feng shui products","monthly energies","canada feng shui","feng shui audits","feng shui remedies","prosperity stars"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.originalfengshui.net/#localbusiness",
  "name": "Original Feng Shui",
  "url": "https://www.originalfengshui.net/",
  "description": "Original Feng Shui is Canada’s oldest Feng Shui store offering Feng Shui products, consultations, and traditional/classical Feng Shui audits in Toronto, Ontario.",
  "image": "https://static.wixstatic.com/media/46acf2_11ab0578337f460282938cb1f6dbef2d.jpg/v1/fill/w_635,h_448,al_c,lg_1,q_80,enc_avif,quality_auto/46acf2_11ab0578337f460282938cb1f6dbef2d.jpg",
  "telephone": "+1-416-533-1168",
  "email": "mailto:originalfengshui@outlook.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "945 Bloor St West",
    "addressLocality": "Toronto",
    "addressRegion": "Ontario",
    "postalCode": "M6H-1L5",
    "addressCountry": "CA"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Ontario"
  },
  "founder": {
    "@type": "Person",
    "name": "Hugo Pratissoli",
    "description": "Feng Shui Master/Practitioner with over 35 years of experience in psychic readings, counselling, healing, and balancing of energy fields, combining energy work with Traditional Feng Shui."
  },
  "sameAs": [
    "https://www.pinterest.com"    
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Feng Shui Consultations",
        "description": "Traditional Feng Shui consultations to analyze and balance energy flow in homes, offices, and businesses using classical methods and the five elements."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Feng Shui Audit",
        "description": "Traditional/Classical Feng Shui audit using a Lo'pan to assess landscape and building, identify chi flow, and recommend cures, enhancements, and auspicious dates for moving and renovations."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Online Feng Shui Store",
        "description": "Online store offering Feng Shui products, cures, and enhancers to support traditional Feng Shui applications."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Flying Stars Monthly Updates",
        "description": "Guidance on monthly Flying Stars energy shifts, including recommendations to fine-tune cures and maximize short-term opportunities in different sectors of a property."
      }
    }
  ]
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
