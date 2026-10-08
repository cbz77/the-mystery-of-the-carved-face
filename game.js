// --- MAPA HRY A STAV ---

const VIEWPORT_WIDTH = 800;
const VIEWPORT_HEIGHT = 600;

this.localStorage.setItem("hra_spustena", 0);

let saved_game = this.localStorage.getItem("saved_game");

if(saved_game == null || saved_game == "") this.localStorage.setItem("saved_game", "");

// Definice předmětů v inventáři pro snazší správu (id, jméno, ikona)
const INVENTORY_ITEMS = {
	'vizitka': { name: 'item.vizitka.name', icon: 'fa-address-card', tooltip: 'item.vizitka.tooltip', type: "image", popupText: "<img src='../assets/images/inventory/vizitka.png' class='inventory_img'>" },
	'cerny_klic': { name: 'item.cerny_klic.name', icon: 'fa-key', tooltip: 'item.cerny_klic.tooltip' },
	'dubovy_list': { name: 'item.dubovy_list.name', icon: 'fa-leaf', tooltip: 'item.dubovy_list.tooltip', type: "image", popupText: "<img src='../assets/images/inventory/list.png' class='inventory_img'>" },
	'kriz_z_hrobu': { name: 'item.kriz_z_hrobu.name', icon: 'fa-cross', tooltip: 'item.kriz_z_hrobu.tooltip', type: "image", popupText: "<img src='../assets/images/inventory/kriz.png' class='inventory_img'>" },
	'koruna': { name: 'item.koruna.name', icon: 'fa-crown', tooltip: 'item.koruna.tooltip', type: "image", popupText: "<img src='../assets/images/inventory/koruna.png' class='inventory_img'>" },
	'mapa': { name: 'item.mapa.name', icon: 'fa-map', tooltip: 'item.mapa.tooltip', type: "image", popupText: "<img src='../assets/images/inventory/mapa.png' class='inventory_img'>" },
	'erb': { name: 'item.erb.name', icon: 'fa-shield', tooltip: 'item.erb.tooltip', type: "image", popupText: "<img src='../assets/images/inventory/erb.png' class='inventory_img'>" },
	'strep': { name: 'item.strep.name', icon: 'fa-icicles', tooltip: 'item.strep.tooltip', type: "image", popupText: "<img src='../assets/images/inventory/strepy.png' class='inventory_img'>" },
	'lopatka': { name: 'item.lopatka.name', icon: 'fa-arrow-pointer', tooltip: 'item.lopatka.tooltip', type: "image", popupText: "<img src='../assets/images/inventory/lopatka.png' class='inventory_img'>" },
	'denik': { name: 'item.denik.name', icon: 'fa-book', tooltip: 'item.denik.tooltip', type: "denik" },
	'kniha': { name: 'item.kniha.name', icon: 'fa-book-open', tooltip: 'item.kniha.tooltip', type: "kniha" },
};

const ikona_stopa = '<br><br><i class="fa-solid fa-puzzle-piece color-red"></i> ';

