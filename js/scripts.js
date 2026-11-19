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
    // Varsayılan koordinat: Elazığ Merkez
    const varsayilanKoordinat = [38.6810, 39.2264];

    // Elazığ il sınırları (güneybatı - kuzeydoğu bounding box)
    const elazigSinirlari = L.latLngBounds(
        [38.12, 38.45],
        [39.28, 40.38]
    );

    // Elazığ İlçeleri Detaylı Veritabanı (Merkez + 10 İlçe)
    const elazigIlceleri = {
        "merkez": {
            ad: "Elazığ Merkez",
            coords: [38.6810, 39.2264],
            zoom: 13,
            ozet: "İlin idari, ticari ve kültürel merkezi; Harput tarihi bölgesi ve Fırat Üniversitesi kampüsleriyle öne çıkar.",
            mahalleler: ["İzzetpaşa", "Sürsürü", "Hilalkent", "Ataşehir", "Harput", "Doğukent", "Yıldızbağları", "Rızaiye"],
            oneCikanlar: ["Tarihi Harput Kalesi", "Ulu Camii", "Buzluk Mağarası", "Kültür Park"],
            merkezeUzaklik: "0 km (İl Merkezi)"
        },
        "ağın": {
            ad: "Ağın",
            coords: [38.9436, 38.7164],
            zoom: 14,
            ozet: "Keban Baraj Gölü kıyısında yer alan, tarihi taş evleri ve leblebisiyle bilinen sakin bir ilçe.",
            mahalleler: ["Merkez", "Bademli", "Pul", "Yeniköy"],
            oneCikanlar: ["Ağın Leblebisi", "Keban Baraj Gölü Kıyısı", "Geleneksel Taş Evler"],
            merkezeUzaklik: "~68 km"
        },
        "alacakaya": {
            ad: "Alacakaya",
            coords: [38.7139, 40.1456],
            zoom: 14,
            ozet: "Yüksek kaliteli krom yatakları ve mermer kaynaklarıyla tanınan, doğu kesiminde yer alan ilçe.",
            mahalleler: ["Merkez", "Esenlik", "Yıldırım"],
            oneCikanlar: ["Krom Madenciliği", "Mermer Ocakları", "Dağlık Vadiler"],
            merkezeUzaklik: "~105 km"
        },
        "arıcak": {
            ad: "Arıcak",
            coords: [38.5833, 40.1333],
            zoom: 14,
            ozet: "İlin güneydoğusunda yüksek rakımlı ve engebeli coğrafyaya sahip, doğayla iç içe ilçe.",
            mahalleler: ["Merkez", "Bükardı", "Üçocak"],
            oneCikanlar: ["Yüksek Yaylalar", "Bükardı Beldesi", "Doğal Kaynak Suları"],
            merkezeUzaklik: "~118 km"
        },
        "baskil": {
            ad: "Baskil",
            coords: [38.5667, 38.8167],
            zoom: 14,
            ozet: "Fırat Nehri ve Karakaya Baraj Gölü kıyısında bulunan, kayısı ve badem üretimiyle öne çıkan ilçe.",
            mahalleler: ["Merkez", "Akuşağı", "Hacıuşağı", "Kuşsarayı"],
            oneCikanlar: ["Karakaya Baraj Gölü", "Kayısı & Badem Bahçeleri", "Saklıkap Kanyonu"],
            merkezeUzaklik: "~42 km"
        },
        "karakoçan": {
            ad: "Karakoçan",
            coords: [38.9500, 40.0167],
            zoom: 14,
            ozet: "Termal kaynakları, yaylaları ve tarım-hayvancılık potansiyeliyle dikkat çeken kuzeydoğu ilçesi.",
            mahalleler: ["Merkez", "Sarıcan", "Kocadayı", "Başyurt"],
            oneCikanlar: ["Koçyiğit Kaplıcaları", "Sarıcan Beldesi", "Yayla Turizmi"],
            merkezeUzaklik: "~102 km"
        },
        "keban": {
            ad: "Keban",
            coords: [38.7950, 38.7450],
            zoom: 14,
            ozet: "Türkiye'nin en önemli hidroelektrik santrallerinden Keban Barajı ile anılan, alabalığıyla ünlü ilçe.",
            mahalleler: ["Merkez", "Fırat", "Akgömlek", "Denizli"],
            oneCikanlar: ["Keban Barajı ve Hidroelektrik Santrali", "Keban Alabalığı", "Baraj Gölü Manzarası"],
            merkezeUzaklik: "~46 km"
        },
        "kovancılar": {
            ad: "Kovancılar",
            coords: [38.7208, 39.8736],
            zoom: 14,
            ozet: "Önemli kara yolu ve demir yolu güzergahı üzerinde yer alan, gelişmiş ticaret ve tarım ilçesi.",
            mahalleler: ["Merkez", "Çakırkaş", "Yarımca", "Gökçedal"],
            oneCikanlar: ["Kovancılar Ovası", "Çakırkaş Beldesi", "Ulaşım Kavşağı"],
            merkezeUzaklik: "~72 km"
        },
        "maden": {
            ad: "Maden",
            coords: [38.3917, 39.6750],
            zoom: 14,
            ozet: "Tarihi madencilik geçmişi, Dicle Nehri'nin doğduğu bölge olması ve sarp vadileriyle tanınan ilçe.",
            mahalleler: ["Merkez", "Bahadır", "Gezin", "Çayır"],
            oneCikanlar: ["Dicle Nehri Kaynağı", "Tarihi Maden Dokusu", "Hazar Gölü Yakınlığı"],
            merkezeUzaklik: "~80 km"
        },
        "palu": {
            ad: "Palu",
            coords: [38.6917, 39.9667],
            zoom: 14,
            ozet: "Murat Nehri kıyısında kurulu, tarihi kalesi, eski köprüsü ve köklü kültürel mirasıyla bilinen ilçe.",
            mahalleler: ["Merkez", "Yeni", "Karşıbahçeler", "Beyhan"],
            oneCikanlar: ["Tarihi Palu Kalesi", "Murat Nehri ve Tarihi Köprü", "Üryan Baba Türbesi"],
            merkezeUzaklik: "~75 km"
        },
        "sivrice": {
            ad: "Sivrice",
            coords: [38.4500, 39.3167],
            zoom: 14,
            ozet: "Tektonik Hazar Gölü kıyısında konumlanan, yazlıkları, plajları ve Hazarbaba Dağı ile öne çıkan turizm ilçesi.",
            mahalleler: ["Merkez", "Gözeli", "Yedikardeş", "Hazar"],
            oneCikanlar: ["Hazar Gölü", "Hazarbaba Kayak Merkezi", "Göl Sahili ve Mesire Alanları"],
            merkezeUzaklik: "~30 km"
        }
    };

    // Haritayı Elazığ merkezinde ve Elazığ sınırlarına kilitli olarak başlat
    const map = L.map("map", {
        zoomControl: false,
        minZoom: 9,
        maxBounds: elazigSinirlari,
        maxBoundsViscosity: 1.0
    }).setView(varsayilanKoordinat, 13);

    L.control.zoom({
        position: "bottomright"
    }).addTo(map);

    // 1. Katman Tanımları (Standart Harita ve Etiketli Uydu Görüntüsü)
    const sokakHaritasi = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap | ÇekBildir Elazığ 2026"
    });

    // API anahtarı gerektirmeyen uydu fotoğrafı katmanı
    const uyduGorseli = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri | ÇekBildir Elazığ 2026"
    });

    // Uydu üzerinde açık/beyaz renkli şehir, ilçe, mahalle ve yer isimleri katmanı
    const yerEtiketleri = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd",
        attribution: "&copy; OpenStreetMap &copy; CARTO"
    });

    // Sınır ve yer isimleri katmanı
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
    if (katmanBtn) {
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
    }

    // Başlangıç işaretçisi ve doğruluk dairesi
    let marker = L.marker(varsayilanKoordinat)
        .addTo(map)
        .bindPopup("<b>Elazığ Haritası</b><br>Elazığ Merkez");
    let dogrulukDairesi = null;

    // Seçilen ilçenin detayını ekranda göstermek için kapsayıcıyı hazırla
    function ilceDetayKutusunuGetir() {
        let kart = document.getElementById("ilce-detay-karti");
        if (!kart) {
            const aramaInput = document.getElementById("il-ilce-input");
            kart = document.createElement("div");
            kart.id = "ilce-detay-karti";
            kart.className = "card shadow-sm mt-3 d-none";
            kart.style.zIndex = "1050";

            if (aramaInput && aramaInput.parentElement) {
                aramaInput.parentElement.insertAdjacentElement("afterend", kart);
            } else {
                document.body.appendChild(kart);
            }
        }
        return kart;
    }

    function ilceDetayiniEkrandaGoster(bilgi) {
        const kart = ilceDetayKutusunuGetir();
        const mahalleEtiketleri = (bilgi.mahalleler || [])
            .map(m => `<span class="badge bg-light text-dark border me-1 mb-1">${m}</span>`)
            .join("");
        const oneCikanListe = (bilgi.oneCikanlar || [])
            .map(item => `<li class="small mb-1"><i class="fas fa-check-circle text-success me-1"></i>${item}</li>`)
            .join("");

        kart.classList.remove("d-none");
        kart.innerHTML = `
            <div class="card-body p-3">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h6 class="card-title mb-0 fw-bold">${bilgi.ad}</h6>
                        <small class="text-muted">Merkeze Uzaklık: ${bilgi.merkezeUzaklik} • ${bilgi.coords[0].toFixed(4)}, ${bilgi.coords[1].toFixed(4)}</small>
                    </div>
                    <button type="button" class="btn-close" aria-label="Kapat" id="ilce-detay-kapat-btn"></button>
                </div>
                <p class="small text-secondary mb-2">${bilgi.ozet}</p>
                <div class="mb-2">
                    <div class="small fw-semibold mb-1">Öne Çıkan Yerler & Özellikler:</div>
                    <ul class="list-unstyled mb-0">${oneCikanListe}</ul>
                </div>
                <div>
                    <div class="small fw-semibold mb-1">Başlıca Mahalle / Semtler:</div>
                    <div>${mahalleEtiketleri}</div>
                </div>
            </div>
        `;

        const kapatBtn = document.getElementById("ilce-detay-kapat-btn");
        if (kapatBtn) {
            kapatBtn.addEventListener("click", () => kart.classList.add("d-none"));
        }
    }

    // --- KÜFÜR, ARGO VE SAÇMA İFADE FİLTRESİ ---
    function metniNormalizeEt(metin = "") {
        return metin
            .toLocaleLowerCase("tr")
            .replace(/ı/g, "i")
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c")
            .replace(/(.)\1{2,}/g, "$1");
    }

    const yasakliKokler = [
        "amk", "aq", "mk", "oç", "oc", "piç", "pic", "sik", "siktir", "yarrak",
        "taşak", "tassak", "ibne", "ipne", "göt", "got", "pezevenk", "kahpe",
        "orospu", "sürtük", "surtuk", "fahişe", "fahise", "mal", "aptal",
        "salak", "gerizekali", "geri zekali", "dangalak", "hıyar", "hiyar", "kezban"
    ];

    const klavyeKalipDizileri = ["qwerty", "asdf", "zxcv", "hjkl", "1234", "abcd"];

    function sacmaIfadeMi(metin) {
        const temiz = metin.trim();
        if (!temiz) return true;

        const norm = metniNormalizeEt(temiz);
        const kelimeler = norm.replace(/[^a-z0-9\s]/g, " ").trim().split(/\s+/).filter(Boolean);

        if (kelimeler.length === 1 && kelimeler[0].length < 3) {
            return true;
        }

        const birlesik = kelimeler.join("");
        if (klavyeKalipDizileri.some(kalip => birlesik.includes(kalip) && birlesik.length <= kalip.length + 2)) {
            return true;
        }

        const temizKar = temiz.replace(/\s+/g, "");
        if (temizKar.length >= 4) {
            const frekans = {};
            for (const ch of temizKar) {
                frekans[ch] = (frekans[ch] || 0) + 1;
            }
            const enCokTekrar = Math.max(...Object.values(frekans));
            if (enCokTekrar / temizKar.length >= 0.7) {
                return true;
            }
        }

        const sesliHarfler = /[aeıioöuü]/i;
        const sesliHarfsizUzunKelime = kelimeler.some(
            k => k.length >= 5 && !/^\d+$/.test(k) && !sesliHarfler.test(k)
        );
        if (sesliHarfsizUzunKelime) {
            return true;
        }

        if (/[bcçdfgğhjklmnprsştvyz]{4,}/i.test(norm)) {
            return true;
        }

        return false;
    }

    function metniFiltrele(metin) {
        const ham = (metin || "").trim();
        if (!ham) {
            return { gecerli: false, sebep: "Lütfen sorunla ilgili bir açıklama yazın." };
        }

        const norm = metniNormalizeEt(ham);
        const kelimeler = norm.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);

        const kufurVarMi = yasakliKokler.some(kok => {
            const normKok = metniNormalizeEt(kok);
            const kelimeEslesmesi = kelimeler.some(k => k === normKok || (normKok.length >= 4 && k.startsWith(normKok)));
            const bitisikEslesme = normKok.length >= 3 && norm.replace(/\s+/g, "").includes(normKok);
            return kelimeEslesmesi || bitisikEslesme;
        });

        if (kufurVarMi) {
            return {
                gecerli: false,
                sebep: "Lütfen küfür veya argo içeren ifadeler kullanmayın."
            };
        }

        if (sacmaIfadeMi(ham)) {
            return {
                gecerli: false,
                sebep: "Lütfen sorunu anlaşılır ve anlamlı bir şekilde ifade edin."
            };
        }

        return { gecerli: true, sebep: "" };
    }

    // --- SORUN BİLDİR TASARIMI, SU/GÖL KONTROLÜ, SİLME & YÖNETİMİ ---
    const sorunPanel = document.getElementById("sorun-bildir-panel");
    const sorunKapatBtn = document.getElementById("sorun-kapat-btn");
    const bildirimKoordinatMetni = document.getElementById("bildirim-koordinat-metni");
    const denizUyariKutusu = document.getElementById("deniz-uyari-kutusu");
    const denizBildirimiOnay = document.getElementById("deniz-bildirimi-onay");
    const fotografInput = document.getElementById("sorun-fotograf-input");
    const onizlemeKutusu = document.getElementById("fotograf-onizleme-kutusu");
    const onizlemeImg = document.getElementById("fotograf-onizleme-img");
    const fotografKaldirBtn = document.getElementById("fotograf-kaldir-btn");
    const yaziInput = document.getElementById("sorun-yazi-input");
    const sorunGonderBtn = document.getElementById("sorun-gonder-btn");

    let aktifTiklananLatLng = null;
    let secilenFotoDataUrl = null;
    let denizAlanindaMi = false;
    let bildirimSayaci = 0;
    const bildirimKatmani = L.layerGroup().addTo(map);
    const bildirimKayitlari = new Map();

    // Belirli bir bildirimi haritadan ve kayıtlardan siler
    function bildirimiSil(bildirimId) {
        const kayit = bildirimKayitlari.get(bildirimId);
        if (!kayit) return;

        bildirimKatmani.removeLayer(kayit.pin);
        bildirimKayitlari.delete(bildirimId);
        map.closePopup();

        const durumEtiketi = document.getElementById("secilen-konum");
        if (durumEtiketi) {
            durumEtiketi.innerText = "Seçilen sorun bildirimi silindi.";
        }
    }

    // Popup içindeki sil butonunu dinle (event delegation)
    map.on("popupopen", function (e) {
        const popupEl = e.popup.getElement();
        if (!popupEl) return;

        const silBtn = popupEl.querySelector(".sorun-sil-btn");
        if (!silBtn) return;

        silBtn.addEventListener("click", function () {
            const id = silBtn.getAttribute("data-bildirim-id");
            if (id) {
                bildirimiSil(id);
            }
        });
    });

    async function denizVeyaSuAlaniMi(latlng) {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&zoom=12&addressdetails=1`;
            const response = await fetch(url);
            if (!response.ok) return false;
            const data = await response.json();

            if (data && data.error) {
                return true;
            }

            const cls = (data.class || "").toLowerCase();
            const type = (data.type || "").toLowerCase();
            const category = (data.category || "").toLowerCase();
            const suTurleri = ["water", "sea", "ocean", "bay", "strait", "reservoir", "lake", "river", "canal", "maritime"];

            if (
                suTurleri.includes(cls) ||
                suTurleri.includes(type) ||
                suTurleri.includes(category)
            ) {
                return true;
            }

            const addr = data.address || {};
            const karaAlanlari = [
                addr.road, addr.suburb, addr.neighbourhood, addr.quarter,
                addr.district, addr.county, addr.town, addr.city, addr.village, addr.province, addr.state
            ].filter(Boolean);

            return karaAlanlari.length === 0;
        } catch (err) {
            console.warn("Su alanı kontrolü yapılamadı:", err);
            return false;
        }
    }

    function formuSifirla() {
        secilenFotoDataUrl = null;
        denizAlanindaMi = false;
        if (fotografInput) fotografInput.value = "";
        if (yaziInput) yaziInput.value = "";
        if (onizlemeImg) onizlemeImg.src = "";
        if (onizlemeKutusu) onizlemeKutusu.classList.add("d-none");
        if (denizUyariKutusu) denizUyariKutusu.classList.add("d-none");
        if (denizBildirimiOnay) denizBildirimiOnay.checked = false;
    }

    async function paneliAc(latlng) {
        if (!sorunPanel) return;
        aktifTiklananLatLng = latlng;
        formuSifirla();

        if (bildirimKoordinatMetni) {
            bildirimKoordinatMetni.innerText = `Koordinat: ${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)} (alan kontrol ediliyor...)`;
        }
        sorunPanel.classList.remove("d-none");

        denizAlanindaMi = await denizVeyaSuAlaniMi(latlng);

        if (!aktifTiklananLatLng || aktifTiklananLatLng.lat !== latlng.lat || aktifTiklananLatLng.lng !== latlng.lng) {
            return;
        }

        if (bildirimKoordinatMetni) {
            bildirimKoordinatMetni.innerText = denizAlanindaMi
                ? `Koordinat: ${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)} • Su / Baraj / Göl Alanı`
                : `Koordinat: ${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
        }

        if (denizUyariKutusu) {
            denizUyariKutusu.classList.toggle("d-none", !denizAlanindaMi);
        }
    }

    function paneliKapat() {
        if (!sorunPanel) return;
        sorunPanel.classList.add("d-none");
    }

    if (sorunKapatBtn) {
        sorunKapatBtn.addEventListener("click", paneliKapat);
    }

    if (fotografInput) {
        fotografInput.addEventListener("change", function () {
            const dosya = this.files && this.files[0];
            if (!dosya) {
                secilenFotoDataUrl = null;
                onizlemeKutusu.classList.add("d-none");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (olay) {
                secilenFotoDataUrl = olay.target.result;
                onizlemeImg.src = secilenFotoDataUrl;
                onizlemeKutusu.classList.remove("d-none");
            };
            reader.readAsDataURL(dosya);
        });
    }

    if (fotografKaldirBtn) {
        fotografKaldirBtn.addEventListener("click", function () {
            secilenFotoDataUrl = null;
            fotografInput.value = "";
            onizlemeImg.src = "";
            onizlemeKutusu.classList.add("d-none");
        });
    }

    if (sorunGonderBtn) {
        sorunGonderBtn.addEventListener("click", function () {
            const aciklama = yaziInput ? yaziInput.value.trim() : "";
            const denizOnayiVarMi = denizBildirimiOnay ? denizBildirimiOnay.checked : false;

            if (!aktifTiklananLatLng) {
                alert("Lütfen önce Elazığ haritasından bir konum seçin.");
                return;
            }

            if (denizAlanindaMi && !denizOnayiVarMi) {
                alert("Bu nokta su/baraj/göl alanında görünüyor. Su/Kıyı Bildirimi olarak göndermek için kutuyu işaretleyin veya kara üzerinden bir konum seçin.");
                return;
            }

            if (!secilenFotoDataUrl && !aciklama) {
                alert("Lütfen fotoğraf ekleyin veya sorunla ilgili yazı girin.");
                return;
            }

            if (aciklama) {
                const filtreSonucu = metniFiltrele(aciklama);
                if (!filtreSonucu.gecerli) {
                    alert(filtreSonucu.sebep);
                    if (yaziInput) yaziInput.focus();
                    return;
                }
            }

            const bildirimId = `bildirim_${++bildirimSayaci}`;
            const denizBildirimiMi = denizAlanindaMi && denizOnayiVarMi;
            const etiketBasligi = denizBildirimiMi ? "Su / Kıyı Bildirimi" : "Sorun Bildirimi";
            const pinRengi = denizBildirimiMi ? "#0d6efd" : "#dc3545";

            const fotoHtml = secilenFotoDataUrl
                ? `<div class="mb-2"><img src="${secilenFotoDataUrl}" alt="Sorun fotoğrafı" style="width: 100%; max-height: 130px; object-fit: cover; border-radius: 6px;"></div>`
                : "";

            const guvenliYazi = aciklama
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");

            const yaziHtml = aciklama
                ? `<p class="mb-2 small">${guvenliYazi}</p>`
                : "";

            const yeniPin = L.circleMarker(aktifTiklananLatLng, {
                radius: 9,
                color: "#ffffff",
                weight: 2,
                fillColor: pinRengi,
                fillOpacity: 0.95
            }).addTo(bildirimKatmani);

            yeniPin.bindPopup(`
                <div style="min-width: 190px;">
                    <strong style="color: ${pinRengi};">${etiketBasligi}</strong>
                    <div class="text-muted" style="font-size: 11px; margin-bottom: 6px;">
                        ${aktifTiklananLatLng.lat.toFixed(5)}, ${aktifTiklananLatLng.lng.toFixed(5)}
                    </div>
                    ${fotoHtml}
                    ${yaziHtml}
                    <button type="button" class="btn btn-sm btn-outline-danger w-100 py-1 sorun-sil-btn" data-bildirim-id="${bildirimId}">
                        <i class="fas fa-trash-alt me-1"></i>Sorunu Sil
                    </button>
                </div>
            `);

            bildirimKayitlari.set(bildirimId, { pin: yeniPin, latlng: aktifTiklananLatLng });
            yeniPin.openPopup();

            const durumEtiketi = document.getElementById("secilen-konum");
            if (durumEtiketi) {
                durumEtiketi.innerText = `${etiketBasligi} Elazığ haritasına eklendi.`;
            }
            paneliKapat();
        });
    }

    // Haritaya tıklandığında işaretçiyi taşı ve Sorun Bildir panelini aç
    map.on("click", function (e) {
        if (!elazigSinirlari.contains(e.latlng)) {
            const durumEtiketi = document.getElementById("secilen-konum");
            if (durumEtiketi) {
                durumEtiketi.innerText = "Lütfen Elazığ il sınırları içinden bir nokta seçin.";
            }
            return;
        }

        const lat = e.latlng.lat.toFixed(5);
        const lng = e.latlng.lng.toFixed(5);

        if (dogrulukDairesi) {
            map.removeLayer(dogrulukDairesi);
        }

        marker
            .setLatLng(e.latlng)
            .setPopupContent(`Seçilen Konum (Elazığ):<br>Enlem: ${lat}, Boylam: ${lng}`)
            .openPopup();

        const durumEtiketi = document.getElementById("secilen-konum");
        if (durumEtiketi) {
            durumEtiketi.innerText = `Seçilen Koordinat: ${lat}, ${lng}`;
        }
        paneliAc(e.latlng);
    });

    // Kullanıcının Kendi GPS Konumunu Bulma Fonksiyonu (Elazığ sınırları içinde)
    function mevcutKonumaGit() {
        const durumEtiketi = document.getElementById("secilen-konum");

        if (!navigator.geolocation) {
            if (durumEtiketi) durumEtiketi.innerText = "Tarayıcınız konum özelliğini desteklemiyor. Elazığ Merkez gösteriliyor.";
            return;
        }

        if (durumEtiketi) durumEtiketi.innerText = "Mevcut konumunuz bulunuyor...";

        navigator.geolocation.getCurrentPosition(
            function (pozisyon) {
                const lat = pozisyon.coords.latitude;
                const lng = pozisyon.coords.longitude;
                const dogruluk = pozisyon.coords.accuracy;
                const konumLatLng = L.latLng(lat, lng);

                if (!elazigSinirlari.contains(konumLatLng)) {
                    map.flyTo(varsayilanKoordinat, 13);
                    marker
                        .setLatLng(varsayilanKoordinat)
                        .setPopupContent("<b>Elazığ Merkez</b><br>Konumunuz Elazığ sınırları dışında.")
                        .openPopup();
                    if (durumEtiketi) durumEtiketi.innerText = "Konumunuz Elazığ sınırları dışında; Elazığ Merkez gösteriliyor.";
                    return;
                }

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

                if (durumEtiketi) durumEtiketi.innerText = `Konumunuz: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            },
            function (hata) {
                map.setView(varsayilanKoordinat, 13);
                marker.setLatLng(varsayilanKoordinat);

                let hataMesaji = "Konum alınamadı, Elazığ Merkez gösteriliyor.";
                if (hata.code === hata.PERMISSION_DENIED) {
                    hataMesaji = "Konum izni verilmedi. Elazığ haritasından manuel seçim yapabilirsiniz.";
                } else if (hata.code === hata.POSITION_UNAVAILABLE) {
                    hataMesaji = "Konum bilgisine ulaşılamadı. Elazığ Merkez gösteriliyor.";
                } else if (hata.code === hata.TIMEOUT) {
                    hataMesaji = "Konum alma zaman aşımına uğradı. Elazığ Merkez gösteriliyor.";
                }
                if (durumEtiketi) durumEtiketi.innerText = hataMesaji;
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

    function ilceAnahtariBul(arananMetin) {
        const norm = metniNormalizeEt(arananMetin)
            .replace(/\belazig\b/g, "")
            .replace(/\bilcesi\b/g, "")
            .replace(/\bilçesi\b/g, "")
            .replace(/,/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        if (!norm || norm === "merkez" || norm === "elazig merkez") {
            return "merkez";
        }

        if (elazigIlceleri[norm]) {
            return norm;
        }

        for (const [anahtar, bilgi] of Object.entries(elazigIlceleri)) {
            const normAd = metniNormalizeEt(bilgi.ad).replace(/\belazig\b/g, "").trim();
            if (norm === normAd || normAd.includes(norm) || norm.includes(normAd)) {
                return anahtar;
            }
        }

        return null;
    }

    function enUygunElazigSonucuSec(sonuclar, arananTerim) {
        let enIyiKayit = null;
        let enYuksekPuan = -Infinity;
        const hedef = turkceKucuk(arananTerim);

        for (const item of sonuclar) {
            const lat = parseFloat(item.lat);
            const lon = parseFloat(item.lon);
            if (!elazigSinirlari.contains(L.latLng(lat, lon))) {
                continue;
            }

            let puan = parseFloat(item.importance || 0) * 10;
            const addr = item.address || {};
            const ilAdi = turkceKucuk(addr.province || addr.state || "");
            const ilceAdi = turkceKucuk(addr.district || addr.county || addr.town || addr.city || "");
            const nameAdi = turkceKucuk(item.name || "");
            const displayAdi = turkceKucuk(item.display_name || "");
            const addrsType = item.addresstype || item.type || "";

            const elazigIcindeMi = ilAdi.includes("elazığ") || ilAdi.includes("elazig") || displayAdi.includes("elazığ") || displayAdi.includes("elazig");

            if (elazigIcindeMi) {
                puan += 120;
            }

            if (nameAdi === hedef || ilceAdi === hedef) {
                puan += 70;
            } else if (nameAdi.includes(hedef) || ilceAdi.includes(hedef)) {
                puan += 35;
            }

            if (addrsType === "village" || addrsType === "hamlet") {
                puan -= 20;
            }

            if (puan > enYuksekPuan) {
                enYuksekPuan = puan;
                enIyiKayit = item;
            }
        }

        return enIyiKayit;
    }

    function haritayiKonumaOdakla(lat, lon, baslik, aciklama, zoomSeviyesi = 14, popupIcerik = null) {
        if (!elazigSinirlari.contains(L.latLng(lat, lon))) {
            const durumEtiketi = document.getElementById("secilen-konum");
            if (durumEtiketi) durumEtiketi.innerText = `"${baslik}" Elazığ sınırları dışında.`;
            return;
        }

        if (dogrulukDairesi) {
            map.removeLayer(dogrulukDairesi);
        }

        map.flyTo([lat, lon], zoomSeviyesi);

        marker
            .setLatLng([lat, lon])
            .setPopupContent(popupIcerik || `<b>${baslik}</b><br><small>${aciklama}</small>`)
            .openPopup();

        const durumEtiketi = document.getElementById("secilen-konum");
        if (durumEtiketi) {
            durumEtiketi.innerText = `Konum: ${baslik} (${lat.toFixed(5)}, ${lon.toFixed(5)})`;
        }
    }

    function ilceyeGit(ilceAnahtari) {
        const bilgi = elazigIlceleri[ilceAnahtari];
        if (!bilgi) return;

        const inputEl = document.getElementById("il-ilce-input");
        if (inputEl) {
            inputEl.value = bilgi.ad;
        }

        const popupHtml = `
            <div style="min-width: 210px;">
                <strong>${bilgi.ad}</strong><br>
                <span class="text-muted" style="font-size: 11px;">Merkeze uzaklık: ${bilgi.merkezeUzaklik}</span>
                <p class="mb-1 mt-1" style="font-size: 12px;">${bilgi.ozet}</p>
                <div style="font-size: 11px;"><b>Öne Çıkanlar:</b> ${(bilgi.oneCikanlar || []).join(", ")}</div>
            </div>
        `;

        haritayiKonumaOdakla(
            bilgi.coords[0],
            bilgi.coords[1],
            bilgi.ad,
            `${bilgi.ad}, Elazığ, Türkiye`,
            bilgi.zoom,
            popupHtml
        );

        ilceDetayiniEkrandaGoster(bilgi);
    }

    // Sayfada #elazig-ilce-butonlari kapsayıcısı varsa ilçe butonlarını üret
    const ilceButonKapsayici = document.getElementById("elazig-ilce-butonlari");
    if (ilceButonKapsayici) {
        Object.entries(elazigIlceleri).forEach(([anahtar, bilgi]) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn btn-sm btn-outline-secondary me-1 mb-1";
            btn.textContent = bilgi.ad.replace("Elazığ ", "");
            btn.addEventListener("click", () => ilceyeGit(anahtar));
            ilceButonKapsayici.appendChild(btn);
        });
    }

    // Elazığ İçi İlçe / Mahalle / Yer Arama Fonksiyonu
    async function konumaGit() {
        const inputEl = document.getElementById("il-ilce-input");
        const arananYer = inputEl ? inputEl.value.trim() : "";
        const durumEtiketi = document.getElementById("secilen-konum");

        if (!arananYer) {
            alert("Lütfen Elazığ'da bir ilçe, mahalle veya yer adı girin.");
            return;
        }

        const bulunanIlceAnahtari = ilceAnahtariBul(arananYer);
        if (bulunanIlceAnahtari) {
            ilceyeGit(bulunanIlceAnahtari);
            return;
        }

        if (durumEtiketi) durumEtiketi.innerText = `Elazığ içinde "${arananYer}" aranıyor...`;

        try {
            const sorguMetni = `${arananYer}, Elazığ, Türkiye`;
            const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(sorguMetni)}&countrycodes=tr&limit=10`;
            const response = await fetch(url);
            const data = await response.json();

            const secilen = data && data.length > 0 ? enUygunElazigSonucuSec(data, arananYer) : null;

            if (secilen) {
                const lat = parseFloat(secilen.lat);
                const lon = parseFloat(secilen.lon);
                const tamAd = secilen.display_name;

                haritayiKonumaOdakla(lat, lon, arananYer, tamAd, 15);
            } else {
                if (durumEtiketi) durumEtiketi.innerText = `Elazığ sınırları içinde "${arananYer}" bulunamadı.`;
            }
        } catch (error) {
            console.error("Konum arama hatası:", error);
            if (durumEtiketi) durumEtiketi.innerText = "Konum aranırken bir bağlantı hatası oluştu.";
        }
    }

    // Sayfa ilk açıldığında otomatik olarak kullanıcının konumunu iste
    mevcutKonumaGit();

    // Olay dinleyicileri
    const mevcutKonumBtn = document.getElementById("mevcut-konum-btn");
    const konumAraBtn = document.getElementById("konum-ara-btn");
    const ilIlceInput = document.getElementById("il-ilce-input");

    if (mevcutKonumBtn) mevcutKonumBtn.addEventListener("click", mevcutKonumaGit);
    if (konumAraBtn) konumAraBtn.addEventListener("click", konumaGit);
    if (ilIlceInput) {
        ilIlceInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                konumaGit();
            }
        });
    }
});
