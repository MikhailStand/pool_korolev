import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowLeft, ArrowUp, ArrowUpRight, Phone } from 'lucide-react';
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
const groups = [
  {
    id: 'grill', label: 'Мангал', title: 'Всё с огня',
    description: 'Шашлык, рыба, овощи и блюда для большой компании.',
    titles: ['ШАШЛЫКИ', 'САДЖ-КЕБАБ', 'РЫБНЫЕ БЛЮДА НА МАНГАЛЕ', 'ОВОЩИ НА МАНГАЛЕ', 'СТЕЙКИ'],
  },
  {
    id: 'salads', label: 'Салаты', title: 'Салаты',
    description: 'От знакомой классики до тёплых салатов.',
    titles: ['САЛАТЫ'],
  },
  {
    id: 'hot', label: 'Горячее', title: 'Сытная часть вечера',
    description: 'Супы, горячие блюда, паста и бургеры.',
    titles: ['ПЕРВЫЕ БЛЮДА', 'ВТОРЫЕ БЛЮДА', 'БУРГЕРЫ', 'ПАСТА'],
  },
  {
    id: 'snacks', label: 'Закуски', title: 'К столу',
    description: 'Закуски, нарезки и соусы к общей трапезе.',
    titles: ['НАРЕЗКИ / ЗАКУСКИ / БУТЕРБРОДЫ', 'ЗАКУСКИ К ПИВУ', 'СОУСЫ'],
  },
  {
    id: 'desserts', label: 'Десерты', title: 'Что-нибудь сладкое',
    description: 'Десерты, чтобы завершить ужин.',
    titles: ['ДЕСЕРТЫ'],
  },
  {
    id: 'drinks', label: 'Напитки', title: 'К вашему столу',
    description: 'Чай, кофе, лимонады, соки и пиво.',
    titles: ['НАПИТКИ', 'ЧАЙ (900 мл.)', 'КОФЕ', 'ЛИМОНАДЫ (1 л.)', 'СОКИ RICH (200 мл./1 л.) в ассортименте', 'МОЛОЧНЫЕ КОКТЕЙЛИ (400 мл.)', 'НАПИТКИ ГАЗИРОВАННЫЕ (в стекле) 330 мл.', 'ПИВО'],
  },
];

const priceLabel = (price: string) => price === 'Уточнить'
  ? price
  : `${price.replace(/\b\d{4,}\b/g, (value) => Number(value).toLocaleString('ru-RU')).replace(/\.(?=\d{3}(?:\D|$))/g, ' ').replaceAll('/', ' / ')} ₽`;

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
      <p>Позиции и цены перенесены с <a href={data.source} target="_blank" rel="noreferrer">официального сайта кафе</a>{` ${checked}. Наличие блюд и итоговую стоимость уточняйте при заказе.`}</p>
    </div>

    <nav className="menu-category-nav shell" aria-label="Разделы меню">
      {groups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.label}</a>)}
    </nav>

    <div className="menu-groups">
      {groups.map((group, groupIndex) => <section className={`menu-group menu-group-${groupIndex % 2 ? 'alt' : 'base'}`} id={group.id} key={group.id}>
        <div className="shell">
          <div className="menu-group-heading"><div><p className="menu-kicker">{group.label}</p><h2>{group.title}</h2></div><p>{group.description}</p></div>
          {group.titles.map((title) => {
            const section = sections.get(title);
            if (!section) return null;
            return <div className="menu-subsection" key={title}>
              <h3>{section.title}</h3>
              <div className="menu-item-grid">{section.items.map((item, index) => <div className="menu-item" key={`${title}-${index}`}>
                <div><span className="menu-item-name">{item.name}</span>{item.note && <small>{item.note}</small>}</div>
                <strong className="menu-item-price">{priceLabel(item.price)}</strong>
              </div>)}</div>
            </div>;
          })}
        </div>
      </section>)}
    </div>

    <section className="menu-end"><div className="shell menu-end-inner"><div><p className="menu-kicker">Есть вопросы по меню?</p><h2>Просто позвоните.</h2><p>Подскажут, что есть сегодня, и помогут забронировать стол.</p></div><a className="button button-primary" href={phoneHref}><Phone size={20} /> {phoneLabel}</a></div></section>
    <footer className="menu-page-footer shell"><a href={`${base}#food`}><ArrowLeft size={18} /> Вернуться на сайт</a><a href={data.source} target="_blank" rel="noreferrer">Оригинал меню <ArrowUpRight size={17} /></a><a href="#top"><ArrowUp size={17} /> Наверх</a></footer>
  </main>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><MenuPage /></React.StrictMode>);