const MAP = {

	zacatek_cesty: {
		name: 'area.zacatek_cesty.name',
		N: { img: `../assets/bgr/zacatek/zacatek_N.png`, pohled: 'area.zacatek_cesty.N.pohled', items: [
			{ x: 380, y: 300, text: 'area.zacatek_cesty.N.item0', type: 'text' }
		] },
		E: { img: `../assets/bgr/zacatek/zacatek_E.png`, pohled: 'area.zacatek_cesty.E.pohled', forward: "lesni_krizovatka", items: [
			{ x: 450, y: 400, text: 'area.zacatek_cesty.E.item0', type: 'text' }
		] },
		W: { img: `../assets/bgr/zacatek/zacatek_W.png`, pohled: 'area.zacatek_cesty.W.pohled', items: [
			{ x: 400, y: 400, text: 'area.zacatek_cesty.W.item0', type: 'text' }
		] },
		S: { img: `../assets/bgr/zacatek/zacatek_S.png`, pohled: 'area.zacatek_cesty.S.pohled', items: [
			{ x: 650, y: 165, text: 'area.zacatek_cesty.S.item0', type: 'text' }
		] },
	},

	lesni_krizovatka: {
		name: 'area.lesni_krizovatka.name',
		N: { img: `../assets/bgr/lesni_krizovatka/lesni_krizovatka_N.png`, pohled: 'area.lesni_krizovatka.N.pohled', forward: "cesta_pole", items: [
			{ x: 120, y: 250, text: 'area.lesni_krizovatka.N.item0', type: 'text' },
		] },
		E: { img: `../assets/bgr/lesni_krizovatka/lesni_krizovatka_E.png`, pohled: 'area.lesni_krizovatka.E.pohled', items: [] },
		W: { img: `../assets/bgr/lesni_krizovatka/lesni_krizovatka_W.png`, pohled: 'area.lesni_krizovatka.W.pohled', forward: "zacatek_cesty", items: [] },
		S: { img: `../assets/bgr/lesni_krizovatka/lesni_krizovatka_S.png`, pohled: 'area.lesni_krizovatka.S.pohled', forward: "upati_standlu", items: [
			{ x: 650, y: 400, text: 'area.lesni_krizovatka.S.item0', type: 'text' },
		] },
	},

	/* SEVERNI STEZKA */

	cesta_pole: {
		name: 'area.cesta_pole.name',
		N: { img: `../assets/bgr/cesta_pole/cesta_pole_N.png`, pohled: 'area.cesta_pole.N.pohled', forward: "stara_lipina", items: [
			{ x: 260, y: 360, text: 'area.cesta_pole.N.item0', type: 'text' }
		] },
		E: { img: `../assets/bgr/cesta_pole/cesta_pole_E.png`, pohled: 'area.cesta_pole.E.pohled', items: [] },
		W: { img: `../assets/bgr/cesta_pole/cesta_pole_W.png`, pohled: 'area.cesta_pole.W.pohled', items: [
			{ x: 420, y: 250, text: 'area.cesta_pole.W.item0', type: 'text' },
			{ x: 680, y: 520, text: 'area.cesta_pole.W.item1', type: 'text' },

		] },
		S: { img: `../assets/bgr/cesta_pole/cesta_pole_S.png`, pohled: 'area.cesta_pole.S.pohled', forward: "lesni_krizovatka", items: [] },
	},

	stara_lipina: {
		name: 'area.stara_lipina.name',
		N: { img: `../assets/bgr/lipina/lipina_N.png`, pohled: 'area.stara_lipina.N.pohled', items: [
			{ x: 500, y: 300, text: 'area.stara_lipina.N.item0', type: 'text' }
		] },
		E: { img: `../assets/bgr/lipina/lipina_E2.png`, pohled: 'area.stara_lipina.E.pohled', forward: "les_u_vykopavek", items: [
			{ x: 120, y: 220, text: 'area.stara_lipina.E.item0', type: 'text' }
		] },
		W: { img: `../assets/bgr/lipina/lipina_W.png`, pohled: 'area.stara_lipina.W.pohled', forward: "cesta_pole", items: [
			{ x: 685, y: 400, text: 'area.stara_lipina.W.item0', type: 'text' }
		] },
		S: { img: `../assets/bgr/lipina/lipina_S.png`, pohled: 'area.stara_lipina.S.pohled', items: [
			{ x: 400, y: 300, text: 'area.stara_lipina.S.item0', type: 'text' }
		] },
	},

	les_u_vykopavek: {
		name: 'area.les_u_vykopavek.name',
		N: { img: `../assets/bgr/les_u_vykopavek/les_u_vykopavek_N.png`, pohled: 'area.les_u_vykopavek.N.pohled', items: [
			{ x: 400, y: 400, text: 'area.les_u_vykopavek.N.item0', type: 'text' }
		] },
		E: { img: `../assets/bgr/les_u_vykopavek/les_u_vykopavek_E.png`, pohled: 'area.les_u_vykopavek.E.pohled', items: [
			{ x: 455, y: 365, text: 'area.les_u_vykopavek.E.item0', type: 'text' }
		] },
		W: { img: `../assets/bgr/les_u_vykopavek/les_u_vykopavek_W.png`, pohled: 'area.les_u_vykopavek.W.pohled', forward: "stara_lipina", items: [] },
		S: { img: `../assets/bgr/les_u_vykopavek/les_u_vykopavek_S.png`, pohled: 'area.les_u_vykopavek.S.pohled', forward: "vykopavky", items: [
			{ x: 140, y: 310, text: 'area.les_u_vykopavek.S.item0', type: 'text' },
			{ x: 400, y: 400, text: 'area.les_u_vykopavek.S.item1', type: 'text' }
		] },
	},

	vykopavky: {
		name: 'area.vykopavky.name',
		N: { img: `../assets/bgr/vykopavky/vykopavky_N.png`, pohled: 'area.vykopavky.N.pohled', forward: "les_u_vykopavek", items: [] },
		E: { img: `../assets/bgr/vykopavky/vykopavky_E.png`, pohled: 'area.vykopavky.E.pohled', items: [
			{ x: 460, y: 320, text: 'area.vykopavky.E.item0', itemKey: "lopatka", type: 'item' }
		] },
		W: { img: `../assets/bgr/vykopavky/vykopavky_W.png`, pohled: 'area.vykopavky.E.pohled', items: [
			{ x: 410, y: 300, text: 'area.vykopavky.W.item0', type: 'text' }
		] },
		S: {
			img: `../assets/bgr/vykopavky/vykopavky_S.png`, pohled: 'area.vykopavky.S.pohled', items: [
				{ x: 515, y: 235, text: 'area.vykopavky.S.item0', itemKey: 'vizitka', type: 'item' },
				{ x: 135, y: 215, text: 'area.vykopavky.S.item1', type: 'item', itemKey: "erb" }
			]
		},
		
	},

	/* JIZNI STEZKA */

	upati_standlu: {
		name: 'area.upati_standlu.name',
		N: { img: `../assets/bgr/upati_standlu/upati_standlu_N.png`, pohled: 'area.upati_standlu.N.pohled', forward: "lesni_krizovatka", items: []},
		E: {
			img: `../assets/bgr/upati_standlu/upati_standlu_E2.png`, pohled: 'area.upati_standlu.E.pohled', forward: "vrchol_standlu",
			items: [
				{ x: 500, y: 320, text: 'area.upati_standlu.E.item0', type: 'text' },
				{ x: 280, y: 420, text: 'area.upati_standlu.E.item1', type: 'text' },
			]
		},
		W: { img: `../assets/bgr/upati_standlu/upati_standlu_W.png`, pohled: 'area.cesta_pole.E.pohled', items: [] },
		S: { img: `../assets/bgr/upati_standlu/upati_standlu_S.png`, pohled: 'area.upati_standlu.S.pohled', forward: "lesni_pesina", items: [] },
	},
	lesni_pesina: {
		name: 'area.lesni_pesina.name',
		N: { img: `../assets/bgr/lesni_pesina/lesni_pesina_N.png`, pohled: 'area.lesni_pesina.N.pohled', forward: "upati_standlu", items: [] },
		E: { img: `../assets/bgr/lesni_pesina/lesni_pesina_E.png`, pohled: 'area.lesni_pesina.E.pohled', items: [
			{ x: 200, y: 300, text: 'area.lesni_pesina.E.item0', type: 'text' }
		] },
		W: { img: `../assets/bgr/lesni_pesina/lesni_pesina_W.png`, pohled: 'area.lesni_krizovatka.E.pohled', items: [] },
		S: { img: `../assets/bgr/lesni_pesina/lesni_pesina_S.png`, pohled: 'area.lesni_pesina.S.pohled', forward: "prudky_svah", items: [
			{ x: 180, y: 300, text: 'area.lesni_pesina.S.item0', type: 'text' }
		] },
	},
	prudky_svah: {
		name: 'area.prudky_svah.name',
		N: { img: `../assets/bgr/prudky_svah/prudky_svah_N.png`, pohled: 'area.prudky_svah.N.pohled', items: [
				{ x: 400, y: 300, text: 'area.prudky_svah.N.item0', type: 'text' }
			] 
		},
		E: { img: `../assets/bgr/prudky_svah/prudky_svah_E.png`, pohled: 'area.prudky_svah.E.pohled', forward: "pod_standlem", items: [] },
		W: { img: `../assets/bgr/prudky_svah/prudky_svah_W.png`, pohled: 'area.upati_standlu.S.pohled', forward: "lesni_pesina", items: [
			{ x: 450, y: 390, text: 'area.prudky_svah.W.item0', type: 'text' },
			{ x: 130, y: 420, text: 'area.prudky_svah.W.item1', type: 'text' },
		] },
		S: { img: `../assets/bgr/prudky_svah/prudky_svah_S.png`, pohled: 'area.prudky_svah.S.pohled', items: [
			{ x: 300, y: 500, text: 'area.prudky_svah.S.item0', type: 'text' },
			{ x: 565, y: 220, text: 'area.prudky_svah.S.item1', type: 'text' },
		] },
	},
	pod_standlem: {
		name: 'area.pod_standlem.name',
		N: { img: `../assets/bgr/pod_standlem/pod_standlem_N.png`, pohled: 'area.pod_standlem.N.pohled', items: [
			{ x: 150, y: 250, text: 'area.pod_standlem.N.item0', type: 'text' },
			{ x: 200, y: 390, text: 'area.pod_standlem.N.item1', itemKey: 'strep', type: 'item' },
		] },
		E: { img: `../assets/bgr/pod_standlem/pod_standlem_E.png`, pohled: 'area.pod_standlem.E.pohled', forward: "mistecke_namesti", items: [
			{ x: 400, y: 300, text: 'area.pod_standlem.E.item0', type: 'text' },
			{ x: 595, y: 100, text: 'area.pod_standlem.E.item1', type: 'text' },
		] },
		W: { img: `../assets/bgr/pod_standlem/pod_standlem_W.png`, pohled: 'area.upati_standlu.E.pohled', forward: "vrchol_standlu", items: [] },
		S: { img: `../assets/bgr/pod_standlem/pod_standlem_S.png`, pohled: 'area.pod_standlem.S.pohled', forward: "prudky_svah", items: [] },
	},
	vrchol_standlu: {
		name: 'area.vrchol_standlu.name',
		N: { img: `../assets/bgr/vrchol_standlu/vrchol_standlu_N.png`, pohled: 'area.vrchol_standlu.N.pohled', forward: "pod_standlem", items: [
			{ x: 180, y: 420, text: 'area.vrchol_standlu.N.item0', type: 'text' },
			{ x: 670, y: 280, text: 'area.vrchol_standlu.N.item1', type: 'text' }
		] },
		E: { img: `../assets/bgr/vrchol_standlu/vrchol_standlu_E_mirror.png`, pohled: 'area.vrchol_standlu.E.pohled', items: [] },
		W: { img: `../assets/bgr/vrchol_standlu/vrchol_standlu_W.png`, pohled: 'area.vrchol_standlu.W.pohled', forward: "upati_standlu", items: [
			{ x: 200, y: 400, text: 'area.vrchol_standlu.W.item0', type: 'text' }
		] },
		S: { img: `../assets/bgr/vrchol_standlu/vrchol_standlu_S.png`, pohled: 'area.vrchol_standlu.S.pohled', forward: "informacni_cedule", items: [] },
	},
	informacni_cedule: {
		name: 'area.informacni_cedule.name',
		N: { img: `../assets/bgr/informacni_cedule/informacni_cedule_N.png`, pohled: 'area.upati_standlu.E.pohled', forward: "vrchol_standlu", items: [] },
		E: { img: `../assets/bgr/informacni_cedule/informacni_cedule_E.png`, pohled: 'area.informacni_cedule.E.pohled', forward: "pred_tvari", items: [
			{ x: 480, y: 250, text: 'area.informacni_cedule.E.item0', type: 'text' },
			{ x: 600, y: 450, text: 'area.informacni_cedule.E.item1', type: 'text' },
		] },
		W: { img: `../assets/bgr/informacni_cedule/informacni_cedule_W.png`, pohled: 'area.informacni_cedule.W.pohled', items: [
			{ x: 430, y: 450, text: 'area.informacni_cedule.W.item0', type: 'text' },
			{ x: 130, y: 420, text: 'area.informacni_cedule.W.item1', type: 'text' },
		] },
		S: { img: `../assets/bgr/informacni_cedule/informacni_cedule_S_mapa.png` , pohled: 'area.informacni_cedule.S.pohled', items: [
			{ x: 670, y: 280, text: 'area.informacni_cedule.S.item0', itemKey: 'mapa', type: 'item' },
		] },
	},
	pred_tvari: {
		name: 'area.pred_tvari.name',
		N: { img: `../assets/bgr/pred_tvari/pred_tvari_N.png`, pohled: 'area.upati_standlu.E.pohled', forward: "informacni_cedule", items: [] },
		E: { img: `../assets/bgr/pred_tvari/pred_tvari_E.png`, pohled: 'area.pred_tvari.E.pohled', items: [
			{ x: 350, y: 450, text: 'area.pred_tvari.E.item0', type: 'text' }
		] },
		W: { img: `../assets/bgr/pred_tvari/pred_tvari_W.png`, pohled: 'area.pred_tvari.E.pohled', items: [] },
		S: { img: `../assets/bgr/pred_tvari/pred_tvari_S.png`, pohled: 'area.pred_tvari.S.pohled', forward: "kamenny_erb", items: [
			{ x: 580, y: 450, text: 'area.pred_tvari.S.item0', type: 'text' }
		] },
	},

	/* KAMENNY ERB */

	kamenny_erb: {
		name: 'area.kamenny_erb.name',
		N: { img: `../assets/bgr/kamenny_erb/kamenny_erb_N.png`, pohled: 'area.kamenny_erb.N.pohled', forward: "pred_tvari", items: [] },
		E: { img: `../assets/bgr/kamenny_erb/kamenny_erb_E.png`, pohled: 'area.kamenny_erb.E.pohled', items: [
			{ x: 400, y: 500, text: 'area.kamenny_erb.E.item0', type: 'text' }
		] },
		W: { img: `../assets/bgr/kamenny_erb/kamenny_erb_W.png`, pohled: 'area.kamenny_erb.W.pohled', forward: "kamenna_tvar", items: [
			{ x: 585, y: 270, text: 'area.kamenny_erb.W.item0', type: 'text' }
		] },
		S: { img: `../assets/bgr/kamenny_erb/kamenny_erb_S.png`, pohled: 'area.pred_tvari.E.pohled', items: [
			{ x: 400, y: 460, text: 'area.kamenny_erb.S.item0', type: 'text' }
		] },
	},
	kamenna_tvar: {
		name: 'area.kamenna_tvar.name',
		
		N: { img: `../assets/bgr/kamenna_tvar/kamenna_tvar_N.png`, pohled: 'area.kamenna_tvar.N.pohled', items: [] },
		E: { img: `../assets/bgr/kamenna_tvar/kamenna_tvar_E.png`, pohled: 'area.kamenna_tvar.E.pohled', forward: "kamenny_erb", items: [] },
		W: {
			img: `../assets/bgr/kamenna_tvar/kamenna_tvar_W.png`,
			pohled: 'area.kamenna_tvar.W.pohled',
			items: [
				{ x: 400, y: 300, text: 'area.kamenna_tvar.W.item0', type: 'text' },
				{ x: 635, y: 400, text: 'area.kamenna_tvar.W.item1', type: 'puzzle' },

			]
		},
		S: { img: `../assets/bgr/kamenna_tvar/kamenna_tvar_S.png`, pohled: 'area.kamenna_tvar.N.pohled', items: [] }
	},
	jeskyne: {
		name: 'area.jeskyne.name',
		
		N: { img: `../assets/bgr/jeskyne/jeskyne_N.png`, pohled: 'area.jeskyne.N.pohled', items: [
			{ x: 200, y: 400, text: 'area.jeskyne.N.item0', type: 'text' }
		] },
		E: {
			img: `../assets/bgr/jeskyne/jeskyne_E.png`,
			pohled: 'area.jeskyne.E.pohled',
			forward: "konec"
		},
		W: {
			img: `../assets/bgr/jeskyne/jeskyne_W.png`,
			pohled: 'area.jeskyne.W.pohled',
			items: [
				{ x: 365, y: 500, text: 'area.jeskyne.W.item0', type: 'item', itemKey: "denik" },
				{ x: 405, y: 285, text: 'area.jeskyne.W.item1', type: 'text' },
				{ x: 630, y: 300, text: 'area.jeskyne.W.item2', type: 'text' },
				{ x: 440, y: 380, text: 'area.jeskyne.W.item3', type: 'text' },
				{ x: 100, y: 500, text: 'area.jeskyne.W.item4', type: 'text' },
			]
		},
		S: { img: `../assets/bgr/jeskyne/jeskyne_S.png`, pohled: 'area.jeskyne.S.pohled', items: [
				{ x: 560, y: 480, text: 'area.jeskyne.S.item0', type: 'text' }
		] },
	},
	konec: {
		name: 'area.jeskyne.name',
		N: {
			img: `../assets/bgr/temnota/temnota_N.png`, pohled: 'area.konec.N.pohled', items: [
				{ x: 550, y: 480, text: 'area.konec.N.item0', type: 'text' }
			]
		},
		E: { img: `../assets/bgr/temnota/temnota_E.png`, pohled: 'area.konec.N.pohled', items: [
				{ x: 550, y: 480, text: 'area.konec.N.item0', type: 'text' }
			]
		},
		W: { img: `../assets/bgr/temnota/temnota_W.png`, pohled: 'area.konec.N.pohled', items: [
				{ x: 550, y: 480, text: 'area.konec.N.item0', type: 'text' }
			] 
		},
		S: { img: `../assets/bgr/temnota/temnota_S.png`, pohled: 'area.konec.N.pohled', items: [
				{ x: 550, y: 480, text: 'area.konec.N.item0', type: 'text' }
			]
		},
	},
	
	/* F-M */

	mistecke_namesti: {
		name: 'area.mistecke_namesti.name',
		E: { img: `../assets/bgr/namesti/namesti_E.png`, pohled: 'area.mistecke_namesti.E.pohled', forward: "frydecky_zamek", items: [] },
		S: { img: `../assets/bgr/namesti/namesti_S.png`, pohled: 'area.mistecke_namesti.S.pohled', forward: "socha_marie", items: [] },
		N: { img: `../assets/bgr/namesti/namesti_N.png`, pohled: 'area.mistecke_namesti.N.pohled', items: [] },
		W: { img: `../assets/bgr/namesti/namesti_W.png`, pohled: 'area.mistecke_namesti.W.pohled', forward: "pod_standlem", items: [
			{ x: 245, y: 330, text: 'area.mistecke_namesti.W.item0', type: 'text' }
		] },
	},
	socha_marie: {
		name: 'area.socha_marie.name',
		N: {
			img: `../assets/bgr/socha_marie/socha_marie_N.png`, pohled: 'area.socha_marie.N.pohled', items: [
				{ x: 420, y: 280, text: 'area.socha_marie.N.item0', itemKey: 'dubovy_list', type: 'item' }
			]
		},
		E: { img: `../assets/bgr/socha_marie/socha_marie_E.png`, pohled: 'area.socha_marie.E.pohled', items: [] },
		W: { img: `../assets/bgr/socha_marie/socha_marie_W.png`, pohled: 'area.socha_marie.W.pohled', forward: "mistecke_namesti",items: [] },
		S: { img: `../assets/bgr/socha_marie/socha_marie_S.png`, pohled: 'area.socha_marie.S.pohled', items: [] },
	},
	frydecky_zamek: {
		name: 'area.frydecky_zamek.name',
		E: { img: `../assets/bgr/zamek/zamek_E.png`, pohled: 'area.frydecky_zamek.E.pohled', items: [] },
		S: { img: `../assets/bgr/zamek/zamek_S.png`, pohled: 'area.frydecky_zamek.S.pohled', forward: "zamek_nadvori",  items: [] },
		N: { img: `../assets/bgr/zamek/zamek_N.png`, pohled: 'area.frydecky_zamek.N.pohled', items: [
			{ x: 300, y: 450, text: 'area.frydecky_zamek.N.item0', type: 'text' }
		] },
		W: { img: `../assets/bgr/zamek/zamek_W.png`, pohled: 'area.frydecky_zamek.W.pohled', forward: "mistecke_namesti", items: [] },
	},
	zamek_nadvori: {
		name: 'area.zamek_nadvori.name',
		E: { img: `../assets/bgr/zamek_nadvori/nadvori_E.png`, pohled: 'area.zamek_nadvori.E.pohled', forward: "zamek_namesti", },
		S: { img: `../assets/bgr/zamek_nadvori/nadvori_S.png`, pohled: 'area.zamek_nadvori.S.pohled', items: [
			{ x: 600, y: 300, text: 'area.zamek_nadvori.S.item0', type: 'text' }
		] },
		W: { img: `../assets/bgr/zamek_nadvori/nadvori_W.png`, pohled: 'area.zamek_nadvori.W.pohled', forward: "vez", items: [
			{ x: 350, y: 200, text: 'area.zamek_nadvori.W.item0', type: 'text' }
		] },
		N: { img: `../assets/bgr/zamek_nadvori/nadvori_N.png`, pohled: 'area.zamek_nadvori.N.pohled', forward: "frydecky_zamek", items: [] },
	},
	vez: {
		name: 'area.vez.name',
		W: {
			img: `../assets/bgr/zamek_nadvori/vez/koruna.png`, pohled: 'area.vez.W.pohled', items: [
				{ x: 330, y: 240, text: 'area.vez.W.item0', itemKey: 'koruna', type: 'item' }
			]
		},
		S: { img: `../assets/bgr/zamek_nadvori/vez/vedle_veze_S.png`, pohled: 'area.vez.S.pohled', items: [] },
		N: { img: `../assets/bgr/zamek_nadvori/vez/vedle_veze_N.png`, pohled: 'area.vez.N.pohled', items: [] },
		E: { img: `../assets/bgr/zamek_nadvori/vez/vedle_veze_E.png`, pohled: 'area.vez.E.pohled', forward: "zamek_nadvori", items: [] },
	},
	zamek_namesti: {
		name: 'area.zamek_namesti.name',
		E: { img: `../assets/bgr/zamek_namesti/zamek_namesti_E.png`, pohled: 'area.zamek_namesti.E.pohled', forward: "kostel_josta", items: [] },
		S: { img: `../assets/bgr/zamek_namesti/zamek_namesti_S.png`, pohled: 'area.zamek_namesti.S.pohled', items: [] },
		N: { img: `../assets/bgr/zamek_namesti/zamek_namesti_N.png`, pohled: 'area.zamek_namesti.N.pohled', items: [
			{ x: 430, y: 350, text: 'area.zamek_namesti.N.item0', type: 'text' },
			{ x: 530, y: 170, text: 'area.zamek_namesti.N.item1', type: 'text' }
		] },
		W: { img: `../assets/bgr/zamek_namesti/zamek_namesti_W.png`, pohled: 'area.zamek_namesti.W.pohled', forward: "zamek_nadvori", items: [
			{ x: 400, y: 300, text: 'area.zamek_namesti.W.item0', type: 'text' }
		] },
	},
	kostel_josta: {
		name: 'area.kostel_josta.name',
		E: { img: `../assets/bgr/jost/jost_E.png`, pohled: 'area.kostel_josta.E.pohled', items: [
			{ x: 650, y: 380, text: 'area.kostel_josta.E.item0', type: 'text' },
			{ x: 130, y: 250, text: 'area.kostel_josta.E.item1', type: 'text' }
		] },
		S: { img: `../assets/bgr/jost/jost_S.png`, pohled: 'area.kostel_josta.S.pohled', forward: "vedle_kostela", },
		N: { img: `../assets/bgr/jost/jost_N.png`, pohled: 'area.kostel_josta.N.pohled', forward: "zamek_namesti", items: [
			{ x: 470, y: 360, text: 'area.kostel_josta.N.item0', type: 'text' }
		] },
		W: { img: `../assets/bgr/jost/jost_W.png`, pohled: 'area.kostel_josta.W.pohled', forward: "mistecke_namesti", items: [
			{ x: 200, y: 570, text: 'area.kostel_josta.W.item0', type: 'text' }
		] },
	},
	vedle_kostela: {
		name: 'area.vedle_kostela.name',
		E: {
			img: `../assets/bgr/jost_hrob/jost_hrob_E.png`, pohled: 'area.vedle_kostela.E.pohled', items: [],
		},
		S: { img: `../assets/bgr/jost_hrob/jost_hrob_S.png`, pohled: 'area.vedle_kostela.S.pohled', items: [
			{ x: 600, y: 300, text: 'area.vedle_kostela.S.item0', type: 'text' }
		] },
		N: { img: `../assets/bgr/jost_hrob/jost_hrob_N.png`, pohled: 'area.vedle_kostela.N.pohled', items: [
			{ x: 250, y: 400, text: 'area.vedle_kostela.N.item0', itemKey: 'kriz_z_hrobu', type: 'item' }
		] },
		W: { img: `../assets/bgr/jost_hrob/jost_hrob_W.png`, pohled: 'area.vedle_kostela.W.pohled', forward: "kostel_josta", items: [] },
	},
	u_muzea: {
		name: 'area.u_muzea.name',
		E: { img: `../assets/bgr/muzeum/muzeum_E.png`, pohled: 'area.frydecky_zamek.N.pohled', items: [] },
		N: {
			img: `../assets/bgr/muzeum/muzeum_N.png`, pohled: 'area.u_muzea.N.pohled', items: [
				{ x: 450, y: 350, text: 'area.u_muzea.N.item0', type: 'npc' }
			]
		},
		S: { img: `../assets/bgr/muzeum/muzeum_S_kniha.png`, pohled: 'area.u_muzea.S.pohled', items: [
			{ x: 365, y: 420, text: 'area.u_muzea.S.item0', type: 'item', itemKey: "kniha" },
		] },
		W: { img: `../assets/bgr/muzeum/muzeum_W.png`, pohled: 'area.u_muzea.W.pohled', forward: "frydecky_zamek", items: [] },
	},
};


