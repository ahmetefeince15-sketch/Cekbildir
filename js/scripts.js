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
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
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
    };

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

    // Ham uydu fotoğrafı katmanı
    const uyduGorseli = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri | ÇekBildir 2026"
    });

    // Uydu üzerine gelecek şeffaf şehir, ilçe, mahalle ve sokak isimleri katmanı
    const yerEtiketleri = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd",
        attribution: "&copy; OpenStreetMap &copy; CARTO"
    });

    // Uydu görüntüsü ve yer isimlerini tek bir hibrit grup altında birleştir
    const uyduHaritasi = L.layerGroup([uyduGorseli, yerEtiketleri]);

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
                const dogruluk = pozisyon.coords.accuracy; // metre cinsinden doğruluk

                // Haritayı kullanıcının konumuna odakla
                map.flyTo([lat, lng], 16);

                // İşaretçiyi güncelle
                marker
                    .setLatLng([lat, lng])
                    .setPopupContent(`<b>Mevcut Konumunuz</b><br>Doğruluk: ~${Math.round(dogruluk)} metre`)
                    .openPopup();

                // Önceki doğruluk dairesi varsa temizle ve yenisini çiz
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
                enableHighAccuracy: true, // GPS ile en yüksek doğruluğu ister
                timeout: 10000,
                maximumAge: 0
            }
        );
    }

    // İl ve İlçe Arama Fonksiyonu
    async function konumaGit() {
        const arananYer = document.getElementById("il-ilce-input").value.trim();
        const durumEtiketi = document.getElementById("secilen-konum");

        if (!arananYer) {
            alert("Lütfen bir il veya ilçe adı girin.");
            return;
        }

        durumEtiketi.innerText = `"${arananYer}" aranıyor...`;

        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(arananYer)}&countrycodes=tr&limit=1`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                const tamAd = data[0].display_name;

                if (dogrulukDairesi) {
                    map.removeLayer(dogrulukDairesi);
                }

                map.flyTo([lat, lon], 14);

                marker
                    .setLatLng([lat, lon])
                    .setPopupContent(`<b>${arananYer}</b><br><small>${tamAd}</small>`)
                    .openPopup();

                durumEtiketi.innerText = `Konum: ${arananYer} (${lat.toFixed(5)}, ${lon.toFixed(5)})`;
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
