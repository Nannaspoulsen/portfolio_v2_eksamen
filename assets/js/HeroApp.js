const { createApp, computed } = Vue;
// Jeg henter de ting fra Vue, som jeg skal bruge.

function buildNav(active) {
  // Funktion der laver menu-listen og finder ud af, hvilken side der er aktiv.

  const items = [
    { label: 'home',    href: 'Index.html'   },
    { label: 'about',   href: 'About.html'   },
    { label: 'work',    href: 'Work.html'    },
    { label: 'contact', href: 'Contact.html' }
  ];
  // Her har jeg mine menupunkter som et array af objekter.

  const a = (active || '').toLowerCase();
  // Jeg tager den side, der er aktiv, og laver den om til små bogstaver.

  return items.map(i => ({ ...i, current: i.label.toLowerCase() === a }));
  // Jeg går igennem alle menupunkterne og tilføjer feltet "current", som er true på det punkt, der matcher den aktive side.
}


const TheHero = {
  // Min Vue-komponent til hero-sektionen.

  props: {
    image:    { type: String, required: true },
    // Billedet, der skal vises i heroen.

    title:    { type: String, required: true },
    // Overskriften i heroen.

    subtitle: { type: String, default: '' },
    // Underoverskrift.

    active:   { type: String, default: '' },
    // Navnet på den side, der er aktiv, så menuen kan markere det rigtige punkt.
  },

  setup(props) {
    // Her forbereder jeg de data, komponenten skal bruge.

    const nav = computed(() => buildNav(props.active));
    // Jeg laver navigationen ud fra props.active. Computed gør, at den automatisk opdaterer sig, hvis active ændrer sig.

    return { nav };
    // Jeg returnerer nav, så jeg kan bruge den inde i templaten.
  },

  template: `
    <header :class="['hero', { 'hero--slim': slim }]">
      <img :src="image" alt="Hero image" class="hero-image" />
      <nav class="main-nav">
        <ul>
          <li v-for="item in nav" :key="item.href">
            <a
              :href="item.href"
              :class="{ active: item.current }"
              :aria-current="item.current ? 'page' : null"
            >{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="hero-text">
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
      </div>
    </header>
  `
};


createApp({
  // Her opretter jeg min Vue-app.

  components: { TheHero },
  // Jeg registrerer TheHero-komponenten, så jeg kan bruge den i appens template.

  setup() {
    const root = document.getElementById('hero-root') || {};
    // Jeg finder det HTML-element, hvor heroen skal sættes ind.

    const ds   = root.dataset || {};
    // Jeg henter data-attributter fra HTML (data-image, data-title osv.).

    return {
      image:    ds.image    || 'assets/img/2048px-Nicolas_Poussin,_French_-_The_Birth_of_Venus_-_Google_Art_Project.jpg',
      // Billedet jeg bruger.

      title:    ds.title    || 'PORTFOLIO',
      // Min titel.

      subtitle: ds.subtitle || 'Stories thoughtfully born into digital spaces',
      // Undertekst.

      active:   ds.active   || ''
      // Den aktive side. Bruges til at markere det rigtige menupunkt.
    };
  },

  template: `
    <TheHero
      :image="image"
      :title="title"
      :subtitle="subtitle"
      :active="active"
    />
  `
}).mount('#hero-root');
// Her monterer jeg appen på elementet med id="hero-root" i HTML’en.
