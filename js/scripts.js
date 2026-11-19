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
    // Konum izni verilmezse kullanılacak yedek koordinat (İstanbul)
    const varsayilanKoordinat = [41.0082, 28.9784];

    // Türkiye 81 İl Merkezi Koordinatları
    const ilMerkezleri = {
        "adana": [37.0000, 35.3213],
        "adıyaman": [37.7648, 38.2786],
        "afyonkarahisar": [38.7507, 30.5567],
        "ağrı": [39.7191, 43.0503],
        "aksaray": [38.3687, 34.0370],
        "amasya": [40.6499, 35.8353],
        "ankara": [39.9334, 32.8597],
        "antalya": [36.8969, 30.7133],
        "ardahan": [41.1105, 42.7022],
        "artvin": [41.1828, 41.8183],
        "aydın": [37.8560, 27.8416],
        "balıkesir": [39.6484, 27.8826],
        "bartın": [41.6344, 32.3375],
        "batman": [37.8812, 41.1351],
        "bayburt": [40.2552, 40.2249],
        "bilecik": [40.0567, 30.0665],
        "bingöl": [38.8854, 40.4983],
        "bitlis": [38.3938, 42.1232],
        "bolu": [40.7392, 31.6089],
        "burdur": [37.7203, 30.2908],
        "bursa": [40.1885, 29.0610],
        "çanakkale": [40.1553, 26.4142],
        "çankırı": [40.6013, 33.6134],
        "çorum": [40.5506, 34.9556],
        "denizli": [37.7765, 29.0864],
        "diyarbakır": [37.9144, 40.2306],
        "düzce": [40.8438, 31.1565],
        "edirne": [41.6818, 26.5623],
        "elazığ": [38.6810, 39.2264],
        "erzincan": [39.7500, 39.5000],
        "erzurum": [39.9000, 41.2700],
        "eskişehir": [39.7767, 30.5206],
        "gaziantep": [37.0662, 37.3833],
        "giresun": [40.9128, 38.3895],
        "gümüşhane": [40.4600, 39.4814],
        "hakkari": [37.5833, 43.7333],
        "hatay": [36.4018, 36.3498],
        "ığdır": [39.9237, 44.0450],
        "ısparta": [37.7648, 30.5566],
        "istanbul": [41.0082, 28.9784],
        "izmir": [38.4237, 27.1428],
        "kahramanmaraş": [37.5858, 36.9371],
        "karabük": [41.2061, 32.6204],
        "karaman": [37.1759, 33.2287],
        "kars": [40.6013, 43.0975],
        "kastamonu": [41.3887, 33.7827],
        "kayseri": [38.7312, 35.4787],
        "kırıkkale": [39.8468, 33.5153],
        "kırklareli": [41.7333, 27.2167],
        "kırşehir": [39.1425, 34.1709],
        "kilis": [36.7184, 37.1212],
        "kocaeli": [40.8533, 29.8815],
        "konya": [37.8746, 32.4932],
        "kütahya": [39.4167, 29.9833],
        "malatya": [38.3552, 38.3095],
        "manisa": [38.6191, 27.4289],
        "mardin": [37.3212, 40.7245],
        "mersin": [36.8121, 34.6415],
        "muğla": [37.2153, 28.3636],
        "muş": [38.9462, 41.7539],
        "nevşehir": [38.6939, 34.6857],
        "niğde": [37.9667, 34.6833],
        "ordu": [40.9839, 37.8764],
        "osmaniye": [37.0742, 36.2476],
        "rize": [41.0201, 40.5234],
        "sakarya": [40.7569, 30.3781],
        "samsun": [41.2867, 36.3300],
        "siirt": [37.9333, 41.9500],
        "sinop": [42.0231, 35.1531],
        "sivas": [39.7477, 37.0179],
        "şanlıurfa": [37.1591, 38.7969],
        "şırnak": [37.4187, 42.4918],
        "tekirdağ": [40.9833, 27.5167],
        "tokat": [40.3167, 36.5500],
        "trabzon": [41.0027, 39.7168],
        "tunceli": [39.1079, 39.5401],
        "uşak": [38.6823, 29.4082],
        "van": [38.4891, 43.4089],
        "yalova": [40.6500, 29.2667],
        "yozgat": [39.8181, 34.8147],
        "zonguldak": [41.4564, 31.7987]
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

    // Türkçe karakter uyumlu küçük harfe çevirme yardımcısı
    function turkceKucuk(metin = "") {
        return metin.toLocaleLowerCase("tr").trim();
    }

    // Arama metnini normalize eder ("samsun merkez" -> il: "samsun", merkezMi: true)
    function sorguyuCozumle(arananYer) {
        const temiz = turkceKucuk(arananYer).replace(/\s+/g, " ");
        const parcalar = temiz.split(",").map(p => p.trim()).filter(Boolean);

        // Tek parça veya "X, merkez" / "X merkez" durumlarını kontrol et
        if (parcalar.length === 1) {
            const tek = parcalar[0];
            if (ilMerkezleri[tek]) {
                return { il: tek, ilce: null, merkezMi: true };
            }
            // "samsun merkez" veya "merkez samsun" gibi ifadeler
            const merkezOlmadan = tek.replace(/\bmerkez\b/g, "").trim();
            if (merkezOlmadan && ilMerkezleri[merkezOlmadan]) {
                return { il: merkezOlmadan, ilce: null, merkezMi: true };
            }
            return { il: null, ilce: tek, merkezMi: false };
        }

        const ilk = parcalar[0].replace(/\bmerkez\b/g, "").trim();
        const ikinci = parcalar[1].replace(/\bmerkez\b/g, "").trim();

        if (ilMerkezleri[ikinci] && (!ilk || ilk === "merkez")) {
            return { il: ikinci, ilce: null, merkezMi: true };
        }
        if (ilMerkezleri[ilk] && (!ikinci || ikinci === "merkez")) {
            return { il: ilk, ilce: null, merkezMi: true };
        }

        return { il: ikinci || null, ilce: ilk || null, merkezMi: false };
    }

    // Dönen aday sonuçlar arasından en doğru il/ilçe/yer kaydını seçer
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
                if (ilAdi.includes(cozulen.il)) puan += 50;
                if (ilceAdi.includes(cozulen.ilce) || nameAdi.includes(cozulen.ilce)) puan += 50;
            } else if (cozulen.ilce) {
                if (nameAdi === cozulen.ilce || ilceAdi === cozulen.ilce) puan += 80;
                if (addrsType === "village" || addrsType === "hamlet") puan -= 30;
            }

            if (puan > enYuksekPuan) {
                enYuksekPuan = puan;
                enIyiKayit = item;
            }
        }

        return enIyiKayit;
    }

    function haritayiKonumaOdakla(lat, lon, baslik, aciklama, zoomSeviyesi = 14) {
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

        // 1. İl veya "[İl] merkez" aramasıysa 81 il merkez koordinatını doğrudan kullan
        if (cozulen.il && cozulen.merkezMi && ilMerkezleri[cozulen.il]) {
            const [lat, lon] = ilMerkezleri[cozulen.il];
            const gorunenAd = cozulen.il.charAt(0).toLocaleUpperCase("tr") + cozulen.il.slice(1) + " Merkez";
            haritayiKonumaOdakla(lat, lon, gorunenAd, `${gorunenAd}, Türkiye`, 12);
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
