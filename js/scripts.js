/*!
- Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
- Copyright 2013-2023 Start Bootstrap
- Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

document.addEventListener("DOMContentLoaded", function () {
    // Konum izni verilmezse kullanılacak yedek koordinat (İstanbul - Fatih/Eminönü merkez)
    const varsayilanKoordinat = [41.0082, 28.9784];

    // 81 İl İçin Merkez İlçe / Şehir Merkezi Bilgileri (Merkez İlçe Adı ve Koordinatı)
    const ilMerkezIlceleri = {
        "adana": { ilce: "Seyhan", coords: [36.9914, 35.3308] },
        "adıyaman": { ilce: "Merkez", coords: [37.7648, 38.2786] },
        "afyonkarahisar": { ilce: "Merkez", coords: [38.7507, 30.5567] },
        "ağrı": { ilce: "Merkez", coords: [39.7191, 43.0503] },
        "aksaray": { ilce: "Merkez", coords: [38.3687, 34.0370] },
        "amasya": { ilce: "Merkez", coords: [40.6499, 35.8353] },
        "ankara": { ilce: "Çankaya", coords: [39.9208, 32.8541] },
        "antalya": { ilce: "Muratpaşa", coords: [36.8841, 30.7056] },
        "ardahan": { ilce: "Merkez", coords: [41.1105, 42.7022] },
        "artvin": { ilce: "Merkez", coords: [41.1828, 41.8183] },
        "aydın": { ilce: "Efeler", coords: [37.8450, 27.8396] },
        "balıkesir": { ilce: "Karesi", coords: [39.6484, 27.8826] },
        "bartın": { ilce: "Merkez", coords: [41.6344, 32.3375] },
        "batman": { ilce: "Merkez", coords: [37.8812, 41.1351] },
        "bayburt": { ilce: "Merkez", coords: [40.2552, 40.2249] },
        "bilecik": { ilce: "Merkez", coords: [40.0567, 30.0665] },
        "bingöl": { ilce: "Merkez", coords: [38.8854, 40.4983] },
        "bitlis": { ilce: "Merkez", coords: [38.3938, 42.1232] },
        "bolu": { ilce: "Merkez", coords: [40.7392, 31.6089] },
        "burdur": { ilce: "Merkez", coords: [37.7203, 30.2908] },
        "bursa": { ilce: "Osmangazi", coords: [40.1885, 29.0610] },
        "çanakkale": { ilce: "Merkez", coords: [40.1553, 26.4142] },
        "çankırı": { ilce: "Merkez", coords: [40.6013, 33.6134] },
        "çorum": { ilce: "Merkez", coords: [40.5506, 34.9556] },
        "denizli": { ilce: "Pamukkale", coords: [37.7765, 29.0864] },
        "diyarbakır": { ilce: "Yenişehir", coords: [37.9144, 40.2306] },
        "düzce": { ilce: "Merkez", coords: [40.8438, 31.1565] },
        "edirne": { ilce: "Merkez", coords: [41.6818, 26.5623] },
        "elazığ": { ilce: "Merkez", coords: [38.6810, 39.2264] },
        "erzincan": { ilce: "Merkez", coords: [39.7500, 39.5000] },
        "erzurum": { ilce: "Yakutiye", coords: [39.9043, 41.2679] },
        "eskişehir": { ilce: "Tepebaşı", coords: [39.7767, 30.5206] },
        "gaziantep": { ilce: "Şahinbey", coords: [37.0662, 37.3833] },
        "giresun": { ilce: "Merkez", coords: [40.9128, 38.3895] },
        "gümüşhane": { ilce: "Merkez", coords: [40.4600, 39.4814] },
        "hakkari": { ilce: "Merkez", coords: [37.5833, 43.7333] },
        "hatay": { ilce: "Antakya", coords: [36.2025, 36.1604] },
        "ığdır": { ilce: "Merkez", coords: [39.9237, 44.0450] },
        "ısparta": { ilce: "Merkez", coords: [37.7648, 30.5566] },
        "istanbul": { ilce: "Fatih", coords: [41.0082, 28.9784] },
        "izmir": { ilce: "Konak", coords: [38.4237, 27.1428] },
        "kahramanmaraş": { ilce: "Dulkadiroğlu", coords: [37.5858, 36.9371] },
        "karabük": { ilce: "Merkez", coords: [41.2061, 32.6204] },
        "karaman": { ilce: "Merkez", coords: [37.1759, 33.2287] },
        "kars": { ilce: "Merkez", coords: [40.6013, 43.0975] },
        "kastamonu": { ilce: "Merkez", coords: [41.3887, 33.7827] },
        "kayseri": { ilce: "Kocasinan", coords: [38.7312, 35.4787] },
        "kırıkkale": { ilce: "Merkez", coords: [39.8468, 33.5153] },
        "kırklareli": { ilce: "Merkez", coords: [41.7333, 27.2167] },
        "kırşehir": { ilce: "Merkez", coords: [39.1425, 34.1709] },
        "kilis": { ilce: "Merkez", coords: [36.7184, 37.1212] },
        "kocaeli": { ilce: "İzmit", coords: [40.7654, 29.9408] },
        "konya": { ilce: "Selçuklu", coords: [37.8746, 32.4932] },
        "kütahya": { ilce: "Merkez", coords: [39.4167, 29.9833] },
        "malatya": { ilce: "Battalgazi", coords: [38.3552, 38.3095] },
        "manisa": { ilce: "Yunusemre", coords: [38.6191, 27.4289] },
        "mardin": { ilce: "Artuklu", coords: [37.3129, 40.7350] },
        "mersin": { ilce: "Yenişehir", coords: [36.8121, 34.6415] },
        "muğla": { ilce: "Menteşe", coords: [37.2153, 28.3636] },
        "muş": { ilce: "Merkez", coords: [38.9462, 41.7539] },
        "nevşehir": { ilce: "Merkez", coords: [38.6939, 34.6857] },
        "niğde": { ilce: "Merkez", coords: [37.9667, 34.6833] },
        "ordu": { ilce: "Altınordu", coords: [40.9839, 37.8764] },
        "osmaniye": { ilce: "Merkez", coords: [37.0742, 36.2476] },
        "rize": { ilce: "Merkez", coords: [41.0201, 40.5234] },
        "sakarya": { ilce: "Adapazarı", coords: [40.7731, 30.3948] },
        "samsun": { ilce: "İlkadım", coords: [41.2797, 36.3361] },
        "siirt": { ilce: "Merkez", coords: [37.9333, 41.9500] },
        "sinop": { ilce: "Merkez", coords: [42.0231, 35.1531] },
        "sivas": { ilce: "Merkez", coords: [39.7477, 37.0179] },
        "şanlıurfa": { ilce: "Haliliye", coords: [37.1591, 38.7969] },
        "şırnak": { ilce: "Merkez", coords: [37.4187, 42.4918] },
        "tekirdağ": { ilce: "Süleymanpaşa", coords: [40.9781, 27.5117] },
        "tokat": { ilce: "Merkez", coords: [40.3167, 36.5500] },
        "trabzon": { ilce: "Ortahisar", coords: [41.0027, 39.7168] },
        "tunceli": { ilce: "Merkez", coords: [39.1079, 39.5401] },
        "uşak": { ilce: "Merkez", coords: [38.6823, 29.4082] },
        "van": { ilce: "İpekyolu", coords: [38.4891, 43.4089] },
        "yalova": { ilce: "Merkez", coords: [40.6500, 29.2667] },
        "yozgat": { ilce: "Merkez", coords: [39.8181, 34.8147] },
        "zonguldak": { ilce: "Merkez", coords: [41.4564, 31.7987] }
    };

    // Haritayı başlat
    const map = L.map("map", {
        zoomControl: false
    }).setView(varsayilanKoordinat, 13);

    L.control.zoom({
        position: "bottomright"
    }).addTo(map);

    // 1. Katman Tanımları (Standart Harita ve Etiketli Uydu Görüntüsü)
    const sokakHaritasi = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap | ÇekBildir 2026"
    });

    // API anahtarı gerektirmeyen uydu fotoğrafı katmanı
    const uyduGorseli = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri | ÇekBildir 2026"
    });

    // Uydu üzerinde açık/beyaz renkli şehir, ilçe, mahalle ve yer isimleri katmanı
    const yerEtiketleri = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd",
        attribution: "&copy; OpenStreetMap &copy; CARTO"
    });

    // İsteğe bağlı ek sınır ve yer isimleri katmanı
    const esriSinirVeYerler = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 19,
        attribution: "Labels &copy; Esri"
    });

    // Uydu görüntüsü ve şehir/yer isimlerini tek bir hibrit grup altında birleştir
    const uyduHaritasi = L.layerGroup([uyduGorseli, esriSinirVeYerler, yerEtiketleri]);

    // Varsayılan olarak sokak haritasını ekle
    sokakHaritasi.addTo(map);
    let uyduAktif = false;

    // 2. Harita / Uydu Geçiş Butonu Dinleyicisi
    const katmanBtn = document.getElementById("katman-degistir-btn");
    katmanBtn.addEventListener("click", function () {
        if (!uyduAktif) {
            map.removeLayer(sokakHaritasi);
            uyduHaritasi.addTo(map);
            katmanBtn.innerHTML = '<i class="fas fa-map"></i> Harita Görünümü';
            katmanBtn.classList.replace("btn-light", "btn-dark");
            uyduAktif = true;
        } else {
            map.removeLayer(uyduHaritasi);
            sokakHaritasi.addTo(map);
            katmanBtn.innerHTML = '<i class="fas fa-satellite"></i> Uydu Görünümü';
            katmanBtn.classList.replace("btn-dark", "btn-light");
            uyduAktif = false;
        }
    });

    // Başlangıç işaretçisi ve doğruluk dairesi
    let marker = L.marker(varsayilanKoordinat).addTo(map);
    let dogrulukDairesi = null;

    // Haritaya tıklandığında işaretçiyi taşı
    map.on("click", function (e) {
        const lat = e.latlng.lat.toFixed(5);
        const lng = e.latlng.lng.toFixed(5);

        if (dogrulukDairesi) {
            map.removeLayer(dogrulukDairesi);
        }

        marker
            .setLatLng(e.latlng)
            .setPopupContent(`Seçilen Konum:<br>Enlem: ${lat}, Boylam: ${lng}`)
            .openPopup();

        document.getElementById("secilen-konum").innerText = `Seçilen Koordinat: ${lat}, ${lng}`;
    });

    // Kullanıcının Kendi GPS Konumunu Bulma Fonksiyonu
    function mevcutKonumaGit() {
        const durumEtiketi = document.getElementById("secilen-konum");

        if (!navigator.geolocation) {
            durumEtiketi.innerText = "Tarayıcınız konum özelliğini desteklemiyor.";
            return;
        }

        durumEtiketi.innerText = "Mevcut konumunuz bulunuyor...";

        navigator.geolocation.getCurrentPosition(
            function (pozisyon) {
                const lat = pozisyon.coords.latitude;
                const lng = pozisyon.coords.longitude;
                const dogruluk = pozisyon.coords.accuracy;

                map.flyTo([lat, lng], 16);

                marker
                    .setLatLng([lat, lng])
                    .setPopupContent(`<b>Mevcut Konumunuz</b><br>Doğruluk: ~${Math.round(dogruluk)} metre`)
                    .openPopup();

                if (dogrulukDairesi) {
                    map.removeLayer(dogrulukDairesi);
                }
                dogrulukDairesi = L.circle([lat, lng], {
                    radius: dogruluk,
                    color: "#198754",
                    fillColor: "#198754",
                    fillOpacity: 0.15
                }).addTo(map);

                durumEtiketi.innerText = `Konumunuz: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            },
            function (hata) {
                let hataMesaji = "Konum alınamadı.";
                if (hata.code === hata.PERMISSION_DENIED) {
                    hataMesaji = "Konum izni reddedildi. Haritadan manuel seçim yapabilirsiniz.";
                } else if (hata.code === hata.POSITION_UNAVAILABLE) {
                    hataMesaji = "Konum bilgisine şu an ulaşılamıyor.";
                } else if (hata.code === hata.TIMEOUT) {
                    hataMesaji = "Konum alma isteği zaman aşımına uğradı.";
                }
                durumEtiketi.innerText = hataMesaji;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }

    function turkceKucuk(metin = "") {
        return metin.toLocaleLowerCase("tr").trim();
    }

    function basHarfBuyuk(metin = "") {
        return metin
            .split(" ")
            .filter(Boolean)
            .map(kelime => kelime.charAt(0).toLocaleUpperCase("tr") + kelime.slice(1))
            .join(" ");
    }

    // "Samsun", "Samsun merkez", "Samsun, merkez" veya "İlkadım, Samsun" gibi girdileri çözümler
    function sorguyuCozumle(arananYer) {
        const temiz = turkceKucuk(arananYer).replace(/\s+/g, " ");
        const parcalar = temiz.split(",").map(p => p.trim()).filter(Boolean);

        if (parcalar.length === 1) {
            const tek = parcalar[0];
            if (ilMerkezIlceleri[tek]) {
                return { il: tek, ilce: ilMerkezIlceleri[tek].ilce, merkezMi: true };
            }
            const merkezOlmadan = tek.replace(/\bmerkez\b/g, "").trim();
            if (merkezOlmadan && ilMerkezIlceleri[merkezOlmadan]) {
                return { il: merkezOlmadan, ilce: ilMerkezIlceleri[merkezOlmadan].ilce, merkezMi: true };
            }
            return { il: null, ilce: tek, merkezMi: false };
        }

        const ilk = parcalar[0].replace(/\bmerkez\b/g, "").trim();
        const ikinci = parcalar[1].replace(/\bmerkez\b/g, "").trim();

        if (ilMerkezIlceleri[ikinci] && (!ilk || ilk === "merkez")) {
            return { il: ikinci, ilce: ilMerkezIlceleri[ikinci].ilce, merkezMi: true };
        }
        if (ilMerkezIlceleri[ilk] && (!ikinci || ikinci === "merkez")) {
            return { il: ilk, ilce: ilMerkezIlceleri[ilk].ilce, merkezMi: true };
        }

        return { il: ikinci || null, ilce: ilk || null, merkezMi: false };
    }

    function enUygunSonucuSec(sonuclar, cozulen) {
        let enIyiKayit = sonuclar[0];
        let enYuksekPuan = -Infinity;

        for (const item of sonuclar) {
            let puan = parseFloat(item.importance || 0) * 10;
            const addr = item.address || {};
            const ilAdi = turkceKucuk(addr.province || addr.state || "");
            const ilceAdi = turkceKucuk(addr.district || addr.county || addr.town || addr.city || "");
            const nameAdi = turkceKucuk(item.name || "");
            const addrsType = item.addresstype || item.type || "";

            if (cozulen.il && cozulen.ilce) {
                const hedefIl = turkceKucuk(cozulen.il);
                const hedefIlce = turkceKucuk(cozulen.ilce);
                if (ilAdi.includes(hedefIl)) puan += 50;
                if (ilceAdi === hedefIlce || nameAdi === hedefIlce) puan += 80;
                else if (ilceAdi.includes(hedefIlce) || nameAdi.includes(hedefIlce)) puan += 40;
            } else if (cozulen.ilce) {
                const hedefIlce = turkceKucuk(cozulen.ilce);
                if (nameAdi === hedefIlce || ilceAdi === hedefIlce) puan += 80;
                if (addrsType === "village" || addrsType === "hamlet") puan -= 30;
            }

            if (puan > enYuksekPuan) {
                enYuksekPuan = puan;
                enIyiKayit = item;
            }
        }

        return enIyiKayit;
    }

    function haritayiKonumaOdakla(lat, lon, baslik, aciklama, zoomSeviyesi = 13) {
        if (dogrulukDairesi) {
            map.removeLayer(dogrulukDairesi);
        }

        map.flyTo([lat, lon], zoomSeviyesi);

        marker
            .setLatLng([lat, lon])
            .setPopupContent(`<b>${baslik}</b><br><small>${aciklama}</small>`)
            .openPopup();

        document.getElementById("secilen-konum").innerText = `Konum: ${baslik} (${lat.toFixed(5)}, ${lon.toFixed(5)})`;
    }

    // İl ve İlçe Arama Fonksiyonu
    async function konumaGit() {
        const arananYer = document.getElementById("il-ilce-input").value.trim();
        const durumEtiketi = document.getElementById("secilen-konum");

        if (!arananYer) {
            alert("Lütfen bir il veya ilçe adı girin.");
            return;
        }

        const cozulen = sorguyuCozumle(arananYer);

        // İl veya "[İl] merkez" aramasında doğrudan merkez ilçe (ör. İlkadım, Samsun) koordinatına git
        if (cozulen.il && cozulen.merkezMi && ilMerkezIlceleri[cozulen.il]) {
            const merkezBilgi = ilMerkezIlceleri[cozulen.il];
            const [lat, lon] = merkezBilgi.coords;
            const ilAd = basHarfBuyuk(cozulen.il);
            const merkezAd = `${ilAd} (${merkezBilgi.ilce} Merkez)`;
            haritayiKonumaOdakla(lat, lon, merkezAd, `${merkezBilgi.ilce}, ${ilAd}, Türkiye`, 13);
            return;
        }

        durumEtiketi.innerText = `"${arananYer}" aranıyor...`;

        try {
            const sorguMetni = cozulen.il && cozulen.ilce
                ? `${cozulen.ilce}, ${cozulen.il}`
                : arananYer;

            const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(sorguMetni)}&countrycodes=tr&limit=10`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.length > 0) {
                const secilen = enUygunSonucuSec(data, cozulen);
                const lat = parseFloat(secilen.lat);
                const lon = parseFloat(secilen.lon);
                const tamAd = secilen.display_name;

                haritayiKonumaOdakla(lat, lon, arananYer, tamAd, 14);
            } else {
                durumEtiketi.innerText = `"${arananYer}" bulunamadı. Lütfen yazımı kontrol edin.`;
            }
        } catch (error) {
            console.error("Konum arama hatası:", error);
            durumEtiketi.innerText = "Konum aranırken bir bağlantı hatası oluştu.";
        }
    }

    // Sayfa ilk açıldığında otomatik olarak kullanıcının konumunu iste
    mevcutKonumaGit();

    // Olay dinleyicileri
    document.getElementById("mevcut-konum-btn").addEventListener("click", mevcutKonumaGit);
    document.getElementById("konum-ara-btn").addEventListener("click", konumaGit);
    document.getElementById("il-ilce-input").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            konumaGit();
        }
    });
});