const DIRECTIONS = ['N', 'E', 'S', 'W'];

let currentArea = "zacatek_cesty";
let currentDirectionIndex = 1; // Výchozí směr: E (východ)
let inventory = []; // Skladuje ID předmětů
let solvedPuzzles = [];
let addedItems = [];
let precteneKnihy = [];

// --- ELEMENTY DOM ---
const viewport = document.getElementById('viewport');
const forwardButton = document.getElementById('move-forward');
const loadingOverlay = document.getElementById('loading-overlay');
const directionLabel = document.getElementById('direction-label');
const pohledLabel = document.getElementById('pohled-label');
const areaLabel = document.getElementById('area-label');
const textModalBackdrop = document.getElementById('text-modal-backdrop');
const puzzleModalBackdrop = document.getElementById('puzzle-modal-backdrop');
const popupText = document.getElementById('popup-text');
const inventoryDisplay = document.getElementById('inventory-display');
const startScreen = document.getElementById('start-screen');
const fadeOverlay = document.getElementById("fadeOverlay");
const endingScreen = document.getElementById("ending-screen");


// --- INVENTÁŘ A MODALY ---

/**
 * Zobrazí textové vyskakovací okno.
 * @param {string} text Text k zobrazení.
 */
function showPopup(text) {
	popupText.innerHTML = text;
	textModalBackdrop.style.display = 'flex';
}

