module.exports = {
  // -----------------------------------------------
  //  Application Data
  // -----------------------------------------------
  app: {
    // App language
    lang: 'en',
    // Main title
    title: 'Web Static Boilerplate',
    // Main description of the application (limit to 150 characters)
    description: 'Minimalist static website boilerplate and build process to quickly get projects going.',
    // Company slogan, often used in `hero` section
    slogan: 'The slogan of the website goes here.',

    legalName: '',
    slogan: '',
    telephone: '',
    email: '',
    faxNumber: '',
    logo: '',
    // A photograph of this place
    photo: '',
    // This number is known as the numéro SIREN
    taxID: '',
    // Here is an example: "Mo, Tu, We, Th, Fr 08:00-18:00"
    openingHours: '',
    // The postal code. For example, 94043
    address: '',
    // Region
    region: '',
    // Place
    location: '',
    // The latitude and longitude  of a location. For example 37.42242
    latitude: '',
    longitude: '',
    // A contact point for a person or organization
    contactPoint: '',
    founder: '',
    foundingDate: '',
    foundingLocation: '',

    // Google Search Console and Analytics credentials
    // @see: https://search.google.com/search-console
    // @see: https://analytics.google.com
    google: {
      verify_id: '',
      analytics_id: ''
    },
    // @see: https://webmaster.yandex.com
    yandex: {
      verify_id: ''
    },
    // @see: https://www.bing.com/toolbox/webmaster
    bing: {
      verify_id: ''
    },
    // @see: https://www.alexa.com/siteinfo
    alexa: {
      verify_id: ''
    },
    // @see: https://twitter.com
    twitter: {
      site_account: ''
    },
    // @see: https://developers.facebook.com
    facebook: {
      app_id: ''
    },

    /**
     *  Add more data here to use in templates..
     */
    // ...
  },

  // -----------------------------------------------
  //  Application configuration
  // -----------------------------------------------
  config: {

    // The entry object is where webpack looks to start building the bundle
    entry: {
      main: ['./js/main.js', './scss/main.scss']
    },

    // Setup for generating favicons and their associated files
    // @see: https://github.com/itgalaxy/favicons
    favicons: {
      background: '#fff',
      theme_color: '#cdcdcd',
      appleStatusBarStyle: 'black-translucent',
      display: 'standalone',
      orientation: 'any',
      start_url: '/?homescreen=1',
      loadManifestWithCredentials: true,

      // Platform Options:
      icons: {
        favicons: true,
        android: true,
        appleIcon: true,
        appleStartup: true,
        windows: true,
        firefox: true,
        coast: true,
        yandex: true
      }
    },

    // Favicons sizes for different devices
    faviconSizes: {
      // Favicons `.png` files
      favicons: [
        '16x16',
        '32x32',
        '48x48'
      ],
      // Apple touch icons
      appleIcons: [
        '57x57',
        '60x60',
        '72x72',
        '76x76',
        '114x114',
        '120x120',
        '144x144',
        '152x152',
        '167x167',
        '180x180',
        '1024x1024'
      ],
      // Apple start up images
      appleImages: [
        ['320', '568', '2', 'portrait', '640x1136'],
        ['375', '667', '2', 'portrait', '750x1334'],
        ['414', '896', '2', 'portrait', '828x1792'],
        ['375', '812', '3', 'portrait', '1125x2436'],
        ['414', '736', '3', 'portrait', '1242x2208'],
        ['414', '896', '3', 'portrait', '1242x2688'],
        ['768', '1024', '2', 'portrait', '1536x2048'],
        ['834', '1112', '2', 'portrait', '1668x2224'],
        ['834', '1194', '2', 'portrait', '1668x2388'],
        ['1024', '1366', '2', 'portrait', '2048x2732'],
        ['810', '1080', '2', 'portrait', '1620x2160'],
        ['320', '568', '2', 'landscape', '1136x640'],
        ['375', '667', '2', 'landscape', '1334x750'],
        ['414', '896', '2', 'landscape', '1792x828'],
        ['375', '812', '3', 'landscape', '2436x1125'],
        ['414', '736', '3', 'landscape', '2208x1242'],
        ['414', '896', '3', 'landscape', '2688x1242'],
        ['768', '1024', '2', 'landscape', '2048x1536'],
        ['834', '1112', '2', 'landscape', '2224x1668'],
        ['834', '1194', '2', 'landscape', '2388x1668'],
        ['1024', '1366', '2', 'landscape', '2732x2048'],
        ['810', '1080', '2', 'landscape', '2160x1620']
      ]
    }
  }
}
