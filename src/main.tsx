import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowDown, ArrowUp, ArrowUpRight, Clock3, MapPin, Menu, Phone, X } from 'lucide-react';
import './styles.css';

const base = import.meta.env.BASE_URL;
const phoneHref = 'tel:+79998382917';
const phoneLabel = '+7 (999) 838-29-17';
const mapsHref = 'https://yandex.ru/maps/org/retro/17968240150/?ll=37.863951%2C55.920845&z=15';
const menuHref = 'https://retro-korolev.ru/menu.html';
const ourMenuHref = `${base}menu.html`;
const gallery = [
  { src: 'glavny-billiards-player.jpg', alt: 'Иллюстрация: игрок за бильярдным столом' },
  { src: 'glavny-billiards-hall.jpg', alt: 'Иллюстрация: бильярдный зал' },
  { src: 'glavny-billiards-shot.jpg', alt: 'Иллюстрация: удар по бильярдному шару' },
  { src: 'glavny-billiards-friends.jpg', alt: 'Иллюстрация: партия в бильярд' },
  { src: 'glavny-billiards-balls.jpg', alt: 'Иллюстрация: шары для русского бильярда' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setLightbox(null); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return <main>
    <header className={`site-header shell${headerScrolled ? ' site-header-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Ретро — наверх"><span className="brand-mark">Р</span><span className="brand-copy"><b>Ретро</b><small>Кафе · Бильярд · Королёв</small></span></a>
      <nav className="desktop-nav" aria-label="Основная навигация"><a href="#top">Главная</a><a href="#billiards">Бильярд</a><a href="#food">Кухня</a><a href="#contacts">Контакты</a></nav>
      <a className="header-call" href={phoneHref} aria-label={`Позвонить в Ретро: ${phoneLabel}`}><Phone size={18} /> <span>{phoneLabel}</span></a>
      <button className="menu-button" aria-label="Открыть меню" onClick={() => setMenuOpen(true)}><Menu /></button>
    </header>

    <section className="hero" style={{ '--hero-image': `url(${base}images/glavny-hero-action.jpg)` } as React.CSSProperties}>
      <div id="top" className="hero-content shell">
        <p className="eyebrow"><span /> Кафе и бильярд в Королёве</p>
        <h1>Встречаемся<br />в <em>«Ретро»</em></h1>
        <p className="hero-lead">Сыграть партию, заказать ужин и провести вечер вместе — всё в одном месте на Полевом проезде.</p>
        <div className="hero-actions"><a className="button button-primary" href={phoneHref}><Phone size={19} /> Забронировать</a><a className="button button-prices" href="#billiards">О бильярде</a><a className="button button-prices" href="#food">О кухне</a></div>
        <div className="hero-meta"><a href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> Полевой проезд, 4А</a><a href={mapsHref} target="_blank" rel="noreferrer"><Clock3 /> Часы работы — в Яндекс Картах</a></div>
        <p className="hero-photo-note">Иллюстративное изображение</p>
      </div>
      <a className="scroll-hint" href="#billiards" aria-label="Листать к разделу о бильярде"><ArrowDown /></a>
    </section>

    <section className="facts-zone" aria-label="Что есть в Ретро"><div className="quick-facts shell">
      <div><small>Для игры</small><strong>Бильярд</strong><span>русский бильярд и американский пул</span></div>
      <div><small>Для ужина</small><strong>Мангал</strong><span>мясо, рыба и овощи</span></div>
      <div><small>Для компании</small><strong>Караоке</strong><span>вечер можно продолжить</span></div>
      <div><small>С собой</small><strong>Еда навынос</strong><span>или доставка</span></div>
    </div></section>

    <section id="billiards" className="about section-pad shell">
      <div className="about-copy"><p className="section-kicker">Бильярд в Ретро</p><h2>Для партии —<br /><em>свой стол</em></h2>
        <p className="section-lead">Любите размеренную игру или быстрый пул? В «Ретро» можно выбрать формат под настроение, а после партии остаться на ужин.</p>
        <div className="feature-list"><div><b>Русский бильярд</b><small>Для тех, кто ценит точность и неспешную игру.</small></div><div><b>Американский пул</b><small>Более динамичный формат для встречи с друзьями.</small></div><div><b>Стол и ужин в одном месте</b><small>Бронируйте игру и спрашивайте свободное время по телефону.</small></div></div>
      </div>
      <div className="about-image-wrap"><img src={`${base}images/glavny-billiards-balls.jpg`} alt="Иллюстрация: бильярдные шары на столе" loading="lazy" /></div>
    </section>

    <section className="prices section-pad" aria-labelledby="game-heading"><div className="shell">
      <div className="section-heading split-heading"><div><p className="section-kicker">Выбор игры</p><h2 id="game-heading">Во что <em>сыграем?</em></h2></div><p>Актуальные цены и свободные столы лучше уточнить напрямую: открытые источники не дают надёжного тарифа на игру.</p></div>
      <div className="game-grid">
        <a className="game-card" href="#booking" aria-label="Узнать о бронировании русского бильярда"><span>Классическая партия</span><strong>Русский<br />бильярд</strong><small>Узнать о бронировании <ArrowUpRight /></small></a>
        <a className="game-card" href="#booking" aria-label="Узнать о бронировании американского пула"><span>Игра для компании</span><strong>Американский<br />пул</strong><small>Узнать о бронировании <ArrowUpRight /></small></a>
        <div className="game-info"><p>Стоимость игры</p><strong>Уточните<br />по телефону</strong><span>Подскажут цену и помогут выбрать свободный стол.</span><a href={phoneHref}><Phone size={18} /> {phoneLabel}</a></div>
      </div>
    </div></section>

    <section id="gallery" className="gallery-section section-pad shell"><div className="section-heading split-heading"><div><p className="section-kicker">Атмосфера игры</p><h2>Время для <em>партии</em></h2></div><p>Пока здесь иллюстративные кадры бильярда, не фотографии «Ретро». Позже их можно заменить снимками заведения.</p></div>
      <div className="gallery-grid">{gallery.map((image, index) => <button key={image.src} className={`gallery-item gallery-item-${index + 1}`} onClick={() => setLightbox(index)} aria-label={`Открыть фото: ${image.alt}`}><img src={`${base}images/${image.src}`} alt={image.alt} loading="lazy" /><span><ArrowUpRight /></span></button>)}</div>
    </section>

    <section id="food" className="food-section section-pad"><div className="shell food-layout">
      <div className="food-copy"><p className="section-kicker">Кухня Ретро</p><h2>Партия сыграна.<br /><em>Ужин ждёт.</em></h2><p className="section-lead">Здесь готовят блюда с мангала, салаты, горячее и закуски. Можно прийти поесть, собрать компанию за столом или продолжить вечер после бильярда.</p>
        <div className="food-types" aria-label="Разделы меню"><a href={`${ourMenuHref}#grill`}>Мангал и шашлык</a><a href={`${ourMenuHref}#salads`}>Салаты</a><a href={`${ourMenuHref}#hot`}>Горячие блюда</a><a href={`${ourMenuHref}#snacks`}>Закуски</a></div>
        <div className="food-actions"><a className="button button-primary" href={ourMenuHref}>Посмотреть меню <ArrowUpRight size={18} /></a><a className="button button-ghost" href={phoneHref}><Phone size={18} /> Уточнить по телефону</a></div>
        <p className="food-disclaimer">Меню на отдельной странице собрано по данным <a href={menuHref} target="_blank" rel="noreferrer">сайта «Ретро»</a>. Цены и наличие блюд уточняйте по телефону.</p>
      </div>
      <figure className="food-photo"><img src={`${base}images/retro-food-grill.jpg`} alt="Иллюстрация: шашлык, овощи, салат и хлеб на столе" loading="lazy" /><figcaption>Иллюстративное изображение, не фото заведения</figcaption></figure>
    </div></section>

    <section id="booking" className="booking-zone"><div className="booking-banner shell"><div><p className="section-kicker">Вечер начинается здесь</p><h2>Осталось выбрать <em>время</em></h2></div><div className="booking-actions"><a className="button button-primary" href={phoneHref}><Phone /> Позвонить и забронировать</a><a className="button button-outline-dark" href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> Построить маршрут</a></div></div></section>

    <section id="contacts" className="contacts section-pad"><div className="shell contacts-grid"><div className="contacts-copy"><p className="section-kicker">Контакты</p><h2>До встречи<br /><em>в Ретро</em></h2><div className="contact-lines"><a href={phoneHref}><span>Телефон и бронь</span><b>{phoneLabel}</b></a><a href={mapsHref} target="_blank" rel="noreferrer"><span>Режим работы</span><b>Посмотреть актуальные часы <ArrowUpRight size={17} /></b></a><div><span>Адрес</span><b>Королёв, Полевой проезд, 4А</b></div></div><div className="contact-buttons"><a className="button button-primary" href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> Построить маршрут</a><a className="button button-ghost" href={phoneHref}><Phone /> Позвонить</a></div></div>
      <a className="map-card" href={mapsHref} target="_blank" rel="noreferrer" aria-label="Открыть Ретро в Яндекс Картах"><div className="map-grid-lines" /><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-road road-three" /><span className="map-pin"><MapPin /></span><span className="map-label"><small>Кафе и бильярд «Ретро»</small><b>Полевой проезд, 4А</b></span><span className="map-link">Открыть в картах <ArrowUpRight /></span></a>
    </div></section>

    <footer className="footer shell"><a className="brand" href="#top"><span className="brand-mark">Р</span><span className="brand-copy"><b>Ретро</b><small>Кафе · Бильярд · Королёв</small></span></a><p>© {new Date().getFullYear()} Кафе и бильярд «Ретро»</p><a className="footer-phone" href={phoneHref}>{phoneLabel}</a><a className="back-to-top" href="#top"><ArrowUp /> Наверх</a></footer>

    {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Меню"><button onClick={closeMenu} aria-label="Закрыть меню"><X /></button><nav><a href="#top" onClick={closeMenu}>Главная</a><a href="#billiards" onClick={closeMenu}>Бильярд</a><a href="#food" onClick={closeMenu}>Кухня</a><a href="#contacts" onClick={closeMenu}>Контакты</a></nav><a className="button button-primary" href={phoneHref}><Phone /> Позвонить и забронировать</a></div>}
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фотографии" onClick={() => setLightbox(null)}><button aria-label="Закрыть фотографию"><X /></button><img src={`${base}images/${gallery[lightbox].src}`} alt={gallery[lightbox].alt} onClick={(event) => event.stopPropagation()} /></div>}
  </main>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