/**
 * Skryje vyskakovací okno.
 * @param {string} modalId ID modalu k zavření.
 */
function hidePopup(modalId) {
	document.getElementById(modalId).style.display = 'none';
}

/**
 * Přidá předmět do inventáře a aktualizuje zobrazení.
 * @param {string} itemId ID předmětu (klíč z INVENTORY_ITEMS).
 */
function addItem(itemId) {
	if (!inventory.includes(itemId)) {
		inventory.push(itemId);
		addedItems.push(itemId);
		updateInventoryDisplay();
		updateView();
		return true; // Předmět byl přidán
	}
	return false; // Předmět již v inventáři je
}

/**
 * Odebere předmět z inventáře (pro interakci Poláška).
 * @param {string} itemId ID předmětu.
 */
function removeItem(itemId) {
	const index = inventory.indexOf(itemId);
	if (index > -1) {
		inventory.splice(index, 1);
		updateInventoryDisplay();
		return true;
	}
	return false;
}

/**
 * Aktualizuje zobrazení inventáře.
 */
function updateInventoryDisplay() {
	inventoryDisplay.innerHTML = '';
	if (inventory.length === 0) {
		inventoryDisplay.innerHTML = '<p style="text-align: center; color: #5a4d3f; font-size: 0.9em;">' + t('ui.inventory_empty') + '</p>';
		return;
	}

	inventory.forEach(itemId => {
		const item = INVENTORY_ITEMS[itemId];
		if (item) {
			const itemDiv = document.createElement('div');
			itemDiv.className = 'inventory-item';
			itemDiv.title = t(item.tooltip);
			itemDiv.onclick = () => handleInventoryClick(itemId);
			const icon = document.createElement('i');
			icon.className = `fas ${item.icon} inventory-icon`;

			const name = document.createElement('span');
			name.textContent = t(item.name)

			itemDiv.appendChild(icon);
			itemDiv.appendChild(name);
			inventoryDisplay.appendChild(itemDiv);
		}
	});
}

