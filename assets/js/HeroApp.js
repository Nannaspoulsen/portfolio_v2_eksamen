
const { createApp, computed } = Vue;

function buildNav(active) {
  const items = [
    { label: 'home',    href: 'Index.html'   },
    { label: 'about',   href: 'About.html'   },
    { label: 'work',    href: 'Work.html'    },
    { label: 'contact', href: 'Contact.html' }
  ];
  const a = (active || '').toLowerCase();
  return items.map(i => ({ ...i, current: i.label.toLowerCase() === a }));
}


const TheHero = {
  props: {
    image:    { type: String, required: true },
    title:    { type: String, required: true },
    subtitle: { type: String, default: '' },
    active:   { type: String, default: '' },
  },
  setup(props) {
    const nav = computed(() => buildNav(props.active));
    return { nav };
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
  components: { TheHero },
  setup() {
    const root = document.getElementById('hero-root') || {};
    const ds   = root.dataset || {};

    return {
      image:    ds.image    || 'assets/img/2048px-Nicolas_Poussin,_French_-_The_Birth_of_Venus_-_Google_Art_Project.jpg',
      title:    ds.title    || 'PORTFOLIO',
      subtitle: ds.subtitle || 'Stories thoughtfully born into digital spaces',
      active:   ds.active   || ''
     
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
