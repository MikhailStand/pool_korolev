import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowLeft, ArrowUp, ArrowUpRight, CakeSlice, CookingPot, Flame, GlassWater, Phone, Salad, UtensilsCrossed } from 'lucide-react';
import menuData from './menu-data.json';
import './styles.css';
import './menu.css';

type MenuItem = { name: string; price: string; note?: string };
type MenuSection = { title: string; items: MenuItem[] };
type MenuData = { source: string; checked: string; sections: MenuSection[] };

const data = menuData as MenuData;
const base = import.meta.env.BASE_URL;
const phoneHref = 'tel:+79998382917';
const phoneLabel = '+7 (999) 838-29-17';
const sections = new Map(data.sections.map((section) => [section.title, section]));
const barCocktails: MenuItem[] = [
  { name: 'Май тай (350 мл)', price: '500', note: 'Сок лайма, миндальный сироп, ананасовый и апельсиновый сок, лёд' },
  { name: 'Вишнёвый поцелуй (250 мл)', price: '250', note: 'Вишнёвый сок, кокосовый сироп, лимон, лёд' },
  { name: 'Мохито (350 мл)', price: '400', note: 'Лайм, мятный сироп, спрайт, мята, лёд' },
  { name: 'Санрайз (250 мл)', price: '400', note: 'Ананасовый сок, сироп гренадин, лёд' },
  { name: 'Холли Долли (200 мл)', price: '250', note: 'Ананасовый и апельсиновый сок, сироп гренадин или мятный' },
  { name: 'Пина Колада (300 мл)', price: '500', note: 'Ананасовый сок, кокосовый сироп, сливки, лёд' },
  { name: 'Тоник (250 мл)', price: '400', note: 'Тоник, лайм, лёд' },
];
const groups = [
  {
    id: 'grill', label: 'Мангал', kicker: 'С огня', title: 'Мангал и шашлыки',
    description: 'Шашлык, рыба, овощи и блюда для большой компании.',
    art: 'ОГОНЬ',
    icon: <Flame />,
    titles: ['ШАШЛЫКИ', 'САДЖ-КЕБАБ', 'РЫБНЫЕ БЛЮДА НА МАНГАЛЕ', 'ОВОЩИ НА МАНГАЛЕ', 'СТЕЙКИ'],
  },
  {
    id: 'salads', label: 'Салаты', kicker: 'Свежие вкусы', title: 'Салаты',
    description: 'От знакомой классики до тёплых салатов.',
    art: 'СВЕЖЕСТЬ',
    icon: <Salad />,
    titles: ['САЛАТЫ'],
  },
  {
    id: 'hot', label: 'Горячее', kicker: 'К ужину', title: 'Горячие блюда',
    description: 'Супы, горячие блюда, паста и бургеры.',
    art: 'ТЕПЛО',
    icon: <CookingPot />,
    titles: ['ПЕРВЫЕ БЛЮДА', 'ВТОРЫЕ БЛЮДА', 'БУРГЕРЫ', 'ПАСТА'],
  },
  {
    id: 'snacks', label: 'Закуски', kicker: 'Для компании', title: 'Закуски',
    description: 'Закуски, нарезки и соусы к общей трапезе.',
    art: 'ВМЕСТЕ',
    icon: <UtensilsCrossed />,
    titles: ['НАРЕЗКИ / ЗАКУСКИ / БУТЕРБРОДЫ', 'ЗАКУСКИ К ПИВУ', 'СОУСЫ'],
  },
  {
    id: 'desserts', label: 'Десерты', kicker: 'К чаю', title: 'Десерты',
    description: 'Десерты, чтобы завершить ужин.',
    art: 'ДЕСЕРТ',
    icon: <CakeSlice />,
    titles: ['ДЕСЕРТЫ'],
  },
  {
    id: 'drinks', label: 'Напитки', kicker: 'Бар и кафе', title: 'Напитки',
    description: 'Лимонады и коктейли, чай, кофе, соки и пиво.',
    art: 'НАПИТКИ',
    icon: <GlassWater />,
    titles: ['НАПИТКИ', 'ЧАЙ (900 мл.)', 'КОФЕ', 'ЛИМОНАДЫ (1 л.)', 'КОКТЕЙЛИ И ЛИМОНАДЫ (БАР)', 'СОКИ RICH (200 мл./1 л.) в ассортименте', 'МОЛОЧНЫЕ КОКТЕЙЛИ (400 мл.)', 'НАПИТКИ ГАЗИРОВАННЫЕ (в стекле) 330 мл.', 'ПИВО'],
  },
  {
    id: 'hookah', label: 'Кальян', kicker: 'Для отдыха', title: 'Кальян',
    description: 'Для вечера, который не хочется заканчивать.',
    art: 'КАЛЬЯН',
    icon: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 5h5m-2.5 0v6m-5 0h10l-2 5h-6l-2-5Zm5 5v12m-8 0h16l-2 12H18l-2-12Zm6 12v-4m5 4v-4M14 25h-4c-3 0-5-2-5-5v-2m24 7h4c5 0 8-3 8-8v-3" /></svg>,
    titles: [],
  },
];

