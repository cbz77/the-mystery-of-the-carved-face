// =====================================================================
//  i18n.js - jednoduché přepínání jazyků (cz / en)
//  Texty jsou v souboru lang.json ve tvaru:
//      "klic": { "cz": "Český text", "en": "English text" }
//  V HTML:   data-i18n="klic"          -> nastaví textContent
//            data-i18n-html="klic"     -> nastaví innerHTML
//            data-i18n-attr="title:klic;alt:jiny_klic" -> nastaví atributy
//  V JS:     t('klic')  nebo  t('klic', { promenna: hodnota })  pro {promenna} v textu
//  Speciální zástupné znaky v textech:
//            {stopa}            -> ikona stopy (puzzle piece)
//            {img:cesta}        -> klikatelný obrázek s lightboxem
//            {img:src|lightbox} -> totéž, když se cesta liší
// =====================================================================

const LANG_FILE = 'lang.json';
const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['cz', 'en'];

let LANG_DATA = {};
let currentLang = DEFAULT_LANG;

try {
	const stored = localStorage.getItem('lang');
	if (SUPPORTED_LANGS.includes(stored)) currentLang = stored;
} catch (e) { /* localStorage nemusí být dostupné */ }

/**
 * Vrátí přeložený text pro klíč v aktuálním jazyce.
 * Když chybí překlad, použije se výchozí jazyk; když chybí klíč, vrátí se klíč samotný.
 */
function t(key, vars) {
	const entry = LANG_DATA[key];
	if (!entry) {
		console.warn('i18n: chybí klíč', key);
		return key;
	}
	let text = entry[currentLang];
	if (text === undefined || text === null || text === '') text = entry[DEFAULT_LANG];
	return formatText(text, vars);
}

function formatText(text, vars) {
	return text.replace(/\{(stopa|img:[^}]+|\w+)\}/g, (match, name) => {
		if (name === 'stopa') {
			return ikona_stopa; // definováno v game.js
		}
		if (name.startsWith('img:')) {
			const parts = name.slice(4).split('|');
			const src = parts[0];
			const lightbox = parts[1] || parts[0];
			return `<img src='${src}' class='inventory_img' onclick='event.stopPropagation(); showLightbox("${lightbox}")'>`;
		}
		if (vars && Object.prototype.hasOwnProperty.call(vars, name)) return vars[name];
		return match;
	});
}

/**
 * Přeloží všechny prvky s data-i18n* atributy.
 */
function applyTranslations() {
	document.querySelectorAll('[data-i18n]').forEach(el => {
		el.textContent = t(el.getAttribute('data-i18n'));
	});
	document.querySelectorAll('[data-i18n-html]').forEach(el => {
		el.innerHTML = t(el.getAttribute('data-i18n-html'));
	});
	document.querySelectorAll('[data-i18n-attr]').forEach(el => {
		el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
			const idx = pair.indexOf(':');
			if (idx === -1) return;
			el.setAttribute(pair.slice(0, idx).trim(), t(pair.slice(idx + 1).trim()));
		});
	});

	document.documentElement.lang = (currentLang === 'cz') ? 'cs' : currentLang;

	document.querySelectorAll('[data-lang]').forEach(el => {
		el.classList.toggle('active', el.getAttribute('data-lang') === currentLang);
	});
}

/**
 * Přepne jazyk, uloží volbu a překreslí hru.
 */
function setLang(lang) {
	if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
	currentLang = lang;
	try { localStorage.setItem('lang', lang); } catch (e) { }
	applyTranslations();
	if (typeof onLanguageChanged === 'function') onLanguageChanged(); // game.js
}

// Přepínač jazyka (odkazy s atributem data-lang)
document.addEventListener('click', e => {
	const el = e.target.closest('[data-lang]');
	if (el) {
		e.preventDefault();
		setLang(el.getAttribute('data-lang'));
		location.reload();
	}
});

// Načtení překladů - game.js na tento promise čeká v window.onload
const i18nReady = fetch(LANG_FILE)
	.then(r => {
		if (!r.ok) throw new Error('HTTP ' + r.status);
		return r.json();
	})
	.then(data => {
		LANG_DATA = data;
		applyTranslations();
	})
	.catch(err => {
		console.error('i18n: nepodařilo se načíst ' + LANG_FILE + ' (hra musí běžet přes webový server, ne file://)', err);
	});
