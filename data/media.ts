export type MediaRef = {
  src: string;
  altKey: string;
  sourceUrl: string;
  width: number;
  height: number;
};

const base = 'https://www.rockstargames.com/VI/_next/static/media/';
const rockstar = 'https://www.rockstargames.com/VI/media/screenshots';
const artwork = 'https://www.rockstargames.com/VI/media/artwork-wallpapers';

const screenshot = (
  file: string,
  width = 3840,
  height = 2160,
): MediaRef => ({
  src: `${base}${file}?akim=1&imdensity=1&imwidth=3840`,
  altKey: 'accessibility.genericImage',
  sourceUrl: rockstar,
  width,
  height,
});

const character = (file: string): MediaRef => ({
  ...screenshot(file),
  altKey: 'accessibility.characterImage',
});

const locationShot = (file: string): MediaRef => ({
  ...screenshot(file),
  altKey: 'accessibility.locationImage',
});

const locationPostcard = (file: string): MediaRef => ({
  src: `${base}${file}?akim=1&imdensity=1&imwidth=1800`,
  altKey: 'accessibility.locationImage',
  sourceUrl: artwork,
  width: 1800,
  height: 1000,
});

const trailer = (file: string): MediaRef => ({
  src: `${base}${file}?akim=1&imdensity=1&imwidth=3840`,
  altKey: 'accessibility.trailerImage',
  sourceUrl: 'https://www.rockstargames.com/VI/media/videos',
  width: 3840,
  height: 2160,
});