const priceLabel = (price: string) => price === 'Уточнить'
  ? price
  : `${price.replace(/\b\d{4,}\b/g, (value) => Number(value).toLocaleString('ru-RU')).replace(/\.(?=\d{3}(?:\D|$))/g, ' ').replaceAll('/', ' / ')} ₽`;

function MenuSectionBlock({ title, displayTitle, items }: { title: string; displayTitle?: string; items?: MenuItem[] }) {
  const section = sections.get(title);
  const visibleItems = items ?? section?.items;
  if (!visibleItems) return null;
  return <div className="menu-subsection" id={title === 'КОКТЕЙЛИ И ЛИМОНАДЫ (БАР)' ? 'bar-cocktails' : undefined}>
    <h3>{displayTitle ?? section?.title ?? title}</h3>
    <div className="menu-item-grid">{visibleItems.map((item, index) => <div className="menu-item" key={`${title}-${index}`}>
      <div><span className="menu-item-name">{item.name}</span>{item.note && <small>{item.note}</small>}</div>
      <strong className="menu-item-price">{priceLabel(item.price)}</strong>
    </div>)}</div>
  </div>;
}

function MenuPage() {
  useEffect(() => {
    if (!window.location.hash) return;
    // Hash navigation from the home page may happen before React renders the target.
    requestAnimationFrame(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView());
  }, []);

  const checked = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${data.checked}T12:00:00`)).replace(/ г\.$/, ' года');

  return <main className="menu-page" id="top">
    <header className="menu-page-header">
      <div className="shell menu-page-header-inner">
        <a className="brand" href={base} aria-label="Ретро — вернуться на главную"><span className="brand-mark">Р</span><span className="brand-copy"><b>Ретро</b><small>Кафе · Бильярд · Королёв</small></span></a>
        <a className="menu-return" href={`${base}#food`}><ArrowLeft size={19} /> Вернуться на сайт</a>
        <a className="menu-call" href={phoneHref}><Phone size={18} /><span>{phoneLabel}</span></a>
      </div>
    </header>

    <section className="menu-hero" style={{ '--menu-image': `url(${base}images/retro-food-grill.jpg)` } as React.CSSProperties}>
      <div className="shell menu-hero-content">
        <p className="menu-kicker">Кафе «Ретро» · Королёв</p>
        <h1>Хороший вечер<br />начинается <em>за столом.</em></h1>
        <p>Шашлык с мангала, домашние блюда, закуски и десерты. Здесь собрано опубликованное меню кафе — выбирайте, что по душе.</p>
        <a className="menu-hero-action" href="#grill">Смотреть меню <ArrowUpRight size={20} /></a>
      </div>
      <span className="menu-photo-note">Иллюстративное изображение</span>
    </section>

    <div className="menu-intro shell">
      <div><span>Меню «Ретро»</span><h2>Что закажем?</h2></div>
      <p>Блюда и цены перенесены с <a href={data.source} target="_blank" rel="noreferrer">официального сайта кафе</a>{` ${checked}. Коктейли и кальян дополнены по его барному и кальянному разделам. Наличие и итоговую стоимость уточняйте при заказе.`}</p>
    </div>

    <nav className="menu-category-nav shell" aria-label="Разделы меню">
      {groups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.label}</a>)}
    </nav>

    <div className="menu-groups">
      {groups.map((group, groupIndex) => <section className={`menu-group menu-group-${groupIndex % 2 ? 'alt' : 'base'} menu-group-${group.id}`} id={group.id} key={group.id}>
        <div className="shell">
          <div className="menu-group-heading"><span className="menu-group-art" aria-hidden="true">{group.art}</span><div><p className="menu-kicker">{group.kicker}</p><h2>{group.title}</h2></div><div className="menu-group-heading-side"><span className="menu-group-icon" aria-hidden="true">{group.icon}</span><p>{group.description}</p></div></div>
          {group.id === 'hookah' && <div className="hookah-feature"><div><p className="menu-kicker">Кальян и табак</p><div className="hookah-price-list"><div><span>Классический на чаше</span><strong>1 300 ₽</strong></div><div><span>Табак Darkside <small>в ассортименте</small></span><strong>1 800 ₽</strong></div></div><a href="https://retro-korolev.ru/menu/hookah.html" target="_blank" rel="noreferrer">Цены на сайте «Ретро» <ArrowUpRight size={18} /></a></div><div><span>Наполнение колбы</span><div className="hookah-options"><div><span>Молоко</span><strong>+300 ₽</strong></div><div><span>Сок</span><strong>+300 ₽</strong></div><div><span>Вино</span><strong>+500 ₽</strong></div></div><a className="button button-primary" href={phoneHref}><Phone size={19} /> Спросить и забронировать</a></div></div>}
          {group.id === 'drinks' ? <>
            <div className="drink-jump" aria-label="Виды напитков"><a href="#soft-drinks">Безалкогольные</a><a href="#alcohol-drinks">Алкогольные</a></div>
            <div className="drink-kind" id="soft-drinks"><div className="drink-kind-heading"><p>Чай, кофе, лимонады и другое</p><h3>Безалкогольные</h3></div>{group.titles.filter((title) => title !== 'ПИВО').map((title) => <React.Fragment key={title}><MenuSectionBlock title={title} items={title === 'КОКТЕЙЛИ И ЛИМОНАДЫ (БАР)' ? barCocktails : undefined} />{title === 'КОКТЕЙЛИ И ЛИМОНАДЫ (БАР)' && <p className="menu-source-note">Коктейли и лимонады — по <a href="https://retro-korolev.ru/menu/bar.html" target="_blank" rel="noreferrer">барному меню «Ретро» <ArrowUpRight size={15} /></a>. Другие варианты можно уточнить в кафе.</p>}</React.Fragment>)}<MenuSectionBlock title="ПИВО" displayTitle="БЕЗАЛКОГОЛЬНОЕ ПИВО" items={sections.get('ПИВО')?.items.filter((item) => item.name.includes('«0»'))} /></div>
            <div className="drink-kind drink-kind-alcohol" id="alcohol-drinks"><div className="drink-kind-heading"><p>Барное меню</p><h3>Алкогольные</h3></div><MenuSectionBlock title="ПИВО" items={sections.get('ПИВО')?.items.filter((item) => !item.name.includes('«0»'))} /></div>
          </> : group.titles.map((title) => <MenuSectionBlock title={title} key={title} />)}
        </div>
      </section>)}
    </div>

    <section className="menu-end"><div className="shell menu-end-inner"><div><p className="menu-kicker">Есть вопросы по меню?</p><h2>Просто позвоните.</h2><p>Подскажут, что есть сегодня, и помогут забронировать стол.</p></div><a className="button button-primary" href={phoneHref}><Phone size={20} /> {phoneLabel}</a></div></section>
    <footer className="menu-page-footer shell"><a href={`${base}#food`}><ArrowLeft size={18} /> Вернуться на сайт</a><a href={data.source} target="_blank" rel="noreferrer">Оригинал меню <ArrowUpRight size={17} /></a><a href="#top"><ArrowUp size={17} /> Наверх</a></footer>
  </main>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><MenuPage /></React.StrictMode>);
