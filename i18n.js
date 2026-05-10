/* Lightweight i18n for ARC site
   - Auto-detects from browser/system on first visit
   - Manual toggle persists in localStorage under 'arc-lang'
   - Translations applied via [data-i18n="key"] */

(function () {
    const STORAGE_KEY = 'arc-lang';

    const dict = {
        en: {
            'meta.title':         "Ankit Road Carriers",
            'brand.name':         "Ankit Road Carriers",
            'brand.tagline':      "Transport Operator · Commission Agent",
            'nav.home':           "Home",
            'nav.services':       "Operations",
            'nav.gallery':        "On the Ground",
            'nav.clients':        "Clients",
            'nav.contact':        "Contact",
            'banner.est':         "Celebrating 8 years of delivering excellence",
            'hero.eyebrow':       "Mangalore · Sonipat · Pan-India",
            'hero.title1':        "Eight",
            'hero.titleYears':    "years",
            'hero.title2':        "moving India's freight.",
            'hero.subtitle':      "Simplifying freight movement for manufacturers through reliable truck arrangements, responsive coordination, and personal support at every step.",
            'hero.cta1':          "What We Operate",
            'hero.cta2':          "Book a Load",
            'stat.years':         "Years on the road",
            'stat.estBracket':    "[Est. 2017]",
            'stat.branches':      "Branches · MNG / SNP",
            'stat.rating':        "Google rating",
            'stat.coverageVal':   "All India",
            'stat.coverage':      "Coverage on demand",
            'services.eyebrow':   "What we operate",
            'services.heading':   "Built for industrial freight.",
            'services.readMore':  "Read More",
            'services.close':     "Close",
            'service1.tag':       "Service 01 · Coordination",
            'service1.title':     "Commission Agent",
            'service1.body':      "We act as your booking desk on the ground in Mangalore and Sonipat, matching your consignment with the right operator, the right truck, and the right rate. Your goods don't wait in line.",
            'service2.tag':       "Service 02 · Capacity",
            'service2.title':     "Full Truck Loads",
            'service2.body':      "FTL movement from our Mangalore and Sonipat branches to every major industrial corridor in India, with deep lane experience on Kanpur, Lucknow, and Barabanki routes built up over 8 years.",
            'service3.tag':       "Service 03 · Yard",
            'service3.title':     "Lorry Parking",
            'service3.body':      "A secured parking facility near the port for drivers and operators between hauls. Rest, repair, and ready to roll when the next load is called.",

            'fleet.eyebrow':      "On the ground",
            'fleet.heading':      "Trucks. Yard. Team.",
            'fleet.caption':      "NMPT Yard · Panambur, Mangalore",
            'founder.eyebrow':    "Proprietor",
            'founder.name':       "Mangat Ram Sharma",
            'founder.role':       "Since 2017",
            'clients.eyebrow':    "Trusted by manufacturers",
            'clients.heading':    "We move freight for India's industrial floor.",
            'clients.intro':      "Long-standing relationships with manufacturers and exporters who depend on reliable, on-schedule dispatches.",
            'contact.eyebrow':    "Get in touch",
            'contact.heading':    "One call is all it takes to get your freight moving.",
            'contact.officesHeading': "Our Offices",
            'office.main':        "Main Office",
            'office.sub':         "Sub Branch",
            'office.new':         "NEW",
            'office.dispatch':    "Call us",
            'office.email':       "Email",
            'office.mainAddr':    "Beach Road, NMPT Timber Yard, Panambur, Mangalore 575 010",
            'office.subAddr':     "HSIIDC Office, T-Point above Jai Shree Ram Dharam Kanta Industrial Area, Rai, Sonipat, Haryana 131 029",
            'office.viewMainMap': "View Main Office on map",
            'office.viewSonipatMap': "View Sonipat Branch on map",
            'social.email':       "Email Us",
            'footer.rights':      "© 2026 Ankit Road Carriers. All rights reserved.",
        },
        hi: {
            'meta.title':         "अंकित रोड कैरियर्स",
            'brand.name':         "अंकित रोड कैरियर्स",
            'brand.tagline':      "ट्रांसपोर्ट ऑपरेटर · कमीशन एजेंट",
            'nav.home':           "होम",
            'nav.services':       "सेवाएँ",
            'nav.gallery':        "हमारी गतिविधियाँ",
            'nav.clients':        "ग्राहक",
            'nav.contact':        "संपर्क",
            'banner.est':         "उत्कृष्टता के 8 साल पूरे होने का जश्न",
            'hero.eyebrow':       "मंगलौर · सोनीपत · पूरे भारत में",
            'hero.title1':        "आठ",
            'hero.titleYears':    "साल से",
            'hero.title2':        "भारत का माल ढो रहे हैं।",
            'hero.subtitle':      "निर्माताओं के लिए भरोसेमंद ट्रक व्यवस्था, त्वरित समन्वय और हर कदम पर व्यक्तिगत सहायता के साथ माल ढुलाई को सरल बनाना।",
            'hero.cta1':          "हमारी सेवाएँ",
            'hero.cta2':          "लोड बुक करें",
            'stat.years':         "साल सड़क पर",
            'stat.estBracket':    "[स्थापना 2017]",
            'stat.branches':      "शाखाएँ · मंगलौर / सोनीपत",
            'stat.rating':        "गूगल रेटिंग",
            'stat.coverageVal':   "पूरा भारत",
            'stat.coverage':      "ज़रूरत के अनुसार सेवा",
            'services.eyebrow':   "हम क्या करते हैं",
            'services.heading':   "औद्योगिक माल ढुलाई के लिए बना।",
            'services.readMore':  "और पढ़ें",
            'services.close':     "बंद करें",
            'service1.tag':       "सेवा 01 · कोऑर्डिनेशन",
            'service1.title':     "कमीशन एजेंट",
            'service1.body':      "हम मंगलौर और सोनीपत में आपकी बुकिंग डेस्क हैं। आपके माल को सही ऑपरेटर, सही ट्रक और सही रेट से जोड़ते हैं। आपका माल लाइन में नहीं रुकता।",
            'service2.tag':       "सेवा 02 · क्षमता",
            'service2.title':     "फुल ट्रक लोड",
            'service2.body':      "हमारी मंगलौर और सोनीपत शाखाओं से भारत के हर बड़े औद्योगिक क्षेत्र तक एफटीएल मूवमेंट। कानपुर, लखनऊ और बाराबंकी रूट पर 8 साल का गहरा अनुभव।",
            'service3.tag':       "सेवा 03 · यार्ड",
            'service3.title':     "लॉरी पार्किंग",
            'service3.body':      "बंदरगाह के पास ड्राइवरों और ऑपरेटरों के लिए सुरक्षित पार्किंग सुविधा। आराम, मरम्मत, और अगले लोड के लिए तैयार।",

            'fleet.eyebrow':      "ज़मीन पर",
            'fleet.heading':      "ट्रक। यार्ड। टीम।",
            'fleet.caption':      "एनएमपीटी यार्ड · पनम्बूर, मंगलौर",
            'founder.eyebrow':    "कमान में",
            'founder.name':       "मंगत राम शर्मा",
            'founder.role':       "प्रोपराइटर, 2017 से",
            'clients.eyebrow':    "निर्माताओं का भरोसा",
            'clients.heading':    "हम भारत के औद्योगिक कारख़ानों के लिए माल ढोते हैं।",
            'clients.intro':      "उन निर्माताओं और निर्यातकों के साथ लंबा रिश्ता, जो एक भी डिस्पैच मिस नहीं कर सकते।",
            'contact.eyebrow':    "हमसे संपर्क करें",
            'contact.heading':    "एक कॉल करें, बाकी हम सँभाल लेंगे।",
            'contact.officesHeading': "हमारे कार्यालय",
            'office.main':        "मुख्य कार्यालय",
            'office.sub':         "उप शाखा",
            'office.new':         "नया",
            'office.dispatch':    "हमें कॉल करें",
            'office.email':       "ईमेल",
            'office.mainAddr':    "बीच रोड, एनएमपीटी टिम्बर यार्ड, पनम्बूर, मंगलौर 575 010",
            'office.subAddr':     "एचएसआईआईडीसी कार्यालय, टी-पॉइंट, जय श्री राम धर्म कांटा के ऊपर, औद्योगिक क्षेत्र, राई, सोनीपत, हरियाणा 131 029",
            'office.viewMainMap': "मुख्य कार्यालय का नक्शा देखें",
            'office.viewSonipatMap': "सोनीपत शाखा का नक्शा देखें",
            'social.email':       "ईमेल भेजें",
            'footer.mark':        "एआरसी · स्थापना 2017 · मंगलौर",
            'footer.rights':      "© 2026 अंकित रोड कैरियर्स. सर्वाधिकार सुरक्षित।",
        }
    };

    function detectInitialLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'hi') return stored;
        const sysLangs = (navigator.languages && navigator.languages.length)
            ? navigator.languages
            : [navigator.language || 'en'];
        for (const l of sysLangs) {
            if (l && l.toLowerCase().startsWith('hi')) return 'hi';
        }
        return 'en';
    }

    function applyLang(lang, animate) {
        const table = dict[lang] || dict.en;
        const root  = document.documentElement;
        const isInitial = !root.hasAttribute('data-lang');

        const swap = () => {
            root.lang = lang;
            root.setAttribute('data-lang', lang);

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (table[key] != null) {
                    if (el.tagName === 'TITLE') {
                        document.title = table[key];
                    } else {
                        el.textContent = table[key];
                    }
                }
            });

            document.querySelectorAll('.lang-toggle .lang-opt').forEach(opt => {
                opt.classList.toggle('is-active', opt.dataset.lang === lang);
            });
        };

        if (!animate || isInitial) {
            swap();
            return;
        }

        // Full-page wipe: sweep in → swap text behind curtain → sweep out
        const wipe = document.getElementById('langWipe');
        if (!wipe) { swap(); return; }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            swap();
            return;
        }

        root.classList.add('lang-switching');

        const onWipeOutEnd = () => {
            wipe.classList.remove('wipe-out');
            root.classList.remove('lang-switching');
        };

        const onWipeInEnd = () => {
            // Text swaps while fully covered
            swap();

            // Phase 2: wipe sweeps out to right
            wipe.classList.remove('wipe-in');
            wipe.classList.add('wipe-out');
            wipe.addEventListener('animationend', onWipeOutEnd, { once: true });
        };

        // Phase 1: wipe sweeps in from left
        wipe.classList.remove('wipe-out');
        wipe.classList.add('wipe-in');
        wipe.addEventListener('animationend', onWipeInEnd, { once: true });
    }

    function init() {
        const lang = detectInitialLang();
        applyLang(lang);

        const toggle = document.getElementById('langToggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (document.documentElement.classList.contains('lang-switching')) return;

                const current = document.documentElement.getAttribute('data-lang') || 'en';
                const next = current === 'hi' ? 'en' : 'hi';
                localStorage.setItem(STORAGE_KEY, next);
                applyLang(next, true);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