/**
 * Zpracuje kliknutí na předmět v inventáři.
 * @param {string} itemId ID předmětu (klíč z INVENTORY_ITEMS).
 */
function handleInventoryClick(itemId) {
	const item = INVENTORY_ITEMS[itemId];

	if (!item) return;

	const title = `<i class="fas ${item.icon}"></i> ${t(item.name)}`;
	let content = item.tooltip ? t(item.tooltip) : t('ui.no_description');

	// --- OBECNÁ LOGIKA PRO OTEVÍRÁNÍ OBRÁZKŮ V LIGHTBOXU ---
	if (item.type === 'image' && item.popupText) {
		const imageUrl = extractImageUrl(item.popupText);

		if (imageUrl) {
			// Vytvoříme klikatelný náhled
			// Důležité: Tady do popupu vkládáme HTML z popupText, ale přidáme mu náš onclick
			const clickableHtml = item.popupText.replace(
				'<img',
				`<img onclick="event.stopPropagation(); showLightbox('${imageUrl}')"`
			);

			content += `<br>
                <br>
                <div class='inventory_img'>
                ${clickableHtml}`;
			content += '</div>';

		} else {
			content += `<br><br>${t('ui.image_url_error', { name: t(item.name) })}`;
		}
	}else if (item.type === 'denik') {
		handleDenikClick();	
	}
	else if (item.type === 'kniha') {
		handleKnihaClick();	
	}
	else if (item.popupText) {
		// Standardní zobrazení extra textu pro jiné typy (pokud je definován)
		content += `<br><br>${item.popupText}`;
	}
	// --------------------------------------------------------

	showPopup(`${title}<br><br>${content}`);
}

/**
 * Extrahuje URL obrázku ze značky <img>.
 * @param {string} htmlString Řetězec obsahující značku <img>.
 * @returns {string|null} URL obrázku nebo null.
 */