export const media = {
  hero: screenshot('Jason_and_Lucia_01_landscape.12x2gvspcm_3m.jpg'),

  characters: {
    jason: character('Jason_Duval_01.07m377xeb6jhq.jpg'),
    jasonHome: character('Jason_Duval_08.0841zdqaobvhd.jpg'),
    jasonAlt: character('Jason_Duval_05.0kxp6enhvzqka.jpg'),
    jasonFinal: character('Jason_Duval_09.0to5nepm39efn.jpg'),

    lucia: character('Lucia_Caminos_02.16n.5umvlu_48.jpg'),
    luciaHome: character('Lucia_Caminos_06.0fxbjfk0jakb3.jpg'),
    luciaAlt: character('Jason_and_Lucia_10.0cauoz34524-..jpg'),

    cal: character('Cal_Hampton_01.0xlil231_osh4.jpg'),
    calAlt: character('Cal_Hampton_02.05r2t_mck65fe.jpg'),

    boobie: character('Boobie_Ike_01.0-wji2pg5anfs.jpg'),
    boobieAlt: character('Boobie_Ike_02.0sp9mtc.1cdzs.jpg'),

    drequan: character('DreQuan_Priest_03.0zbl4i_x_1biu.jpg'),
    drequanAlt: character('DreQuan_Priest_03.0zbl4i_x_1biu.jpg'),

    realdimez: character('Real_Dimez_04.0wa3vo07lz4e2.jpg'),
    realdimezAlt: character('Real_Dimez_02.1366u9.x.yp0_.jpg'),

    raul: character('Raul_Bautista_01.0md1ii-yrn96r.jpg'),
    raulAlt: character('Raul_Bautista_02.10ddy6ogywu-t.jpg'),

    brian: character('Brian_Heder_01.0r.ute88os9k-.jpg'),
    brianAlt: character('Brian_Heder_02.0kmg6iw38f-9o.jpg'),
  },

  locations: {
    viceCity: locationPostcard('Vice_City_Postcard_landscape.0v2njmlk2n-qm.jpg'),
    leonidaKeys: locationPostcard('Leonida_Keys_Postcard_landscape.05oezf2h--~ed.jpg'),
    portGellhorn: locationPostcard('Port_Gellhorn_Postcard_landscape.176c2o75nmcr8.jpg'),
    ambrosia: locationPostcard('Ambrosia_Postcard_landscape.0gd~9a41ia-rt.jpg'),
    grassrivers: locationPostcard('Grassrivers_Postcard_landscape.15-10i39nhex2.jpg'),
    mountKalaga: locationPostcard('Mount_Kalaga_National_Park_Postcard_landscape.0c1cb4ocq16n3.jpg'),
  },

  locationHomeGalleries: {
    viceCity: [
      locationShot('Vice_City_08.0bbg_xp4hqdvz.jpg'),
      locationShot('Vice_City_09.0~ng.c8ack3fp.jpg'),
      locationShot('Vice_City_10.0f1q-xa_4q8r2.jpg'),
    ],
  },

  locationGalleries: {
    viceCity: [
      locationShot('Vice_City_01.135x56yoeu.6t.jpg'),
      locationShot('Vice_City_02.0c5.7qx17u9kl.jpg'),
      locationShot('Vice_City_03.0nqz~lrqdmlze.jpg'),
      locationShot('Vice_City_04.06evqutgh7624.jpg'),
    ],
    leonidaKeys: [
      locationShot('Leonida_Keys_01.0zgz7tveur6y8.jpg'),
      locationShot('Leonida_Keys_02.0~ptk-53gl0lq.jpg'),
      locationShot('Leonida_Keys_03.0v_3~-9ceyixc.jpg'),
      locationShot('Leonida_Keys_04.0hce1rw1s8pd9.jpg'),
    ],
    portGellhorn: [
      locationShot('Port_Gellhorn_01.0fmisvza-5-cq.jpg'),
      locationShot('Port_Gellhorn_02.00e7cz6lwrup-.jpg'),
      locationShot('Port_Gellhorn_03.00c2b0eh7sm~q.jpg'),
      locationShot('Port_Gellhorn_04.0hd-7kzfi51q..jpg'),
    ],
    ambrosia: [
      locationPostcard('Ambrosia_Postcard_landscape.0gd~9a41ia-rt.jpg'),
      locationShot('Ambrosia_02.0wtqs05ozl.ym.jpg'),
      locationShot('Ambrosia_03.0vt46a.1s.7-y.jpg'),
      locationShot('Ambrosia_04.0.2cefoguu-tt.jpg'),
    ],
    grassrivers: [
      locationShot('Grassrivers_01.1096rw4lbjur_.jpg'),
      locationShot('Grassrivers_02.0teqs5xe2pem1.jpg'),
      locationShot('Grassrivers_03.14cuv-vg9orw4.jpg'),
    ],
    mountKalaga: [
      locationShot('Mount_Kalaga_National_Park_01.0v5fl0f83hjv_.jpg'),
      locationShot('Mount_Kalaga_National_Park_02.0f24dhopdprvx.jpg'),
      locationShot('Mount_Kalaga_National_Park_03.037k2s87rwuxc.jpg'),
      locationShot('Mount_Kalaga_National_Park_04.0e1sxnp1mln2u.jpg'),
    ],
  },

  trailers: {
    extended: trailer('GTAVI_An_Extended_Look_poster.0ijbsha5fo1te.jpg'),
    trailer2: trailer('GTAVI_Trailer2_poster.0cosv-uzbpt91.jpg'),
    trailer1: trailer('GTAVI_Trailer1_poster.12x2gvspcm_3m.jpg'),
  },

  news: {
    launch: screenshot('Official_Cover_Art_landscape.12.uu2irr.2_a.jpg'),
    preorder: screenshot('Jason_and_Lucia_Robbery_landscape.09c8a~do21h4p.jpg'),
    extended: trailer('GTAVI_An_Extended_Look_poster.0ijbsha5fo1te.jpg'),
    dualsense: {
      src: 'https://blog.playstation.com/tachyon/2026/09/a5bd4c6e9ca55c1e1fe1705b79e86300f205831f.png',
      altKey: 'accessibility.newsImage',
      sourceUrl:
        'https://blog.playstation.com/2026/09/03/first-look-at-the-grand-theft-auto-vi-limited-edition-dualsense-wireless-controllers/',
      width: 1000,
      height: 563,
    },
    platforms: screenshot('The_Album_Cover_Art_landscape.000ifb9a.j-gp.jpg'),
  },
};