function extractImageUrl(htmlString) {
	// Hledá atribut 'src' v řetězci <img>
	const match = htmlString.match(/src=['"](.*?)['"]/);
	return match ? match[1] : null;
}


/**
 * Zobrazí lightbox s obrázkem v plném rozlišení.
 * @param {string} imagePath Cesta k obrázku mapy.
 */
window.showLightbox = function (imagePath) {
	// 1. Zavři aktuální textový popup, abys viděl lightbox
	//hidePopup('text-modal-backdrop');

	// 2. Najdi lightbox elementy
	const lightboxBackdrop = document.getElementById('lightbox-backdrop');
	const lightboxImage = document.getElementById('lightbox-image');

	// 3. Nastav cestu k obrázku a zobraz lightbox
	if (lightboxBackdrop && lightboxImage) {
		lightboxImage.src = imagePath;
		lightboxBackdrop.style.display = 'flex';
	} else {
		// Pro případ, že lightbox HTML není přítomen
		console.error("Lightbox elementy nebyly nalezeny!");
		showPopup(t('ui.lightbox_error', { path: imagePath }));
	}
}




// --- LOGIKA HOTSPOTŮ ---

/**
 * Zpracuje kliknutí na hotspot s komplexní logikou.
 * @param {object} item Data hotspotu.
 */
function handleHotspotClick(item) {
	const itemText = t(item.text);

	switch (item.type) {
		case 'item':
			const added = addItem(item.itemKey);
			if (added) {

				//vizitka
				if(item.itemKey == 'vizitka') {
					solvedPuzzles.push('vizitka');
					MAP['frydecky_zamek']['N'].forward = 'u_muzea';
				}

				showPopup(`${itemText} <br><br><span class="add_item_text">${t('ui.item_added')}</span>`);
			} else {
				showPopup(t('ui.already_explored') + itemText.replace(/(\*+.*\*+)/g, ''));
			}
			break;

		case 'npc':
			handlePolasekInteraction(item);
			break;

		case 'puzzle':
			handlePuzzleInteraction(item);
			break;

		case 'text':
		default:
			showPopup(itemText);
			break;
	}
}

/**
 * Speciální logika pro Poláška (NPC).
 */
function handlePolasekInteraction(item) {

	console.log(item)
	console.log(solvedPuzzles)
	console.log(inventory)

	if (inventory.includes('lopatka') && inventory.includes('strep')) {

		console.log("polasek 1")
		
		showPopup(t('npc.both'));
		
		removeItem('lopatka');
		removeItem('strep');
		solvedPuzzles.push('lopatka');
		solvedPuzzles.push('strep');

		addItem('cerny_klic');

	}
	else if(inventory.includes('strep') && !solvedPuzzles.includes('lopatka')) {

		console.log("polasek 2")

		showPopup(t('npc.shards_first'));
		
		removeItem('strep');
		solvedPuzzles.push('strep');
	}
	else if (inventory.includes('lopatka') && !solvedPuzzles.includes('strep')) {

		console.log("polasek 3")

		showPopup(t('npc.shovel_first'));
		
		removeItem('lopatka');
		solvedPuzzles.push('lopatka');
	}
	else if (inventory.includes('strep') && solvedPuzzles.includes('lopatka')) {

		console.log("polasek 5")

		showPopup(t('npc.shards_after_shovel'));
		
		removeItem('strep');
		addItem('cerny_klic');

		solvedPuzzles.push('strep');
	}
	else if (inventory.includes('lopatka') && solvedPuzzles.includes('strep')) {
		
		console.log("polasek 6")

		showPopup(t('npc.shovel_after_shards'));
		
		removeItem('lopatka');
		addItem('cerny_klic');

		solvedPuzzles.push('lopatka');
	}
	else if (inventory.includes('cerny_klic')) {

		console.log("polasek 7")

		showPopup(t('npc.has_key'));

	} else {
		showPopup(t('npc.default'));
	}

}

/**
 * Logika pro spuštění hádanky.
 */
function handlePuzzleInteraction(item) {
	if (currentArea === 'kamenna_tvar' && inventory.includes('cerny_klic')) {
		// Hádanka u Erbu

		showPopup(t('puzzle.used_key'));

		puzzleModalBackdrop.style.display = 'flex';

	}else if(currentArea === 'kamenna_tvar' && !inventory.includes('cerny_klic') && solvedPuzzles.includes('kameny_erb_detail')) {
		showPopup(t('puzzle.path_free'));
	}
	
	else if (currentArea === 'kamenna_tvar' && !inventory.includes('cerny_klic')) {
		showPopup(t('puzzle.boulder'));
	} else {
		showPopup(t(item.text));
	}
}


/**
* Správný symbol je určen rotací kola a je vyčten z jeho datového atributu.
*/
window.solvePuzzle = function () {

	// 1. Získání aktuálně vybraného symbolu z každého kotouče
	// Předpokládá se, že aktuálně vybraný symbol je uložen v atributu data-current-symbol
	const sym1 = document.getElementById('wheel1').getAttribute('data-current-symbol').toUpperCase();
	const sym2 = document.getElementById('wheel2').getAttribute('data-current-symbol').toUpperCase();
	const sym3 = document.getElementById('wheel3').getAttribute('data-current-symbol').toUpperCase();
	const sym4 = document.getElementById('wheel4').getAttribute('data-current-symbol').toUpperCase();

	// Správné řešení pro kola 
	// sym1: 'ERB', sym2: 'LIST', sym3: 'KRIZ'/'KŘÍŽ', sym4: 'KORUNA'
	const correctSym1 = 'ERB';
	const correctSym2 = 'LIST';
	const correctSym3 = 'KRIZ';
	const correctSym4 = 'KORUNA';

	// 2. Kontrola řešení
	if (sym1 === correctSym1 &&
		sym2 === correctSym2 &&
		(sym3 === correctSym3) &&
		sym4 === correctSym4) {

		hidePopup('puzzle-modal-backdrop');
		showPopup(t('puzzle.solved'));

		solvedPuzzles.push('kameny_erb_detail');
		removeItem('cerny_klic');

		// nasměrovat na kamen
		currentArea = 'kamenny_erb';
		currentDirectionIndex = 3;

		// Otevření nové cesty do Jeskyně
		MAP['kamenny_erb']['W'].forward = 'jeskyne';

		// Zrušení hádanky, už není potřeba
		const puzzleHotspot = MAP['kamenna_tvar']['E'].items.find(i => i.type === 'puzzle');
		if (puzzleHotspot) puzzleHotspot.text = 'puzzle.cave_open';

		updateView();

	} else {
		
		showPopup(t('puzzle.wrong'));
	}
}


/**
 * Logika pro konec
 */
function handleKonec() {
	if (currentArea === 'konec') {
		showPopup(t('ending.popup'));

		let endingText = document.getElementById('ending-text');

		setTimeout(() => {

			endingText.innerHTML = t('ending.text');

			endingScreen.style.display = 'flex';
			endingScreen.style.opacity = 1;

		}, 20000);
	}
}


// --- VYKRESLENÍ POHLEDU ---

function renderHotspots() {
	
	// Odebere všechny prvky, které nejsou overlay nebo popisky
	const removableElements = Array.from(viewport.children).filter(el =>
		!el.classList.contains('loading-overlay') &&
		!el.classList.contains('fade-overlay') &&
		!el.classList.contains('direction-label') &&
		!el.classList.contains('area-label') &&
		!el.classList.contains('pohled-label') &&
		!el.classList.contains('start-screen') &&
		!el.classList.contains('save-game') &&
		!el.classList.contains('denik') &&
		!el.classList.contains('ending-screen')
	);
	removableElements.forEach(el => el.remove());

	const currentDir = DIRECTIONS[currentDirectionIndex];
	const viewData = MAP[currentArea][currentDir];

	if (viewData.items && viewData.items.length > 0) {
		viewData.items.forEach(item => {

			if(addedItems.includes(item.itemKey) && item.type === 'item') {
				// Pokud už byl předmět přidán do inventáře, nevytvářej hotspot
				return;
			}
			
			// Vytvoření hotspotu

			const hotspot = document.createElement('div');
			hotspot.className = 'hotspot';
			// Hotspoty se umisťují relativně k viewportu
			hotspot.style.left = `${item.x / VIEWPORT_WIDTH * 100}%`;
			hotspot.style.top = `${item.y / VIEWPORT_HEIGHT * 100}%`;
			hotspot.title = t('ui.explore');
			// Nastavení volání handleHotspotClick
			hotspot.onclick = () => handleHotspotClick(item, solvedPuzzles);
			viewport.appendChild(hotspot);
		});
	}
}

/**
 * Nastaví popisky (směr, oblast, pohled) a stav tlačítka Vpřed.
 * Volá se z updateView() i při přepnutí jazyka.
 */
function updateLabels(areaData, viewData, currentDir) {
	const pohled = viewData.pohled;

	directionLabel.textContent = t('ui.direction', { dir: t('dir.' + currentDir) });
	areaLabel.textContent = t('ui.area', { area: t(areaData.name) });
	pohledLabel.textContent = `${t(pohled)}`;

	// Aktualizace stavu tlačítka Vpřed
	if (viewData.forward) {
		forwardButton.disabled = false;
		forwardButton.title = t('ui.forward_title', { area: t(MAP[viewData.forward].name) });
		forwardButton.textContent = t('ui.forward');
	} else {
		forwardButton.disabled = true;
		forwardButton.title = t('ui.no_forward');
		forwardButton.textContent = t('ui.forward');
	}
}

function updateView() {
	const currentDir = DIRECTIONS[currentDirectionIndex];
	const areaData = MAP[currentArea];
	const viewData = areaData[currentDir];
	const pohled = areaData[currentDir].pohled;

	console.log(`Pohled: ${t(pohled)}`);

	// 1. Zobrazení indikátoru načítání
	loadingOverlay.style.display = 'flex';
	viewport.style.backgroundImage = 'none';

	// 2. Přednačtení obrázku
	const img = new Image();
	img.onload = () => {

		let bgr_img = viewData.img;

		//vyjimka - sebrana mapa
		if(inventory.includes('mapa') && currentArea === 'informacni_cedule' && currentDir === 'S') {
			bgr_img = `../assets/bgr/informacni_cedule/informacni_cedule_S.png`;
		}

		//vyjimka - sebrana lopatka
		if( (inventory.includes('lopatka') || solvedPuzzles.includes('lopatka') ) && currentArea === 'vykopavky' && currentDir === 'E') {
			bgr_img = `../assets/bgr/vykopavky/vykopavky_E_bez.png`;
		}

		//vyjimka - odemkla jeskyne
		if(solvedPuzzles.includes('kameny_erb_detail') && currentArea === 'kamenny_erb' && currentDir === 'W') {
			bgr_img = `../assets/bgr/kamenny_erb/kamenny_erb_W_odvalen.png`; //odvaleny balvan do jeskyne
		}

		//vyjimka - po vstupu do jeskyne zase zrusit cestu zpet kvuli nacteni hry bez refreshe
		if(currentArea === 'jeskyne') {
			MAP['kamenny_erb']['W'].forward = 'kamenna_tvar';
		}

		//vyjimka - sebrany denik
		if(inventory.includes('denik') && currentArea === 'jeskyne' && currentDir === 'W') {
			bgr_img = `../assets/bgr/jeskyne/jeskyne_W_bez.png`;
		}

		//vyjimka - sebrana kniha
		if(inventory.includes('kniha') && currentArea === 'u_muzea' && currentDir === 'S') {
			bgr_img = `../assets/bgr/muzeum/muzeum_S.png`;
		}

		viewport.style.backgroundImage = `url('${bgr_img}')`;

		loadingOverlay.classList.remove('visible');

		setTimeout(() => {
			loadingOverlay.style.display = 'none';
		}, 250);

		// 3. + 4. Aktualizace popisků a stavu tlačítka Vpřed
		updateLabels(areaData, viewData, currentDir);

		// 5. Vykreslení Hotspotů a Inventáře
		renderHotspots();
		updateInventoryDisplay();

		//jeskyne - prvni prichod
		if(currentArea === 'jeskyne' && currentDir === 'W' && !solvedPuzzles.includes('jeskyne_prichod')) {
			showPopup(t('cave.first_arrival'));
			solvedPuzzles.push('jeskyne_prichod');
		}

	};

	img.onerror = () => {
		// Přesměrování na placeholder v případě chyby načítání
		viewport.style.backgroundImage = `url('https://placehold.co/800x600/600000/ffffff?text=Temnota+pohltila+obraz!')`;
		loadingOverlay.style.display = 'none';
		directionLabel.textContent = t('ui.direction', { dir: currentDir });
		pohledLabel.textContent = `${t(pohled)}`;
		areaLabel.textContent = t('ui.area_error', { area: t(areaData.name) });
		forwardButton.disabled = true;
		renderHotspots();
	};

	img.src = viewData.img;

	//vyjimka - sebrana vizitka
	if(solvedPuzzles.includes('vizitka')){
		MAP['frydecky_zamek']['N'].forward = 'u_muzea';
	}

	//odemkla jeskyne
	if(solvedPuzzles.includes('kameny_erb_detail')) {
		MAP['kamenny_erb']['W'].forward = 'jeskyne';
		MAP['kamenny_erb']['W'].items = []; //zrusit hotspot
	}
}

// --- POHYBOVÉ FUNKCE ---
window.turnLeft = function () {
	currentDirectionIndex = (currentDirectionIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length;

	loadingOverlay.style.display = 'flex';
	
	setTimeout(() => {
		loadingOverlay.classList.add('visible'); 
	}, 10);

	setTimeout(() => {;
		updateView();
	}, 250)
}

window.turnRight = function () {
	currentDirectionIndex = (currentDirectionIndex + 1) % DIRECTIONS.length;

	loadingOverlay.style.display = 'flex';

	setTimeout(() => {
		loadingOverlay.classList.add('visible'); 
	}, 10);

	setTimeout(() => {;
		updateView();
	}, 250)

	
}

window.moveForward = function () {
	const currentDir = DIRECTIONS[currentDirectionIndex];
	const viewData = MAP[currentArea][currentDir];

	//jeskyne - zakazani vystupu kdyz nemam denik
	if(currentArea === 'jeskyne' && currentDir === 'E' && !inventory.includes('denik')) {
		if(!inventory.includes('denik')) {
			showPopup(t('cave.stay'));
			return;
		}
	}

	if (viewData.forward) {
		currentArea = viewData.forward;

		loadingOverlay.style.display = 'flex';

		setTimeout(() => {
			loadingOverlay.classList.add('visible'); 
		}, 10);

		setTimeout(() => {
			currentArea = viewData.forward;
            updateView();
		}, 500)
		
	}

	if(currentArea === 'konec') {
		handleKonec();
	}
}

// --- INICIALIZACE ---
window.onload = async function () {

	// počkat na načtení překladů (lang.json)
	await i18nReady;

	updateView();

	let ovladaci_prvky = document.getElementById('ovladaci_prvky');

	let start_btn = document.getElementById('spustit_hru');
	let load_btn_start = document.getElementById('nacist_hru_start');
	let load_btn = document.getElementById('nacist_hru');
	let save_btn = document.getElementById('ulozit_hru');
	let restart_btn = document.getElementById('restart-game');

	ovladaci_prvky.style.display = 'none';
	
	start_btn.onclick = () => {
		
		let saved_game = this.localStorage.getItem("saved_game");
		let potvrzeni = true;
		if(saved_game.length > 0) {
			potvrzeni = this.confirm(t('confirm.start'));
		}

		if(potvrzeni) {

			fadeOverlay.style.opacity = 1;

			setTimeout(() => {

				startScreen.style.display = 'none';
				this.localStorage.setItem("hra_spustena", 1);
				this.localStorage.setItem("saved_game", "");
				ovladaci_prvky.style.display = 'block';

				//uvodni popup
				let hra_spustena = this.localStorage.getItem("hra_spustena");
				if(hra_spustena == 1 && currentArea === 'zacatek_cesty' && !solvedPuzzles.includes('uvod_popup')) {
					showPopup(t('start.intro_popup'));
					solvedPuzzles.push('uvod_popup');
				}

				fadeOverlay.style.opacity = 0;

				updateView();

			}, 1000);
			
		}
		
	};

	/* LOAD GAME*/

	load_btn_start.onclick = () => {
		nacistHru();
	};

	load_btn.onclick = () => {
		let potvrzeni_nacteni = this.confirm(t('confirm.load'));
		if(potvrzeni_nacteni) {
			nacistHru();
		}
	};

	/* SAVE GAME */
	save_btn.onclick = () => {

		let potvrzeni_ulozeni = this.confirm(t('confirm.save'));

		if(potvrzeni_ulozeni) {

			let saved_game = {
				currentArea: currentArea,
				currentDirectionIndex: currentDirectionIndex,
				inventory: inventory,
				solvedPuzzles: solvedPuzzles,
				addedItems: addedItems
			};

			this.localStorage.setItem("saved_game", JSON.stringify(saved_game));

			if(this.localStorage.getItem("saved_game").length > 0) {
				alert(t('alert.saved'));
			}
		}
	};

	/* RESTART */

	restart_btn.onclick = () => {
		this.location.reload();
	}

	/* CREDITS */

	let credits = document.getElementById('credits_link');
	credits.onclick = () => {

		let popupText = 
			t('credits.created') + " <span class='color-lighter-red'>Jan Gerek</span><br>" +
			t('credits.photos') + " <span class='color-lighter-red'>Jan Gerek</span><br><br>" +
			t('credits.texts') + " <span class='color-lighter-red'>Hrady.cz, Jan Gerek</span><br><br>" +
			t('credits.helped') + " <br><br>"+
				"<ul class='credits-ul'>" +
					"<li><i class='fas fa-photo-film'></i> <a href='https://www.photos.google.com' target='_blank'>Google Photos</a>, <a href='https://www.photopea.com/' target='_blank'>Photopea</a></li>" +
					"<li><i class='fas fa-robot'></i> <a href='https://gemini.google.com/' target='_blank'>Google Gemini, ChatGPT, Claude</li>" +
					"<li><i class='fas fa-robot'></i> <a href='https://chatgpt.com/' target='_blank'>ChatGPT</li>" +
					"<li><i class='fas fa-robot'></i> <a href='https://claude.ai/' target='_blank'>Claude</li>" +
					"<li><i class='fas fa-font-awesome'></i> <a href='https://fontawesome.com/' target='_blank'>Font Awesome</li>"+
				"</ul>"

		showPopup(popupText);
	};

	/* zavrit denik */
	let close_denik = document.getElementById('zavrit_denik');
	close_denik.onclick = () => {
		let denik = document.getElementById('denik');
		denik.style.display = 'none';
	};

	/* zavrit knihu */
	let close_kniha = document.getElementById('zavrit_knihu');
	close_kniha.onclick = () => {
		let kniha = document.getElementById('kniha');
		kniha.style.display = 'none';
	};

	/* NAPOVEDA */

	let napoveda_link = document.getElementById('napoveda_link');
	napoveda_link.onclick = () => {
		let napoveda = document.getElementById('napoveda');
		napoveda.style.display = 'flex';
	};

	/* zavrit napoveda */
	let close_napoveda = document.getElementById('zavrit_napoveda');
	close_napoveda.onclick = () => {
		let napoveda = document.getElementById('napoveda');
		napoveda.style.display = 'none';
	};

};

function nacistHru(){

	let saved_game_json = this.localStorage.getItem("saved_game");

	if(saved_game_json.length == 0) {
		alert(t('alert.no_save'));
		return;
	}else{

		startScreen.style.display = 'none';

		let saved_game = JSON.parse(saved_game_json);

		currentArea = saved_game.currentArea;
		currentDirectionIndex = saved_game.currentDirectionIndex;
		inventory = saved_game.inventory;
		solvedPuzzles = saved_game.solvedPuzzles;
		addedItems = saved_game.addedItems;

		this.localStorage.setItem("hra_spustena", 1);

		ovladaci_prvky.style.display = 'block';

		updateView();
	}
}

window.addEventListener('beforeunload', function (e) {

	e.preventDefault();

	let hra_spustena = this.localStorage.getItem("hra_spustena");
	if (hra_spustena == "1") {
		return t('ui.leave_page');
	}

});


/**
 * Inicializace posluchačů událostí pro otáčení kol
 */
document.addEventListener('DOMContentLoaded', function() {
    const wheels = document.querySelectorAll('.wheel');
    wheels.forEach(wheel => {
        wheel.addEventListener('click', rotateWheel);
    });
});

/**
 * Funkce pro otočení jednoho kotouče o 90 stupňů a aktualizaci datového atributu
 * @param {Event} event 
 */
function rotateWheel(event) {
    const wheel = event.currentTarget;
    
    // 1. Získání a aktualizace indexu rotace (0, 1, 2, 3)
    let currentIndex = parseInt(wheel.getAttribute('data-current-index'));
    currentIndex = (currentIndex + 1) % 4;
    wheel.setAttribute('data-current-index', currentIndex);
    
    // 2. Aplikování CSS rotace
    const degrees = currentIndex * 90;
    wheel.style.transform = `rotate(${degrees}deg)`;
    
    // 3. Aktualizace aktuálně vybraného symbolu (ten, který je na pozici 0°/nahoře)
    // data-symbols je pole symbolů v pořadí: Nahoře (0°), Vpravo (90°), Dole (180°), Vlevo (270°)
    const symbols = JSON.parse(wheel.getAttribute('data-symbols'));
    
    // Index symbolu, který se dostal pod šipku (nahoru)
    // Pokud je kotouč otočen o 90° (index 1), tak se pod šipku dostal symbol, který byl na pozici 90° (Vpravo).
    const currentSymbol = symbols[currentIndex];
    
    wheel.setAttribute('data-current-symbol', currentSymbol.toUpperCase());
    
    // Volitelné: Pro zobrazení debug informací v konzoli
    console.log(`Kotouč ${wheel.id} otočen na index ${currentIndex} (${degrees}deg). Vybraný symbol: ${currentSymbol}`);
}

const denik_zapisy = {
	1: {
		"den": "denik.1.den",
		"text": "denik.1.text"
	},
	2: {
		"den": "denik.2.den",
		"text": "denik.2.text"
	},
	3: {
		"den": "denik.3.den",
		"text": "denik.3.text"
	},
	4: {
		"den": "denik.4.den",
		"text": "denik.4.text"
	},
	5: {
		"den": "denik.5.den",
		"text": "denik.5.text"
	},
	6: {
		"den": "denik.6.den",
		"text": "denik.6.text"
	},
	7: {
		"den": "denik.7.den",
		"text": "denik.7.text"
	},
	8: {
		"den": "denik.8.den",
		"text": "denik.8.text"
	}
	
};

/**
 * Vytvoří element jednoho záznamu (deník / kniha) v aktuálním jazyce.
 */
function createZapisElement(zapis) {
	let zapis_element = document.createElement('div');
	zapis_element.classList.add('zapis');
	zapis_element.innerHTML = `
		<div class="den">${t(zapis.den)}</div>
		<div class="text">${t(zapis.text)}</div>
	`;
	return zapis_element;
}

function handleDenikClick(){

	let denik = document.getElementById('denik');
	let denik_zapisy_div = document.getElementById('denik_zapisy');

	denik.style.display = 'flex';

	if(!precteneKnihy.includes('denik')) {

		Object.values(denik_zapisy).forEach((zapis) => {

			let zapis_element = createZapisElement(zapis);
			denik_zapisy_div.appendChild(zapis_element);
			precteneKnihy.push('denik');

		});

	}

}

const kniha_zapisy = {

	1: {
		"den": "kniha.1.den",
		"text": "kniha.1.text"
	},
	2: {
		"den": "kniha.2.den",
		"text": "kniha.2.text"
	},
	3: {
		"den": "kniha.3.den",
		"text": "kniha.3.text"
	},
	4: {
		"den": "kniha.4.den",
		"text": "kniha.4.text"
	}

}

function handleKnihaClick(){

	let kniha = document.getElementById('kniha');
	let kniha_zapisy_div = document.getElementById('kniha_zapisy');

	kniha.style.display = 'flex';

	if(!precteneKnihy.includes('kniha')) {

		Object.values(kniha_zapisy).forEach((zapis) => {

			let zapis_element = createZapisElement(zapis);
			
			kniha_zapisy_div.appendChild(zapis_element);
			precteneKnihy.push('kniha');

		});

	}else{
		console.log("kniha jiz prectena");
	}

	

}


// --- PŘEPNUTÍ JAZYKA ---

/**
 * Volá se z i18n.js po změně jazyka. Překreslí všechno, co se skládá v JS.
 */
function onLanguageChanged() {
	const currentDir = DIRECTIONS[currentDirectionIndex];
	const areaData = MAP[currentArea];
	const viewData = areaData[currentDir];

	updateLabels(areaData, viewData, currentDir);
	renderHotspots();
	updateInventoryDisplay();

	// deník a kniha - pokud už jsou vykreslené, vykreslit znovu v novém jazyce
	if (precteneKnihy.includes('denik')) {
		const div = document.getElementById('denik_zapisy');
		div.innerHTML = '';
		Object.values(denik_zapisy).forEach(zapis => div.appendChild(createZapisElement(zapis)));
	}
	if (precteneKnihy.includes('kniha')) {
		const div = document.getElementById('kniha_zapisy');
		div.innerHTML = '';
		Object.values(kniha_zapisy).forEach(zapis => div.appendChild(createZapisElement(zapis)));
	}

	// koncová obrazovka
	if (endingScreen.style.display === 'flex') {
		document.getElementById('ending-text').innerHTML = t('ending.text');
	}
}
